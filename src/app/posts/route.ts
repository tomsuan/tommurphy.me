import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL('https://tomsuan.substack.com/feed');  // Replace with your Substack URL
    
    const posts = feed.items.map(item => ({
      id: item.guid,
      title: item.title,
      date: item.pubDate,
      url: item.link,
      description: item.contentSnippet
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}