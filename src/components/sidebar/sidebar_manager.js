export const SidebarManager = {
  getView(opts) {
    // return __webpack_require__("./components/sidebar/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
  },

  getAttr() {
    return Promise.all(/*! import() | sidebar_attribute */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e("sidebar_attribute")]).then(__webpack_require__.bind(null, /*! ./attr/sidebar_attribute.js */ "./components/sidebar/attr/sidebar_attribute.js")).then(module => module.SidebarAttribute);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/sidebar/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  getData(type) {
    return __webpack_require__("./components/sidebar/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
  }

};
