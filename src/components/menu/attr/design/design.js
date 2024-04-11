__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Design", function() { return Design; });
/**
 * @method: Design 设计类
 * @author: sxt
 * @Date: 2019-12-30 17:35:58
 */
const Design = {
  /**
  * @description: 
  * @param {type} 
  * @return: void
  * @author: Eric
  * @Date: 2020-01-09 12:00:29
  */
  async space(opts) {
    const module = await Promise.all(/*! import() | menu_space_controler */[__webpack_require__.e(44), __webpack_require__.e("menu_space_controler")]).then(__webpack_require__.bind(null, /*! ./space/menu_space_controler */ "./components/menu/attr/design/space/menu_space_controler.js"));
    const MenuSpaceControler = await module.MenuSpaceControler();
    MenuSpaceControler.space(opts);
  },

  async levelnav(opts) {
    const module = await __webpack_require__.e(/*! import() */ 165).then(__webpack_require__.bind(null, /*! ./levelnav/menu_levelnav_controler */ "./components/menu/attr/design/levelnav/menu_levelnav_controler.js"));
    const MenulevelnavControler = await module.MenulevelnavControler();
    MenulevelnavControler.levelnav(opts);
  }

};

//# sourceURL=webpack:///./components/menu/attr/design/design.js?