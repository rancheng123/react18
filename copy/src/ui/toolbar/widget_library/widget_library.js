__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetLibrary", function() { return WidgetLibrary; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toolbar */ "./ui/toolbar/toolbar.js");


/**
 * @class {WidgetLibrary} 工具库视图类
 * @author sxt 
 * @date  2019-9-23
 */

class WidgetLibrary {
  constructor(controler) {
    /**@property controler WidgetLibrary控制器实例 */
    this.controler = controler;
    this.menus = this.menus.bind(this);
    this.content = this.content.bind(this);
    this.anchor = this.anchor.bind(this);
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} props 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }
  /**
      * @method render 挂载组件方法
      * @date 2019-09-25
      * @author sxt
      * @return {object} 待渲染的组件对象
      */


  render() {
    const {
      public: {
        lang
      }
    } = window;
    let configType = this.controler.configType;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_toolbar__WEBPACK_IMPORTED_MODULE_1__["Toolbar"], {
      id: this.props.id,
      title: lang.add + this.state.current.name,
      help: this.controler.help.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.menus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.content, null), configType != "component" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.anchor, null) : null);
  }
  /**
   * @method close 关闭方法
   * @date 2019-12-05
   * @author wyq
   */


  close() {
    _toolbar__WEBPACK_IMPORTED_MODULE_1__["Toolbar"].close();
  }
  /**
      * @method menus 工具库右侧导航项
      * @date 2019-09-25
      * @author sxt
      * @return {object} 工具库右侧导航项结构
      */


  menus() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "toolFontit"
    }, this.controler.tabs.map((e, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: e.id,
        className: this.state.current.id != e.id ? null : "on",
        onClick: this.controler.selectTab.bind(this.controler, e)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, e.name)));
    }));
  }
  /**
      * @method componentHtml 组件库内容项
      * @date 2021-1-20 
      * @author sxt
      * @return {object} 组件库内容项结构
      */


  componentHtml() {
    let components = this.controler.group[this.state.current.id];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content_2 content blockbox",
      id: `component-${this.state.current.id}`,
      style: {
        position: "relative"
      }
    }, components.map((e, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: i
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "imgTopic"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "imgThemeStyle"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: e.skin,
        "data-key": e.skin,
        className: e.skinStyle || e.skin.split(".").slice(2, 4).join("-"),
        onMouseDown: this.controler.start.bind(this.controler, e.skin)
      }))));
    }));
  }
  /**
      * @method toolLibraryHtml 工具库内容项
      * @date 2021-1-20
      * @author sxt
      * @return {object} 工具库内容项结构
      */


  toolLibraryHtml() {
    let {
      tabs,
      group
    } = this.controler.group[this.state.current.id];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content_2 content",
      style: {
        position: "relative"
      }
    }, tabs.map((e, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: i
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        name: e.id
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "toolSmalltit",
        style: {
          position: "relative"
        },
        id: e.id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, e.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "imgTopic"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "imgThemeStyle"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        id: `em-${e.id}`
      }, group[e.id].map(t => {
        const {
          skin,
          videoPath,
          skinStyle
        } = t;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: skin,
          "data-key": skin,
          className: skinStyle || skin.split(".").slice(2, 4).join("-"),
          onMouseDown: this.controler.start.bind(this.controler, skin)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.video, {
          path: videoPath
        }), t.need_pay ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "component_pay"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null)) : null);
      })))));
    }));
  }
  /**
      * @method menus 工具库内容项
      * @date 2019-09-25
      * @author sxt
      * @return {object} 工具库内容项结构
      */


  content() {
    let configType = this.controler.configType; //类型为组件库时，走组件库的结构 sxt 2021-1-20

    if (configType == "component") {
      return this.componentHtml();
    } else {
      return this.toolLibraryHtml();
    }
  }
  /**
   * @method video 视频结构
   * @param {object} props 参数对象
   * @param {string} props.path 视频路径
   * @return {object} 视频结构
   */


  video(props) {
    if (props.path) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "desVideo",
        onMouseEnter: e => e.currentTarget.querySelector("video").play(),
        onMouseLeave: e => {
          const _video = e.currentTarget.querySelector("video");

          _video.currentTime = 0, _video.pause();
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("video", {
        style: {
          width: "100%",
          height: "60px"
        },
        src: props.path,
        loop: true
      }));
    }

    return null;
  }
  /**
      * @method menus 工具库锚点项
      * @date 2019-09-25
      * @author sxt
      * @return {object} 工具库锚点项结构
      */


  anchor() {
    let {
      current,
      jump,
      prompt
    } = this.state,
        {
      tabs
    } = this.controler.group[current.id];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "anchorsCon open"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "anchorsSection"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "anchorsMain"
    }, tabs.map((e, i) => {
      if (i == 0 && !jump) {
        jump = e.id;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: e + i,
        className: e.id != jump ? "" : "selected",
        "data-anchor-name": e.id,
        onMouseEnter: this.controler.anchorMouseEnter.bind(this.controler, e.id),
        onMouseLeave: this.controler.anchorMouseLeave.bind(this.controler, e.id)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#" + e.id,
        onClick: this.controler.jumpAnchor.bind(this.controler, e.id)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "anchorsPin"
      })), e.id != (prompt || jump) ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "anchor-popover"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, e.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null)));
    }))));
  }

}

//# sourceURL=webpack:///./ui/toolbar/widget_library/widget_library.js?