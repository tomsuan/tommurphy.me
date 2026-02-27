import redis from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = req.headers['x-admin-secret'];
  if (!secret || secret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  try {
    const [rawDownloads, rawClicks] = await Promise.all([
      redis.lrange('events:downloads', 0, -1),
      redis.lrange('events:clicks', 0, -1),
    ]);

    const downloads = rawDownloads.map((e) => (typeof e === 'string' ? JSON.parse(e) : e));
    const clicks = rawClicks.map((e) => (typeof e === 'string' ? JSON.parse(e) : e));

    return res.status(200).json({ downloads, clicks });
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
}