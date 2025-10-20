import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Admin() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      title: form.get('title')?.trim(),
      thumbnail: form.get('thumbnail')?.trim() || '',
      link: form.get('link')?.trim() || '',
      content: form.get('content')?.trim() || '',
    };

    if (!payload.title) {
      setStatus('Error: Title is required');
      return;
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('Saved successfully');
        e.target.reset();
      } else {
        const error = await res.json();
        setStatus(`Error: ${error.error || 'Failed to save'}`);
      }
    } catch (error) {
      setStatus('Error: Network issue');
    }
  };

  return (
    <div className={inter.className} style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ textAlign: 'center', fontWeight: 600 }}>Admin</h1>
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
        <Link href="/downloads" style={{ textDecoration: 'none', color: 'black' }}>
          Downloads
        </Link>
        <Link href="/admin" style={{ textDecoration: 'none', color: 'black' }}>
          Admin
        </Link>
      </nav>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '40px' }}>
        <input name="title" placeholder="Title" required />
        <input name="thumbnail" placeholder="Thumbnail URL" />
        <input name="link" placeholder="Substack Link (optional)" />
        <textarea name="content" placeholder="Markdown content" rows={10} />
        <button type="submit">Save</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
