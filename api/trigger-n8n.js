// api/trigger-n8n.js
export default async function handler(req, res) {
  // Handle CORS preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // or restrict to your domain
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Set the CORS header for all responses
  res.setHeader('Access-Control-Allow-Origin', '*'); // or restrict to your domain

  try {
    const userData = req.body;

    const response = await fetch('https://viyeji-n8n-webhook-url.com/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    return res.status(200).json({ success: true, result });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
