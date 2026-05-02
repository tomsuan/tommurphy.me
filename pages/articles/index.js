import Layout from "../../Layout";
import { getAllPosts } from "../../lib/content";
import Card from "../../components/Card";

export default function Articles({ posts }) {
  return (
    <Layout 
      title="Articles — Tom Murphy" 
      description="All my writing on Substack"
      pathname="/articles"
    >
      <h2 className="font-semibold mt-10 text-3xl">
        All Articles
      </h2>

      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card 
              key={post.slug}
              post={post}
              href={post.link || "https://tommurphy.substack.com"}
              external={true}
            />
          ))}
        </div>
      </div>

      <p className="mt-12 text-[#666] text-center">
        All my writing is published on{" "}
        <a 
          href="https://tommurphy.substack.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#0066cc] hover:underline"
        >
          my Substack
        </a>.
      </p>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
