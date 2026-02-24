import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { Inter } from "next/font/google";

import navigation from "./navigation";
import { containerStyle, navStyle } from "./styles/layout";

const inter = Inter({ subsets: ["latin"] });

const GA_ID = "G-7G6D326KL9";

export default function Layout({ children, title = "Tom Murphy", description = "" }) {
  return (
    <div className={inter.className} style={containerStyle}>
      <Head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Consent + GA loader: no React state, no hydration mismatch */}
      <Script
        id="ga-consent-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  var GA_ID = ${JSON.stringify(GA_ID)};
  var KEY = 'ga_consent';

  function loadGA() {
    if (window.__ga_loaded) return;
    window.__ga_loaded = true;

    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    s.async = true;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function showBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.style.display = 'block';
  }

  function hideBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.style.display = 'none';
  }

  var consent = null;
  try { consent = localStorage.getItem(KEY); } catch (e) {}

  if (consent === 'accepted') {
    loadGA();
  } else if (consent === null) {
    showBanner();
  }

  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');

  if (acceptBtn) {
    acceptBtn.onclick = function() {
      try { localStorage.setItem(KEY, 'accepted'); } catch (e) {}
      hideBanner();
      loadGA();
    };
  }

  if (rejectBtn) {
    rejectBtn.onclick = function() {
      try { localStorage.setItem(KEY, 'rejected'); } catch (e) {}
      hideBanner();
    };
  }
})();
          `,
        }}
      />

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

      <main style={{ marginTop: "32px" }}>{children}</main>

      {/* Banner markup is static; JS toggles display */}
      <div
        id="cookie-banner"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          width: "260px",
          maxWidth: "260px",
          background: "#f2f2f2",
          border: "1px solid #ccc",
          padding: "12px",
          borderRadius: "6px",
          fontSize: "13px",
          fontFamily: "Inter, sans-serif",
          display: "none",
          zIndex: 9999,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.12)",
        }}
      >
        <p style={{ margin: 0, fontFamily: "Inter, sans-serif", lineHeight: "1.4" }}>
          This site uses Google Analytics. Accept?
        </p>

        <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
          <button
            id="cookie-reject"
            type="button"
            style={{
              padding: "6px 10px",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
            }}
          >
            Reject
          </button>

          <button
            id="cookie-accept"
            type="button"
            style={{
              padding: "6px 10px",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}