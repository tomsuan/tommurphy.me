import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import Layout from '../Layout';

import {
  gridStyle,
  cardStyle,
  imageWrapperStyle,
  titleStyle,
} from '../styles/layout';

export default function Home({ posts }) {
  return (
    <Layout>
      <h2 style={{ fontWeight: 600, marginTop: '40px' }}>Recent Notes</h2>

      <div style={gridStyle}>
        {posts.slice(0, 4).map((post) => (
          <Link
            key={post.slug}
            href={post.link || `/articles/${post.slug}`}
            {...(post.link
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            style={{
              textAlign: 'center',
              width: '100%',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow =
                  '0 8px 16px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 4px 8px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div style={imageWrapperStyle}>
                <Image
                  src={post.thumbnail || '/placeholder.png'}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'contain', borderRadius: '8px' }}
                />
              </div>

              <span
                style={titleStyle}
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
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');

  let filenames;
  try {
    filenames = fs
      .readdirSync(postsDirectory)
      .filter((file) => file.endsWith('.md'));
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
