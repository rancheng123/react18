/* eslint-disable */
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ruler", function() { return Ruler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class Ruler {
  constructor(controler) {
    /**@property controler header控制器实例 */
    this.controler = controler;
    this.ruler = this.ruler.bind(this);
    this.line = this.line.bind(this);
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} props 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }

  render() {
    //style = {{left:`calc((100% - ${window.public.minWidth}px) / 2)`}} 
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "auxiliary",
      style: {
        height: this.props.height
      }
    }, !this.state.hidden ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.ruler, {
      numbers: this.controler.horizontal,
      dir: "top",
      type: "guidHor"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.ruler, {
      numbers: this.controler.vertical,
      dir: "right",
      type: "guidVer"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "horizontal"
    }, this.getGuid("left")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "vertical"
    }, this.getGuid("top"))) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.line, null));
  }
  /**
  * @function getGuid 获取辅助线结构
  * @date 2020-02-26
  * @author sxt
  * @param {Object} n 当前组件类
  * @param {String} type 辅助线类型 
  * @return {String} 辅助线结构
  */


  getGuid(type, event) {
    let state = this.state || {};
    let _data = [],
        idName = "";

    if (type == "left") {
      _data = state.guidHor || [];
      idName = "guidHor-";
    } else {
      _data = state.guidVer || [];
      idName = "ediCuscol-";
    }

    return _data.map((e, i) => {
      let _id = e.id,
          _value = e.value;

      if (!_value) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _id.split("-")[0],
        key: _id,
        style: {
          [type]: _value
        },
        id: _id,
        "data-index": i
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cusLines"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cusLinCon"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "iconfont",
        "data-draggable": "true",
        onMouseDown: this.controler.start.bind(this.controler, type, _id, i)
      }, ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "cusLinNum"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "coordinte",
        placeholder: _value,
        onFocus: this.controler.focus.bind(this.controler, i),
        onBlur: this.controler.blur.bind(this.controler, i)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "px"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "iconfont",
        "data-emname": "del-guid",
        onClick: this.controler.delete.bind(this.controler, i, type)
      }, ""))));
    });
  }

  line() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ediLines"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ediConLines"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "eLines eLi3",
      style: {
        top: this.state.top
      }
    })));
  }

  ruler(props) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: props.dir + "Number",
      onClick: this.controler.addGuid.bind(this.controler, props.type)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "ruler" + props.dir
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "rul" + props.dir + "Num",
      style: props.style || null
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: props.dir + "Nber"
    }, props.numbers.map((e, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: i
    }, i * this.controler.space)))));
  }

}

//# sourceURL=webpack:///./system/function/ruler/ruler.js?