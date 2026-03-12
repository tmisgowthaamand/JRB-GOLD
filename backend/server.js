// Backend Server for JRB Gold - Payment Callback Handler + Checksum Generation
// Deploy this to Render
// Uses OFFICIAL paytmchecksum npm package for correct checksum generation

import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';

// Import the official Paytm checksum library (CommonJS module)
const require = createRequire(import.meta.url);
const PaytmChecksum = require('paytmchecksum');

const app = express();
const PORT = process.env.PORT || 3001;

// Unified frontend URL — MUST match where the app is actually deployed
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://jrb-gold.vercel.app';

// Paytm credentials (from environment)
const PAYTM_MERCHANT_ID = process.env.PAYTM_MERCHANT_ID || process.env.VITE_MERCHANT_ID || '';
const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY || process.env.VITE_MERCHANT_KEY || '';
const PAYTM_ENVIRONMENT = process.env.PAYTM_ENVIRONMENT || process.env.VITE_PAYMENT_ENV || 'test';
const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || process.env.VITE_PAYTM_WEBSITE || 'WEBSTAGING';
const PAYTM_INDUSTRY_TYPE = process.env.PAYTM_INDUSTRY_TYPE || process.env.VITE_PAYTM_INDUSTRY_TYPE || 'Retail';
const PAYTM_CHANNEL_ID = process.env.PAYTM_CHANNEL_ID || process.env.VITE_PAYTM_CHANNEL_ID || 'WEB';

// ============================
// Middleware
// ============================

const corsOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',')
  : [
    'http://localhost:5173',
    'http://localhost:8080',
    'https://jrb-gold.vercel.app',
    'https://jrb-gold-56cs.vercel.app',
    'https://www.jrbgold.co.in',
    'https://jrbgold.co.in'
  ];

app.use(cors({
  origin: corsOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// API Endpoints
// ============================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'JRB Gold Payment Backend is running',
    frontendUrl: FRONTEND_URL,
    merchantId: PAYTM_MERCHANT_ID ? `${PAYTM_MERCHANT_ID.substring(0, 8)}...` : 'NOT SET',
    merchantKeySet: PAYTM_MERCHANT_KEY ? true : false,
    merchantKeyLength: PAYTM_MERCHANT_KEY ? PAYTM_MERCHANT_KEY.length : 0,
    environment: PAYTM_ENVIRONMENT,
    website: PAYTM_WEBSITE,
    timestamp: new Date().toISOString()
  });
});

// ============================
// Initiate Payment — generates checksum using official Paytm SDK
// ============================
app.post('/api/initiate-payment', async (req, res) => {
  try {
    const { orderId, amount, customerId, email, mobile } = req.body;

    console.log('Initiating payment:', { orderId, amount, customerId, email, mobile });

    if (!orderId || !amount || !customerId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: orderId, amount, customerId' 
      });
    }

    if (!PAYTM_MERCHANT_ID || !PAYTM_MERCHANT_KEY) {
      console.error('Paytm credentials not configured!');
      console.error('PAYTM_MERCHANT_ID:', PAYTM_MERCHANT_ID ? 'SET' : 'MISSING');
      console.error('PAYTM_MERCHANT_KEY:', PAYTM_MERCHANT_KEY ? 'SET' : 'MISSING');
      return res.status(500).json({ 
        success: false, 
        error: 'Payment gateway not configured. Please contact support.' 
      });
    }

    // Callback URL — Paytm will POST to this after payment
    const backendUrl = process.env.BACKEND_URL || 'https://jrb-gold.onrender.com';
    const callbackUrl = `${backendUrl}/payment/callback`;

    // Initial required Paytm transaction parameters
    const paytmParams = {
      MID: PAYTM_MERCHANT_ID,
      WEBSITE: PAYTM_WEBSITE,
      INDUSTRY_TYPE_ID: PAYTM_INDUSTRY_TYPE,
      CHANNEL_ID: PAYTM_CHANNEL_ID,
      ORDER_ID: orderId,
      CUST_ID: customerId.replace(/[^a-zA-Z0-9_\-]/g, '_'),
      TXN_AMOUNT: parseFloat(amount).toFixed(2),
      CALLBACK_URL: callbackUrl
    };

    // Only add optional parameters if they have truthy values
    if (email) paytmParams.EMAIL = email.trim();
    if (mobile) paytmParams.MOBILE_NO = mobile.trim();

    console.log('Paytm params for checksum:', paytmParams);
    console.log('Using merchant key (length):', PAYTM_MERCHANT_KEY.length);

    // Generate checksum using OFFICIAL Paytm SDK
    const checksum = await PaytmChecksum.generateSignature(paytmParams, PAYTM_MERCHANT_KEY);

    console.log('Checksum generated successfully (official SDK) for order:', orderId);
    console.log('Checksum value:', checksum.substring(0, 20) + '...');

    // Verify our own checksum to make sure it's valid
    const isValidChecksum = PaytmChecksum.verifySignature(paytmParams, PAYTM_MERCHANT_KEY, checksum);
    console.log('Self-verification of generated checksum:', isValidChecksum);

    if (!isValidChecksum) {
      console.error('Self-verification FAILED! Merchant key might be incorrect.');
      return res.status(500).json({
        success: false,
        error: 'Checksum generation error. Please contact support.'
      });
    }

    // Determine Paytm gateway URL
    const paytmGatewayUrl = PAYTM_ENVIRONMENT === 'production'
      ? 'https://securegw.paytm.in/order/process'
      : 'https://securegw-stage.paytm.in/order/process';

    res.json({
      success: true,
      paytmParams: {
        ...paytmParams,
        CHECKSUMHASH: checksum
      },
      paytmGatewayUrl,
      callbackUrl
    });

  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to initiate payment. Please try again.' 
    });
  }
});

