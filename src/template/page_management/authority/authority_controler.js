__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthorityControler", function() { return AuthorityControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authority */ "./ui/page_management/authority/authority.js");
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * @class SeoControler seo控制器类
 * @author sxt
 */

class AuthorityControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {space} view 初始化 view 实例*/

    this.view = new _authority__WEBPACK_IMPORTED_MODULE_2__["Authority"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**@property {object} data 存储当前编辑的SEO数据*/


  /**
      * @method  render 挂载组件方法
      * @author wyq
      */
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
      * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
      * @author sxt
      */


  init() {
    const {
      props: {
        initialData = {}
      }
    } = this;
    this.state = initialData;
    let group = ["permis", "assignMember", "members"];
    this.state.group = group;
    this.state.membersArr = [];
  }

  getAjaxList() {
    let pid = this.state.pid,
        _this = this;

    let url = `${pageData.apiServiceUrl}index.php/grade/getPageGradeList?sid=${pageData.siteId}&pid=${pid}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        "webToken": pageData.webToken,
        'Content-Type': 'application/json;charset=UTF-8'
      } //body:JSON.stringify(ajaxData)

    }).then(response => response.json()).then(data => {
      let ajaxData = data.data;

      if (ajaxData) {
        let arr = ajaxData.arr || [],
            members = [],
            memberTitle = [];
        let membersArr = arr;

        for (let i = 0; i < arr.length; i++) {
          let value = arr[i].value,
              title = arr[i].title;
          membersArr[i].id = value; //面板结构解析要用id

          if (arr[i].isTrue) {
            members.push(value);
            memberTitle.push(title);
          }
        }

        let permisType = ajaxData.all ? "all" : "member",
            memberType = ajaxData.allMember == false ? "assignMembers" : "allMembers";

        if (ajaxData.all) {
          memberType = "allMembers";
        }

        _this.putState({
          "members": members,
          permisType: permisType,
          memberType: memberType,
          pid: pid
        });

        _this.setState({
          "membersArr": membersArr,
          memberTitle: memberTitle.join(",")
        });
      }
    });
  }

  componentDidMount() {
    this.getAjaxList();
  } //设置权限类型


  setPermisType(key, value) {
    //this.setState({[key]:value});
    this.putState({
      [key]: value
    }); //dataDef[key]=value;
  } //设置指定会员


  setMemberType(key, event) {
    let value = event.target.value;
    this.putState({
      [key]: value
    }); //dataDef[key]=value;
  } //获取选择名称


  getTitle(membersArr, members) {
    var titles = [];

    if (membersArr.length && members.length) {
      for (var i = 0; i < membersArr.length; i++) {
        let value = membersArr[i].value,
            title = membersArr[i].title;

        if (members && members.indexOf(value) != -1) {
          titles.push(title);
        }
      }

      return titles.join(",");
    }
  } //选择方法


  selectMemberList(prop, e) {
    let _class = e.currentTarget.className;
    let state = this.state || {},
        members = state.members || [];
    let newList = members.concat([]);

    if (_class.indexOf("on") == -1) {
      if (!newList.includes(prop.value)) {
        newList.push(prop.value);
      }
    } else {
      if (newList.includes(prop.value)) {
        newList.splice(newList.indexOf(prop.value), 1);
      }
    }

    let memberTitle = this.getTitle(state.membersArr, newList);
    let setData = {
      "members": newList
    };
    this.setState({
      memberTitle: memberTitle
    }); //let datas={...setData}

    this.putState(setData);
  } //点击显示方法


  clickMemberList(e) {
    let {
      showMember
    } = this.state,
        _isTrue = false;

    if (showMember) {
      _isTrue = false;
    } else {
      _isTrue = true;
    }

    this.setState({
      showMember: _isTrue
    });
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  /**
   * @method ensure 像后台发送SEO数据
   * @author wyq
   * @param {string} id 当前项id
   */


  static ensure(id) {
    const data = SeoControler.getData(id);
    let linkType = data.link_type,
        canonical_point = data.canonical_point; //自定义链接存在，并且选择的自定义类型，不包含http时，弹出提示

    if (canonical_point && linkType == "customLink" && canonical_point.indexOf("http") == -1) {
      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tool.ModalBox, {
        isunHelp: true,
        isCancel: true,
        isMask: true,
        ModalBox: "pageSaveTips",
        boxClass: " saveTips ",
        title: "prompt",
        texts: [window.public.lang["httpHelp"]],
        width: "360px",
        height: "200px",
        left: "calc(50% - 180px)",
        top: "calc(50% - 100px)"
      }), DOM.querySelector("#pageSaveTips"));
      return false;
    }

    if (data) {
      fetch(`${WIN.pageData.base}/Edit/index/editInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
        },
        body: data
      }).then(response => response.json()).then(data => {
        if (data.suc != 0) {
          react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tool.ModalBox, {
            isunHelp: true,
            isCancel: true,
            isMask: true,
            ModalBox: "pageSaveTips",
            boxClass: " saveTips ",
            title: "prompt",
            texts: [data.msg],
            width: "360px",
            height: "200px",
            left: "calc(50% - 180px)",
            top: "calc(50% - 100px)"
          }), DOM.querySelector("#pageSaveTips"));
        }
      });
    }
  }

}

_defineProperty(AuthorityControler, "data", null);

//# sourceURL=webpack:///./ui/page_management/authority/authority_controler.js?