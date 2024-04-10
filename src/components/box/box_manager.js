/**
 * @module {BoxManager} 容器管理器模块
 */
const BoxManager = {
  getView(opts) {
    return import(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module.default)
    // return __webpack_require__("./components/box/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
  },

  getAttr() {
    return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(132)]).then(__webpack_require__.bind(null, /*! ./attr/box_attribute.js */ "./components/box/attr/box_attribute.js")).then(module => module.BoxAttribute);
  },

  getStyle(cate, type) {
    return import(`./${type}/${cate}_css.json`).then(module => module.default)
    // return __webpack_require__("./components/box/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
  },

  getData(type) {
    return import(`./${type}_data.json`).then(module => module.default)
    // return __webpack_require__("./components/box/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
  }

};

export default BoxManager;