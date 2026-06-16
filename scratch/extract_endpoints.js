
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('5_6057619597945740624.json', 'utf8'));

function extractItems(items, parentName = '') {
    let endpoints = [];
    items.forEach(item => {
        const fullName = parentName ? `${parentName} > ${item.name}` : item.name;
        if (item.item) {
            endpoints = endpoints.concat(extractItems(item.item, fullName));
        } else if (item.request) {
            const method = item.request.method;
            const url = item.request.url.raw || (item.request.url.path ? item.request.url.path.join('/') : '');
            endpoints.push({
                name: fullName,
                method: method,
                url: url
            });
        }
    });
    return endpoints;
}

const allEndpoints = extractItems(data.item);
console.log(JSON.stringify(allEndpoints, null, 2));
