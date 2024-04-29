
/**
 * @instance {ColumnManager} 列管理器实例
 * @version 1.0
 */
const ColumnManager = {
  /**
   * @method getView 获取控件结构
   * @return {Component} 控件视图类
   */
  getView(opts) {
    // return __webpack_require__("./components/column/view lazy recursive ^\\.\\/.*\\/.*$")(`./${opts.type}/${opts.cate}`).then(module => module.Column);
    return import(`./view/${opts.type}/${opts.cate}.jsx`).then(module => module.Column);
  },

  /**
   * @method getAttr 获取控件属性
   * @return {Attribute} 控件属性类
   */
  getAttr() {
    return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(134)]).then(__webpack_require__.bind(null, /*! ./attr/column_attribute */ "./components/column/attr/column_attribute.js")).then(module => module.ColumnAttribute);
  },

  /**
   * @method getStyle 获取控件样式
   * @return {JSON} 控件样式json数据
   */
  getStyle(cate, type) {
    // return __webpack_require__("./components/column/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  /**
   * @method getData 获取控件数据
   * @return {JSON} 控件json数据
   */
  getData(type) {
    return __webpack_require__("./components/column/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
  }

};

export { ColumnManager }
