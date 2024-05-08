

/**
 * @module {ButtonManager} 按钮管理器模块
 */
const ButtonManager = {
  getView(opts) {
    console.log(opts);
    // return __webpack_require__("./components/button/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
  },

  getAttr() {
    // return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(133)]).then(__webpack_require__.bind(null, /*! ./attr/button_attribute.js */ "./components/button/attr/button_attribute.js")).then(module => module.ButtonAttribute);
    return import('./attr/button_attribute.js').then(module => module.ButtonAttribute);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/button/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  getData(type) {
    // return __webpack_require__("./components/button/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
    return import(`./data/${type}_data.json`).then(module => module.default);
  }

};

export { ButtonManager }