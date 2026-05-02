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
      <Layout title="Tom Murphy - Dashboard" description="Private dashboard" pathname="/dashboard">
        <h2 className="font-semibold mt-10 mb-6 text-3xl">Download Dashboard</h2>

        <form method="get" action="/dashboard" className="max-w-[420px]">
          <label htmlFor="key" className="block mb-2 font-semibold">Password</label>

          <input
            id="key"
            name="key"
            type="password"
            className="w-full p-3 text-base border border-[#ccc] rounded-xl mb-4 box-border"
          />

          <button
            type="submit"
            className="inline-block px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold"
          >
            Open dashboard
          </button>
        </form>
      </Layout>
    );
  }

  return (
    <Layout title="Tom Murphy - Dashboard" description="Private dashboard" pathname="/dashboard">
      <h2 className="font-semibold mt-10 mb-6 text-3xl">Download Dashboard</h2>

      {error ? (
        <p className="text-red-600 text-[15px]">{error}</p>
      ) : (
        <>
          <p className="mb-6 text-[15px]">
            Total recorded downloads: <strong>{total}</strong>
          </p>

          {rows.length === 0 ? (
            <p>No download events recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="text-left border-b border-[#ddd] p-3">File</th>
                    <th className="text-left border-b border-[#ddd] p-3 w-[120px]">Count</th>
                    <th className="text-left border-b border-[#ddd] p-3 w-[240px]">Latest</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.filename}>
                      <td className="border-b border-[#eee] p-3 align-top">{row.filename}</td>
                      <td className="border-b border-[#eee] p-3 align-top">{row.count}</td>
                      <td className="border-b border-[#eee] p-3 align-top">
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