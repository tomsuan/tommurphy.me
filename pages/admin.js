import { useState } from "react";
import Layout from "../Layout";
import { containerStyle } from "../styles/layout";

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: 600,
  fontSize: "15px",
};

const buttonStyle = {
  padding: "10px 24px",
  borderRadius: "999px",
  border: "none",
  color: "white",
  background: "black",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [postType, setPostType] = useState("both");
  const [form, setForm] = useState({
    title: "",
    link: "",
    date: new Date().toISOString().slice(0, 10),
    content: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    if (password.trim()) setAuthed(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      let thumbnailPath = "";

      if (thumbnail) {
        const reader = new FileReader();
        const imageData = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(thumbnail);
        });

        const imageRes = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": password,
          },
          body: JSON.stringify({
            type: "image",
            filename: thumbnail.name,
            imageData,
          }),
        });

        if (!imageRes.ok) {
          const err = await imageRes.json();
          throw new Error(err.error || "Image upload failed");
        }

        const imageResult = await imageRes.json();
        thumbnailPath = imageResult.path;
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": password,
        },
        body: JSON.stringify({
          type: "post",
          title: form.title,
          link: postType === "site" ? "" : form.link,
          date: form.date,
          thumbnail: thumbnailPath,
          content: postType === "substack" ? "" : form.content,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      setStatus("success");
      setForm({
        title: "",
        link: "",
        date: new Date().toISOString().slice(0, 10),
        content: "",
      });
      setThumbnail(null);
    } catch (err) {
      setStatus(err.message || "Something went wrong");
    }

    setSubmitting(false);
  }

  if (!authed) {
    return (
      <Layout title="Admin | Tom Murphy" description="Admin">
        <h2 style={{ fontWeight: 600, marginTop: "40px", marginBottom: "24px" }}>
          Admin
        </h2>
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
            style={{ ...inputStyle, marginBottom: "16px" }}
          />
          <button onClick={handleLogin} style={buttonStyle}>
            Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin | Tom Murphy" description="Admin">
      <h2 style={{ fontWeight: 600, marginTop: "40px", marginBottom: "24px" }}>
        Publish Article
      </h2>

      <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "left" }}>

        {/* Post type selector */}
        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>Post Type</label>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { value: "both", label: "Site + Substack" },
              { value: "site", label: "Site Only" },
              { value: "substack", label: "Substack Only" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPostType(option.value)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "999px",
                  border: "1px solid #ccc",
                  background: postType === option.value ? "black" : "white",
                  color: postType === option.value ? "white" : "black",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
          />
        </div>

        {/* Date */}
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            style={inputStyle}
          />
        </div>

        {/* Thumbnail */}
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0] || null)}
            style={{ fontSize: "15px", fontFamily: "inherit" }}
          />
          {thumbnail && (
            <p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
              Selected: {thumbnail.name}
            </p>
          )}
        </div>

        {/* Substack link — shown for "both" and "substack" */}
        {(postType === "both" || postType === "substack") && (
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Substack Link</label>
            <input
              type="url"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://yoursubstack.substack.com/p/..."
              style={inputStyle}
            />
          </div>
        )}

        {/* Content — shown for "both" and "site" */}
        {(postType === "both" || postType === "site") && (
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              placeholder="Write your article here..."
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting || !form.title}
          style={{
            ...buttonStyle,
            opacity: submitting || !form.title ? 0.6 : 1,
            cursor: submitting || !form.title ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Publishing..." : "Publish"}
        </button>

        {status === "success" && (
          <p style={{ color: "green", fontSize: "15px", marginTop: "16px" }}>
            Article published successfully!
          </p>
        )}
        {status && status !== "success" && (
          <p style={{ color: "#b00020", fontSize: "15px", marginTop: "16px" }}>
            {status}
          </p>
        )}
      </div>
    </Layout>
  );
}