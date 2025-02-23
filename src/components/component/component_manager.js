
/**
 * @instance {ComponentManager} 一行多列管理器实例
 * @version 1.0
 */
const ComponentManager = {
  /**
   * @method getView 获取控件结构
   * @return {Component} 控件视图类
   */
  getView(opts) {
    // return __webpack_require__("./components/component/view lazy recursive ^\\.\\/.*\\/.*$")(`./${opts.type}/${opts.cate}`).then(module => module.Component);
    return import(`./view/${opts.type}/${opts.cate}.jsx`).then(module => module.default);
  },

  /**
   * @method getAttr 获取控件属性
   * @return {Attribute} 控件属性类
   */
  getAttr() {
    // return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(135)]).then(__webpack_require__.bind(null, /*! ./attr/component_attribute */ "./components/component/attr/component_attribute.js")).then(module => module.ComponentAttribute);
    return import(`./attr/component_attribute.js`).then(module => module.default);
  },

  /**
   * @method getStyle 获取控件样式
   * @return {JSON} 控件样式json数据
   */
  getStyle(cate, type) {
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  getControler() {
    // return __webpack_require__.e(/*! import() */ 977).then(__webpack_require__.bind(null, /*! ./controler/component_controler */ "./components/component/controler/component_controler.js")).then(module => module.ComponentControler);
    return import('./controler/component_controler.js').then(module => module.default);
  },

  /**
   * @method getData 获取控件数据
   * @param {string} type 分类名称
   * @return {JSON} 控件属性json数据 
   */
  getData(type) {
    return import(`./data/${type}_data.json`).then(module => module.default);
  }
};

export { ComponentManager }
