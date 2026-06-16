const XLSX = require('xlsx');

function generateFinalList(filename) {
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    
    let currentModule = "Unknown Module";
    const pendingBugs = [];

    data.forEach(row => {
        if (row.Module && row.Module.trim() !== "") {
            currentModule = row.Module.trim();
        }
        
        const status = row.Status ? row.Status.trim() : "";
        const task = row.Task ? row.Task.trim() : "";
        let pathLoc = row['Path Location'] ? row['Path Location'].trim() : "";
        
        if (!task) return;

        // Skip completed
        if (status === 'Deployed' || status === 'Done' || status === 'Fixed') return;

        // If pathLoc is empty, try to guess from task prefix e.g., "Payroll - "
        if (!pathLoc) {
            if (task.includes(" – ")) {
                pathLoc = task.split(" – ")[0].trim();
            } else if (task.includes(" - ")) {
                pathLoc = task.split(" - ")[0].trim();
            } else {
                pathLoc = "General";
            }
        }

        pendingBugs.push({
            Module: currentModule,
            Section: pathLoc,
            Task: task,
            Status: status || "Pending / Not Started"
        });
    });

    // Group by Module
    const grouped = pendingBugs.reduce((acc, bug) => {
        if (!acc[bug.Module]) acc[bug.Module] = {};
        if (!acc[bug.Module][bug.Section]) acc[bug.Module][bug.Section] = [];
        acc[bug.Module][bug.Section].push(bug);
        return acc;
    }, {});

    let markdown = `Here is the detailed list of bugs and missing features that are **still pending (abhi bhi hain)**, categorized by module and section based on the production issues tracker:\n\n`;

    for (const [module, sections] of Object.entries(grouped)) {
        markdown += `### 📦 Module: ${module}\n`;
        for (const [section, bugs] of Object.entries(sections)) {
            markdown += `**📂 Section: ${section}**\n`;
            bugs.forEach((bug) => {
                let statusBadge = bug.Status === 'In Progress' ? '*(In Progress)*' : '*(Pending)*';
                markdown += `- ${bug.Task} ${statusBadge}\n`;
            });
            markdown += `\n`;
        }
        markdown += `---\n\n`;
    }

    console.log(markdown);
}

generateFinalList('ERP Production Issue.xlsx');
