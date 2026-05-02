import Image from "next/image";
import Link from "next/link";

export default function Card({ post, href, external = false }) {
  const linkProps = external 
    ? { href: href || "#", target: "_blank", rel: "noopener noreferrer" }
    : { href: href };

  return (
    <Link {...linkProps} className="no-underline text-inherit block w-full">
      <div className="card border border-[#e5e5e5] rounded-3xl overflow-hidden bg-white h-full">
        {post.thumbnail && (
          <div className="relative h-[180px]">
            <Image
              src={post.thumbnail}
              alt={post.title || "Untitled"}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="m-0 mb-3 text-[1.1rem] leading-tight font-medium">
            {post.title || "Untitled"}
          </h3>
          {post.date && (
            <p className="text-[#666] text-[0.9rem] m-0">
              {new Date(post.date).toLocaleDateString('en-GB', { dateStyle: 'medium' })}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
