const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Change to project root (assuming script is in /scripts and root is one level up)
const rootDir = path.resolve(__dirname, '..');
process.chdir(rootDir);

console.log('🚀 Running ultimate setup for BossMind admin system...');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ No package.json found. Are you in the right directory?');
  process.exit(1);
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ npm install failed');
  process.exit(1);
}

// Ensure settings file exists (optional)
const settingsPath = 'bossmind-projects-settings.json';
if (!fs.existsSync(settingsPath)) {
  fs.writeFileSync(settingsPath, JSON.stringify({ projects: [] }, null, 2));
  console.log('✅ Created settings file');
}

// Start dev server
console.log('🚀 Starting dev server...');
execSync('npm run dev', { stdio: 'inherit' });