import { useEffect } from "react";
import { getAllPostSlugs, getPostBySlug } from "../../lib/content";
import Layout from "../../Layout";

export default function Article({ post }) {
  useEffect(() => {
    if (post?.link) {
      window.location.href = post.link;
    }
  }, [post]);

  return (
    <Layout title="Redirecting...">
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <p>Redirecting to Substack...</p>
        {post?.link && (
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            Click here if not redirected
          </a>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return { props: { post } };
}