import Image from "next/image";
import Link from "next/link";
import Layout from "../Layout";
import { gridStyle, cardStyle, imageWrapperStyle, titleStyle } from "../styles/layout";
import { getAllPosts } from "../lib/content";

export default function Home({ posts }) {
  return (
    <Layout title="Tom Murphy" description="Notes by Tom Murphy">
      <h2 style={{ fontWeight: 600, marginTop: "40px", marginBottom: "24px" }}>
        Recent Notes
      </h2>

      {posts.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          No notes available yet.
        </p>
      ) : (
        <div style={gridStyle}>
          {posts.slice(0, 4).map((post) => (
            <Link
              key={post.slug}
              href={"/articles/" + post.slug}
              style={{
                textAlign: "center",
                width: "100%",
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <div style={cardStyle} className="card">
                <div style={imageWrapperStyle}>
                  <Image
                    src={post.thumbnail || "/placeholder.png"}
                    alt={`Thumbnail for "${post.title || "Untitled note"}"`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "contain", borderRadius: "8px" }}
                    priority={posts.indexOf(post) < 2}
                  />
                </div>
                <span style={titleStyle} className="card-title">
                  {post.title || "Untitled"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts({ featuredFirst: true }).map((post) => ({
    slug: post.slug,
    title: post.title ?? "Untitled",
    thumbnail: post.thumbnail || null,
  }));

  return { props: { posts } };
}