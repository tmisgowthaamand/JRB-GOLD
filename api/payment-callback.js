// Vercel Serverless Function to handle Paytm POST callbacks
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log('Payment callback received:', {
    method: req.method,
    body: req.body,
    query: req.query
  });

  // Handle POST request from Paytm
  if (req.method === 'POST') {
    const {
      ORDERID,
      TXNID,
      TXNAMOUNT,
      STATUS,
      RESPCODE,
      RESPMSG,
      TXNDATE,
      GATEWAYNAME,
      BANKNAME,
      PAYMENTMODE
    } = req.body;

    // Build redirect URL to frontend with query parameters
    const frontendUrl = 'https://jrb-gold-56cs.vercel.app';
    const callbackUrl = new URL('/payment/callback', frontendUrl);
    
    // Add all parameters as query strings
    if (ORDERID) callbackUrl.searchParams.set('ORDERID', ORDERID);
    if (TXNID) callbackUrl.searchParams.set('TXNID', TXNID);
    if (TXNAMOUNT) callbackUrl.searchParams.set('TXNAMOUNT', TXNAMOUNT);
    if (STATUS) callbackUrl.searchParams.set('STATUS', STATUS);
    if (RESPCODE) callbackUrl.searchParams.set('RESPCODE', RESPCODE);
    if (RESPMSG) callbackUrl.searchParams.set('RESPMSG', RESPMSG);
    if (TXNDATE) callbackUrl.searchParams.set('TXNDATE', TXNDATE);
    if (GATEWAYNAME) callbackUrl.searchParams.set('GATEWAYNAME', GATEWAYNAME);
    if (BANKNAME) callbackUrl.searchParams.set('BANKNAME', BANKNAME);
    if (PAYMENTMODE) callbackUrl.searchParams.set('PAYMENTMODE', PAYMENTMODE);

    console.log('Redirecting to:', callbackUrl.toString());

    // Redirect to frontend
    res.redirect(302, callbackUrl.toString());
    return;
  }

  // Handle GET request (health check)
  if (req.method === 'GET') {
    res.status(200).json({
      status: 'ok',
      message: 'JRB Gold Payment Callback Handler',
      timestamp: new Date().toISOString()
    });
    return;
  }

  // Method not allowed
  res.status(405).json({ error: 'Method not allowed' });
}