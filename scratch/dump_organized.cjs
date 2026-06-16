const XLSX = require('xlsx');

function dumpOrganized(filename) {
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    console.log(data);
}

dumpOrganized('ERP Production Issues Organized.xlsx');
