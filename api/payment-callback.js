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
      // Paytm sends form-encoded data; req.body may be parsed or raw
      const body = req.body || {};

      const ORDERID = body.ORDERID || body.orderid || '';
      const TXNID = body.TXNID || body.txnid || '';
      const TXNAMOUNT = body.TXNAMOUNT || body.txnamount || '';
      const STATUS = body.STATUS || body.status || '';
      const RESPCODE = body.RESPCODE || body.respcode || '';
      const RESPMSG = body.RESPMSG || body.respmsg || '';
      const TXNDATE = body.TXNDATE || body.txndate || '';
      const GATEWAYNAME = body.GATEWAYNAME || body.gatewayname || '';
      const BANKNAME = body.BANKNAME || body.bankname || '';
      const PAYMENTMODE = body.PAYMENTMODE || body.paymentmode || '';
      const CHECKSUMHASH = body.CHECKSUMHASH || body.checksumhash || '';

      console.log('Parsed callback data:', {
        ORDERID, TXNID, TXNAMOUNT, STATUS, RESPCODE, RESPMSG
      });

      // Determine the frontend URL — use env var or default to jrb-gold.vercel.app
      const frontendUrl = process.env.FRONTEND_URL || 'https://jrb-gold.vercel.app';
      const params = new URLSearchParams();

      // Always add all parameters (even empty ones for critical fields)
      // This ensures STATUS is always present in the redirect URL
      if (ORDERID) params.append('ORDERID', ORDERID);
      if (TXNID) params.append('TXNID', TXNID);
      if (TXNAMOUNT) params.append('TXNAMOUNT', TXNAMOUNT);

      // STATUS is critical — if Paytm didn't send it, infer from RESPCODE
      if (STATUS) {
        params.append('STATUS', STATUS);
      } else if (RESPCODE) {
        // Paytm RESPCODE "01" means success, anything else is failure
        const inferredStatus = RESPCODE === '01' ? 'TXN_SUCCESS' : 'TXN_FAILURE';
        params.append('STATUS', inferredStatus);
        console.log(`STATUS missing from Paytm response, inferred as: ${inferredStatus} from RESPCODE: ${RESPCODE}`);
      } else {
        // Neither STATUS nor RESPCODE — mark as UNKNOWN so frontend can handle it
        params.append('STATUS', 'UNKNOWN');
        console.warn('Both STATUS and RESPCODE missing from Paytm callback!');
      }

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
        frontendUrl: process.env.FRONTEND_URL || 'https://jrb-gold.vercel.app',
        timestamp: new Date().toISOString()
      });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in payment callback:', error);

    // Even on error, try to redirect to frontend with error info
    const frontendUrl = process.env.FRONTEND_URL || 'https://jrb-gold.vercel.app';
    const errorRedirect = `${frontendUrl}/payment/callback?STATUS=TXN_FAILURE&RESPMSG=${encodeURIComponent('Payment processing error. Please contact support.')}&ERROR=server_error`;

    res.setHeader('Location', errorRedirect);
    return res.status(302).end();
  }
};