
const ContentManager = {
  getView(opts) {
    // return __webpack_require__("./components/content/view lazy recursive ^\\.\\/.*\\/content$")(`./${opts.type}/content`).then(module => module.Content);
    return import(`./view/${opts.type}/content.jsx`).then(module => module.Content);
    
  },

  getAttr() {
    return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(136)]).then(__webpack_require__.bind(null, /*! ./attr/content_attribute */ "./components/content/attr/content_attribute.js")).then(module => module.ContentAttribute);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/content/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  }

};

export { ContentManager }