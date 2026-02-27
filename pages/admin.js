import { useState } from "react";
import Layout from "../Layout";

export default function Admin() {
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("hosted"); // "hosted" or "substack"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const payload = {
      title: form.get("title")?.trim(),
      thumbnail: form.get("thumbnail")?.trim() || "",
      link: mode === "substack" ? form.get("link")?.trim() || "" : "",
      content: mode === "hosted" ? form.get("content")?.trim() || "" : "",
    };

    if (!payload.title) {
      setStatus("Error: Title is required");
      return;
    }

    if (mode === "substack" && !payload.link) {
      setStatus("Error: Substack link is required");
      return;
    }

    if (mode === "hosted" && !payload.content) {
      setStatus("Error: Content is required for hosted articles");
      return;
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("Saved successfully");
        e.target.reset();
      } else {
        let msg = "Failed to save";
        try {
          const error = await res.json();
          msg = error?.error || msg;
        } catch {}
        setStatus(`Error: ${msg}`);
      }
    } catch {
      setStatus("Error: Network issue");
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
  };

  const toggleBtnStyle = (active) => ({
    padding: "10px 24px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    background: active ? "black" : "white",
    color: active ? "white" : "black",
  });

  return (
    <Layout title="Tom Murphy - Admin" description="Admin">
      <h2 style={{ fontWeight: 600, marginTop: "40px" }}>Admin</h2>

      <div style={{ display: "flex", gap: "12px", marginTop: "40px" }}>
        <button style={toggleBtnStyle(mode === "hosted")} onClick={() => setMode("hosted")}>
          Host on Site
        </button>
        <button style={toggleBtnStyle(mode === "substack")} onClick={() => setMode("substack")}>
          Link to Substack
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "24px",
          maxWidth: "600px",
        }}
      >
        <input name="title" placeholder="Title" required style={inputStyle} />
        <input name="thumbnail" placeholder="Thumbnail URL (optional)" style={inputStyle} />

        {mode === "substack" && (
          <input name="link" placeholder="Substack URL" required style={inputStyle} />
        )}

        {mode === "hosted" && (
          <textarea
            name="content"
            placeholder="Write your article here in Markdown..."
            rows={16}
            required
            style={{ ...inputStyle, lineHeight: "1.6", fontFamily: "monospace" }}
          />
        )}

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            background: "black",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </form>

      {status ? (
        <p style={{ marginTop: "16px", color: status.startsWith("Error") ? "red" : "green" }}>
          {status}
        </p>
      ) : null}
    </Layout>
  );
}