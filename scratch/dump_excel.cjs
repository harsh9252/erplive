const XLSX = require('xlsx');

function dumpExcel(filename) {
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    let currentModule = "Unknown";
    data.forEach(r => {
        if (r.Module && r.Module.trim() !== "") currentModule = r.Module.trim();
        const stat = r.Status;
        if (stat !== 'Deployed' && stat !== 'Done' && stat !== 'Fixed') {
           console.log(`[${currentModule}] [${r['Path Location']}] - ${r.Task} - ${r.Status}`);
        }
    });
}

dumpExcel('ERP Production Issue.xlsx');
