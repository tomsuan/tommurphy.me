import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ posts }) {
  return (
    <div className={inter.className} style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <Head>
        <title>Tom Murphy - Notes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ textAlign: 'center', fontWeight: '600' }}>Tom Murphy - Notes</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '30px', 
        justifyItems: 'center' 
      }}>
        {posts.map((post, index) => (
          <div key={index} style={{ textAlign: 'center', width: '100%' }}>
            <a href={post.link} target="_blank" rel="noopener noreferrer" 
               style={{ display: 'block', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'scale(1.05)';
                 e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'scale(1)';
                 e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
               }}>
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 3', // Enforce a consistent aspect ratio (adjust as needed)
                backgroundColor: '#f0f0f0', // Optional: Add a background color for empty space
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              }}>
                <Image 
                  src={post.thumbnail} 
                  alt={post.title} 
                  layout="fill" // Use fill to make the image scale within the container
                  objectFit="contain" // Preserve aspect ratio, centering the image
                  style={{ borderRadius: '8px' }} 
                />
              </div>
            </a>
            <a href={post.link} target="_blank" rel="noopener noreferrer" 
               style={{ display: 'block', marginTop: '10px', fontSize: '18px', textDecoration: 'none', color: 'black', transition: 'color 0.3s ease, transform 0.3s ease' }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.color = '#555';
                 e.currentTarget.style.transform = 'translateY(-2px)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.color = 'black';
                 e.currentTarget.style.transform = 'translateY(0)';
               }}>
              {post.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      link: data.link,
      date: new Date(data.date).getTime(),
    };
  });

  // Sort posts in reverse chronological order (newest first)
  posts.sort((a, b) => b.date - a.date);

  return {
    props: { posts },
  };
}