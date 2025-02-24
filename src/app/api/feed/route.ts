import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser()

export async function GET() {
  try {
    console.log('Attempting to fetch feed from Substack')
    const feed = await parser.parseURL('https://tommurphy888.substack.com/feed')
    console.log('Feed fetched successfully:', feed.items?.length, 'items')
    return NextResponse.json(feed)
  } catch (error) {
    console.error('Error fetching feed:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch feed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
