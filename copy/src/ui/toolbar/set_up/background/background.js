__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Background", function() { return Background; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


/**
 * @class {Background} 背景视图类
 * @author wyq
 * @version 1.0
 * @date 2020-04-11
 */

class Background {
  constructor(controler) {
    /**@property controler 背景控制器实例 */
    this.controler = controler;
    this.backgroundThumb = this.backgroundThumb.bind(this);
    this.backgroundList = this.backgroundList.bind(this);
    this.backgroundType = this.backgroundType.bind(this);
    this.showColorPanel = this.showColorPanel.bind(this);
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
   * @date 2019-12-16
   * @author qxs
   * @return {object} 待渲染的组件对象
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "relative",
      style: {
        height: '174px'
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.backgroundThumb, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.backgroundType, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.backgroundList, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "panlBottom"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "contorlBtn",
      onClick: this.controler.showApplyPanel.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("font", null, window.public.lang.applyAllPage))));
  }
  /**
   * backgroundThumb
   */


  backgroundThumb() {
    const {
      uri,
      type,
      bgColor
    } = this.state;

    switch (type) {
      case 'Image':
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "stripSetBox"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Button, {
          btnName: window.public.lang["setUp"],
          click: this.controler.showImagePanel.bind(this.controler)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "stripBgColor",
          style: {
            backgroundColor: "#eee"
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: uri,
          width: "300",
          height: "174"
        }));

      case 'video':
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "stripSetBox"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "stripBgColor",
          style: {
            backgroundColor: "#eee"
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: uri,
          width: "300",
          height: "174"
        }));

      case 'BackgroundColor':
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            height: '134px',
            backgroundColor: bgColor
          }
        });

      default:
        return null;
    }
  }
  /**
   * backgroundList
   */


  backgroundList() {
    const imgList = ['stripv2.jpg', 'stripv3.jpg', 'stripv4.jpg', 'stripv5.jpg', 'stripv6.jpg', 'stripv7.jpg'];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      style: {
        overflow: 'auto',
        height: '410px'
      },
      className: "conStyle stripStyle"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, window.public.lang["chooseBackground"])), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.controler.backgroundColor.bind(this.controler, ''),
      className: "BgstyleList noBg"
    }, window.public.lang["noBackground"]), imgList.map((img, i) => {
      const _img = `http://img.bjyyb.net/pcbj/${img}`;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: i,
        className: "BgstyleList",
        onClick: this.controler.backgroundImage.bind(this.controler, _img, this.state, '400'),
        style: {
          backgroundImage: `url(${_img})`
        }
      });
    })));
  }
  /**
   * showColorPanel
   */


  showColorPanel() {
    document.querySelector('#backgroundColor>.backgroundColor>.fcolorpicker-curbox').click();
  }
  /**
   * backgroundType
   */


  backgroundType() {
    const {
      bgColor
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        display: 'flex'
      },
      className: "stripBtn"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ColorPicker, {
      id: "backgroundColor",
      title: "bgColor",
      basic: true,
      color: bgColor,
      change: this.controler.backgroundColor.bind(this.controler)
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Button, {
      btnName: window.public.lang["iconColor"],
      click: this.showColorPanel
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Button, {
      btnName: window.public.lang["image"],
      click: this.controler.selectImageShow.bind(this.controler)
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Button, {
      btnName: window.public.lang["video"],
      click: this.controler.selectVideoShow.bind(this.controler)
    }));
  }

}

//# sourceURL=webpack:///./ui/toolbar/set_up/background/background.js?