__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s411", function() { return s411; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");
/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/component */ "./components/panel/view/components/component.js");



function s411() {
  /**
   * @method basicPanel 基本侧导航样式 使用皮肤名称
   * @date 2020-3-4
   * @author sxt
   * @return {object} 基本侧导航样式HTML结构
   */
  const {
    state: {
      component: {
        id
      },
      data: {
        menu_data: {
          menuList = []
        },
        document_data: {
          target = "_self",
          icon = {}
        }
      }
    }
  } = this;
  let parClass = "editPanel"; //此class用于，编辑页面显示panel，sxt 2020-3-4

  if (util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
    parClass = '';
  }

  if (this.state.hidden == true || util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: id,
      className: `${parClass} panelLeftshow`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sideBasicPanel"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "panel-header"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "modal-close"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      role: "button",
      className: "TAR items-start navbar-trigger"
    }, "\u2715"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "moMenubox"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      id: "moMainnav",
      className: `${id}Ul mainNav`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_component__WEBPACK_IMPORTED_MODULE_2__["Component"].menuLi, {
      state: this.state,
      tabtype: "mo",
      type: "html"
    })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "opc"
    }));
  } else {
    return null;
  }
}

//# sourceURL=webpack:///./components/panel/view/mo/panel_s411_view.js?