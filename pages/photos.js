import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

import Layout from "../Layout";

export default function Photos({ posts }) {
  return (
    <Layout title="Tom Murphy - Photos" description="Photos" pathname="/photos">
      <h2 className="font-semibold mt-10 text-3xl">Photos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-items-center">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center w-full no-underline text-inherit block"
          >
            <div className="transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-3xl overflow-hidden">
              <div className="relative w-full aspect-[4/3] bg-[#f0f0f0] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain rounded-2xl"
                />
              </div>

              <span className="block mt-4 text-xl font-medium text-black hover:text-[#555] transition-colors">
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
  // Original getStaticProps unchanged for functionality
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