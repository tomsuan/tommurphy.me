import Head from 'next/head';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Photos() {
  return (
    <div className={inter.className} style={{ maxWidth: '800px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <Head>
        <title>Photos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ fontWeight: 600 }}>Photos</h1>
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
      <p style={{ marginTop: '40px' }}>Photo gallery coming soon.</p>
    </div>
  );
}