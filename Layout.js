import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import navigation from "./navigation";
import Search from "./components/Search";

const DEFAULT_TITLE = "Tom Murphy";
const DEFAULT_DESCRIPTION = "Notes and thoughts by Tom Murphy on technology, AI, and life.";
const SITE_URL = "https://tommurphy.me";

export default function Layout({ 
  children, 
  title = DEFAULT_TITLE, 
  description = DEFAULT_DESCRIPTION,
  pathname = "" 
}) {
  // Clean canonical URL (no trailing slash except for homepage)
  let cleanPath = pathname === '/' ? '' : pathname;
  if (cleanPath.endsWith('/')) cleanPath = cleanPath.slice(0, -1);
  const canonical = `${SITE_URL}${cleanPath}`;

  return (
    <div className="brand-container text-center box-border">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Canonical */}
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Tom Murphy" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <meta name="robots" content="index, follow" />
      </Head>

      <Script 
        id="ga-consent-loader" 
        strategy="afterInteractive" 
        dangerouslySetInnerHTML={{
          __html: `(function(){try{if(localStorage.getItem('ga_consent')!=='accepted')return;var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=G-7G6D326KL9';s.async=true;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-7G6D326KL9');}catch(e){}})();`
        }} 
      />

      <h1 className="text-[2.8rem] font-bold mb-2">Tom Murphy</h1>
      <p className="text-[#555] mb-10 text-[1.1rem]">Notes and thoughts</p>

      <nav className="flex justify-center gap-6 my-10 flex-wrap">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link no-underline text-black font-medium"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <Search />

      <main className="mt-4 text-left">
        {children}
      </main>

      <footer className="mt-20 pt-8 border-t border-[#eee] text-[#666] text-[0.9rem]">
        © {new Date().getFullYear()} Tom Murphy
      </footer>
    </div>
  );
}