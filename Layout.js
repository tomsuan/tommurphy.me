import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { Inter } from "next/font/google";

import navigation from "./navigation";
import { containerStyle, navStyle } from "./styles/layout";

const inter = Inter({ subsets: ["latin"] });

const DEFAULT_TITLE = "Tom Murphy";
const DEFAULT_DESCRIPTION = "Notes by Tom Murphy.";

const SITE_URL = "https://tommurphy.me"; // Change this to your actual domain if different

export default function Layout({
  children,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}) {
  const fullTitle = title?.trim() ? title.trim() : DEFAULT_TITLE;
  const fullDescription = description?.trim() ? description.trim() : DEFAULT_DESCRIPTION;

  return (
    <div className={inter.className} style={containerStyle}>
      <Head>
        <title>{fullTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={fullDescription} />

        {/* Basic SEO */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}${typeof window !== 'undefined' ? window.location.pathname : ''}`} />

        {/* Open Graph (for social sharing: X, LinkedIn, Facebook, etc.) */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={fullDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
        <meta property="og:site_name" content="Tom Murphy" />

        {/* Optional: Twitter/X Card (summary card is minimal and clean) */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={fullDescription} />

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

      <h1 style={{ fontWeight: 600 }}>{DEFAULT_TITLE}</h1>
      <p>Welcome to my Notes.</p>

      <nav style={navStyle}>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ textDecoration: "none", color: "black" }}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <main>{children}</main>
    </div>
  );
}