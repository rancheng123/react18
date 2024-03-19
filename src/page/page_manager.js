/**
 * @instance {PageManager} 页面管理工厂对象
 * @version 1.0
 */
const PageManager = {
  /**
   * @method createView 获取对应视图
   * @return 对应视图
   */
  getView(opts) {
    return __webpack_require__("./components/page/view lazy recursive ^\\.\\/.*\\/page$")(`./${opts.type}/page`).then(module => module.Page);
  },

  /**
   * @method createView 获取对应视图
   * @return 对应视图
   */
  async getStyle() {
    // return __webpack_require__.e(/*! import() */ 758).then(__webpack_require__.t.bind(null, /*! ./style/page */ "./components/page/style/page.json", 3)).then(module => module.default);

    return import('./components/page/style/page.json').then((module) => module.default);
  }

};

export default PageManager;