import Layout from "../Layout";

export default function About() {
  return (
    <Layout
      title="About | Tom Murphy"
      description="About Tom Murphy and these notes"
    >
      <h2 style={{ fontWeight: 600, marginTop: "40px", marginBottom: "1.5rem" }}>
        About
      </h2>

      <div style={{ maxWidth: "65ch", lineHeight: 1.6, color: "#333", textAlign: "left" }}>
        <p style={{ marginBottom: "1.2rem" }}>
          These notes are written primarily to clarify my own thinking on technology, incentives, human behavior, organizational dynamics, and long-term consequences.
        </p>

        <p style={{ marginBottom: "1.2rem" }}>
          The content is shared publicly in the hope that some parts may prove useful, interesting, or thought-provoking to others.
        </p>

        <p style={{ marginTop: "2rem" }}>
          Contact:{" "}
          <a
            href="mailto:tom@tommurphy.me"
            style={{ color: "black", textDecoration: "none" }}
          >
            tom@tommurphy.me
          </a>
        </p>
      </div>
    </Layout>
  );
}