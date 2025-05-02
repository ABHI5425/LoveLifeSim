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

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the webhook type and data from the request body
  const { webhookType, data } = req.body;

  // Map of valid webhook endpoints
  const API_ENDPOINTS = {
    registration: 'https://viyeji.app.n8n.cloud/webhook-test/user-registration',
    login: 'https://viyeji.app.n8n.cloud/webhook-test/user-login',
    profileSetup: 'https://viyeji.app.n8n.cloud/webhook-test/profile-setup',
    generateCode: 'https://viyeji.app.n8n.cloud/webhook-test/generate-partner-code',
    validateCode: 'https://viyeji.app.n8n.cloud/webhook-test/validate-partner-code',
    getQuestions: 'https://viyeji.app.n8n.cloud/webhook-test/get-questions',
    submitAnswers: 'https://viyeji.app.n8n.cloud/webhook-test/submit-answers',
  };

  // Check if the provided webhookType is valid
  if (!API_ENDPOINTS[webhookType]) {
    return res.status(400).json({ error: 'Invalid webhook type' });
  }

  try {
    // Fetch the correct n8n webhook URL
    const webhookUrl = API_ENDPOINTS[webhookType];

    // Make the API request to the n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // Send the dynamic data
    });

    const result = await response.json();

    // Send the result back to the frontend
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error while making API call to n8n:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
