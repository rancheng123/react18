const PanelManager = {
  getView(opts) {
    // return __webpack_require__("./components/panel/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
  },

  getAttr() {
    return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e("panel_attribute")]).then(__webpack_require__.bind(null, /*! ./attr/panel_attribute */ "./components/panel/attr/panel_attribute.js")).then(module => module.PanelAttribute);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/panel/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  getData(type) {
    return __webpack_require__("./components/panel/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
  }

};


export { PanelManager }