// ============================
// Paytm POST callback handler
// ============================
app.post('/payment/callback', (req, res) => {
  console.log('Received Paytm POST callback:', req.body);
  
  const body = req.body || {};

  // Verify the checksum from Paytm using official SDK
  if (body.CHECKSUMHASH && PAYTM_MERCHANT_KEY) {
    const isValidChecksum = PaytmChecksum.verifySignature(body, PAYTM_MERCHANT_KEY, body.CHECKSUMHASH);
    console.log('Callback checksum verification:', isValidChecksum ? 'VALID ✅' : 'INVALID ❌');
  }

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

  console.log('Parsed callback data:', {
    ORDERID, TXNID, TXNAMOUNT, STATUS, RESPCODE, RESPMSG
  });

  // Build redirect URL to frontend
  const callbackUrl = new URL('/payment/callback', FRONTEND_URL);
  
  if (ORDERID) callbackUrl.searchParams.set('ORDERID', ORDERID);
  if (TXNID) callbackUrl.searchParams.set('TXNID', TXNID);
  if (TXNAMOUNT) callbackUrl.searchParams.set('TXNAMOUNT', TXNAMOUNT);
  
  // STATUS is critical — if Paytm didn't send it, infer from RESPCODE
  if (STATUS) {
    callbackUrl.searchParams.set('STATUS', STATUS);
  } else if (RESPCODE) {
    const inferredStatus = RESPCODE === '01' ? 'TXN_SUCCESS' : 'TXN_FAILURE';
    callbackUrl.searchParams.set('STATUS', inferredStatus);
    console.log(`STATUS missing, inferred as: ${inferredStatus} from RESPCODE: ${RESPCODE}`);
  } else {
    callbackUrl.searchParams.set('STATUS', 'UNKNOWN');
    console.warn('Both STATUS and RESPCODE missing from Paytm callback!');
  }

  if (RESPCODE) callbackUrl.searchParams.set('RESPCODE', RESPCODE);
  if (RESPMSG) callbackUrl.searchParams.set('RESPMSG', RESPMSG);
  if (TXNDATE) callbackUrl.searchParams.set('TXNDATE', TXNDATE);
  if (GATEWAYNAME) callbackUrl.searchParams.set('GATEWAYNAME', GATEWAYNAME);
  if (BANKNAME) callbackUrl.searchParams.set('BANKNAME', BANKNAME);
  if (PAYMENTMODE) callbackUrl.searchParams.set('PAYMENTMODE', PAYMENTMODE);

  console.log('Redirecting to frontend:', callbackUrl.toString());
  res.redirect(callbackUrl.toString());
});

// Test endpoint for payment callback
app.get('/test/callback', (req, res) => {
  const testCallbackUrl = `${FRONTEND_URL}/payment/callback?ORDERID=TEST123&STATUS=TXN_SUCCESS&TXNID=TEST456&TXNAMOUNT=1000.00&RESPCODE=01&RESPMSG=Test%20Success`;
  res.redirect(testCallbackUrl);
});

// Test failure callback
app.get('/test/callback-fail', (req, res) => {
  const testCallbackUrl = `${FRONTEND_URL}/payment/callback?ORDERID=TEST789&STATUS=TXN_FAILURE&TXNID=TEST012&TXNAMOUNT=500.00&RESPCODE=330&RESPMSG=Test%20Failure`;
  res.redirect(testCallbackUrl);
});

