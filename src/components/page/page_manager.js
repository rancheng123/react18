/**
 * @instance {PageManager} 页面管理工厂对象
 */
const PageManager = {
  /**
   * @method createView 获取对应视图
   * @return 对应视图
   */
  getView(opts) {
    return import(`./view/${opts.type}/page.jsx`).then(module => module.default);
  },

  /**
   * @method createView 获取对应视图
   * @return 对应视图
   */
  getStyle() {
    // return __webpack_require__.e(/*! import() */ 780).then(__webpack_require__.t.bind(null, /*! ./style/page */ "./components/page/style/page.json", 3)).then(module => module.default);
    return import('./style/page.json').then(module => module.default)
  }

};

export { PageManager }