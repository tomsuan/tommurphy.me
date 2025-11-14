// pages/_app.js

import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    function loadGA() {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-7G6D326KL9';
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){ window.dataLayer.push(arguments); }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', 'G-7G6D326KL9');
    }

    function showBanner() {
      const banner = document.getElementById('cookie-banner');
      if (banner) banner.style.display = 'block';
    }

    const consent = localStorage.getItem('ga_consent');

    if (consent === 'accepted') {
      loadGA();
    } else if (consent === null) {
      showBanner();
    }

    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');

    if (acceptBtn) {
      acceptBtn.onclick = () => {
        localStorage.setItem('ga_consent', 'accepted');
        document.getElementById('cookie-banner').style.display = 'none';
        loadGA();
      };
    }

    if (rejectBtn) {
      rejectBtn.onclick = () => {
        localStorage.setItem('ga_consent', 'rejected');
        document.getElementById('cookie-banner').style.display = 'none';
      };
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />

      <div
        id="cookie-banner"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',

          // *** CHANGED HERE — compact box ***
          width: '260px',
          maxWidth: '260px',

          background: '#f2f2f2',
          border: '1px solid #ccc',
          padding: '12px',
          borderRadius: '6px',

          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',

          display: 'none',
          zIndex: 9999,
          boxShadow: '0px 2px 6px rgba(0,0,0,0.12)',
        }}
      >
        <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', lineHeight: '1.4' }}>
          Due to the lame-brained Directive 2009/136/EC you have to click a button.
       
        </p>

        <div style={{ marginTop: '10px', display: 'flex', gap: '6px' }}>
          <button
            id="cookie-accept"
            style={{
              padding: '6px 10px',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
            }}
          >
            Accept
          </button>

          <button
            id="cookie-reject"
            style={{
              padding: '6px 10px',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
}

export default MyApp;