// Debug endpoint — test checksum generation
app.get('/test/checksum', async (req, res) => {
  try {
    const testParams = {
      MID: PAYTM_MERCHANT_ID,
      ORDER_ID: 'TEST_' + Date.now(),
      TXN_AMOUNT: '1.00',
      CUST_ID: 'test@example.com',
      CHANNEL_ID: PAYTM_CHANNEL_ID,
      WEBSITE: PAYTM_WEBSITE,
      INDUSTRY_TYPE_ID: PAYTM_INDUSTRY_TYPE,
      CALLBACK_URL: 'https://jrb-gold.onrender.com/payment/callback'
    };

    const checksum = await PaytmChecksum.generateSignature(testParams, PAYTM_MERCHANT_KEY);
    const isValid = PaytmChecksum.verifySignature(testParams, PAYTM_MERCHANT_KEY, checksum);

    res.json({
      success: true,
      merchantId: PAYTM_MERCHANT_ID,
      merchantKeyLength: PAYTM_MERCHANT_KEY.length,
      checksumGenerated: checksum.substring(0, 30) + '...',
      selfVerification: isValid,
      testParams,
      message: isValid 
        ? 'Checksum generation and verification working correctly ✅' 
        : 'Checksum verification failed! Check merchant key ❌'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      merchantKeyLength: PAYTM_MERCHANT_KEY ? PAYTM_MERCHANT_KEY.length : 0,
      merchantKeySet: !!PAYTM_MERCHANT_KEY
    });
  }
});

// Debug endpoint — test checksum generation bypassing frontend
app.get('/test/pay', async (req, res) => {
  try {
    const orderId = 'TEST_' + Date.now();
    const testParams = {
      MID: PAYTM_MERCHANT_ID,
      ORDER_ID: orderId,
      TXN_AMOUNT: '1.00',
      CUST_ID: 'TEST_USER_01',
      CHANNEL_ID: PAYTM_CHANNEL_ID,
      WEBSITE: PAYTM_WEBSITE,
      INDUSTRY_TYPE_ID: PAYTM_INDUSTRY_TYPE,
      CALLBACK_URL: `${process.env.BACKEND_URL || 'https://jrb-gold.onrender.com'}/payment/callback`
    };

    const checksum = await PaytmChecksum.generateSignature(testParams, PAYTM_MERCHANT_KEY);
    
    const paytmGatewayUrl = PAYTM_ENVIRONMENT === 'production'
      ? 'https://securegw.paytm.in/order/process'
      : 'https://securegw-stage.paytm.in/order/process';

    // Generate raw HTML form that submits exactly the signed data
    let html = `
      <html>
        <head><title>Test Paytm Redirect</title></head>
        <body>
          <h2>Redirecting to Paytm...</h2>
          <form method="post" action="${paytmGatewayUrl}" name="paytm">
    `;
    
    for (const key in testParams) {
      html += `<input type="hidden" name="${key}" value="${testParams[key]}">\n`;
    }
    html += `<input type="hidden" name="CHECKSUMHASH" value="${checksum}">\n`;
    
    html += `
          </form>
          <script type="text/javascript">
            document.paytm.submit();
          </script>
        </body>
      </html>
    `;
    
    res.send(html);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'JRB Gold Payment Backend API',
    endpoints: {
      health: '/api/health',
      initiatePayment: '/api/initiate-payment (POST)',
      callback: '/payment/callback (POST)',
      testSuccess: '/test/callback',
      testFail: '/test/callback-fail',
      testChecksum: '/test/checksum'
    },
    frontend: FRONTEND_URL
  });
});

app.listen(PORT, () => {
  console.log(`🚀 JRB Gold Backend running on port ${PORT}`);
  console.log(`📡 Payment callback: http://localhost:${PORT}/payment/callback`);
  console.log(`💳 Payment initiation: http://localhost:${PORT}/api/initiate-payment`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔑 Merchant ID: ${PAYTM_MERCHANT_ID ? PAYTM_MERCHANT_ID.substring(0, 8) + '...' : 'NOT SET'}`);
  console.log(`🔐 Merchant Key: ${PAYTM_MERCHANT_KEY ? 'SET (' + PAYTM_MERCHANT_KEY.length + ' chars)' : 'NOT SET'}`);
  console.log(`🌍 Environment: ${PAYTM_ENVIRONMENT}`);
  console.log(`🌐 Website: ${PAYTM_WEBSITE}`);
});