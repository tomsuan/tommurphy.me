Now let's update your `src/app/page.tsx` with this complete code:

```typescript
import Image from 'next/image'
import { useState, useEffect } from 'react'

const convertFeedToJSON = (xml: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const items = doc.querySelectorAll('item')
  
  return Array.from(items).map(item => ({
    title: item.querySelector('title')?.textContent || '',
    excerpt: item.querySelector('description')?.textContent || '',
    date: new Date(item.querySelector('pubDate')?.textContent || '').toLocaleDateString(),
    link: item.querySelector('link')?.textContent || ''
  }))
}

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/substack-feed')
      .then(res => res.text())
      .then(xml => {
        const posts = convertFeedToJSON(xml)
        setPosts(posts)
      })
  }, [])

  return (
    <main className="min-h-screen bg-white px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto">
        <header className="mb-16">
          <div className="mb-8">
            <Image 
              src="/TomIcon.ico"
              alt="Tom Murphy Logo"
              width={160}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </div>
          <h1 className="text-4xl font-extralight tracking-tight text-gray-900 mb-3">Tom Murphy</h1>
          <p className="text-lg text-gray-600 font-light">Thoughts on AI, entrepreneurship, and innovation</p>
        </header>

        <section className="space-y-12">
          {posts.map((post) => (
            <article 
              key={post.title}
              onClick={() => window.location.href = post.link}
              className="group cursor-pointer"
            >
              <h2 className="text-2xl font-light text-gray-900 mb-2 group-hover:text-gray-600 transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-3 font-light">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-light">{post.date}</span>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-100">
          <p className="text-center text-gray-500 text-sm font-light">
            © 2024 Tom Murphy • AI & Entrepreneurship
          </p>
        </footer>
      </div>
    </main>
  )
}
```
