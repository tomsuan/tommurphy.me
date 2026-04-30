import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import navigation from "./navigation";
import { containerStyle, navStyle } from "./styles/layout";

const DEFAULT_TITLE = "Tom Murphy";
const DEFAULT_DESCRIPTION = "Notes and thoughts by Tom Murphy on technology, AI, and life.";
const SITE_URL = "https://tommurphy.me";

export default function Layout({ 
  children, 
  title = DEFAULT_TITLE, 
  description = DEFAULT_DESCRIPTION 
}) {
  return (
    <div style={containerStyle}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}${typeof window !== 'undefined' ? window.location.pathname : ''}`} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
        <meta property="og:site_name" content="Tom Murphy" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <Script id="ga-consent-loader" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `(function(){try{if(localStorage.getItem('ga_consent')!=='accepted')return;var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=G-7G6D326KL9';s.async=true;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-7G6D326KL9');}catch(e){}})();`
      }} />

      <h1 style={{ fontSize: "2.8rem", fontWeight: 700, marginBottom: "8px" }}>Tom Murphy</h1>
      <p style={{ color: "#555", marginBottom: "40px", fontSize: "1.1rem" }}>Notes and thoughts</p>

      <nav style={navStyle}>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ textDecoration: "none", color: "#000", fontWeight: 500 }}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <main style={{ marginTop: "50px", textAlign: "left" }}>{children}</main>

      <footer style={{ marginTop: "80px", paddingTop: "30px", borderTop: "1px solid #eee", color: "#666", fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} Tom Murphy
      </footer>
    </div>
  );
}