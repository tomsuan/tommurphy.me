import Head from 'next/head';
import Link from 'next/link';
import { inter } from '../lib/fonts';

export default function Downloads() {
  return (
    <div
      className={inter.className}
      style={{ maxWidth: '800px', margin: 'auto', padding: '20px', textAlign: 'center' }}
    >
      <Head>
        <title>Downloads</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ fontWeight: 600 }}>Downloads</h1>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '40px',
          flexWrap: 'wrap',
        }}>
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
        <Link href="/downloads" style={{ textDecoration: 'none', color: 'black' }}>
          Downloads
        </Link>
      </nav>
      <p style={{ marginTop: '40px' }}>
        Enjoy my free eBook. The download will work as soon as the PDF is in place.
      </p>
      <div style={{ marginTop: '40px' }}>
        <a
          href="/tom-murphy-ebook.pdf"
          download
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 24px',
            borderRadius: '6px',
            backgroundColor: 'black',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Download the eBook
        </a>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
          When your PDF is ready, place it in <code>public/</code> and name it <code>tom-murphy-ebook.pdf</code>.
        </p>
      </div>
    </div>
  );
}
