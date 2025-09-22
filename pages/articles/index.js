import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Articles({ posts }) {
  return (
    <div className={inter.className} style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <Head>
        <title>Tom Murphy - Articles</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ textAlign: 'center', fontWeight: 600 }}>Tom Murphy - Articles</h1>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>
          Home
        </Link>
        <Link href="/articles" style={{ textDecoration: 'none', color: 'black' }}>
          Articles
        </Link>
        <Link href="/videos" style={{ textDecoration: 'none', color: 'black' }}>
          Videos
        </Link>
        <Link href="/photos" style={{ textDecoration: 'none', color: 'black' }}>
          Photos
        </Link>
        
      </nav>
      <div style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px', justifyItems: 'center' }}>
          {posts.map((post, index) => (
            <Link
              key={index}
              href={post.link || `/articles/${post.slug}`}
              {...(post.link ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              style={{
                textAlign: 'center',
                width: '100%',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4 / 3',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <Image
                    src={post.thumbnail || '/placeholder.png'}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'contain', borderRadius: '8px' }}
                  />
                </div>
                <span
                  style={{
                    display: 'block',
                    marginTop: '10px',
                    fontSize: '18px',
                    color: 'black',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#555';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'black';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {post.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  let filenames;
  try {
    filenames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return { props: { posts: [] } };
  }

  const posts = filenames
    .map((filename) => {
      try {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        const slug = filename.replace(/\.md$/, '');
        return {
          title: data.title ?? 'Untitled',
          thumbnail: data.thumbnail || null,
          link: data.link || null,
          date: data.date ? new Date(data.date).getTime() : 0,
          slug,
        };
      } catch (error) {
        console.error(`Error processing file ${filename}:`, error);
        return null;
      }
    })
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => b.date - a.date);

  return { props: { posts } };
}