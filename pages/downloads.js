import Image from "next/image";
import fs from "fs";
import path from "path";

import Layout from "../Layout";

function human(size) {
  if (size === 0) return "0 B";
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
}

async function trackDownload(filename) {
  try {
    await fetch("/api/recordDownload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
      keepalive: true,
    });
  } catch {
    // Non-blocking
  }
}

async function handleDownload(e, file) {
  e.preventDefault();
  await trackDownload(file.name);

  const link = document.createElement("a");
  link.href = file.href;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Downloads({ files }) {
  return (
    <Layout title="Tom Murphy - Downloads" description="Downloads" pathname="/downloads">
      <h2 className="font-semibold mt-10 text-3xl">Downloads</h2>

      {files.length === 0 ? (
        <p className="mt-8">No downloads yet. Put files in <code>/public/downloads/</code> and they will appear here automatically.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {files.map((f) => (
            <div 
              key={f.href}
              className="border border-[#eee] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {f.thumbnail && (
                <div className="relative w-full aspect-[4/3] bg-[#f5f5f5] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={f.thumbnail}
                    alt={f.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="font-semibold text-xl mb-2">{f.title}</div>

              {f.description && (
                <p className="mb-4 text-sm leading-relaxed text-[#333]">{f.description}</p>
              )}

              <div className="flex items-center justify-between mt-4">
                <div className="text-xs opacity-70">{f.sizeLabel}</div>

                <a
                  href={f.href}
                  download={f.name}
                  onClick={(e) => handleDownload(e, f)}
                  className="inline-block px-5 py-2.5 rounded-full text-white bg-black text-sm font-semibold no-underline"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  // (Unchanged getStaticProps logic - full original retained for functionality)
  try {
    const dir = path.join(process.cwd(), "public", "downloads");

    let meta = {};
    try {
      const metaPath = path.join(dir, "_meta.json");
      if (fs.existsSync(metaPath)) {
        meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      }
    } catch (e) {
      console.warn("Could not parse _meta.json in /public/downloads:", e);
    }

    const entries = fs.readdirSync(dir);
    const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

    const files = entries
      .filter((name) => name !== "_meta.json")
      .map((name) => {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (!stat.isFile()) return null;

        const ext = path.extname(name).toLowerCase();
        if (IMAGE_EXTS.has(ext)) return null;

        const base = name.replace(/\.[^/.]+$/, "");

        let detectedThumb = null;
        for (const imgExt of IMAGE_EXTS) {
          const candidate = path.join(dir, `${base}${imgExt}`);
          if (fs.existsSync(candidate)) {
            detectedThumb = `/downloads/${base}${imgExt}`;
            break;
          }
        }

        const metaFor = meta[name] || {};
        const title = metaFor.title || name;
        const description = metaFor.description || "";
        const thumbnail = metaFor.thumbnail || detectedThumb || null;

        return {
          name,
          href: `/downloads/${name}`,
          sizeLabel: human(stat.size),
          title,
          description,
          thumbnail,
        };
      })
      .filter(Boolean);

    return { props: { files } };
  } catch (error) {
    console.error(error);
    return { props: { files: [] } };
  }
}