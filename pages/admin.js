import { useState } from "react";
import Layout from "../Layout";

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
      <Layout title="Admin | Tom Murphy" description="Admin" pathname="/admin">
        <h2 className="font-semibold mt-10 mb-6 text-3xl">Admin</h2>
        <div className="max-w-[400px] mx-auto text-left">
          <label className="block mb-2 font-semibold text-[15px]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
            className="w-full p-3 text-[15px] border border-[#ccc] rounded-xl mb-4 box-border font-inherit"
          />
          <button onClick={handleLogin} className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-semibold">
            Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin | Tom Murphy" description="Admin" pathname="/admin">
      <h2 className="font-semibold mt-10 mb-6 text-3xl">Publish Article</h2>

      <div className="max-w-[560px] mx-auto text-left">
        {/* Post type selector */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-[15px]">Post Type</label>
          <div className="flex gap-3 flex-wrap">
            {[
              { value: "both", label: "Site + Substack" },
              { value: "site", label: "Site Only" },
              { value: "substack", label: "Substack Only" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPostType(option.value)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border ${
                  postType === option.value 
                    ? "bg-black text-white border-black" 
                    : "border-[#ccc] bg-white text-black"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-[15px]">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 text-[15px] border border-[#ccc] rounded-xl box-border"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-[15px]">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-3 text-[15px] border border-[#ccc] rounded-xl box-border"
          />
        </div>

        {/* Thumbnail */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-[15px]">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0] || null)}
            className="text-[15px]"
          />
          {thumbnail && (
            <p className="mt-2 text-sm text-[#666]">Selected: {thumbnail.name}</p>
          )}
        </div>

        {/* Substack link */}
        {(postType === "both" || postType === "substack") && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[15px]">Substack Link</label>
            <input
              type="url"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://yoursubstack.substack.com/p/..."
              className="w-full p-3 text-[15px] border border-[#ccc] rounded-xl box-border"
            />
          </div>
        )}

        {/* Content */}
        {(postType === "both" || postType === "site") && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[15px]">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              placeholder="Write your article here..."
              className="w-full p-3 text-[15px] border border-[#ccc] rounded-xl resize-y box-border"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting || !form.title}
          className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Publishing..." : "Publish"}
        </button>

        {status === "success" && <p className="mt-4 text-green-600">Article published successfully!</p>}
        {status && status !== "success" && <p className="mt-4 text-red-600">{status}</p>}
      </div>
    </Layout>
  );
}