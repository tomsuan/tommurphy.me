// pages/dashboard.js
import Layout from "../Layout";
import redis from "../lib/redis";

function parseEvent(item) {
  try {
    return typeof item === "string" ? JSON.parse(item) : item;
  } catch {
    return null;
  }
}

export async function getServerSideProps({ req, res }) {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return {
      props: {
        error: "ADMIN_SECRET is not set.",
        rows: [],
        total: 0,
      },
    };
  }

  const auth = req.headers.authorization || "";
  const [scheme, encoded] = auth.split(" ");

  if (scheme !== "Basic" || !encoded) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Dashboard"');
    res.statusCode = 401;
    res.end("Authentication required");
    return { props: {} };
  }

  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const [username, password] = decoded.split(":");

  if (username !== "tom" || password !== adminSecret) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Dashboard"');
    res.statusCode = 401;
    res.end("Access denied");
    return { props: {} };
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
        rows,
        total: parsed.length,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message || "Failed to load download data.",
        rows: [],
        total: 0,
      },
    };
  }
}

export default function Dashboard({ rows, total, error }) {
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