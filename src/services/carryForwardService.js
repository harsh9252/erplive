import ledgerService from './ledgerService';
import { getTrialBalanceReport } from './reportService';

/**
 * Calculates closing balance for a ledger based on its nature and current totals.
 * 
 * @param {Object} item Ledger row from trial balance report
 */
const calculateClosingBalance = (item) => {
    // Current Balance = (Opening + Debit) - Credit [for DR nature]
    // Current Balance = (Opening + Credit) - Debit [for CR nature]
    
    // The report usually provides total_dr and total_cr which ALREADY include opening balance 
    // depending on the backend implementation.
    // If it doesn't, we'd need to add it.
    // Assuming report totals are absolute net balances:
    const dr = Number(item.total_dr || item.debit || 0);
    const cr = Number(item.total_cr || item.credit || 0);
    
    if (dr >= cr) {
        return { balance: dr - cr, type: 'DR' };
    } else {
        return { balance: cr - dr, type: 'CR' };
    }
};

/**
 * Performs the carry forward process.
 * 
 * @param {String} sourceDate The end date of the previous financial year
 * @param {Function} onProgress Progress callback (current, total)
 */
const performCarryForward = async (sourceDate, onProgress) => {
    // 1. Get Trial Balance as of the end of the source year
    const reportResponse = await getTrialBalanceReport({ as_on_date: sourceDate });
    const reportItems = reportResponse.data?.ledgers || reportResponse.data || [];
    
    // 2. Fetch current ledger info to ensure we have the correct nature/groups
    const ledgerResponse = await ledgerService.getLedgers();
    const allLedgers = ledgerResponse.data || [];
    
    const results = {
        success: [],
        failed: [],
        total: reportItems.length
    };

    // 3. Process each ledger
    for (let i = 0; i < reportItems.length; i++) {
        const item = reportItems[i];
        const ledgerId = item.ledger_id || item.id;
        
        // Find existing ledger details
        const existingLedger = allLedgers.find(l => l.id === ledgerId);
        if (!existingLedger) continue;

        // Skip Income/Expense accounts (Standard Accounting rule: closing P&L to 0)
        const nature = existingLedger.ledgerGroup?.nature;
        if (nature === 'INCOME' || nature === 'EXPENSE') {
            // Option: Update to 0 or skip
            // Most systems just start at 0 for these.
            continue;
        }

        try {
            const { balance, type } = calculateClosingBalance(item);
            
            // 4. Update ledger opening balance for the new context
            await ledgerService.updateLedger(ledgerId, {
                ...existingLedger,
                opening_balance: balance,
                balance_type: type
            });
            
            results.success.push(ledgerId);
        } catch (error) {
            console.error(`Failed to carry forward ledger ${ledgerId}:`, error);
            results.failed.push({ id: ledgerId, name: existingLedger.name, error: error.message });
        }

        if (onProgress) {
            onProgress(i + 1, reportItems.length);
        }
    }

    return results;
};

export const carryForwardService = {
    performCarryForward
};

export default carryForwardService;
