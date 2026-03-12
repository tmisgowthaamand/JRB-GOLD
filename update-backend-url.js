// Quick script to update backend URL if Render gives different URL
// Run: node update-backend-url.js YOUR_NEW_BACKEND_URL

const fs = require('fs');
const path = require('path');

const newBackendUrl = process.argv[2];

if (!newBackendUrl) {
  console.log('❌ Please provide the new backend URL');
  console.log('Usage: node update-backend-url.js https://your-backend.onrender.com');
  process.exit(1);
}

console.log(`🔄 Updating backend URL to: ${newBackendUrl}`);

// Update vercel.json
const vercelPath = path.join(__dirname, 'vercel.json');
const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
vercelConfig.env.VITE_BACKEND_URL = newBackendUrl;
fs.writeFileSync(vercelPath, JSON.stringify(vercelConfig, null, 2));
console.log('✅ Updated vercel.json');

// Update .env
const envPath = path.join(__dirname, '.env');
let envContent = fs.readFileSync(envPath, 'utf8');
envContent = envContent.replace(
  /VITE_BACKEND_URL=.*/,
  `VITE_BACKEND_URL=${newBackendUrl}`
);
fs.writeFileSync(envPath, envContent);
console.log('✅ Updated .env');

// Update payment service
const servicePath = path.join(__dirname, 'src/services/paymentService.ts');
let serviceContent = fs.readFileSync(servicePath, 'utf8');
serviceContent = serviceContent.replace(
  /import\.meta\.env\.VITE_BACKEND_URL \|\| '[^']*'/,
  `import.meta.env.VITE_BACKEND_URL || '${newBackendUrl}'`
);
fs.writeFileSync(servicePath, serviceContent);
console.log('✅ Updated paymentService.ts');

console.log(`
🎯 Backend URL updated successfully!

Next steps:
1. git add .
2. git commit -m "update: backend URL to ${newBackendUrl}"
3. git push origin main
4. Update Paytm callback URL to: ${newBackendUrl}/payment/callback
`);