import { useEffect, useState } from "react";
import Layout from "../../Layout";

export const dynamic = "force-dynamic";

function Section({ title, events, columns }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h3 style={{ fontWeight: 600, marginBottom: "16px" }}>{title}</h3>
      {events.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>No events recorded yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} style={{ borderBottom: "2px solid #eee", padding: "8px 12px", fontWeight: 600 }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                {columns.map((col) => (
                  <td key={col} style={{ padding: "8px 12px" }}>
                    {col === "Time" ? new Date(event.timestamp).toLocaleString() : event[col.toLowerCase()] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function Analytics() {
  const [downloads, setDownloads] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/analytics", {
          headers: { "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET },
        });
        if (!res.ok) { setError("Failed to load analytics."); return; }
        const data = await res.json();
        setDownloads(data.downloads || []);
        setClicks(data.clicks || []);
      } catch { setError("Network error."); }
      finally { setLoading(false); }
    }
    fetchEvents();
  }, []);

  return (
    <Layout title="Tom Murphy - Analytics" description="Analytics">
      <h2 style={{ fontWeight: 600, marginTop: "40px" }}>Analytics</h2>
      {loading ? <p style={{ color: "#666", marginTop: "40px" }}>Loading...</p>
        : error ? <p style={{ color: "red", marginTop: "40px" }}>{error}</p>
        : <>
            <Section title={`PDF Downloads (${downloads.length})`} events={downloads} columns={["Filename", "Time"]} />
            <Section title={`Substack Click-throughs (${clicks.length})`} events={clicks} columns={["Title", "Url", "Time"]} />
          </>
      }
    </Layout>
  );
}
