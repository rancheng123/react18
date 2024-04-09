const MoFooterManager = {
  getView(opts) {
    // return __webpack_require__("./components/mo_footer/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
  },

  getAttr() {
    return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(151)]).then(__webpack_require__.bind(null, /*! ./attr/mo_footer_attribute */ "./components/mo_footer/attr/mo_footer_attribute.js")).then(module => module.MoFooterAttribute);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/mo_footer/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  getData(type) {
    return __webpack_require__("./components/mo_footer/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
  }

};

export { MoFooterManager }