// D:\Shakhsy11\MY Plugins\Elegancyart averecl Migration\Elegancy-art\elegancyart-ai\scripts\project-links.js

// === EDIT THIS LINE ===
const BASE_URL = 'http://localhost:3001';   // <-- Set your actual BossMind backend URL here
// =====================

const PROJECTS = [
  'project-alpha',
  'project-beta',
  'project-gamma',
  'project-delta',
  'project-epsilon'
];

console.log(`\n🔗 Using backend URL: ${BASE_URL}\n`);
console.log('Your working links:\n');

for (const project of PROJECTS) {
  console.log(`📁 ${project}`);
  console.log(`   Access session list:  ${BASE_URL}/api/projects/${project}/sessions`);
  console.log(`   Send message (POST): ${BASE_URL}/api/projects/${project}/chat`);
  console.log(`   Web UI (if exists):  ${BASE_URL}/projects/${project}/chat`);
  console.log();
}

console.log('✅ Done. Use these links with curl, Postman, or your browser.');