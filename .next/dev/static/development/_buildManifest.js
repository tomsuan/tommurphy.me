self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/articles": [
    "static/chunks/pages/articles.js"
  ],
  "/downloads": [
    "static/chunks/pages/downloads.js"
  ],
  "/photos": [
    "static/chunks/pages/photos.js"
  ],
  "/videos": [
    "static/chunks/pages/videos.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/admin",
    "/api/recordDownload",
    "/api/upload",
    "/articles",
    "/articles/[slug]",
    "/downloads",
    "/photos",
    "/videos"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()