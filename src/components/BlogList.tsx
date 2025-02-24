import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  date: string;
  url: string;
  description?: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mb-12"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-4 py-4 border-t border-gray-100">
            <div className="h-6 w-3/4 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light mb-12 tracking-tight">Essays</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <a 
            key={post.id}
            href={post.url}
            className="group block"
          >
            <article className="flex justify-between items-center py-4 border-t border-gray-100">
              <div>
                <h2 className="text-lg font-light group-hover:text-blue-50">{post.title}</h2>
                <time className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <ArrowUpRight 
                className="text-gray-300 group-hover:text-blue-50 transition-colors" 
                size={20} 
              />
            </article>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BlogList;