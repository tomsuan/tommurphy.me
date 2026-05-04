import { getAllPosts } from '../../lib/content';

export default function handler(req, res) {
  const posts = getAllPosts().map(p => ({
    slug: p.slug,
    title: p.title
  }));
  res.status(200).json(posts);
}