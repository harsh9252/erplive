
const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const apisFound = new Set();

walkDir('src/services', (filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const matches = content.match(/\/api\/[a-zA-Z0-9\-\/_\$${}]+/g);
        if (matches) {
            matches.forEach(m => apisFound.add(m));
        }
    }
});

fs.writeFileSync('scratch/found_apis.json', JSON.stringify(Array.from(apisFound), null, 2));
console.log(`Found ${apisFound.size} unique API patterns.`);
