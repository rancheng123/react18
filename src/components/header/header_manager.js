
const HeaderManager = {
  getView(opts) {
    // return __webpack_require__("./components/header/view lazy recursive ^\\.\\/.*\\/header$")(`./${opts.type}/header`).then(module => module.Header);
    return import(`./view/${opts.type}/header.jsx`).then(module => module.Header);
  },

  getAttr() {
    // return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(141)]).then(__webpack_require__.bind(null, /*! ./attr/header_attribute */ "./components/header/attr/header_attribute.js")).then(module => module.HeaderAttribute);
    return import('./attr/header_attribute.js').then(module => module.default);
  },

  // getStyle(){
  //     return import("./style/header.json").then(module=>module.default)
  // },
  getStyle(cate, type) {
    // return __webpack_require__("./components/header/style lazy recursive ^\\.\\/.*\\/header\\.json$")(`./${type}/header.json`).then(module => module.default);
    return import(`./style/${type}/header.json`).then(module => module.default);
  },

  getData() {
    return __webpack_require__.e(/*! import() */ 664).then(__webpack_require__.t.bind(null, /*! ./data/header_data.json */ "./components/header/data/header_data.json", 3)).then(module => module.default);
  }

};

export { HeaderManager }