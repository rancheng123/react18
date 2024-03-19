__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MouseRightClickMenu", function() { return MouseRightClickMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");


class MouseRightClickMenu {
  constructor(controler) {
    /**@property controler 边框控制器实例 */
    this.controler = controler;
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} state 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }
  /**
   * @method render 组件渲染方法
   * @author sxt
   * @return {object} 待渲染的组件对象
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.rightClick());
  }
  /**
   * @method rightClick 右键菜单增加控件选中功能结构
   * @author lby
   * @return {object} 右键菜单
   * @data 2020-06-10
   * 
   * @modifyAuthor lw
   * @data 2021-1-5
   */
  // {arr.map(item => <li id={item.id} key={item.id} onMouseDown={this.controler.rightClick.bind(this.controler)} >{ item.name??window.public.getName(item.type)}</li>)}


  rightClick() {
    let arr = this.state.data ? this.state.data : [];

    if (arr && arr.length != 0) {
      let _marginLeft = '-10px';

      if (window.public.type == "pc") {
        let winW = window.innerWidth,
            left = this.state.style.left || winW,
            rightClickWidth = 210 + 130; //

        if (winW - left <= rightClickWidth) {
          _marginLeft = '-340px';
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "rightClick",
        onMouseMove: this.controler.theMouseMove.bind(this.controler),
        style: {
          'display': 'block',
          'position': 'absolute',
          'left': this.state.style.left,
          'bottom': this.state.style.bottom,
          'right': this.state.style.right,
          'top': this.state.style.top
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "rightClick-popUp"
      }, this.controler.Property_panel_list.map((e, i) => {
        if (e) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
            key: i,
            className: e.iconClass,
            title: e.title,
            id: e.event,
            onMouseDown: e.event ? this.controler[e.event].bind(this.controler) : null
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, e.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: e.iconC
          }, e.name, e.iconC ? "" : ''), e.secondary ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
            className: "rightClick rightclickCascade",
            style: {
              'position': 'absolute',
              'left': '100%',
              'top': '-15px',
              'marginLeft': _marginLeft,
              'zIndex': '1'
            }
          }, arr.map(item => {
            var _item$name;

            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
              id: item.id,
              key: item.id,
              onMouseDown: this.controler.rightClick.bind(this.controler)
            }, (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : window.public.getName(item.type));
          })) : null);
        }

        return null;
      })));
    }

    return null;
  }

}

//# sourceURL=webpack:///./system/function/mouse_right_click_menu/mouse_right_click_menu.js?