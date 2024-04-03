// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageManager", function() { return PageManager; });
/**
 * @instance {PageManager} 页面管理工厂对象
 * @author wyq
 * @version 1.0
 * @date 2019-09-21
 */
const PageManager = {
  /**
   * @method createView 获取对应视图
   * @date 2019-09-21
   * @author wyq
   * @return 对应视图
   */
  getView(opts) {
    return __webpack_require__("./components/page/view lazy recursive ^\\.\\/.*\\/page$")(`./${opts.type}/page`).then(module => module.Page);
  },

  /**
   * @method createView 获取对应视图
   * @date 2019-09-21
   * @author wyq
   * @return 对应视图
   */
  getStyle() {
    return __webpack_require__.e(/*! import() */ 780).then(__webpack_require__.t.bind(null, /*! ./style/page */ "./components/page/style/page.json", 3)).then(module => module.default);
  }

};

export default PageManager
//# sourceURL=webpack:///./components/page/page_manager.js?