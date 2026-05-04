'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState([]);

  // Load posts once on client
  useEffect(() => {
    fetch('/api/posts') // We will create a simple API route or use static data
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  useEffect(() => {
    if (!query.trim() || posts.length === 0) {
      setResults([]);
      return;
    }

    const filtered = posts
      .filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8);

    setResults(filtered);
  }, [query, posts]);

  return (
    <div className="relative w-full max-w-md mx-auto my-8">
      <input
        type="text"
        placeholder="Search notes and articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-5 py-3 border border-[#ddd] rounded-2xl text-sm focus:outline-none focus:border-black bg-white"
      />
      
      {results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-[#eee] rounded-2xl shadow-lg max-h-[320px] overflow-auto">
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/articles/${post.slug}`}
              className="block px-5 py-3 hover:bg-gray-50 border-b border-[#eee] last:border-none"
              onClick={() => setQuery('')}
            >
              {post.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}