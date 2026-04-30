import Image from "next/image";
import Link from "next/link";
import Layout from "../Layout";
import { getAllPosts } from "../lib/content";

export default function Home({ posts }) {
  return (
    <Layout 
      title="Tom Murphy" 
      description="Notes and thoughts by Tom Murphy on technology, AI, and life."
    >
      <h2 style={{ 
        fontSize: "1.75rem", 
        fontWeight: 600, 
        marginBottom: "2rem",
        textAlign: "left"
      }}>
        Recent Notes
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "2rem"
      }}>
        {posts.slice(0, 6).map((post) => (
          <Link
            key={post.slug}
            href={`/articles/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#fff",
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              {post.thumbnail && (
                <div style={{ position: "relative", height: "180px" }}>
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ 
                  margin: "0 0 0.75rem 0", 
                  fontSize: "1.1rem",
                  lineHeight: "1.3"
                }}>
                  {post.title}
                </h3>
                {post.date && (
                  <p style={{ color: "#666", fontSize: "0.9rem", margin: 0 }}>
                    {new Date(post.date).toLocaleDateString('en-GB', { dateStyle: 'medium' })}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title ?? "Untitled",
    thumbnail: post.thumbnail,
    date: post.date,
  }));

  return { props: { posts } };
}