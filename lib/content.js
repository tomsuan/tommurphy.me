import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

function warn(slug, message) {
  // Soft validation only: warnings, never throws.
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

function toBool(value) {
  return value === true;
}

function dateToMillis(dateStr) {
  if (!dateStr) return null;
  const t = new Date(dateStr).getTime();
  return Number.isNaN(t) ? null : t;
}

/**
 * getAllPosts(options)
 * - includeDrafts: default false
 * - featuredFirst: default false (only homepage will turn this on)
 */
export function getAllPosts(options = {}) {
  const includeDrafts = options.includeDrafts === true;
  const featuredFirst = options.featuredFirst === true;

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
        typeof data?.link === "string" && data.link.trim()
          ? data.link.trim()
          : null;

      const draft = toBool(data?.draft);
      const featured = toBool(data?.featured);

      // Spread `data` first so validated/computed fields win.
      return {
        ...(data && typeof data === "object" ? data : {}),
        slug,
        title,
        date,
        thumbnail,
        link,
        draft,
        featured,
      };
    })
    .filter((post) => includeDrafts || post.draft !== true);

  // Single comparator:
  // - If featuredFirst: featured posts first.
  // - Always: newest dates first; missing/invalid dates go last.
  posts.sort((a, b) => {
    if (featuredFirst) {
      const af = a.featured === true ? 1 : 0;
      const bf = b.featured === true ? 1 : 0;
      if (af !== bf) return bf - af;
    }

    const at = dateToMillis(a.date);
    const bt = dateToMillis(b.date);

    if (at === null && bt === null) return 0;
    if (at === null) return 1;
    if (bt === null) return -1;

    return bt - at;
  });

  return posts;
}

export function getAllPostSlugs(options = {}) {
  const includeDrafts = options.includeDrafts === true;

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""))
    .filter((slug) => {
      if (includeDrafts) return true;
      try {
        const post = getPostBySlug(slug);
        return post.data?.draft !== true;
      } catch {
        warn(slug, "could not read file, excluding from slugs");
        return false;
      }
    });
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