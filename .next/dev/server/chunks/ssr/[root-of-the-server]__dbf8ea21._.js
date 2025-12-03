module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[project]/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/_app.js
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function MyApp({ Component, pageProps }) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        function loadGA() {
            const script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-7G6D326KL9';
            script.async = true;
            document.head.appendChild(script);
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
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
            acceptBtn.onclick = ()=>{
                localStorage.setItem('ga_consent', 'accepted');
                document.getElementById('cookie-banner').style.display = 'none';
                loadGA();
            };
        }
        if (rejectBtn) {
            rejectBtn.onclick = ()=>{
                localStorage.setItem('ga_consent', 'rejected');
                document.getElementById('cookie-banner').style.display = 'none';
            };
        }
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
                ...pageProps
            }, void 0, false, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                id: "cookie-banner",
                style: {
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
                    boxShadow: '0px 2px 6px rgba(0,0,0,0.12)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0,
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: '1.4'
                        },
                        children: "Due to the lame-brained Directive 2009/136/EC you have to click a button."
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: '10px',
                            display: 'flex',
                            gap: '6px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                id: "cookie-accept",
                                style: {
                                    padding: '6px 10px',
                                    fontFamily: 'Inter, sans-serif',
                                    cursor: 'pointer'
                                },
                                children: "Accept"
                            }, void 0, false, {
                                fileName: "[project]/pages/_app.js",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                id: "cookie-reject",
                                style: {
                                    padding: '6px 10px',
                                    fontFamily: 'Inter, sans-serif',
                                    cursor: 'pointer'
                                },
                                children: "Reject"
                            }, void 0, false, {
                                fileName: "[project]/pages/_app.js",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
const __TURBOPACK__default__export__ = MyApp;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__dbf8ea21._.js.map