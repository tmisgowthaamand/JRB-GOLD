// Simple Express server to handle Paytm POST callbacks
// This server acts as a proxy between Paytm and your React frontend

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the dist directory (for production)
app.use(express.static(join(__dirname, 'dist')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Payment callback server is running' });
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

  // Build redirect URL with query parameters for the frontend
  const frontendUrl = process.env.VITE_FRONTEND_URL || 'http://localhost:8080';
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

  console.log('Redirecting to frontend:', callbackUrl.toString());

  // Redirect to frontend with query parameters
  res.redirect(callbackUrl.toString());
});

// Fallback: serve React app for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Payment callback server running on port ${PORT}`);
  console.log(`Callback endpoint: http://localhost:${PORT}/payment/callback`);
});
