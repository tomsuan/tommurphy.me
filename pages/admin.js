import { useState } from "react";

import Layout from "../Layout";

export default function Admin() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const payload = {
      title: form.get("title")?.trim(),
      thumbnail: form.get("thumbnail")?.trim() || "",
      link: form.get("link")?.trim() || "",
      content: form.get("content")?.trim() || "",
    };

    if (!payload.title) {
      setStatus("Error: Title is required");
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

  return (
    <Layout title="Tom Murphy - Admin" description="Admin">
      <h2 style={{ fontWeight: 600, marginTop: "40px" }}>Admin</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "40px",
          maxWidth: "600px",
        }}
      >
        <input name="title" placeholder="Title" required />
        <input name="thumbnail" placeholder="Thumbnail URL" />
        <input name="link" placeholder="Substack Link (optional)" />
        <textarea name="content" placeholder="Markdown content" rows={10} />
        <button type="submit">Save</button>
      </form>

      {status ? <p style={{ marginTop: "16px" }}>{status}</p> : null}
    </Layout>
  );
}