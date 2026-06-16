const XLSX = require('xlsx');
const fs = require('fs');

function getPendingBugs(filename) {
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: "" }); // Use "" for empty cells
    
    let currentModule = "Unknown Module";
    const pendingBugs = [];

    data.forEach(row => {
        if (row.Module && row.Module.trim() !== "") {
            currentModule = row.Module.trim();
        }
        
        const status = row.Status ? row.Status.trim() : "";
        const task = row.Task ? row.Task.trim() : "";
        const pathLoc = row['Path Location'] ? row['Path Location'].trim() : "";
        
        // Sometimes rows are empty, filter those out
        if (!task && !pathLoc) return;

        if (status !== 'Deployed' && status !== 'Done' && status !== 'Fixed') {
            pendingBugs.push({
                Module: currentModule,
                Section: pathLoc,
                Task: task,
                Status: status || "Not Started"
            });
        }
    });

    let markdown = `# Pending Bugs List (Module & Section Wise)\n\n`;
    
    // Group by Module
    const grouped = pendingBugs.reduce((acc, bug) => {
        if (!acc[bug.Module]) acc[bug.Module] = {};
        if (!acc[bug.Module][bug.Section]) acc[bug.Module][bug.Section] = [];
        acc[bug.Module][bug.Section].push(bug);
        return acc;
    }, {});

    for (const [module, sections] of Object.entries(grouped)) {
        markdown += `## 📦 Module: ${module}\n\n`;
        for (const [section, bugs] of Object.entries(sections)) {
            markdown += `### 📂 Section: ${section || 'General'}\n`;
            bugs.forEach((bug, idx) => {
                markdown += `- **[${bug.Status}]** ${bug.Task}\n`;
            });
            markdown += `\n`;
        }
    }

    fs.writeFileSync('e:\\erpankitsir\\backup\\scratch\\pending_bugs.md', markdown);
    console.log("Successfully generated e:\\erpankitsir\\backup\\scratch\\pending_bugs.md");
}

getPendingBugs('ERP Production Issue.xlsx');
