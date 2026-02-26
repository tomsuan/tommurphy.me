import Image from "next/image";
import Link from "next/link";

import Layout from "../../Layout";
import { gridStyle, cardStyle, imageWrapperStyle, titleStyle } from "../../styles/layout";
import { getAllPosts } from "../../lib/content";

export default function Articles({ posts }) {
  return (
    <Layout title="Tom Murphy - Articles" description="Articles">
      <h2 style={{ fontWeight: 600, marginTop: "40px" }}>Articles</h2>

      <div style={{ marginTop: "40px" }}>
        <div style={gridStyle}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={post.link || `/articles/${post.slug}`}
              {...(post.link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{ textAlign: "center", width: "100%" }}
            >
              <div className="card" style={cardStyle}>
                <div style={imageWrapperStyle}>
                  <Image
                    src={post.thumbnail || "/placeholder.png"}
                    alt={post.title || "Untitled"}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "contain", borderRadius: "8px" }}
                  />
                </div>

                <span className="card-title" style={titleStyle}>
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