import Image from "next/image";
import Layout from "../../Layout";
import { gridStyle, cardStyle, imageWrapperStyle, titleStyle } from "../../styles/layout";
import { getAllPosts } from "../../lib/content";

export default function Articles({ posts }) {
  return (
    <Layout title="Articles — Tom Murphy" description="All my writing on Substack">
      <h2 style={{ fontWeight: 600, marginTop: "40px", fontSize: "2rem" }}>
        All Articles
      </h2>

      <div style={{ marginTop: "40px" }}>
        <div style={gridStyle}>
          {posts.map((post) => (
            <a
              key={post.slug}
              href={post.link || "https://tommurphy.substack.com"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit", width: "100%" }}
            >
              <div style={cardStyle}>
                <div style={imageWrapperStyle}>
                  <Image
                    src={post.thumbnail || "/placeholder.png"}
                    alt={post.title || "Untitled"}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>
                <span style={titleStyle}>
                  {post.title || "Untitled"}
                </span>
                {post.date && (
                  <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "8px" }}>
                    {new Date(post.date).toLocaleDateString('en-GB')}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      <p style={{ marginTop: "3rem", color: "#666", textAlign: "center" }}>
        All my writing is published on <a href="https://tommurphy.substack.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0066cc" }}>my Substack</a>.
      </p>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}