import redis from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Title and URL are required' });
  }

  const timestamp = new Date().toISOString();
  const event = JSON.stringify({ title, url, timestamp });

  await redis.lpush('events:clicks', event);

  return res.status(200).json({ success: true });
}