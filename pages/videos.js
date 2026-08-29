import Layout from "../Layout";
import { getAllVideos } from "../lib/videos";
import Card from "../components/Card";

export default function Videos({ videos }) {
  return (
    <Layout
      title="Videos — Tom Murphy"
      description="Videos on YouTube"
      pathname="/videos"
    >
      <h2 className="font-semibold mt-10 text-3xl">
        Videos
      </h2>

      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card
              key={video.slug}
              post={video}
              href={video.link || "https://www.youtube.com/@tomsexplorations"}
              external={true}
            />
          ))}
        </div>
      </div>

      <p className="mt-12 text-[#666] text-center">
        All my videos are published on{" "}
        <a
          href="https://www.youtube.com/@tomsexplorations"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0066cc] hover:underline"
        >
          YouTube
        </a>.
      </p>
    </Layout>
  );
}

export async function getStaticProps() {
  const videos = getAllVideos();

  return {
    props: {
      videos,
    },
  };
}