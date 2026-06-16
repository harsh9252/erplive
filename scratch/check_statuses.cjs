const XLSX = require('xlsx');

function showStatuses(filename) {
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    const statuses = new Set(data.map(r => r.Status));
    console.log(Array.from(statuses));
}

showStatuses('ERP Production Issue.xlsx');
