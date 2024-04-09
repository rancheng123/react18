const TextManager = {
  getView(opts) {
    // return __webpack_require__("./components/text/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view`).then((module) => module.default);
  },

  getAttr() {
    return Promise.all(/*! import() | text_attribute */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e("text_attribute")]).then(__webpack_require__.bind(null, /*! ./attr/text_attribute.js */ "./components/text/attr/text_attribute.js")).then(module => module.TextAttribute);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/text/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return import(`./style/${type}/${cate}_css.json`).then((module) => module.default);
    
  },

  getData(type) {
    return import(`./data/${type}_data.json`).then((module) => module.default);
  }

};
export  {TextManager}
//# sourceURL=webpack:///./components/text/text_manager.js?