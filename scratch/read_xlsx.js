const XLSX = require('xlsx');

function readExcel(filename) {
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log(`--- File: ${filename} ---`);
    console.log(`Columns: ${Object.keys(data[0] || {}).join(', ')}`);
    console.log(`Total rows: ${data.length}`);
    console.log('First 2 rows:');
    console.log(data.slice(0, 2));
}

readExcel('ERP Production Issues Organized.xlsx');
readExcel('ERP Production Issue.xlsx');
