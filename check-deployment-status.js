// Quick script to check if backend is deployed and working
const https = require('https');

const BACKEND_URL = 'https://jrb-gold.onrender.com';
const FRONTEND_URL = 'https://jrb-gold.vercel.app';

console.log('🔍 Checking Deployment Status...\n');

// Check backend
console.log('1️⃣ Checking Backend (Render)...');
https.get(`${BACKEND_URL}/api/health`, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Backend is UP and running!');
      console.log(`   Response: ${data}\n`);
    } else {
      console.log(`❌ Backend returned status: ${res.statusCode}`);
      console.log(`   Response: ${data}\n`);
    }
    checkFrontend();
  });
}).on('error', (err) => {
  console.log('❌ Backend is NOT deployed or not responding!');
  console.log(`   Error: ${err.message}`);
  console.log('\n⚠️  ACTION REQUIRED: Deploy backend to Render first!\n');
  checkFrontend();
});

function checkFrontend() {
  console.log('2️⃣ Checking Frontend (Vercel)...');
  https.get(FRONTEND_URL, (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Frontend is UP and running!\n');
    } else {
      console.log(`⚠️  Frontend returned status: ${res.statusCode}\n`);
    }
    printSummary();
  }).on('error', (err) => {
    console.log('❌ Frontend is NOT responding!');
    console.log(`   Error: ${err.message}\n`);
    printSummary();
  });
}

function printSummary() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 DEPLOYMENT STATUS SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n🌐 URLs:');
  console.log(`   Backend:  ${BACKEND_URL}`);
  console.log(`   Frontend: ${FRONTEND_URL}`);
  console.log('\n📡 Payment Callback URL for Paytm:');
  console.log(`   ${BACKEND_URL}/payment/callback`);
  console.log('\n🚀 Next Steps:');
  console.log('   1. If backend is DOWN: Deploy to Render');
  console.log('   2. If backend is UP: Update Paytm callback URL');
  console.log('   3. Test payment flow end-to-end');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}