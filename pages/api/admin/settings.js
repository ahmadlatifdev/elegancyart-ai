import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'bossmind-projects-settings.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (err) {
      res.status(200).json({ projects: [] });
    }
  } else if (req.method === 'POST') {
    try {
      const body = req.body;
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save settings' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
