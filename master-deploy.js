// master-deploy.js
const { execSync } = require('child_process');

function run(command) {
  console.log(`\n> Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Error during command: ${command}`);
    process.exit(1);
  }
}

console.log('🚀 Starting Full Auto-Deploy (Fix ➔ Install ➔ Build ➔ Push)...');

// Step 1: Auto-fix code (linting, formatting, etc.)
run('npm run fix');  

// Step 2: Install fresh dependencies
run('npm install');  

// Step 3: Build the project
run('npm run build');  

// Step 4: Push changes to GitHub (assuming 'npm run push' runs `git push`)
run('npm run push');  

console.log('✅ Deployment pipeline complete! Code pushed to GitHub.');