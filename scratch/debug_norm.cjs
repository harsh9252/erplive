
function normalize(url) {
    if (!url) return '';
    // Remove base_url
    let normalized = url.replace(/{{base_url}}/, '');
    // Replace parameters like :id, ${id}, {{id}}, etc with {param}
    normalized = normalized.replace(/:[a-zA-Z0-9_]+/g, '{param}');
    normalized = normalized.replace(/\${[a-zA-Z0-9_]+}/g, '{param}');
    normalized = normalized.replace(/{{[a-zA-Z0-9_]+}}/g, '{param}');
    
    // Also handle trailing numbers as params (very common in Postman examples)
    normalized = normalized.replace(/\/([0-9]+)(\/|$)/g, '/{param}$2');
    
    // Remove query string
    normalized = normalized.split('?')[0];
    // Ensure leading slash
    if (!normalized.startsWith('/')) normalized = '/' + normalized;
    // Remove trailing slash
    if (normalized.endsWith('/') && normalized.length > 1) normalized = normalized.slice(0, -1);
    return normalized;
}

console.log('Project:', normalize('/api/reports/ledger/${id}'));
console.log('Postman:', normalize('{{base_url}}/api/reports/ledger/1?from_date=2025-04-01&to_date=2026-03-31'));
