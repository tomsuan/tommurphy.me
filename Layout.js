import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { Inter } from "next/font/google";

import navigation from "./navigation";
import { containerStyle, navStyle } from "./styles/layout";

const inter = Inter({ subsets: ["latin"] });

const GA_ID = "G-7G6D326KL9";
const CONSENT_KEY = "ga_consent";

function readConsent() {
  // Runs on client only (guarded below). On server, return "unknown".
  if (typeof window === "undefined") return "unknown";
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    if (v === "accepted" || v === "rejected") return v;
    return "unknown";
  } catch {
    return "unknown";
  }
}

export default function Layout({ children, title = "Tom Murphy", description = "" }) {
  const [gaConsent, setGaConsent] = useState(() => readConsent());

  const accept = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {}
    setGaConsent("accepted");
  };

  const reject = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, "rejected");
    } catch {}
    setGaConsent("rejected");
  };

  return (
    <div className={inter.className} style={containerStyle}>
      <Head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {gaConsent === "accepted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `,
            }}
          />
        </>
      ) : null}

      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ fontWeight: 600, margin: 0 }}>Tom Murphy</h1>
      </header>

      <nav style={navStyle}>
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: "none", color: "black" }}>
            {item.label}
          </Link>
        ))}
      </nav>

      {gaConsent === "unknown" ? (
        <div
          style={{
            marginTop: "16px",
            padding: "12px 14px",
            border: "1px solid #eee",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: "14px", lineHeight: 1.4 }}>This site uses Google Analytics. Accept?</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={reject}
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Reject
            </button>
            <button
              type="button"
              onClick={accept}
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                border: "1px solid black",
                background: "black",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Accept
            </button>
          </div>
        </div>
      ) : null}

      <main style={{ marginTop: "32px" }}>{children}</main>
    </div>
  );
}