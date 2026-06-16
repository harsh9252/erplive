const XLSX = require('xlsx');

function dumpExcelModules(filename) {
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    data.forEach((r, idx) => {
        if (r.Module && r.Module.trim() !== "") {
            console.log(`Row ${idx + 2}: Module = ${r.Module.trim()}`);
        }
    });
}

dumpExcelModules('ERP Production Issue.xlsx');
