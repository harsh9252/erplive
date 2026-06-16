
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
            let url = '';
            if (item.request.url) {
              if (typeof item.request.url === 'string') {
                url = item.request.url;
              } else if (item.request.url.raw) {
                url = item.request.url.raw;
              } else if (item.request.url.path) {
                url = item.request.url.path.join('/');
              }
            }
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
