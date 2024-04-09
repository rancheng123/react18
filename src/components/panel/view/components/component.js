__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");


/**
 * @instance {Component} 控件公用HTML视图实例
 * @author wyq
 * @version 1.0
 * @date 2019-10-18
 */

const Component = {
  /**
   * @method icon 获取icon结构
   * @param {object} props 参数列表
   * @param {string} props.id 控件id
   * @param {object} props.icon 图标对象
   * @return {object} icon结构
   */
  icon(props) {
    if (props.icon == null) {
      return null;
    }

    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      type
    } = props; //判断是否存在图标icon

    if (iconName) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: `${id}Ic  ${id}${type} btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `${id}Ic btnIcon ${id}${type}`
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "btnImg lazyload",
        "data-src": iconSrc,
        src: util__WEBPACK_IMPORTED_MODULE_1__["Util"].source ? 'https://img.bjyyb.net/grey.png' : iconSrc
      }));
    } //返回null


    return null;
  },

  ampIcon(props) {
    if (props.icon == null) {
      return null;
    } //iconSize


    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      style = {}
    } = props;
    let {
      iconSize = 1.4,
      iconSizeUnit = "rem",
      moiconSize,
      moiconSizeUnit
    } = style;
    let imgFixed = moiconSize || iconSize,
        imgUnit = moiconSizeUnit || iconSizeUnit;

    if (imgUnit == "rem" || imgUnit == "em") {
      imgFixed = imgFixed * 10;
    } //判断是否存在图标icon


    if (iconName) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: `${id}Ic btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `${id}Ic btnIcon`
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("amp-img", {
        width: imgFixed,
        height: imgFixed,
        "data-amp-auto-lightbox-disable": "true",
        layout: "fixed",
        class: "btnImg",
        src: iconSrc
      }));
    } //返回null


    return null;
  },

  mipIcon(props) {
    if (props.icon == null) {
      return null;
    } //iconSize


    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      style = {}
    } = props;
    let {
      iconSize = 1.4,
      iconSizeUnit = "rem",
      moiconSize,
      moiconSizeUnit
    } = style;
    let imgFixed = moiconSize || iconSize,
        imgUnit = moiconSizeUnit || iconSizeUnit;

    if (imgUnit == "rem" || imgUnit == "em") {
      imgFixed = imgFixed * 10;
    } //判断是否存在图标icon


    if (iconName) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: `${id}Ic btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `${id}Ic btnIcon`
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("mip-img", {
        width: imgFixed,
        height: imgFixed,
        layout: "fixed",
        class: "btnImg",
        src: iconSrc
      }));
    } //返回null


    return null;
  },

  /**
  * @method getLinkHref 导航链接获取方法
  * @date 2019-12-30  17：06
  * @author sxt
  * @param {Object} prop  当前项数据
  * @param {String} target 页面打开方式
  * @return {Object} 拼接好的链接数据
  */
  getLinkHref(prop, target) {
    //页面类型为链接页面时
    if (prop.pageType == "JumpLink") {
      prop.link.target = target;
      return prop.link;
    } else {
      //页面链接时，拼接好数据，走页面链接类型
      return {
        url: prop.url,
        target: target,
        type: "externalLinks"
      };
    }
  },

  /**
  * @method menuLi li基本结构
  * @date 2019-12-30  17：06
  * @author sxt
  * @return {object} li基本结构
  */
  menuLi(prop) {
    let {
      component: {
        id
      },
      data: {
        menu_data: {
          menuList = []
        },
        document_data: {
          target = "_self",
          sort = "positive",
          icon = {},
          overflowPart = "textShow"
        }
      }
    } = prop.state;
    var tabstype = prop.tabtype,
        types = prop.type,
        topLevel = prop.topLevel;
    let {
      iconName = "",
      iconSrc
    } = icon;

    if (sort == "inverted") {
      menuList = [...menuList].reverse();
    } //sort栏目排序  倒序时把数组反转


    return menuList.map((e, i) => {
      let _selected = ""; //标注当前选中项

      if (e.isCurrent || i == 0) {
        _selected = "selected";
      } //在发布的时候拼接占位


      if (util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
        _selected = `{$navs_${e.pid || e.id}}`;
      }

      let link = Component.getLinkHref(e, target);

      let _liClass = e.child ? "mainLiChild" : ""; //子级存在时，添加class用于丽君修改样式 sxt 2021-6-22


      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: `${id}Li mainNavLi ${_liClass}`,
        key: e.id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].linkDecorator, {
        className: `${id}A mainNavLiA panel${overflowPart} ${_selected}`,
        link: link,
        type: types
      }, tabstype == "iconmo" && types == "html" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.icon, {
        id: id,
        icon: e.icon ? e.icon : null
      }) : null, tabstype == "iconmo" && types == "amp" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.ampIcon, {
        id: id,
        icon: e.icon ? e.icon : null
      }) : null, tabstype == "iconmo" && types == "mip" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.mipIcon, {
        id: id,
        icon: e.icon ? e.icon : null
      }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, e.name)), e.child ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "sideTrigger",
        type: "checkbox"
      }) : null, e.child && topLevel == undefined ? Component.forUlHtml({
        list: e.child,
        target: target,
        tabstype: tabstype,
        types: types,
        iconName: iconName,
        index: 1,
        id: id,
        overflowPart: overflowPart
      }) : null, e.child ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-icon"
      }, e.child && topLevel == undefined ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: `${id}i yiyingbaoicon`
      }, iconName) : null, " ") : null);
    });
  },

  /** 
  * @method forUlHtml 递归循环ul结构
  * @date 2019-12-30  17：06
  * @author sxt
  * @param {List} prop.list 子级列表
  * @param {String} prop.target 跳转页面类型
  * @return {object} 导航父级结构
  */
  forUlHtml(prop) {
    let {
      list = [],
      target,
      tabstype,
      types,
      iconName,
      index,
      id,
      overflowPart
    } = prop;

    let _index = parseInt(index) + 1; //{e.child?<i className=" yiyingbaoicon  FS8 pL1"></i>:null}
    //{/* {e.child?this.forUlHtml({list:e.child,target:target}):null} */}  panel，暂时只显示到二级 sxt 2020-3-4


    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: `panelSubMenu${_index} nav-submenu`
    }, list.map((e, i) => {
      let _selected = ""; //标注当前选中项

      if (e.isCurrent || i == 0) {
        _selected = "selected";
      } //在发布的时候拼接占位


      if (util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
        _selected = `{$navs_${e.pid || e.id}}`;
      }

      let link = Component.getLinkHref(e, target);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: e.id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].linkDecorator, {
        className: `nav-submenuA theme_fc theme_hvfc panel${overflowPart} ${_selected}`,
        link: link,
        type: types
      }, tabstype == "iconmo" && types == "html" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.icon, {
        id: e.id,
        icon: e.icon ? e.icon : null
      }) : null, tabstype == "iconmo" && types == "amp" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.ampIcon, {
        id: e.id,
        icon: e.icon ? e.icon : null
      }) : null, tabstype == "iconmo" && types == "mip" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.mipIcon, {
        id: e.id,
        icon: e.icon ? e.icon : null
      }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "subnavbtn"
      }, e.name)), e.child && _index <= 3 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "sideTrigger",
        type: "checkbox"
      }) : null, e.child && _index <= 3 ? Component.forUlHtml({
        list: e.child,
        target: target,
        tabstype: tabstype,
        types: types,
        id: id,
        iconName: iconName,
        index: _index,
        overflowPart: overflowPart
      }) : null, e.child && _index <= 3 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-icon"
      }, e.child ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: `${id}i yiyingbaoicon`
      }, iconName) : null, " ") : null);
    }));
  },

  /**
   * @method 
   * @date 2021-2-25
   * @author lw
  */
  slidingNav(prop) {
    let {
      component: {
        id
      },
      data: {
        menu_data: {
          menuList = []
        },
        document_data: {
          target = "_self",
          overflowPart = "textShow"
        }
      }
    } = prop.state;
    var tabstype = prop.tabtype,
        types = prop.type;
    return menuList.map((e, i) => {
      let _selected = ""; //标注当前选中项

      if (e.isCurrent || i == 0) {
        _selected = "selected";
      } //在发布的时候拼接占位


      if (util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
        _selected = `{$navs_${e.pid || e.id}}`;
      }

      let link = Component.getLinkHref(e, target);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "panelLi",
        key: e.id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].linkDecorator, {
        className: `${id}A mainNavLiA panel${overflowPart} ${_selected}`,
        link: link,
        type: types
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panelLiBox"
      }, tabstype == "iconmo" && types == "html" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.icon, {
        id: id,
        icon: e.icon ? e.icon : null
      }) : null, tabstype == "iconmo" && types == "amp" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.ampIcon, {
        id: e.id,
        icon: e.icon ? e.icon : null
      }) : null, tabstype == "iconmo" && types == "mip" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.mipIcon, {
        id: e.id,
        icon: e.icon ? e.icon : null
      }) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "pageName"
      }, e.name)));
    });
  }

};

//# sourceURL=webpack:///./components/panel/view/components/component.js?