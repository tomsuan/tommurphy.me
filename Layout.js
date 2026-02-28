import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { Inter } from "next/font/google";

import navigation from "./navigation";
import { containerStyle, navStyle } from "./styles/layout";

const inter = Inter({ subsets: ["latin"] });

const DEFAULT_TITLE = "Tom Murphy";
const DEFAULT_DESCRIPTION = "Notes by Tom Murphy.";

export default function Layout({
  children,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}) {
  const fullTitle = title?.trim() ? title.trim() : DEFAULT_TITLE;

  return (
    <div className={inter.className} style={containerStyle}>
      <Head>
        <title>{fullTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* GA only loads if consent previously accepted */}
      <Script
        id="ga-consent-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              try {
                var consent = localStorage.getItem('ga_consent');
                if (consent !== 'accepted') return;

                var s = document.createElement('script');
                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-7G6D326KL9';
                s.async = true;
                document.head.appendChild(s);

                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;

                gtag('js', new Date());
                gtag('config', 'G-7G6D326KL9');
              } catch (e) {}
            })();
          `,
        }}
      />

      <header>
        <h1 style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{DEFAULT_TITLE}</h1>
        <p style={{ marginBottom: "1rem", color: "#444" }}>
          Welcome to my Notes.
        </p>

        {/* Short identity statement – visible site-wide */}
        <p style={{
          fontSize: "1.05rem",
          lineHeight: 1.5,
          color: "#555",
          maxWidth: "65ch",
          marginBottom: "1.5rem",
        }}>
          Personal notes and reflections on technology, incentives, human behavior,
          and the systems that shape decisions — written mainly for myself and shared
          in case they are useful to others.
        </p>
      </header>

      {/* Navigation – explicit visibility and spacing */}
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          margin: "1.5rem 0 2.5rem 0",
          fontSize: "1.05rem",
          fontWeight: 500,
          visibility: "visible",
          opacity: 1,
          minHeight: "auto",
          ...navStyle,  // your original styles applied last
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: "none",
              color: "black",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#0066cc"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "black"; }}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <main>{children}</main>
    </div>
  );
}