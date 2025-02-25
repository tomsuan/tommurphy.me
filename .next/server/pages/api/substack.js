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

/***/ "(api)/./pages/api/substack.js":
/*!*******************************!*\
  !*** ./pages/api/substack.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    try {\n        const substackPosts = [\n            {\n                title: \"My First Substack Post\",\n                link: \"https://example.com/first-post\"\n            },\n            {\n                title: \"My Second Substack Post\",\n                link: \"https://example.com/second-post\"\n            },\n            {\n                title: \"My Third Substack Post\",\n                link: \"https://example.com/third-post\"\n            }\n        ];\n        res.status(200).json(substackPosts);\n    } catch (error) {\n        console.error(\"Error in /api/substack:\", error);\n        res.status(500).json({\n            error: \"Failed to fetch Substack posts\"\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3Vic3RhY2suanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGlFQUFlLE9BQU9BLEtBQUtDO0lBQ3pCLElBQUk7UUFDRixNQUFNQyxnQkFBZ0I7WUFDcEI7Z0JBQ0VDLE9BQU87Z0JBQ1BDLE1BQU07WUFDUjtZQUNBO2dCQUNFRCxPQUFPO2dCQUNQQyxNQUFNO1lBQ1I7WUFDQTtnQkFDRUQsT0FBTztnQkFDUEMsTUFBTTtZQUNSO1NBQ0Q7UUFFREgsSUFBSUksTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0o7SUFDdkIsRUFBRSxPQUFPSyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQywyQkFBMkJBO1FBQ3pDTixJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBaUM7SUFDakU7QUFDRixHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktd2Vic2l0ZS8uL3BhZ2VzL2FwaS9zdWJzdGFjay5qcz9iNjA0Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHN1YnN0YWNrUG9zdHMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBcIk15IEZpcnN0IFN1YnN0YWNrIFBvc3RcIixcbiAgICAgICAgbGluazogXCJodHRwczovL2V4YW1wbGUuY29tL2ZpcnN0LXBvc3RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IFwiTXkgU2Vjb25kIFN1YnN0YWNrIFBvc3RcIixcbiAgICAgICAgbGluazogXCJodHRwczovL2V4YW1wbGUuY29tL3NlY29uZC1wb3N0XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBcIk15IFRoaXJkIFN1YnN0YWNrIFBvc3RcIixcbiAgICAgICAgbGluazogXCJodHRwczovL2V4YW1wbGUuY29tL3RoaXJkLXBvc3RcIlxuICAgICAgfVxuICAgIF07XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihzdWJzdGFja1Bvc3RzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gL2FwaS9zdWJzdGFjazpcIiwgZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIFN1YnN0YWNrIHBvc3RzXCIgfSk7XG4gIH1cbn07Il0sIm5hbWVzIjpbInJlcSIsInJlcyIsInN1YnN0YWNrUG9zdHMiLCJ0aXRsZSIsImxpbmsiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/substack.js\n");

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