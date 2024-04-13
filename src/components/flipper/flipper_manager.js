
/**
 * @instance {FlipperManager} 翻屏组件管理器实例
 * @date 2020-07-29
 * @author wyq
 * @version 1.0
 */
export const FlipperManager = {
  /**
   * @method getView 获取控件结构
   * @date 2020-07-29
   * @author wyq
   * @return {Flipper} 控件视图类
   */
  getView(opts) {
    // return __webpack_require__("./components/flipper/view lazy recursive ^\\.\\/.*\\/flipper$")(`./${opts.type}/flipper`).then(module => module.Flipper);
    return import(`./view/${opts.type}/flipper.jsx`).then(module => {
      return module.default
    });
  },

  /**
   * @method getAttr 获取控件属性
   * @date 2020-07-29
   * @author wyq
   * @return {FlipperManager} 控件属性类
   */
  getAttr() {
    // return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(138)]).then(__webpack_require__.bind(null, /*! ./attr/flipper_attribute */ "./components/flipper/attr/flipper_attribute.js")).then(module => module.FlipperAttribute);
    return import(`./attr/flipper_attribute.js`).then(module => module.FlipperAttribute);
  },

  /**
   * @method getStyle 获取控件样式
   * @date 2020-07-29
   * @author wyq
   * @return {JSON} 控件样式json数据
   */
  getStyle(cate, type) {
    // return __webpack_require__("./components/flipper/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  /**
   * @method getData 获取控件数据
   * @date 2020-07-29
   * @author wyq
   * @param {string} type 分类名称
   * @return {JSON} 控件属性json数据 
   */
  getData(type) {
    // return __webpack_require__("./components/flipper/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
    return import(`./data/${type}_data.json`).then(module => module.default);
  }

};
