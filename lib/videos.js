import fs from "fs";
import path from "path";
import matter from "gray-matter";

const videosDirectory = path.join(process.cwd(), "videos");

export function getAllVideos() {
  const fileNames = fs.readdirSync(videosDirectory);

  const videos = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/.md$/, "");
      const fullPath = path.join(videosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return { slug, ...data };
    });

  return videos.sort((a, b) => new Date(b.date) - new Date(a.date));
}