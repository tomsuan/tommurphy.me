"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/substack";
exports.ids = ["pages/api/substack"];
exports.modules = {

/***/ "rss-parser":
/*!*****************************!*\
  !*** external "rss-parser" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("rss-parser");

/***/ }),

/***/ "(api)/./pages/api/substack.js":
/*!*******************************!*\
  !*** ./pages/api/substack.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var rss_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rss-parser */ \"rss-parser\");\n/* harmony import */ var rss_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rss_parser__WEBPACK_IMPORTED_MODULE_0__);\n\nconst parser = new (rss_parser__WEBPACK_IMPORTED_MODULE_0___default())({\n    timeout: 5000\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    try {\n        console.log(\"Starting to fetch the feed...\");\n        const feed = await parser.parseURL(\"https://tommurphy888.substack.com/feed\", {\n            headers: {\n                \"User-Agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\"\n            }\n        });\n        console.log(\"Successfully fetched and parsed the feed:\", feed); // Log the feed object\n        if (feed && feed.items) {\n            const items = feed.items.slice(0, 5); // Get the 5 most recent posts\n            const simplifiedItems = items.map((item)=>({\n                    title: item.title,\n                    link: item.link\n                }));\n            res.status(200).json(simplifiedItems);\n        } else {\n            console.error(\"Feed or feed items are undefined.\");\n            res.status(200).json([]);\n        }\n    } catch (error) {\n        console.error(\"Error in /api/substack:\", error); // Add this line\n        console.error(error.message); //Add this line\n        console.error(error.stack); //Add this line\n        res.status(500).json({\n            error: \"Failed to fetch the feed\" + error.message\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3Vic3RhY2suanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLFNBQVMsSUFBSUQsbURBQU1BLENBQUM7SUFDeEJFLFNBQVM7QUFDWDtBQUVBLGlFQUFlLE9BQU9DLEtBQUtDO0lBQ3pCLElBQUk7UUFDRkMsUUFBUUMsR0FBRyxDQUFDO1FBQ1osTUFBTUMsT0FBTyxNQUFNTixPQUFPTyxRQUFRLENBQUMsMENBQTBDO1lBQzNFQyxTQUFTO2dCQUNQLGNBQWM7WUFDaEI7UUFDRjtRQUNESixRQUFRQyxHQUFHLENBQUMsNkNBQTZDQyxPQUFPLHNCQUFzQjtRQUNuRixJQUFJQSxRQUFRQSxLQUFLRyxLQUFLLEVBQUU7WUFDcEIsTUFBTUEsUUFBUUgsS0FBS0csS0FBSyxDQUFDQyxLQUFLLENBQUMsR0FBRyxJQUFJLDhCQUE4QjtZQUNwRSxNQUFNQyxrQkFBa0JGLE1BQU1HLEdBQUcsQ0FBQ0MsQ0FBQUEsT0FBUztvQkFDdkNDLE9BQU9ELEtBQUtDLEtBQUs7b0JBQ2pCQyxNQUFNRixLQUFLRSxJQUFJO2dCQUVuQjtZQUVBWixJQUFJYSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDTjtRQUN6QixPQUFPO1lBQ0ZQLFFBQVFjLEtBQUssQ0FBQztZQUNkZixJQUFJYSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDLEVBQUU7UUFDNUI7SUFFSixFQUFFLE9BQU9DLE9BQU87UUFDZGQsUUFBUWMsS0FBSyxDQUFDLDJCQUEyQkEsUUFBUyxnQkFBZ0I7UUFDbEVkLFFBQVFjLEtBQUssQ0FBQ0EsTUFBTUMsT0FBTyxHQUFHLGVBQWU7UUFDNUNmLFFBQVFjLEtBQUssQ0FBQ0EsTUFBTUUsS0FBSyxHQUFHLGVBQWU7UUFDNUNqQixJQUFJYSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU8sNkJBQTZCQSxNQUFNQyxPQUFPO1FBQUM7SUFDM0U7QUFDRixHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktd2Vic2l0ZS8uL3BhZ2VzL2FwaS9zdWJzdGFjay5qcz9iNjA0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJzZXIgZnJvbSAncnNzLXBhcnNlcic7XG5cbmNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIoe1xuICB0aW1lb3V0OiA1MDAwLCAvLyBTZXQgdGltZW91dCB0byA1IHNlY29uZHMgKGFkanVzdCBhcyBuZWVkZWQpXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coXCJTdGFydGluZyB0byBmZXRjaCB0aGUgZmVlZC4uLlwiKTtcbiAgICBjb25zdCBmZWVkID0gYXdhaXQgcGFyc2VyLnBhcnNlVVJMKCdodHRwczovL3RvbW11cnBoeTg4OC5zdWJzdGFjay5jb20vZmVlZCcsIHsgLy8gKipSRVBMQUNFIFdJVEggWU9VUiBVUkwhKipcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ1VzZXItQWdlbnQnOiAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzU4LjAuMzAyOS4xMTAgU2FmYXJpLzUzNy4zNidcbiAgICAgIH1cbiAgICB9KTtcbiAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc2Z1bGx5IGZldGNoZWQgYW5kIHBhcnNlZCB0aGUgZmVlZDpcIiwgZmVlZCk7IC8vIExvZyB0aGUgZmVlZCBvYmplY3RcbiAgICAgIGlmIChmZWVkICYmIGZlZWQuaXRlbXMpIHtcbiAgICAgICAgICBjb25zdCBpdGVtcyA9IGZlZWQuaXRlbXMuc2xpY2UoMCwgNSk7IC8vIEdldCB0aGUgNSBtb3N0IHJlY2VudCBwb3N0c1xuICAgICAgICAgIGNvbnN0IHNpbXBsaWZpZWRJdGVtcyA9IGl0ZW1zLm1hcChpdGVtID0+ICh7XG4gICAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxuICAgICAgICAgICAgICBsaW5rOiBpdGVtLmxpbmssXG4gICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHkgaW5jbHVkZSBvdGhlciBmaWVsZHMgeW91IHdhbnQgKGUuZy4sIGRlc2NyaXB0aW9uLCBwdWJEYXRlKVxuICAgICAgICAgIH0pKTtcblxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNpbXBsaWZpZWRJdGVtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmVlZCBvciBmZWVkIGl0ZW1zIGFyZSB1bmRlZmluZWQuXCIpO1xuICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihbXSk7XG4gICAgICB9XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gL2FwaS9zdWJzdGFjazpcIiwgZXJyb3IpOyAgLy8gQWRkIHRoaXMgbGluZVxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7IC8vQWRkIHRoaXMgbGluZVxuICAgICBjb25zb2xlLmVycm9yKGVycm9yLnN0YWNrKTsgLy9BZGQgdGhpcyBsaW5lXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCB0aGUgZmVlZCcgKyBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59OyJdLCJuYW1lcyI6WyJQYXJzZXIiLCJwYXJzZXIiLCJ0aW1lb3V0IiwicmVxIiwicmVzIiwiY29uc29sZSIsImxvZyIsImZlZWQiLCJwYXJzZVVSTCIsImhlYWRlcnMiLCJpdGVtcyIsInNsaWNlIiwic2ltcGxpZmllZEl0ZW1zIiwibWFwIiwiaXRlbSIsInRpdGxlIiwibGluayIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGFjayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/substack.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/substack.js"));
module.exports = __webpack_exports__;

})();