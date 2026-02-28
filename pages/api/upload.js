import matter from 'gray-matter';
import sanitize from 'sanitize-filename';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'tomsuan';
const REPO_NAME = 'tommurphy.me';
const BRANCH = 'main';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = req.headers['x-admin-secret'];
  if (!secret || secret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  const { title, thumbnail, link, content } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const slug = sanitize(
      title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    );
    if (!slug) {
      return res.status(400).json({ error: 'Invalid title for slug' });
    }

    const frontmatter = {
      title,
      date: new Date().toISOString().slice(0, 10),
      thumbnail: thumbnail || '',
      link: link || '',
    };

    const fileContents = matter.stringify(content || '', frontmatter);
    const encoded = Buffer.from(fileContents).toString('base64');
    const filePath = `posts/${slug}.md`;

    // Check if file already exists (needed for update vs create)
    let sha;
    const checkRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );
    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha;
    }

    const body = {
      message: `Add post: ${title}`,
      content: encoded,
      branch: BRANCH,
    };
    if (sha) body.sha = sha;

    const commitRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!commitRes.ok) {
      const err = await commitRes.json();
      return res.status(500).json({ error: err.message || 'GitHub API error' });
    }

    return res.status(200).json({ status: 'ok', slug });
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
}