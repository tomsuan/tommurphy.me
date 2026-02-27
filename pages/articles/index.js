import Image from "next/image";
import Link from "next/link";
import Layout from "../../Layout";
import { gridStyle, cardStyle, imageWrapperStyle, titleStyle } from "../../styles/layout";
import { getAllPosts } from "../../lib/content";

async function trackClick(title, url) {
  try {
    await fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, url }) });
  } catch {}
}

export default function Articles({ posts }) {
  return (
    <Layout title="Tom Murphy - Articles" description="Articles">
      <h2 style={{ fontWeight: 600, marginTop: "40px" }}>Articles</h2>
      <div style={{ marginTop: "40px" }}>
        <div style={gridStyle}>
          {posts.map((post) => (
            <Link key={post.slug} href={post.link || "/articles/" + post.slug} {...(post.link ? { target: "_blank", rel: "noopener noreferrer" } : {})} onClick={() => { if (post.link) trackClick(post.title, post.link); }} style={{ textAlign: "center", width: "100%", textDecoration: "none", color: "inherit" }}>
              <div style={cardStyle} onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)"; }}>
                <div style={imageWrapperStyle}>
                  <Image src={post.thumbnail || "/placeholder.png"} alt={post.title || "Untitled"} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "contain", borderRadius: "8px" }} />
                </div>
                <span style={titleStyle} onMouseEnter={(e) => { e.currentTarget.style.color = "#555"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "black"; e.currentTarget.style.transform = "translateY(0)"; }}>
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
  const posts = getAllPosts().map((post) => ({ slug: post.slug, title: post.title ?? "Untitled", thumbnail: post.thumbnail || null, link: post.link || null }));
  return { props: { posts } };
}