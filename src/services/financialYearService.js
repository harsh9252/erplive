import settingsService from './settingsService';
import { findById } from './apiUtils';

let fetchInProgress = null;

const getFinancialYears = async (params = {}) => {
  if (fetchInProgress) {
    return fetchInProgress;
  }

  fetchInProgress = (async () => {
    try {
      return await settingsService.getSettingsFinancialYears(params);
    } finally {
      fetchInProgress = null;
    }
  })();

  return fetchInProgress;
};

const getFinancialYear = async (id) => {
  const response = await getFinancialYears();
  const year = findById(response.data, id);

  if (!year) {
    throw new Error('Financial year not found.');
  }

  return year;
};

const createFinancialYear = async (data) => settingsService.createSettingsFinancialYear(data);

const updateFinancialYear = async (id, data) => settingsService.updateSettingsFinancialYear(id, data);

const deleteFinancialYear = async (id) => settingsService.deleteSettingsFinancialYear(id);

const switchFinancialYear = async (id) => settingsService.switchSettingsFinancialYear(id);

const closeFinancialYear = async (id) => settingsService.closeSettingsFinancialYear(id);

export const financialYearService = {
  getFinancialYears,
  getFinancialYear,
  createFinancialYear,
  updateFinancialYear,
  deleteFinancialYear,
  switchFinancialYear,
  closeFinancialYear,
};

export default financialYearService;
