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
    // Non-blocking — never interrupt the download
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
    <Layout title="Tom Murphy - Downloads" description="Downloads">
      <h2 style={{ fontWeight: 600, marginTop: "40px" }}>Downloads</h2>

      {files.length === 0 ? (
        <p>
          No downloads yet. Put files in <code>/public/downloads/</code> and they will appear here automatically.
        </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "40px 0 0 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {files.map((f) => (
            <li
              key={f.href}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "14px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.04)";
              }}
            >
              {f.thumbnail ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "12px",
                  }}
                >
                  <Image
                    src={f.thumbnail}
                    alt={f.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : null}

              <div style={{ fontWeight: 600, fontSize: "18px" }}>{f.title}</div>

              {f.description ? (
                <p style={{ margin: "8px 0 12px 0", fontSize: "14px", lineHeight: 1.5, color: "#333" }}>
                  {f.description}
                </p>
              ) : (
                <div style={{ height: "8px" }} />
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  marginTop: "8px",
                }}
              >
                <div style={{ fontSize: "13px", opacity: 0.7 }}>{f.sizeLabel}</div>

                <a
                  href={f.href}
                  download={f.name}
                  onClick={(e) => handleDownload(e, f)}
                  style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    color: "white",
                    background: "black",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
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