import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import fs from 'fs';
import path from 'path';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Videos({ posts }) {
  return (
    <div
      className={inter.className}
      style={{ maxWidth: '800px', margin: 'auto', padding: '20px', textAlign: 'center' }}
    >
      <Head>
        <title>Videos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7G6D326KL9"
        strategy="afterInteractive"
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer = window.dataLayer || [];\n" +
            "function gtag(){dataLayer.push(arguments);}\n" +
            "gtag('js', new Date());\n" +
            "gtag('config', 'G-7G6D326KL9');",
        }}
      />

      <h1 style={{ fontWeight: 600 }}>Videos</h1>

      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '40px',
          flexWrap: 'wrap',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
        <Link href="/articles" style={{ textDecoration: 'none', color: 'black' }}>Articles</Link>
        <Link href="/videos" style={{ textDecoration: 'none', color: 'black' }}>Videos</Link>
        <Link href="/photos" style={{ textDecoration: 'none', color: 'black' }}>Photos</Link>
        <Link href="/downloads" style={{ textDecoration: 'none', color: 'black' }}>Downloads</Link>
      </nav>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '30px',
          justifyItems: 'center',
          marginTop: '40px',
        }}
      >
        {posts.map((post, index) => (
          <Link
            key={index}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
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
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                padding: '20px',
                borderRadius: '8px',
              }}
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
              <span
                style={{
                  display: 'block',
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
  );
}

export async function getStaticProps() {
  const videosDir = path.join(process.cwd(), 'public', 'videos');
  const VIDEO_EXTS = ['.mp4', '.webm', '.mov'];

  let posts = [];

  try {
    const files = fs.readdirSync(videosDir);

    posts = files
      .filter((file) =>
        VIDEO_EXTS.includes(path.extname(file).toLowerCase())
      )
      .map((file) => {
        const fullPath = path.join(videosDir, file);
        const stat = fs.statSync(fullPath);
        const base = file.replace(/\.[^/.]+$/, '');

        return {
          title: base,
          link: `/videos/${file}`,
          date: stat.mtime.getTime(),
        };
      })
      .sort((a, b) => b.date - a.date);
  } catch {
    posts = [];
  }

  return { props: { posts } };
}
