__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicAttribute", function() { return PublicAttribute; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _unit_config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./unit_config.json */ "./components/page/attr/unit_config.json");
var _unit_config_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./unit_config.json */ "./components/page/attr/unit_config.json", 1);




/**
 * @instance PublicAttribute 公用属性实例
 * @date 2020-05-20
 * @author wyq
 */

const PublicAttribute = {
  /**
   * @method unit 带单位选择滑块组件
   * @date 2020-05-13
   * @author wyq
   * @param {object} props 参数组件
   * @param {string} props.id 组件id
   * @param {string} props.title 组件名称
   * @param {string} props.sname 值属性key
   * @param {string} props.uname 单位属性key
   * @param {string} props.disabled 禁用选择框
   * @param {boolean} props.unpercent 是否不使用百分号单位
   * @param {boolean} props.unpx 是否不使用像素单位
   * @param {boolean} props.unrem 是否不使用rem单位
   * @param {boolean} props.unem 是否不使用em单位
   * @param {function} props.change 滑动滑块的处理方法
   * @param {function} props.onBlur 失去焦点时的处理方法 lw 2021-4-22
   * @return {object} 组件结构 
   */
  unit(props) {
    const {
      props: {
        prefix = '',
        id,
        node: {
          current: {
            type
          }
        }
      },
      state: {
        tab = ''
      }
    } = this;
    const sname = tab + props.sname,
          uname = tab + props.uname;
    const skey = prefix + sname,
          ukey = prefix + uname;
    const unit = this.state[ukey]; //单位存在，则返回滑块结构

    if (unit) {
      var _ref, _config$type, _unitList$props$uname, _ref2, _ref3, _ref4, _this$state$skey, _props$change;

      const unitList = Object.assign({}, _unit_config_json__WEBPACK_IMPORTED_MODULE_3__.public.ranges, (_ref = (_config$type = _unit_config_json__WEBPACK_IMPORTED_MODULE_3__[type]) === null || _config$type === void 0 ? void 0 : _config$type.ranges) !== null && _ref !== void 0 ? _ref : {}),
            {
        min,
        max,
        step
      } = (_unitList$props$uname = unitList[props.uname][unit]) !== null && _unitList$props$uname !== void 0 ? _unitList$props$uname : {};
      const value = (_ref2 = (_ref3 = (_ref4 = (_this$state$skey = this.state[skey]) !== null && _this$state$skey !== void 0 ? _this$state$skey : this.state[sname]) !== null && _ref4 !== void 0 ? _ref4 : props.defaultValue) !== null && _ref3 !== void 0 ? _ref3 : min) !== null && _ref2 !== void 0 ? _ref2 : 0;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Range, {
        id: props.id,
        title: props.title,
        value: value,
        min: min,
        max: max,
        step: step,
        unit: unit,
        disabled: props.disabled,
        blur: props.blur,
        units: [{
          name: 'px',
          value: 'px',
          hidden: props.unpx
        }, {
          name: 'rem',
          value: 'rem',
          hidden: props.unrem
        }, {
          name: 'em',
          value: 'em',
          hidden: props.unem
        }, {
          name: '%',
          value: '%',
          hidden: props.unpercent
        }],
        change: (_props$change = props.change) !== null && _props$change !== void 0 ? _props$change : this.controler.range.bind(this.controler, skey),
        selectChange: PublicAttribute.selectUnit.bind(this.controler, {
          skey,
          ukey,
          uname,
          selected: props.selected
        })
      });
    } //组件第一次加载完毕后执行


    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
      var _ref5, _config$type2, _ref6, _ref7, _this$state$puname, _classesList$props$un;

      //取配置列表
      const classesList = Object.assign({}, _unit_config_json__WEBPACK_IMPORTED_MODULE_3__.public.classes, (_ref5 = (_config$type2 = _unit_config_json__WEBPACK_IMPORTED_MODULE_3__[type]) === null || _config$type2 === void 0 ? void 0 : _config$type2.classes) !== null && _ref5 !== void 0 ? _ref5 : {});
      let puname = uname,
          fix = ''; //前缀存在且有拼mo，对前缀进行处理。

      if (prefix && prefix.indexOf('mo') != -1) {
        puname = prefix.substring(2), fix = 'mo';
      } //例：ukey是moclicktextSizeunit，这里则按clicktextSizeunit、motextSizeunit、textSizeunit顺序进行读取


      const unit = (_ref6 = (_ref7 = (_this$state$puname = this.state[puname]) !== null && _this$state$puname !== void 0 ? _this$state$puname : this.state[fix + uname]) !== null && _ref7 !== void 0 ? _ref7 : this.state[uname]) !== null && _ref6 !== void 0 ? _ref6 : ((_classesList$props$un = classesList[props.uname]) !== null && _classesList$props$un !== void 0 ? _classesList$props$un : [])[0];
      this.controler.setState({
        [ukey]: unit
      });
      dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${id}_set`, {
        args: [`theme_data.style.${ukey}`, unit]
      });
    }, []); //返回空

    return null;
  },

  /**
   * @method selectUnit 切换单位
   * @date 2020-05-13
   * @author wyq
   * @param {string} skey 值属性键
   * @param {string} ukey 单位属性键
   * @param {string} uname 单位键名
   * @param {object} event 事件对象
   */
  selectUnit({
    skey,
    ukey,
    uname,
    selected
  }, event) {
    var _ref8, _config$this$props$no, _, _classes$uname;

    const id = this.props.id;
    const classes = (_ref8 = (_config$this$props$no = _unit_config_json__WEBPACK_IMPORTED_MODULE_3__[this.props.node.current.type]) === null || _config$this$props$no === void 0 ? void 0 : _config$this$props$no.classes) !== null && _ref8 !== void 0 ? _ref8 : {};
    const hskey = skey.replace(/(mo)?/, '$1hover'),
          cskey = skey.replace(/(mo)?/, '$1click'); //拼选择器

    window.public.unit.selector = `#${id} ${(_ = ((_classes$uname = classes[uname]) !== null && _classes$uname !== void 0 ? _classes$uname : [])[1]) !== null && _ !== void 0 ? _ : ''}`;
    const value = event.target.value; //取转后的值

    const size = window.public.unit[value](this.state[skey], this.state[ukey], uname);
    let data = {
      [ukey]: value,
      [skey]: size
    }; //如果存在hover值，则对hover值进行单位转换

    this.state[hskey] != undefined && (data[hskey] = window.public.unit[value](this.state[hskey], this.state[ukey], uname), data[`${hskey}Unit`] = value); //如果存在click值，则对click值进行更换

    this.state[cskey] != undefined && (data[cskey] = window.public.unit[value](this.state[cskey], this.state[ukey], uname), data[`${cskey}Unit`] = value);
    this.setState({
      [ukey]: value,
      [skey]: size
    }); //单位更换之后触发回调

    selected && selected(data);
    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${id}_set`, {
      args: [`theme_data.style.`, data]
    });
  }

};

//# sourceURL=webpack:///./components/page/attr/public_attribute.js?