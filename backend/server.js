// Backend Server for JRB Gold - Payment Callback Handler + Checksum Generation
// Deploy this to Render

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

// Unified frontend URL — MUST match where the app is actually deployed
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://jrb-gold.vercel.app';

// Paytm credentials (from environment or defaults)
const PAYTM_MERCHANT_ID = process.env.PAYTM_MERCHANT_ID || process.env.VITE_MERCHANT_ID || '';
const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY || process.env.VITE_MERCHANT_KEY || '';
const PAYTM_ENVIRONMENT = process.env.PAYTM_ENVIRONMENT || process.env.VITE_PAYMENT_ENV || 'test';
const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || process.env.VITE_PAYTM_WEBSITE || 'WEBSTAGING';
const PAYTM_INDUSTRY_TYPE = process.env.PAYTM_INDUSTRY_TYPE || process.env.VITE_PAYTM_INDUSTRY_TYPE || 'Retail';
const PAYTM_CHANNEL_ID = process.env.PAYTM_CHANNEL_ID || process.env.VITE_PAYTM_CHANNEL_ID || 'WEB';

// ============================
// Paytm Checksum Generation
// Official algorithm: AES-128-CBC
// ============================

const IV = '@@@@&&&&####$$$$';
const ALGOS = { AES: 'AES', AES128: 'aes-128-cbc' };

function getStringByParams(params) {
  const data = {};
  Object.keys(params).sort().forEach(key => {
    data[key] = (params[key] !== null && params[key].toLowerCase() !== 'null') 
      ? params[key] 
      : '';
  });
  return Object.values(data).join('|');
}

function calculateHash(params, salt) {
  const finalString = getStringByParams(params) + '|' + salt;
  return crypto.createHash('sha256').update(finalString).digest('hex') + salt;
}

function encrypt(input, key) {
  const cipher = crypto.createCipheriv(ALGOS.AES128, key, IV);
  let encrypted = cipher.update(input, 'binary', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

function decrypt(encrypted, key) {
  const decipher = crypto.createDecipheriv(ALGOS.AES128, key, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'binary');
  decrypted += decipher.final('binary');
  return decrypted;
}

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += chars[randomBytes[i] % chars.length];
  }
  return result;
}

function generateChecksum(params, key) {
  const salt = generateRandomString(4);
  const hashString = calculateHash(params, salt);
  const checksum = encrypt(hashString, key);
  return checksum;
}

function verifyChecksum(params, key, checksumHash) {
  try {
    const paramsData = { ...params };
    delete paramsData.CHECKSUMHASH;
    
    const decrypted = decrypt(checksumHash, key);
    const salt = decrypted.substring(decrypted.length - 4);
    const calculatedHash = calculateHash(paramsData, salt);
    
    return calculatedHash === decrypted;
  } catch (e) {
    console.error('Checksum verification error:', e);
    return false;
  }
}

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
    merchantKey: PAYTM_MERCHANT_KEY ? 'SET' : 'NOT SET',
    environment: PAYTM_ENVIRONMENT,
    timestamp: new Date().toISOString()
  });
});

// ============================
// Initiate Payment — generates checksum server-side
// ============================
app.post('/api/initiate-payment', (req, res) => {
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
      return res.status(500).json({ 
        success: false, 
        error: 'Payment gateway not configured. Please contact support.' 
      });
    }

    // Callback URL — Paytm will POST to this after payment
    const callbackUrl = `${process.env.BACKEND_URL || `https://jrb-gold.onrender.com`}/payment/callback`;

    // Paytm transaction parameters
    const paytmParams = {
      MID: PAYTM_MERCHANT_ID,
      WEBSITE: PAYTM_WEBSITE,
      INDUSTRY_TYPE_ID: PAYTM_INDUSTRY_TYPE,
      CHANNEL_ID: PAYTM_CHANNEL_ID,
      ORDER_ID: orderId,
      CUST_ID: customerId,
      TXN_AMOUNT: parseFloat(amount).toFixed(2),
      CALLBACK_URL: callbackUrl,
      EMAIL: email || '',
      MOBILE_NO: mobile || ''
    };

    // Generate checksum using Paytm's algorithm (AES-128-CBC)
    const checksum = generateChecksum(paytmParams, PAYTM_MERCHANT_KEY);

    console.log('Checksum generated successfully for order:', orderId);

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

  // Optionally verify the checksum from Paytm
  if (body.CHECKSUMHASH && PAYTM_MERCHANT_KEY) {
    const isValidChecksum = verifyChecksum(body, PAYTM_MERCHANT_KEY, body.CHECKSUMHASH);
    console.log('Checksum verification:', isValidChecksum ? 'VALID' : 'INVALID');
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

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'JRB Gold Payment Backend API',
    endpoints: {
      health: '/api/health',
      initiatePayment: '/api/initiate-payment (POST)',
      callback: '/payment/callback (POST)',
      testSuccess: '/test/callback',
      testFail: '/test/callback-fail'
    },
    frontend: FRONTEND_URL
  });
});

app.listen(PORT, () => {
  console.log(`🚀 JRB Gold Backend running on port ${PORT}`);
  console.log(`📡 Payment callback endpoint: http://localhost:${PORT}/payment/callback`);
  console.log(`💳 Payment initiation endpoint: http://localhost:${PORT}/api/initiate-payment`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔑 Merchant ID: ${PAYTM_MERCHANT_ID ? PAYTM_MERCHANT_ID.substring(0, 8) + '...' : 'NOT SET'}`);
});