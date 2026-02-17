import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

function warn(slug, message) {
  // Soft validation only: warnings, never throws.
  // Keep it obvious in build logs.
  console.warn(`[posts] ${slug}: ${message}`);
}

function normaliseDate(slug, dateValue) {
  if (!dateValue) {
    warn(slug, "missing date");
    return null;
  }

  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) {
    warn(slug, `invalid date: ${JSON.stringify(dateValue)}`);
    return null;
  }

  return d.toISOString().slice(0, 10);
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      if (!data || typeof data !== "object") {
        warn(slug, "missing or invalid frontmatter");
      }

      const title =
        typeof data?.title === "string" && data.title.trim()
          ? data.title.trim()
          : (warn(slug, "missing title"), "Untitled");

      const date = normaliseDate(slug, data?.date);

      const thumbnail =
        typeof data?.thumbnail === "string" && data.thumbnail.trim()
          ? data.thumbnail.trim()
          : null;

      const link =
        typeof data?.link === "string" && data.link.trim() ? data.link.trim() : null;

      return {
        slug,
        title,
        date,
        thumbnail,
        link,
        ...data,
      };
    });

  // Sort newest first; posts with invalid/missing dates go last.
  return posts.sort((a, b) => {
    const at = a.date ? new Date(a.date).getTime() : -Infinity;
    const bt = b.date ? new Date(b.date).getTime() : -Infinity;
    return bt - at;
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  if (!data || typeof data !== "object") {
    warn(slug, "missing or invalid frontmatter");
  }

  if (!data?.title) warn(slug, "missing title");
  if (!data?.date) warn(slug, "missing date");

  return { slug, data, content };
}
