import Link from "next/link";
import fs from "fs";
import path from "path";

import Layout from "../Layout";

export default function Videos({ posts }) {
  return (
    <Layout title="Tom Murphy - Videos" description="Videos" pathname="/videos">
      <h2 className="font-semibold mt-10 text-3xl">Videos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-items-center">
        {posts.map((post) => (
          <Link
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center w-full no-underline text-inherit block p-5 rounded-3xl hover:bg-gray-50 transition-all"
          >
            <span className="block text-xl font-medium text-black hover:text-[#555] transition-colors">
              {post.title}
            </span>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Original getStaticProps unchanged
  const videosDir = path.join(process.cwd(), "public", "videos");
  const VIDEO_EXTS = [".mp4", ".webm", ".mov"];

  let posts = [];

  try {
    const files = fs.readdirSync(videosDir);

    posts = files
      .filter((file) => VIDEO_EXTS.includes(path.extname(file).toLowerCase()))
      .map((file) => {
        const fullPath = path.join(videosDir, file);
        const stat = fs.statSync(fullPath);
        const base = file.replace(/\.[^/.]+$/, "");

        return {
          title: base,
          link: `/videos/${file}`,
          date: stat.mtime.getTime(),
        };
      })
      .sort((a, b) => b.date - a.date);
  } catch {
    posts = [];
  }

  return { props: { posts } };
}