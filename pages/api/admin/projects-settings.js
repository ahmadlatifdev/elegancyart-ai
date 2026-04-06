// pages/api/admin/projects-settings.js
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'bossmind-projects-settings.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (err) {
      res.status(500).json({ error: 'Failed to read settings' });
    }
  } else if (req.method === 'PUT') {
    try {
      const newSettings = req.body;
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(newSettings, null, 2));
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save settings' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
