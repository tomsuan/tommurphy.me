import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts({ featuredFirst = false } = {}) {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        ...data,
      };
    });

  const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (featuredFirst) {
    return [
      ...sorted.filter((p) => p.featured === true),
      ...sorted.filter((p) => p.featured !== true),
    ];
  }

  return sorted;
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    ...data,
    content,
  };
}
```

**What changed:** `getAllPosts()` now accepts `{ featuredFirst: true }` properly. If a post has `featured: true` in its frontmatter it will appear first, otherwise everything sorts by date as before.

To mark a post as featured, just add this to its frontmatter:
```
featured: true