
const FooterManager = {
  getView(opts) {
    // return __webpack_require__("./components/footer/view lazy recursive ^\\.\\/.*\\/footer$")(`./${opts.type}/footer`).then(module => module.Footer);
    return import(`./view/${opts.type}/footer.jsx`).then(module => module.Footer);
  },

  getAttr() {
    // return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(139)]).then(__webpack_require__.bind(null, /*! ./attr/footer_attribute */ "./components/footer/attr/footer_attribute.js")).then(module => module.FooterAttribute);
    return import(`./attr/footer_attribute.js`).then(module => module.FooterAttribute);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/footer/style lazy recursive ^\\.\\/.*\\/footer\\.json$")(`./${type}/footer.json`).then(module => module.default);
    return import(`./style/${type}/footer.json`).then(module => module.default)
  } 

};

export { FooterManager }