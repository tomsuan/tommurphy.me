import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Article({ content, data }) {
  if (!data || !data.title) {
    return <div>Article not found</div>;
  }

  return (
    <div className={inter.className} style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <h1 style={{ textAlign: 'center', fontWeight: 600 }}>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  let filenames;
  try {
    filenames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
    console.log('Files in posts directory:', filenames); // Debug: Log files
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return { paths: [], fallback: false };
  }

  const paths = filenames
    .map((filename) => {
      try {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        if (data.link) return null; // Exclude linked articles
        const slug = filename.replace(/\.md$/, '');
        console.log('Generated slug:', slug); // Debug: Log slug
        return { params: { slug } };
      } catch (error) {
        console.error(`Error processing file ${filename}:`, error);
        return null;
      }
    })
    .filter(Boolean);

  console.log('Generated paths:', paths); // Debug: Log paths
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`); // Debug: Log missing file
    return { notFound: true };
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    if (data.link) {
      return {
        redirect: {
          destination: data.link,
          permanent: false,
        },
      };
    }

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    if (!data.title) {
      return { notFound: true };
    }

    return {
      props: {
        data,
        content: contentHtml,
      },
    };
  } catch (error) {
    console.error(`Error processing article ${params.slug}:`, error);
    return { notFound: true };
  }
}