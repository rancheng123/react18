__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewControler", function() { return PreviewControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preview_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preview.js */ "./preview/preview.js");


class PreviewControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props = {}) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Preview} view 初始化 view 实例*/

    this.view = new _preview_js__WEBPACK_IMPORTED_MODULE_1__["Preview"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
  * @method render 挂载组件方法
  * @date 2019-08-16
  * @author wyq
  * @return {object} 待渲染的组件对象
  */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @author 
   */


  init() {
    let screenWidth = window.screen.width,
        winWidth = screenWidth,
        winHeight = window.screen.height,
        clientHeight = document.body.clientHeight;
    let rateValue = `${winWidth}x${winHeight}`; // let _rateList=[{value:"1024x768",name:"1024x768"},{value:"1280x800",name:"1280x800"},{value:"1366x768",name:"1366x768"},{value:"1440x900",name:"1440x900"},{value:"1600x1024",name:"1600x1024"},{value:"1680x1050",name:"1680x1050"},{value:"1920x1200",name:"1920x1200"},{value:"2560x1600",name:"2560x1600"}];
    // let _websiteList=[{value:"h5",name:"H5触屏站"},{value:"amp",name:"AMP站"},{value:"mip",name:"MIP站"}];

    let {
      domainName,
      previewParam = {},
      type,
      pid = ''
    } = pageData;
    let {
      resolvingPower,
      screenType
    } = previewParam,
        herfPid = "";

    if (pid) {
      herfPid = `/pid/${pid}`;
    }

    if (type == "mo" || type == "amp" || type == "mip") {
      domainName = `${domainName}${herfPid}/sitetype/${type}`;
      winWidth = "414px";
      winHeight = "736px";
      rateValue = `414x736`;
    } else {
      domainName = `${domainName}${herfPid}`;
    }

    this.state = {
      clientHeight: clientHeight - 48,
      defWidth: screenWidth,
      winWidth: winWidth,
      winHeight: winHeight,
      rateValue: rateValue,
      domainName: domainName,
      resolvingPowerList: resolvingPower,
      screenTypeList: screenType
    };
  }

  componentWillMount() {}
  /**
   * @method  getCode 获取二维码
   * @date 2020-6-24
   * @author sxt
   * @param {Object} prop 请求需要的参数
   */


  getCode(datas) {
    let _this = this;

    let url = `/desktop/index.php/Preview/getMakeQR?url=${this.state.domainName}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      } //body:JSON.stringify(ajaxData)

    }).then(response => response.json()).then(data => {
      if (data.suc == 0) {
        datas.codeImg = data.msg;

        _this.setState(datas);
      }
    });
  }
  /**
   * @method  showFn 点击显示方法
   * @date 2020-6-24
   * @author sxt
   * @param {Object} prop 请求需要的参数
   */


  showFn(type, e) {
    let show = this.state[type];
    let data = {
      rateShow: false,
      websiteShow: false,
      codeShow: false
    };
    data[type] = !show;

    if (type == "codeShow" && !show) {
      this.getCode(data);
    } else {
      this.setState(data);
    } // 阻止合成事件的冒泡


    e.stopPropagation(); // 阻止与原生事件的冒泡

    e.nativeEvent.stopImmediatePropagation();
  }
  /**
   * @method  clickClose 关闭所有面板方法
   * @date 2020-6-24
   * @author sxt
   * @param {Object} prop 请求需要的参数
   */


  clickClose(e) {
    let data = {
      rateShow: false,
      websiteShow: false,
      codeShow: false
    };
    this.setState(data); // 阻止合成事件的冒泡

    e.stopPropagation(); // 阻止与原生事件的冒泡

    e.nativeEvent.stopImmediatePropagation();
  }
  /**
  * @method  select 下拉选择方法
  * @date 2020-6-24
  * @author sxt
  * @param {String} key 数据键
  * @param {String} value 赋的值
  */


  select(key, value, e) {
    //let value=e.target.value;
    let pcview = document.querySelector(".pcview");
    let newKey = key + "Value",
        show = key + "Show";
    let data = {
      "rateValue": value,
      [show]: false
    };
    var href = parent.document.getElementById("previewIframe").contentWindow.location.href;
    let pid = (href.match(/pid\/([a-zA-Z0-9]+)/) || [])[1] || pageData.pid,
        herfPid = "";

    if (pid) {
      herfPid = `/pid/${pid}`;
    }

    let _domainName = pageData.domainName;

    if (value == "h5" || value == "amp" || value == "mip") {
      //414 736
      data.winWidth = "414px";
      data.winHeight = "736px";
      data.clientHeight = "736px";
      ;

      if (value == "h5") {
        data.domainName = `${_domainName}${herfPid}/sitetype/mo`;
      }

      if (value == "amp" || value == "mip") {
        data.domainName = `${_domainName}${herfPid}/sitetype/${value}`;
      }
    } else {
      let split = value && value.split("x") || ["1920", "768"],
          width = split[0],
          height = split[1];
      data.winWidth = width + "px";
      data.winHeight = height + "px";
      data.clientHeight = document.body.clientHeight - 48 + "px";
      data.domainName = `${_domainName}${herfPid}`;
      document.getElementById('previewIframe').contentWindow.location.reload();
    }

    this.setState(data);
  } //关闭方法


  previewClose() {
    let url = parent.document.getElementById("previewIframe").src;

    if (url) {
      window.location.href = url;
    }
  }

}

//# sourceURL=webpack:///./preview/preview_controler.js?