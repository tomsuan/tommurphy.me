// pages/downloads.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
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
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {files.map((f) => (
              <li
                key={f.href}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  padding: '14px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.04)';
                }}
              >
                {f.thumbnail ? (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '12px'
                    }}
                  >
                    <Image
                      src={f.thumbnail}
                      alt={f.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : null}

                <div style={{ fontWeight: 600, fontSize: '18px' }}>{f.title}</div>

                {f.description ? (
                  <p style={{ margin: '8px 0 12px 0', fontSize: '14px', lineHeight: 1.5, color: '#333' }}>
                    {f.description}
                  </p>
                ) : (
                  <div style={{ height: '8px' }} />
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginTop: '8px'
                  }}
                >
                  <div style={{ fontSize: '13px', opacity: 0.7 }}>{f.sizeLabel}</div>

                  <Link href={f.href} legacyBehavior>
                    <a
                      download
                      style={{
                        display: 'inline-block',
                        padding: '10px 14px',
                        borderRadius: '999px',
                        textDecoration: 'none',
                        color: 'white',
                        background: 'black',
                        fontSize: '14px',
                        fontWeight: 600
                      }}
                    >
                      Download
                    </a>
                  </Link>
                </div>
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

    // Optional metadata file: /public/downloads/_meta.json
    let meta = {};
    try {
      const metaPath = path.join(dir, '_meta.json');
      if (fs.existsSync(metaPath)) {
        meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      }
    } catch (e) {
      console.warn('Could not parse _meta.json in /public/downloads:', e);
    }

    const entries = fs.readdirSync(dir);

    // Exclude images from the list of downloadable items
    const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);

    const files = entries
      .filter((name) => name !== '_meta.json')
      .map((name) => {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (!stat.isFile()) return null;

        const ext = path.extname(name).toLowerCase();
        if (IMAGE_EXTS.has(ext)) return null; // don't list images as downloads

        const base = name.replace(/\.[^/.]+$/, '');

        // Detect thumbnail with same base name
        let detectedThumb = null;
        for (const imgExt of IMAGE_EXTS) {
          const candidate = path.join(dir, `${base}${imgExt}`);
          if (fs.existsSync(candidate)) {
            detectedThumb = `/downloads/${base}${imgExt}`;
            break;
          }
        }

        const metaFor = meta[name] || {};
        const title = metaFor.title || name;
        const description = metaFor.description || '';
        const thumbnail = metaFor.thumbnail || detectedThumb || null;

        return {
          name,
          href: `/downloads/${name}`,
          sizeLabel: human(stat.size),
          title,
          description,
          thumbnail
        };
      })
      .filter(Boolean);

    return { props: { files } };
  } catch (error) {
    console.error(error);
    return { props: { files: [] } };
  }
}
