import Image from "next/image";
import Link from "next/link";

import Layout from "../../Layout";
import { getAllPosts } from "../../lib/content";

export default function Articles({ posts }) {
  return (
    <Layout title="Tom Murphy - Articles" description="Articles">
      <h2 style={{ fontWeight: 600, marginTop: "40px" }}>Articles</h2>

      <div style={{ marginTop: "40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "30px",
            justifyItems: "center",
          }}
        >
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={post.link || `/articles/${post.slug}`}
              {...(post.link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                textAlign: "center",
                width: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.05)";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Image
                    src={post.thumbnail || "/placeholder.png"}
                    alt={post.title || "Untitled"}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "contain", borderRadius: "8px" }}
                  />
                </div>

                <span
                  style={{
                    display: "block",
                    marginTop: "10px",
                    fontSize: "18px",
                    color: "black",
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#555";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "black";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {post.title || "Untitled"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title ?? "Untitled",
    thumbnail: post.thumbnail || null,
    link: post.link || null,
  }));

  return { props: { posts } };
}