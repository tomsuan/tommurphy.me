import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sanitize from 'sanitize-filename';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, thumbnail, link, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const slug = sanitize(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    if (!slug) {
      return res.status(400).json({ error: 'Invalid title for slug' });
    }

    const postsDir = path.join(process.cwd(), 'posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    const filePath = path.join(postsDir, `${slug}.md`);
    const data = {
      title,
      date: new Date().toISOString(),
      thumbnail: thumbnail || '',
      link: link || '',
    };

    const fileContents = matter.stringify(content || '', data);
    fs.writeFileSync(filePath, fileContents);
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
}