// Backend Server for JRB Gold - Payment Callback Handler
// Deploy this to Render

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const corsOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',')
  : [
    'http://localhost:5173',
    'http://localhost:8080',
    'https://jrb-gold-56cs.vercel.app',
    'https://www.jrbgold.co.in'
  ];

app.use(cors({
  origin: corsOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'JRB Gold Payment Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Paytm POST callback handler
app.post('/payment/callback', (req, res) => {
  console.log('Received Paytm POST callback:', req.body);
  
  // Extract payment data from POST body
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
    PAYMENTMODE,
    CHECKSUMHASH
  } = req.body;

  // Build redirect URL to Vercel frontend
  const frontendUrl = process.env.FRONTEND_URL || 'https://jrb-gold.vercel.app';
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

  console.log('Redirecting to Vercel frontend:', callbackUrl.toString());

  // Redirect to Vercel frontend with query parameters
  res.redirect(callbackUrl.toString());
});

// Test endpoint for payment callback
app.get('/test/callback', (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'https://jrb-gold.vercel.app';
  const testCallbackUrl = `${frontendUrl}/payment/callback?ORDERID=TEST123&STATUS=TXN_SUCCESS&TXNID=TEST456&TXNAMOUNT=1000.00&RESPCODE=01&RESPMSG=Test%20Success`;
  
  res.redirect(testCallbackUrl);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'JRB Gold Payment Backend API',
    endpoints: {
      health: '/api/health',
      callback: '/payment/callback',
      test: '/test/callback'
    },
    frontend: process.env.FRONTEND_URL || 'https://jrb-gold.vercel.app'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 JRB Gold Backend running on port ${PORT}`);
  console.log(`📡 Payment callback endpoint: http://localhost:${PORT}/payment/callback`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'https://jrb-gold.vercel.app'}`);
});