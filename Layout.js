import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { Inter } from 'next/font/google';

import navigation from './navigation';
import { containerStyle, navStyle } from './styles/layout';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <div className={inter.className} style={containerStyle}>
      <Head>
        <title>Tom Murphy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7G6D326KL9"
        strategy="afterInteractive"
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer = window.dataLayer || [];\n" +
            "function gtag(){dataLayer.push(arguments);}\n" +
            "gtag('js', new Date());\n" +
            "gtag('config', 'G-7G6D326KL9');",
        }}
      />

      <h1 style={{ fontWeight: 600 }}>Tom Murphy</h1>
      <p>Welcome to my Notes.</p>

      <nav style={navStyle}>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
