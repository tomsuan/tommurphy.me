import { useEffect } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import Layout from '../../Layout';
import { getAllPostSlugs, getPostBySlug } from '../../lib/content';

export default function Article({ title, content, slug }) {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url: `/articles/${slug}` }),
    }).catch(() => {});
  }, [slug, title]);

  return (
    <Layout title={`${title} - Tom Murphy`}>
      <article style={{ marginTop: '40px', textAlign: 'left' }}>
        <h2 style={{ fontWeight: 600 }}>{title}</h2>
        <div
          style={{ marginTop: '30px', lineHeight: '1.6' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
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
      slug: params.slug,
      title: post.data.title ?? 'Untitled',
      content: processedContent.toString(),
    },
  };
}N