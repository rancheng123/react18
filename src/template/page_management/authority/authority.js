__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Authority", function() { return Authority; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);



/**
 * @class Authority 权限结构类
 * @author sxt
 */

class Authority {
  constructor(controler) {
    /**@property controler seo控制器实例 */
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
   * @method render 视图入口方法
   * @author sxt
   * @return {object} 组件结构
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "picMian pageAuthority galteCon",
      style: {
        display: "block"
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcConAttDesign"
    }, this.state.group.map(e => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: e,
        className: "pcAttList"
      }, this[e]());
    })));
  }
  /**
   *@method permis 权限
   *@author sxt
   *@return {object} 标题结构 
   */


  permis() {
    let permisType = this.state.permisType;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "permisionBox"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, window.public.lang["whoViewAuthority"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "permisionUl"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: permisType == "all" ? "on" : null,
      onClick: this.controler.setPermisType.bind(this.controler, "permisType", "all")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "http://img.bjyyb.net/pc/permisionicon1.jpg"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, window.public.lang["allPeople"])), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: permisType == "member" ? "on" : null,
      onClick: this.controler.setPermisType.bind(this.controler, "permisType", "member")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "http://img.bjyyb.net/pc/permisionicon2.jpg"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, window.public.lang["membersOnly"]))), permisType == "all" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "tips"
    }, window.public.lang["visibleToAll"]) : null, permisType == "member" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "tips"
    }, window.public.lang["authorityHelp"]) : null);
  }
  /**
   * @method member 指定会员类型
   * @author sxt
   * @return {object} 指定会员类型结构
   */


  assignMember() {
    let permisType = this.state.permisType;

    if (permisType == "member") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Radio, {
        title: "assignMember",
        id: "",
        list: [{
          name: "allMembers",
          value: "allMembers"
        }, {
          name: "assignMembers",
          value: "assignMembers"
        }],
        value: this.state.memberType,
        change: this.controler.setMemberType.bind(this.controler, "memberType")
      });
    } else {
      return null;
    }
  }
  /**
   * @method members 会员组选择
   * @author wyq
   * @return {object} 描述结构
   */


  members() {
    let state = this.state;
    let permisType = state.permisType,
        memberType = state.memberType,
        memberTitle = state.memberTitle,
        membersArr = state.membersArr,
        members = state.members,
        showMember = state.showMember;

    if (permisType == "member" && memberType == "assignMembers") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "chooseMember"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ComboBoxData, {
        isSearch: false,
        title: "selectMembers",
        isShow: showMember,
        setList: membersArr,
        name: "title",
        className: "dataRangeList",
        click: this.controler.clickMemberList.bind(this.controler),
        select: this.controler.selectMemberList.bind(this.controler),
        dataName: memberTitle || window.public.lang["pleaseChoose"],
        dataId: members
      }));
    } else {
      return null;
    }
  }

}

//# sourceURL=webpack:///./ui/page_management/authority/authority.js?