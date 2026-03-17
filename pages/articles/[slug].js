import { remark } from "remark";
import html from "remark-html";
import Layout from "../../Layout";
import { getAllPostSlugs, getPostBySlug } from "../../lib/content";

export default function Article({ title, date, content }) {
  return (
    <Layout title={title} description={title}>
      <article style={{ maxWidth: "760px", margin: "40px auto", lineHeight: 1.7 }}>
        <h1 style={{ fontWeight: 600, marginBottom: "12px" }}>{title}</h1>

        {date ? (
          <p style={{ color: "#666", marginBottom: "32px" }}>{date}</p>
        ) : null}

        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);

  const processedContent = await remark()
    .use(html)
    .process(post.content);

  return {
    props: {
      title: post.data.title ?? "Untitled",
      date: post.data.date ?? null,
      content: processedContent.toString(),
    },
  };
}