import Layout from "../Layout";
import { getAllPosts } from "../lib/content";
import Card from "../components/Card";

export default function Home({ posts }) {
  return (
    <Layout 
      title="Tom Murphy" 
      description="Notes and thoughts by Tom Murphy on technology, AI, and life."
      pathname="/"
    >
      <h2 className="text-[1.75rem] font-semibold mb-8 text-left">
        Recent Notes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, 6).map((post) => (
          <Card 
            key={post.slug}
            post={post}
            href={`/articles/${post.slug}`}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title ?? "Untitled",
    thumbnail: post.thumbnail,
    date: post.date,
  }));

  return { props: { posts } };
}