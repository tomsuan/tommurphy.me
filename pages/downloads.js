// pages/downloads.js
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function human(size) {
  if (size === 0) return '0 B';
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export default function Downloads({ files }) {
  return (
    <div className={inter.className} style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <Head>
        <title>Tom Murphy - Downloads</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 style={{ textAlign: 'center', fontWeight: 600 }}>Downloads</h1>

      {/* SAME NAV STYLE */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
        <Link href="/articles" style={{ textDecoration: 'none', color: 'black' }}>Articles</Link>
        <Link href="/videos" style={{ textDecoration: 'none', color: 'black' }}>Videos</Link>
        <Link href="/photos" style={{ textDecoration: 'none', color: 'black' }}>Photos</Link>
        <Link href="/downloads" style={{ textDecoration: 'none', color: 'black' }}>Downloads</Link>
      </nav>

      <main style={{ marginTop: '40px' }}>
        {files.length === 0 ? (
          <p>No downloads yet. Put files in <code>/public/downloads/</code> and they will appear here automatically.</p>
        ) : (
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px'
          }}>
            {files.map((f) => (
              <li key={f.href} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '12px' }}>
                <Link href={f.href} legacyBehavior>
                  <a download style={{ textDecoration: 'none', color: 'black' }}>
                    <div style={{ fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontSize: '14px', opacity: 0.7, marginTop: '4px' }}>{f.sizeLabel}</div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const dir = path.join(process.cwd(), 'public', 'downloads');
    const entries = fs.readdirSync(dir);
    const files = entries
      .map((name) => {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (!stat.isFile()) return null;
        return { name, href: `/downloads/${name}`, sizeLabel: human(stat.size) };
      })
      .filter(Boolean);
    return { props: { files } };
  } catch (error) {
    console.error(error);
    return { props: { files: [] } };
  }
}