import Layout from "../Layout";
import redis from "../lib/redis";

function parseEvent(item) {
  try {
    return typeof item === "string" ? JSON.parse(item) : item;
  } catch {
    return null;
  }
}

export async function getServerSideProps({ query }) {
  const adminSecret = process.env.ADMIN_SECRET || "";
  const provided = typeof query.key === "string" ? query.key : "";

  if (!adminSecret || provided !== adminSecret) {
    return {
      props: {
        authorised: false,
        rows: [],
        total: 0,
        error: null,
      },
    };
  }

  try {
    const rawEvents = await redis.lrange("events:downloads", 0, -1);
    const parsed = rawEvents.map(parseEvent).filter(Boolean);

    const counts = new Map();

    for (const event of parsed) {
      const filename = event.filename || "Unknown file";
      const current = counts.get(filename) || {
        filename,
        count: 0,
        latestTimestamp: null,
      };

      current.count += 1;

      if (
        event.timestamp &&
        (!current.latestTimestamp || event.timestamp > current.latestTimestamp)
      ) {
        current.latestTimestamp = event.timestamp;
      }

      counts.set(filename, current);
    }

    const rows = Array.from(counts.values()).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.filename.localeCompare(b.filename);
    });

    return {
      props: {
        authorised: true,
        rows,
        total: parsed.length,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        authorised: true,
        rows: [],
        total: 0,
        error: error.message || "Failed to load download data.",
      },
    };
  }
}

export default function Dashboard({ authorised, rows, total, error }) {
  if (!authorised) {
    return (
      <Layout title="Tom Murphy - Dashboard" description="Private dashboard">
        <h2 style={{ fontWeight: 600, marginTop: "40px", marginBottom: "24px" }}>
          Download Dashboard
        </h2>

        <form method="get" action="/dashboard" style={{ maxWidth: "420px" }}>
          <label
            htmlFor="key"
            style={{ display: "block", marginBottom: "10px", fontWeight: 600 }}
          >
            Password
          </label>

          <input
            id="key"
            name="key"
            type="password"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: "999px",
              border: "none",
              color: "white",
              background: "black",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Open dashboard
          </button>
        </form>
      </Layout>
    );
  }

  return (
    <Layout title="Tom Murphy - Dashboard" description="Private dashboard">
      <h2 style={{ fontWeight: 600, marginTop: "40px", marginBottom: "24px" }}>
        Download Dashboard
      </h2>

      {error ? (
        <p style={{ color: "#b00020", fontSize: "15px" }}>{error}</p>
      ) : (
        <>
          <p style={{ marginBottom: "24px", fontSize: "15px" }}>
            Total recorded downloads: <strong>{total}</strong>
          </p>

          {rows.length === 0 ? (
            <p>No download events recorded yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "15px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        padding: "12px 10px",
                      }}
                    >
                      File
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        padding: "12px 10px",
                        width: "120px",
                      }}
                    >
                      Count
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        padding: "12px 10px",
                        width: "240px",
                      }}
                    >
                      Latest
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.filename}>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          padding: "12px 10px",
                          verticalAlign: "top",
                        }}
                      >
                        {row.filename}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          padding: "12px 10px",
                          verticalAlign: "top",
                        }}
                      >
                        {row.count}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          padding: "12px 10px",
                          verticalAlign: "top",
                        }}
                      >
                        {row.latestTimestamp || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}