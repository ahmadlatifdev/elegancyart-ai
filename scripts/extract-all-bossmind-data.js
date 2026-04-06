// D:\Shakhsy11\MY Plugins\Elegancyart averecl Migration\Elegancy-art\elegancyart-ai\scripts\extract-all-bossmind-data.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// ---- Configuration ----
const PROJECTS = [
  'project-alpha',
  'project-beta',
  'project-gamma',
  'project-delta',
  'project-epsilon'
];

const OUTPUT_DIR = path.join(__dirname, '..', 'bossmind-data');
const BACKEND_URL = 'http://localhost:3001';

// ---- Auto-detect backend URL ----
async function detectBackendUrl() {
  const candidates = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000',
    'http://localhost:5001',
    'http://localhost:8080'
  ];
  for (const url of candidates) {
    if (await isReachable(url)) {
      console.log(`✅ Detected backend at ${url}`);
      return url;
    }
  }
  throw new Error('Could not detect BossMind backend. Please set BACKEND_URL manually.');
}

async function isReachable(url) {
  return new Promise((resolve) => {
    const req = http.request(url, { method: 'HEAD', timeout: 2000 }, (res) => {
      resolve(res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.end();
  });
}

// ---- HTTP GET helper ----
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: 5000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data); // if not JSON, return raw
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ---- Fetch sessions for a project ----
async function fetchSessions(baseUrl, projectId) {
  const url = `${baseUrl}/api/projects/${projectId}/sessions`;
  try {
    const sessions = await httpGet(url);
    return Array.isArray(sessions) ? sessions : [];
  } catch (err) {
    console.warn(`⚠️  Could not fetch sessions for ${projectId}: ${err.message}`);
    return [];
  }
}

// ---- Fetch full history for a session ----
async function fetchSessionHistory(baseUrl, projectId, sessionId) {
  const url = `${baseUrl}/api/projects/${projectId}/sessions/${sessionId}`;
  try {
    return await httpGet(url);
  } catch (err) {
    console.warn(`   ⚠️  Could not fetch session ${sessionId}: ${err.message}`);
    return null;
  }
}

// ---- Fetch logs, audit, validation if endpoints exist ----
async function fetchAdditionalData(baseUrl, projectId) {
  const endpoints = {
    logs: `${baseUrl}/api/projects/${projectId}/logs`,
    audit: `${baseUrl}/api/projects/${projectId}/audit`,
    validation: `${baseUrl}/api/projects/${projectId}/validation`
  };
  const data = {};
  for (const [key, url] of Object.entries(endpoints)) {
    try {
      data[key] = await httpGet(url);
    } catch (err) {
      // ignore, endpoint may not exist
    }
  }
  return data;
}

// ---- Main ----
async function main() {
  console.log('🚀 BossMind Data Extractor\n');

  // 1. Determine backend URL
  let baseUrl = BACKEND_URL;
  if (!baseUrl) {
    try {
      baseUrl = await detectBackendUrl();
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  } else {
    console.log(`📌 Using manual backend URL: ${baseUrl}`);
  }

  // 2. Prepare output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 3. Process each project
  for (const project of PROJECTS) {
    console.log(`\n📁 Processing ${project}...`);

    // Fetch session list
    const sessions = await fetchSessions(baseUrl, project);
    const sessionDetails = [];

    // For each session, fetch full history
    for (const sess of sessions) {
      const sessionId = sess.id || sess.sessionId || (typeof sess === 'string' ? sess : null);
      if (sessionId) {
        console.log(`   🔄 Fetching session ${sessionId}`);
        const history = await fetchSessionHistory(baseUrl, project, sessionId);
        sessionDetails.push({
          id: sessionId,
          metadata: sess,
          history: history
        });
      } else {
        // If session list contains objects without id, just store the whole thing
        sessionDetails.push({ raw: sess });
      }
    }

    // Fetch additional project-level data
    const additional = await fetchAdditionalData(baseUrl, project);

    // Combine all data for this project
    const projectData = {
      projectId: project,
      fetchedAt: new Date().toISOString(),
      backend: baseUrl,
      sessions: sessionDetails,
      ...additional
    };

    // Write to file
    const outFile = path.join(OUTPUT_DIR, `${project}.json`);
    fs.writeFileSync(outFile, JSON.stringify(projectData, null, 2));
    console.log(`   ✅ Saved to ${outFile}`);
  }

  // 4. Also save a combined summary
  const summary = {
    extractedAt: new Date().toISOString(),
    backend: baseUrl,
    projects: PROJECTS
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(`\n📦 All data saved to ${OUTPUT_DIR}`);
  console.log('✅ Extraction complete.');
}

main().catch(console.error);