// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuManage", function () { return MenuManage; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var manage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! manage */ "./components/page/attr/manage/manage.js");
// /* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");

import React from 'react';
import Manage from '@/components/page/attr/manage/manage';
import Widget from '@/system/widgets/widget';


/**
 * @class MenuManage  导航项管理视图类
 */
export default class MenuManage extends Manage {
  constructor(controler) {
    super();
    this.controler = controler;
  }
  /**
   * @method customSubmenu 开启自定义次级导航结构
   * @return {object} 开启自定义次级导航结构
   */


  customSubmenu() {
    return React.createElement(Widget.Radio, {
      title: "customSubmenu",
      id: "customSubmenu",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: this.state.current.document_data.isSubmenu,
      change: this.controler.submenu.bind(this.controler)
    });
  }
  /**
   * @method showCustomSubmenu 显示自定义次级导航
   * @return 显示自定义次级导航结构
   */


  showCustomSubmenu() {
    //是否允许通过按钮弹出书香面板
    if (this.state.current.document_data.isSubmenu) {
      var _this$state$current$d;

      return React.createElement(Widget.Radio, {
        title: "showCustomSubmenu",
        id: "showCustomSubmenu",
        list: [{
          name: "yes",
          value: "true"
        }, {
          name: "no",
          value: "false"
        }],
        value: (_this$state$current$d = this.state.current.document_data.show) !== null && _this$state$current$d !== void 0 ? _this$state$current$d : false,
        change: this.controler.isShow.bind(this.controler)
      });
    }

    return null;
  }
  /**
   * @method button 显示属性面板按钮结构
   * @param {object} prop 参数对象
   * @return {object} 属性面板按钮结构  
   */
  button(prop) {
    //是否允许通过按钮弹出书香面板
    if (this.state.current.document_data.isSubmenu) {
      return React.createElement(Widget.Button, {
        title: prop.title,
        btnName: window.public.lang.clickShowPanel,
        click: this.controler.showPanel.bind(this.controler)
      });
    }

    return null;
  }

}


