
const ImageManager = {
  getView(opts) {
    // return __webpack_require__("./components/image/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
  },

  getAttr() {
    return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(127)]).then(__webpack_require__.bind(null, /*! ./attr/image_attribute.js */ "./components/image/attr/image_attribute.js")).then(module => module.ImageAttribute);
  },

  getStyle(cate, type) {
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  getData(type) {
    return import(`./data/${type}_data.json`).then(module => module.default);
  }

};
export {ImageManager}
//# sourceURL=webpack:///./components/image/image_manager.js?