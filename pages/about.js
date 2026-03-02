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

      <div style={{
        maxWidth: "65ch",
        lineHeight: 1.6,
        color: "#333",
        margin: "0 auto",
        textAlign: "center",
      }}>
        <p style={{ marginBottom: "1.2rem" }}>
          These notes are written primarily to clarify my own thinking on technology, incentives, human behavior, organizational dynamics, and long-term consequences.
        </p>

        <p style={{ marginBottom: "1.2rem" }}>
          The content is shared publicly in the hope that some parts may prove useful, interesting, or thought-provoking to others.
        </p>
      </div>

      {/* Horizontal clickable SVG icons at the bottom */}
      <div style={{
        marginTop: "5rem",
        paddingTop: "2rem",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "center",
        gap: "3.5rem",
        flexWrap: "wrap",
      }}>
        {/* Email */}
        <a
          href="mailto:tom@tommurphy.me"
          aria-label="Email"
          style={{ color: "#333", display: "inline-block" }}
        >
          <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>

        {/* X / Twitter */}
        <a
          href="https://x.com/tom_murphy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          style={{ color: "#333", display: "inline-block" }}
        >
          <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26L18.502 21.75H16.17l-5.214-6.817L5.99 21.75H2.68l7.73-8.835L2.25 2.25h5.48l4.713 6.231z"/>
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/tomsuan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          style={{ color: "#333", display: "inline-block" }}
        >
          <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.87 1.5 2.28 1.07 2.84.82.09-.64.34-1.07.62-1.32-2.2-.25-4.52-1.1-4.52-4.9 0-1.08.38-1.96 1.01-2.65-.1-.25-.44-1.26.1-2.62 0 0 .83-.27 2.72 1.02 1.5-.42 3.1-.42 4.6 0 1.89-1.29 2.72-1.02 2.72-1.02.54 1.36.2 2.37.1 2.62.63.69 1.01 1.57 1.01 2.65 0 3.81-2.33 4.65-4.54 4.9.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.49C19.13 20.62 22 16.78 22 12.25 22 6.59 17.52 2 12 2z"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/tom888"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          style={{ color: "#333", display: "inline-block" }}
        >
          <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.64.52-1.95 1.3v-.03h-.02c-.17-.7-.7-1.27-1.4-1.27-.76 0-1.38.61-1.38 1.38v7.9h2.3v-5.3c0-.3.24-.55.55-.55.3 0 .55.25.55.55v5.3h2.3z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/tmurphy/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={{ color: "#333", display: "inline-block" }}
        >
          <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.667.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4 2.21 0 4 1.791 4 4 0 2.21-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44-.644-1.44-1.44-1.44z"/>
          </svg>
        </a>
      </div>
    </Layout>
  );
}