__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Page", function() { return Page; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");


/**
 * @class {Page} 页面视图类
 * @author wyq
 * @version 1.0
 * @date 2019-09-18
 */

class Page {
  constructor() {
    this.style = this.style.bind(this);
    this.fontStyle = this.fontStyle.bind(this);
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-21
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    let {
      state: {
        hidden,
        component: {
          documentType,
          children
        },
        data
      },
      props: {
        pages
      }
    } = this;
    let components = children.concat([]),
        pid = util__WEBPACK_IMPORTED_MODULE_1__["Util"].pid,
        page = pages[pid];

    if (hidden == undefined) {
      hidden = page.data.document_data[pid].hidden;
    }

    if (/top/.test(hidden)) {
      components.splice(0, 1);
    }

    if (/bottom/.test(hidden)) {
      components.splice(3, 1);
    }

    if (/all/.test(hidden)) {
      components.splice(0, 1);
      components.splice(2, 1);
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: documentType
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.style, {
      pid: pid
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "document-bg"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.fontStyle, {
      pid: pid
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].children, {
      components: components,
      data: data,
      page: page
    }));
  }
  /**
   * @method style 页面样式
   * @date 202-02-12
   * @author wyq
   * @param {object} props 参数对象
   * @param {string} props.pid 页面id
   * @return {object} 样式结构
   */


  style(props) {
    const {
      state: {
        component: {
          documentType: id
        },
        data: {
          design_data,
          theme_data
        }
      }
    } = this; //判断design_data数据是否存在

    if (design_data) {
      const background = design_data[props.pid]; //判断是否存在对应background数据

      if (background) {
        const {
          bgColor,
          uri,
          imgQuality = '',
          positionMode = '',
          posVal,
          attachment,
          opacity
        } = background;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", {
          id: `${id}_style`
        }, `.${id}-bg{
                                    ${bgColor ? `background-color:${bgColor};` : ''}
                                    ${uri ? `background:url(${uri + imgQuality}) ${positionMode};` : ''}
                                    ${posVal ? `background-position:${posVal};` : ''}
                                    ${attachment ? `background-attachment:${attachment};` : ''}
                                    ${opacity ? `opacity:${opacity};` : ''}
                               }
                               `);
      }

      return null;
    }

    return null;
  }

  fontStyle() {
    const {
      state: {
        component: {
          documentType: id
        },
        data: {
          theme_data
        }
      }
    } = this;

    if (theme_data) {
      const {
        SITE_HEADER: {
          style: {
            fontPageFamily
          }
        }
      } = theme_data;

      if (fontPageFamily) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", {
          id: `${id}_fontAllPageStyle`
        }, `
               .container {
                ${fontPageFamily ? `font-family:${fontPageFamily}` : ''}
               }
               #SITE_FOOTER {
                ${fontPageFamily ? `font-family:${fontPageFamily}` : ''}
               }

               #SITE_HEADER {
                ${fontPageFamily ? `font-family:${fontPageFamily}` : ''}
               }
               `);
      }

      return null;
    }

    return null;
  }

}

//# sourceURL=webpack:///./components/page/view/html/page.js?