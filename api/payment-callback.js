// Vercel Serverless Function to handle Paytm POST callbacks
module.exports = async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
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
      const frontendUrl = 'https://www.jrbgold.co.in';
      const params = new URLSearchParams();
      
      // Add all parameters
      if (ORDERID) params.append('ORDERID', ORDERID);
      if (TXNID) params.append('TXNID', TXNID);
      if (TXNAMOUNT) params.append('TXNAMOUNT', TXNAMOUNT);
      if (STATUS) params.append('STATUS', STATUS);
      if (RESPCODE) params.append('RESPCODE', RESPCODE);
      if (RESPMSG) params.append('RESPMSG', RESPMSG);
      if (TXNDATE) params.append('TXNDATE', TXNDATE);
      if (GATEWAYNAME) params.append('GATEWAYNAME', GATEWAYNAME);
      if (BANKNAME) params.append('BANKNAME', BANKNAME);
      if (PAYMENTMODE) params.append('PAYMENTMODE', PAYMENTMODE);

      const redirectUrl = `${frontendUrl}/payment/callback?${params.toString()}`;
      console.log('Redirecting to:', redirectUrl);

      // Redirect to frontend
      res.setHeader('Location', redirectUrl);
      return res.status(302).end();
    }

    // Handle GET request (health check)
    if (req.method === 'GET') {
      return res.status(200).json({
        status: 'ok',
        message: 'JRB Gold Payment Callback Handler',
        endpoint: '/api/payment-callback',
        methods: ['GET', 'POST'],
        timestamp: new Date().toISOString()
      });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in payment callback:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};