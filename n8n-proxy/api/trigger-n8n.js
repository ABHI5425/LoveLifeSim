// api/trigger-n8n.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
