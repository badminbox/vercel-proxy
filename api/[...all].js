export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Updated to point to your specific port 8443
  const backendUrl = 'https://elseo.ir:8443'; 
  
  const url = new URL(req.url);
  const targetUrl = new URL(url.pathname + url.search, backendUrl);

  const modifiedRequest = new Request(targetUrl, {
    headers: req.headers,
    method: req.method,
    body: req.body,
    redirect: 'manual',
  });

  try {
    const response = await fetch(modifiedRequest);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    return new Response('Proxy Error', { status: 500 });
  }
}
