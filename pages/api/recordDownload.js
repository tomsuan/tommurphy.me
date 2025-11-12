import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const logPath = path.join(process.cwd(), 'downloads.log');

  const timestamp = new Date().toISOString();
  const line = `${timestamp}\n`;

  fs.appendFileSync(logPath, line, 'utf8');

  res.status(200).json({ success: true });
}
