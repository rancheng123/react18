__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return Icon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


class Icon {
  constructor(controler) {
    /**@property controler 边框控制器实例 */
    this.controler = controler; //unit 绑定this，实现伪继承

    this.unit = this.props.publicAttr.unit.bind(this);
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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcIconBox"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcConAttDesign"
    }, this.props.list.map((e, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: i,
      className: "pcAttList"
    }, this[e] && this[e]()))));
  }
  /**
   * @method size 文本大小结构
   * @author sxt
   * @return {object} 文本大小结构
   */


  size() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.unit, {
      id: "iconSize",
      title: "iconSize",
      sname: "iconSize",
      uname: "iconSizeUnit",
      unpercent: true,
      disabled: this.props.disableUnit
    });
  }
  /**
  * @method color 文本字体颜色结构
  * @author sxt
  * @return {object} 文本字体颜色结构
  */


  color() {
    const key = this.props.prefix + "iconColor";
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ColorPicker, {
      id: "iconColor",
      title: "iconColor",
      color: this.state[key] || this.state.iconColor || 'rgba(0,0,0,0)',
      change: this.controler.set.bind(this.controler, key)
    });
  }
  /**
  * @method iconBg Icon背景色结构
  * @author sxt
  * @date 2021-2-1
  * @return {object} Icon背景色结构
  */


  iconBg() {
    const key = this.props.prefix + "iconBgColor";
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ColorPicker, {
      id: "iconBgColor",
      title: "iconBgColor",
      color: this.state[key] || this.state.iconBgColor || 'rgba(0,0,0,0)',
      change: this.controler.set.bind(this.controler, key)
    });
  }
  /**
  * @method selectIcon 选择Icon结构
  * @date 2020-04-02
   * @author wyq 
  * @return {object} 选择Icon结构
  */


  selectIcon() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].SelectIcon, {
      id: "selectIcon",
      title: "selectIcon",
      icon: this.state[this.state.prefixIcon] || {},
      delIcon: this.controler.delIcon.bind(this.controler),
      click: this.controler.showIcon.bind(this.controler)
    });
  }
  /**
  * @method leftIcon 选择左侧Icon结构
  * @date 2021-02-02
  * @author sxt
  * @return {object} 选择左侧Icon结构
  */


  leftIcon() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].SelectIcon, {
      id: "leftIcon",
      title: "leftIcon",
      icon: this.state.lefticon || {},
      delIcon: this.controler.delIcon.bind(this.controler, "left"),
      click: this.controler.showIcon.bind(this.controler, "left")
    });
  }
  /**
  * @method rightIcon 选择右侧Icon结构
  * @date 2021-02-02
  * @author sxt
  * @return {object} 选择左侧Icon结构
  */


  rightIcon() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].SelectIcon, {
      id: "rightIcon",
      title: "rightIcon",
      icon: this.state.righticon || {},
      delIcon: this.controler.delIcon.bind(this.controler, "right"),
      click: this.controler.showIcon.bind(this.controler, "right")
    });
  } // "leftIcon":"左侧图标",
  // "rightIcon":"右侧图标",
  // "leftLink":"左侧链接",
  // "rightLink":"右侧链接",

  /**
   * @method link 设置链接
   * @author sxt
   * @param {object} 设置链接结构。
   */


  link() {
    const {
      state: {
        link
      }
    } = this;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ShowInfo, {
      title: "setUpLink",
      id: "set-up-link",
      value: link ? link.value : window.public.lang["addButtonLink"],
      click: this.controler.link.bind(this.controler)
    });
  }
  /**
   * @method leftLink 左侧设置链接
   * @author sxt
   * @param {object} 设置链接结构。
   */


  leftLink() {
    const {
      state: {
        leftlink
      }
    } = this;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ShowInfo, {
      title: "leftLink",
      id: "leftLink",
      value: leftlink ? leftlink.value : window.public.lang["addButtonLink"],
      click: this.controler.link.bind(this.controler, "left")
    });
  }
  /**
   * @method rightLink 右侧设置链接
   * @author sxt
   * @param {object} 设置链接结构。
   */


  rightLink() {
    const {
      state: {
        rightlink
      }
    } = this;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ShowInfo, {
      title: "rightLink",
      id: "rightLink",
      value: rightlink ? rightlink.value : window.public.lang["addButtonLink"],
      click: this.controler.link.bind(this.controler, "right")
    });
  }
  /**
   * @method dataText 数据源文本   
   * @author sxt
   * @param {object} 更改数据源内容
   */


  dataText() {
    const {
      dataSource = {},
      selectionContent
    } = this.state || {};
    let _value = window.public.lang["selectDataSource"];

    if (selectionContent == "databaseData") {
      if (dataSource.sourceType) {
        _value = `${dataSource.sourceText}>${dataSource.companyName || window.public.lang["pleaseChoose"]}`;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ShowInfo, {
        title: "dataSources",
        id: "",
        value: _value,
        click: this.controler.showDataSource.bind(this.controler)
      });
    }

    return null;
  }

}

//# sourceURL=webpack:///./components/page/attr/design/icon/icon.js?