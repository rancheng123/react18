
export const SlideShowManager = {
  getView(opts) {
    // return __webpack_require__("./components/slide_show/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
  },

  getAttr() {
    return Promise.all(/*! import() | slide_show_attribute */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(47), __webpack_require__.e("slide_show_attribute")]).then(__webpack_require__.bind(null, /*! ./attr/slide_show_attribute.js */ "./components/slide_show/attr/slide_show_attribute.js")).then(module => module.SlideShowAttribute);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/slide_show/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  getData(type) {
    return __webpack_require__("./components/slide_show/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
  }

};