
const fs = require('fs');

function readJsonFile(path) {
    let content = fs.readFileSync(path, 'utf8');
    // Remove BOM
    if (content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 0xFFFE) {
        content = content.slice(1);
    }
    return JSON.parse(content);
}

const collectionEndpoints = readJsonFile('scratch/endpoints_utf8.json');
const projectApis = readJsonFile('scratch/found_apis.json');

function normalize(url) {
    if (!url) return '';
    // Remove query string first
    let normalized = url.split('?')[0];
    
    // Remove base_url
    normalized = normalized.replace(/{{base_url}}/, '');
    
    // Replace parameters like :id, ${id}, {{id}}, etc with {param}
    normalized = normalized.replace(/:[a-zA-Z0-9_]+/g, '{param}');
    normalized = normalized.replace(/\${[a-zA-Z0-9_]+}/g, '{param}');
    normalized = normalized.replace(/{{[a-zA-Z0-9_]+}}/g, '{param}');
    
    // Also handle trailing numbers as params
    normalized = normalized.replace(/\/([0-9]+)(\/|$)/g, '/{param}$2');
    
    // Ensure leading slash
    if (!normalized.startsWith('/')) normalized = '/' + normalized;
    // Remove trailing slash
    if (normalized.endsWith('/') && normalized.length > 1) normalized = normalized.slice(0, -1);
    return normalized;
}

const projectApisNormalized = new Set(projectApis.map(normalize));

const missing = collectionEndpoints.filter(endpoint => {
    const norm = normalize(endpoint.url);
    if (!norm) return false;
    return !projectApisNormalized.has(norm);
});

console.log(JSON.stringify(missing, null, 2));
