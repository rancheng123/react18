__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetUp", function() { return SetUp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toolbar */ "./ui/toolbar/toolbar.js");
/* harmony import */ var _fontFamily_fontFamily__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fontFamily/fontFamily */ "./ui/toolbar/set_up/fontFamily/fontFamily.js");




/**
 * @instance SetUp 设置实例
 * @date 2020-04-09
 * @author wyq
 */

const SetUp = {
  /**@property menus 显示导航项 */
  menus: [{
    type: 'background',
    title: 'bgSetUp'
  }, {
    type: 'fontFamily',
    title: 'fontSetting'
  }],

  /**
   * @method setUp 设置面板加载
   * @date 2020-04-09
   * @author wyq
   * @param {string} id 元素id
   */
  setUp(id) {
    const element = document.getElementById(id); //初始化页面边距

    this.page();
    element && react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SetUp.render, {
      id: id
    }), element);
  },

  /**
   * @method render 挂载组件方法
   * @date 2020-04-09
   * @author wyq
   * @return {object} 待渲染的组件对象
   */
  render(props) {
    const [index, setIndex] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
    const {
      type,
      title
    } = SetUp.menus[index]; //元素加载后执行

    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
      const fn = SetUp[type];
      fn && fn();
    }, [index]);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_toolbar__WEBPACK_IMPORTED_MODULE_2__["Toolbar"], {
      id: props.id,
      title: window.public.lang[title]
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "toolFontit"
    }, SetUp.menus.map(({
      type,
      title
    }, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: type,
        className: index != i ? null : 'on',
        onClick: () => setIndex(i)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang[title])));
    })), index == 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "set-up-content"
    }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fontFamily_fontFamily__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  },

  /**
   * @method background 背景设置
   * @date 2020-04-09
   * @author wyq
   */
  background() {
    const promise = __webpack_require__.e(/*! import() */ 1891).then(__webpack_require__.bind(null, /*! ./background/background_controler */ "./ui/toolbar/set_up/background/background_controler.js"));
    promise.then(({
      BackgroundControler
    }) => {
      BackgroundControler.background('set-up-content');
    });
  },

  /**
   * @method page 页面设置
   * @date 2020-04-09
   * @author wyq
   */
  page() {
    __webpack_require__.e(/*! import() */ 1899).then(__webpack_require__.bind(null, /*! ./page */ "./ui/toolbar/set_up/page.js")).then(({
      Page
    }) => {
      Page.exec();
    });
  }

};

//# sourceURL=webpack:///./ui/toolbar/set_up/set_up.js?