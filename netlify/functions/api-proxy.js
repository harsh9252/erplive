export const handler = async (event, context) => {
  const { path, httpMethod, headers, body, queryStringParameters } = event;
  
  const apiPath = path.replace(/^\/\.netlify\/functions\/api-proxy/, '').replace(/^\/api/, '');
  const apiUrl = `https://apidevelop.yanibooks.com/api${apiPath}${queryStringParameters ? '?' + new URLSearchParams(queryStringParameters).toString() : ''}`;
  
  console.log(`Proxying ${httpMethod} request to: ${apiUrl}`);

  const safeHeaders = { ...headers };
  delete safeHeaders['host'];
  delete safeHeaders['origin'];
  delete safeHeaders['referer'];
  delete safeHeaders['x-nf-request-id'];
  delete safeHeaders['client-ip'];
  
  if (body && !safeHeaders['content-type']) {
    safeHeaders['content-type'] = 'application/json';
  }

  try {
    const response = await fetch(apiUrl, {
      method: httpMethod,
      headers: safeHeaders,
      body: body || undefined,
      redirect: 'follow',
    });

    const responseData = await response.text();

    return {
      statusCode: response.status,
      body: responseData,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
    };
  } catch (error) {
    console.error('Proxy Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Proxy Error', 
        error: error.message 
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};
