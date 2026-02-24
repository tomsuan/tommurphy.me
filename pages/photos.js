import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

import Layout from "../Layout";

export default function Photos({ posts }) {
  return (
    <Layout title="Tom Murphy - Photos" description="Photos">
      <h2 style={{ fontWeight: 600, marginTop: "40px" }}>Photos</h2>

      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "30px",
          justifyItems: "center",
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
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
                  src={post.thumbnail}
                  alt={post.title}
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
                {post.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const photosDir = path.join(process.cwd(), "public", "photos");
  const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

  let posts = [];

  try {
    const files = fs.readdirSync(photosDir);

    posts = files
      .filter((file) => IMAGE_EXTS.includes(path.extname(file).toLowerCase()))
      .map((file) => {
        const fullPath = path.join(photosDir, file);
        const stat = fs.statSync(fullPath);
        const base = file.replace(/\.[^/.]+$/, "");

        return {
          title: base,
          thumbnail: `/photos/${file}`,
          link: `/photos/${file}`,
          date: stat.mtime.getTime(),
          slug: base,
        };
      })
      .sort((a, b) => b.date - a.date);
  } catch {
    posts = [];
  }

  return { props: { posts } };
}