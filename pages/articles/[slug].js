import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import Layout from '../../Layout';

export default function Article({ title, content }) {
  return (
    <Layout>
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
  const postsDirectory = path.join(process.cwd(), 'posts');

  const filenames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'));

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);

  return {
    props: {
      title: data.title ?? 'Untitled',
      content: processedContent.toString(),
    },
  };
}
