import React from 'react'

/**
 * @method Container 容器组件，存放属性组件的外层结构
 * @date 2019-08-28
 
 * @param {object} prop 属性对象
 * @param {string} prop.skin 通过皮肤定义组件样式 
 * @param {string} prop.title 属性名称
 * @param {string} prop.help  提示文本
 * @param {string} prop.unit  单位
 * @param {object} prop.children 子元素结构
 * @return 属性组件外层结构
 */

function Container(prop) {
  var _window$public$lang$p;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: prop.skin || null
  }, prop.title ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
    className: "pcConAttTitle "
  }, window.public.lang[prop.help] && prop.help ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Help, {
    help: prop.help
  }) : null, (_window$public$lang$p = window.public.lang[prop.title]) !== null && _window$public$lang$p !== void 0 ? _window$public$lang$p : prop.title, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, prop.unit ? ` (${prop.unit})` : "")) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pcConAttCon"
  }, prop.children));
}
/**
 * @method Help 帮助信息
 * @author sxt
 * @date  2019-8-24
 * @param {object} prop 属性对象
 * @param {string} prop.skin 通过皮肤定义组件样式 
 * @param {string} prop.help 提示文本
 * @return {object} 帮助信息组件结构
 */


function Help(prop) {
  const title = window.public.lang[prop.help]; // onMouseEnter = {e=>$(e.currentTarget).tooltip()} 不引jq无法调取事件（存在的问题）

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: prop.skin || "helpcon",
    title: title,
    "data-placement": "bottom",
    "data-original-title": title
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/desktop/Public/images/controlProperty/help.png",
    className: "helpImg"
  }));
}
/**
 * @method function Input 输入组件
 * @author sxt 
 * @date  2019-8-24
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.help 提示文本
 * @param {string} prop.title -属性名称
 * @param {string} prop.id -属性id
 * @param {string} prop.readonly 标识值是否为只读，是则传"readonly",否则不传
 * @param {number} prop.value -当前输入的值
 * @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
 * @param {object} prop.children 子元素结构
 * @param {function} prop.change -输入值时触发的事件处理函数
 * @param {function} prop.blur   -失去焦点事件处理函数
 * @param {string} prop.type -输入框类型
 * @param {number} prop.max -当前输入的值
 * @param {number} prop.min -当前输入的值
 * @param {boolean} prop.maxlength  -限制的最大输入字符
 * @return {object} 输入框结构
 */


function Input(prop) {
  var _prop$type, _prop$min, _prop$max, _prop$maxlength;

  const input = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "pcInputTextStyle",
    id: prop.id || null,
    type: (_prop$type = prop.type) !== null && _prop$type !== void 0 ? _prop$type : 'text',
    readOnly: prop.readonly || null,
    placeholder: prop.placeholder || "",
    value: prop.value,
    help: prop.help || '',
    min: (_prop$min = prop.min) !== null && _prop$min !== void 0 ? _prop$min : null,
    max: (_prop$max = prop.max) !== null && _prop$max !== void 0 ? _prop$max : null,
    onBlur: prop.blur || null,
    onChange: prop.change || null,
    maxlength: (_prop$maxlength = prop.maxlength) !== null && _prop$maxlength !== void 0 ? _prop$maxlength : null
  });

  if (prop.basic) {
    return input;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help
  }, input, prop.maxlength ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "maxlengthInput"
  }, prop.value.length, "/", prop.maxlength) : null, prop.children);
}
/**
 * @method function Textarea 文本域组件
 * @author sxt 
 * @date  2019-8-24
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.help 提示文本
 * @param {string} prop.title -属性名称
 * @param {string} prop.id -属性id
 * @param {string} prop.readonly 标识值是否为只读，是则传"readonly",否则不传
 * @param {number} prop.value -当前输入的值
 * @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
 * @param {function} prop.change -输入值时触发的事件处理函数
 * @param {function} prop.blur   -失去焦点事件处理函数
 * @return {object} 输入框结构
 */


function Textarea(prop) {
  var _prop$maxlength2;

  const textarea = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    className: "pcInputTextStyle pcTextarea",
    id: prop.id || null,
    type: "text",
    readOnly: prop.readonly || null,
    placeholder: prop.placeholder || "",
    value: prop.value || "",
    onChange: prop.change || null,
    onBlur: prop.blur || null,
    maxlength: (_prop$maxlength2 = prop.maxlength) !== null && _prop$maxlength2 !== void 0 ? _prop$maxlength2 : null
  });

  if (prop.basic) {
    return textarea;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help
  }, textarea, prop.maxlength ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "maxlengthTextarea"
  }, prop.value.length, "/", prop.maxlength) : null);
}
/**
 * @method function Radio 单选组件
 * @author sxt
 * @date  2019-8-24
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.help 提示文本
 * @param {string} prop.title -属性名称
 * @param {string} prop.id -属性id
 * @param {string} prop.value -属性当前选中项的值
 * @param {array} prop.list -选项列表
 * @param {boolean} prop.showName 是否在每一单选项上显示选项名称
 * @param {boolean} prop.isLang   是否启用语言包 true不启用语言包  默认false
 * @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
 * @param {function} prop.change -单项选择值发生变化时触发的事件处理函数
 * @return {object} 单项选择组件结构
 */


function Radio(prop) {
  const radio = prop.list.map((e, i) => {
    let propValue = prop.value;

    if (typeof e == "object") {
      var {
        name,
        value
      } = e;
    } else {
      var name = e,
          value = e;
    }

    if (propValue == undefined) {
      propValue = "false";
    }

    if (typeof propValue == "boolean") {
      propValue = propValue.toString();
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      key: i,
      className: "em-radio-label"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "radio",
      name: prop.id,
      id: `${prop.id}-${value}`,
      checked: value != propValue ? "" : "checked",
      value: value,
      onChange: prop.change || null
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "radio-Select"
    }, prop.showName ? name : null), name ? prop.isLang ? name : window.public.lang[name] : null);
  });

  if (prop.basic) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: prop.skin || `em-radio-component`
    }, radio);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin || `em-radio-component`,
    title: prop.title,
    help: prop.help
  }, radio);
}
/**
 * @method function Button 按钮组件
 * @author sxt
 * @date  2019-8-24
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.help 提示文本
 * @param {string} prop.title -属性名称
 * @param {string} prop.btnName 按钮名称
 * @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
 * @param {function} prop.click -单项选择值发生变化时触发的事件处理函数
 * @return {object} 按钮组件结构
 */


function Button(prop) {
  const button = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "em-button-component",
    onClick: prop.click
  }, prop.btnName);

  if (prop.basic) {
    return button;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help
  }, button);
}
/**
 * @method function Range 划块组件
 * @author sxt 
 * @date   2019-8-24
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.title -属性名称
 * @param {string} prop.id -属性id
 * @param {number} prop.step -每次拖拽增长的间隙
 * @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
 * @param {nubmer} prop.min -拖拽范围最小值
 * @param {number} prop.max -拖拽范围最大值
 * @param {number} prop.value -拖拽的值
 * @param {string} prop.unit  -单位
 * @param {array} prop.units -单位列表
 * @param {disabled} prop.disabled -禁用选择框
 * @param {function} prop.selectChange -选择处理函数
 * @param {function} prop.change -拖拽范围值发生变化时触发的事件处理函数
 * @param {function} prop.onBlur -失去焦点时触发的事件处理函数 lw 2021-4-22
 * @return {object} 拖拽范围结构
 */


function Range(prop) {
  var _prop$children;

  const range = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: `em-drag-slider${prop.units ? ' em-drag-select-slider' : ''}`
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "range",
    className: "slider-range-input",
    step: prop.step || 1,
    min: prop.min || 0,
    max: prop.max,
    value: prop.value,
    onChange: prop.change,
    onBlur: prop.blur
  }), React.createElement("input", {
    type: "number",
    className: "slider-number-input",
    step: prop.step || 1,
    min: prop.min || 0,
    max: prop.max,
    value: prop.value,
    onChange: prop.change,
    onBlur: prop.blur || null
  }), prop.units ? React.createElement(Select, {
    basic: true,
    isChoose: true,
    list: prop.units,
    value: prop.unit,
    disabled: prop.disabled,
    change: prop.selectChange
  }) : null, prop.units == undefined && prop.unit ? React.createElement("span", {
    className: "unitNumber"
  }, prop.unit) : null); //如果basic为true只返回基本结构

  if (prop.basic) {
    return range;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help
  }, range, (_prop$children = prop.children) !== null && _prop$children !== void 0 ? _prop$children : null);
}
/**
 * @method function Select 下拉选择组件
 * @author sxt 
 * @date   2019-8-24
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.title -属性名称
 * @param {string} prop.id -属性id
 * @param {number} prop.value -当前选择的值
 * @param {array} prop.list -选项列表
 * @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
 * @param {boolean} prop.isChoose -是否显示请选择选项
 * @param {boolean} prop.disabled -是否禁用选择框
 * @param {function} prop.change -拖拽范围值发生变化时触发的事件处理函数
 * @return {object} 下拉选择组件结构
 */


function Select(prop) {
  const select = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "em-select-box",
    id: prop.id,
    value: prop.value || "",
    disabled: prop.disabled,
    onChange: prop.change
  }, prop.isChoose ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: ""
  }, window.public.lang["pleaseChoose"]), prop.list.map((e, i) => e.hidden != true ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: i,
    label: e.name,
    value: e.value
  }, e.name) : null)); //如果basic为true只返回基本结构

  if (prop.basic) {
    return select;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    help: prop.help,
    title: prop.title
  }, select);
}
/**
 * @method function  OnOff 开关组件
 * @author sxt 
 * @date   2019-8-24
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.title -属性名称
 * @param {boolean} prop.checked -当前选择的值
 * @param {function} prop.change -拖拽范围值发生变化时触发的事件处理函数
 * @return {object} 开关组件组件结构
 */


function OnOff(prop) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "em-on-off switchBtn btnColor"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    onChange: prop.change,
    checked: prop.checked,
    className: "input input-switch"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "statusBtn"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "closeBtn"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "▁")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "openBtn"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "✔")))));
}
/**
 * @method ShowInfo 显示信息组件
 * @author sxt 
 * @date   2019-8-24
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.title -属性名称
 * @param {string} prop.btnTitle -按钮名称
 * @param {string} prop.id -属性id
 * @param {number} prop.value -要显示的信息
 * @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
 * @param {boolean} prop.unuseArrow -是否使用三角Icon，true 不使用 false 使用，默认false
 * @param {string} prop.icon -icon图标名称
 * @param {string} prop.iconClass -引用图标需要使用的class
 * @param {function} prop.click -点击触发的事件处理函数，只有unuseArrow为false时，需要传此参数
 * @param {function} prop.btnClick -点击按钮触发的事件处理函数，只有isButton为true时，需要传此参数
 * @return {object} 显示信息结构
 */


function ShowInfo(prop) {
  const show = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setDataP",
    onClick: prop.click
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "pcsetDataSource"
  }, prop.value), !prop.unuseArrow ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "iconBor" + (prop.iconClass ? " " + prop.iconClass : "")
  }, prop.icon || "▼") : null), prop.isButton ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "pcwindow.publicButton",
    onClick: prop.btnClick
  }, window.public.lang[prop.btnTitle]) : null);

  if (prop.basic) {
    return show;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help,
    children: show
  });
}
/**
 * @method function SelectIcon 选择Icon组件
 * @author sxt
 * @date   2019-8-24
 * @param {object} prop 参数对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.title 属性名称
 * @param {object} prop.icon 选中项的icon的所有数据（iconName，iconClass，iconSrc）
 * @param {string} prop.help 帮助信息
 * @param {function} prop.click -事件处理函数
 * @return {object} 对齐方式结构
 */


function SelectIcon(prop) {
  let icon = prop.icon || {};
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help,
    children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "btnIconDiv"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: `pcBtnBg OperatingImg yiyingbaoicon`,
      style: {
        lineHeight: "35px",
        background: icon.iconSrc
      }
    }, icon.iconName ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, icon.iconName) : null, icon.iconSrc ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: icon.iconSrc
    }) : null), prop.delIcon ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "iconClose"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      width: "17",
      onClick: prop.delIcon || null,
      src: "http://www.eyingbao.com/system/webdesign/images/createWebClose.png",
      style: {
        "cursor": "pointer"
      }
    })) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "text",
      className: "publicButton",
      onClick: prop.click
    }, window.public.lang["choice"]))
  });
}
/**
 * @method function Align 对齐方式组件
 * @author sxt
 * @date   2019-8-24
 * @param {object} prop 参数对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.id 唯一标识
 * @param {string} prop.title 属性名称
 * @param {string} prop.value 选中项的值
 * @param {function} prop.change -事件处理函数
 * @return {object} 对齐方式结构 
 */


function Align(prop) {
  const {
    skin = '',
    title,
    value,
    id,
    componentType
  } = prop;
  let list = [{
    value: "left"
  }, {
    value: "center"
  }, {
    value: "right"
  }];

  if (componentType == "em-Text") {
    //只有类型为文本时才会存在两端对齐 lw 2021-4-6
    list = [{
      value: "left"
    }, {
      value: "center"
    }, {
      value: "right"
    }, {
      value: "justify"
    }];
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: `em-align-select ${skin}`,
    title: title
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
    readonly: "readonly",
    basic: true,
    value: window.public.lang[value]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "pcBoxAlign"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Radio, {
    list: list,
    basic: true,
    value: prop.value,
    id: id,
    skin: "em-align-radio",
    change: prop.change
  })));
}
/** 
* @method SelectImage 选择图片组件
* @author sxt
* @date   2019-8-24
* @param {object} prop -属性对象
* @param {string} pro.skin 通过皮肤定义组件样式 
* @param {string} prop.src -图片路径
* @param {string} prop.ratio -图片比例
* @param {string} prop.title -属性名称
* @param {boolean} prop.click -点击的事件
* @return {object} -选择图片属性结构 
*/


function SelectImage(prop) {
  let {
    src,
    ratio = ""
  } = prop;

  if (src && src.indexOf("sites") != -1) {
    src = src.indexOf("@") != -1 ? src.replace(/@[\w]+/, "@jw120") : src + "@jw120";
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help,
    children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcConChangeImg",
      onClick: prop.click
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcClick_img_sel"
    }, src ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: src,
      className: "pcSelect_img"
    }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "pcSelect_middel_span"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "pcSelectImg"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "pcImgSizeMass"
    }, ratio.split(";")[0]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "pcTitle_xzimg"
    }, window.public.lang["clickChangeImage"])))
  });
}
/**
 * @method ImageQuality 图片质量组件
 * @author sxt
 * @date   2019-8-24
 * @param {object} prop -属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {data} prop.data -图片数据
 * @param {function} prop.change -修改触发的事件处理函数
 * @return {object} -图片质量属性结构
 */


function ImageQuality(prop) {
  var _ref, _data$, _prop$prefix;

  let _data = prop.data || {};

  const quality = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
    id: "imageQuality",
    unuseLi: true,
    basic: true // mo端先读mo质量，没有再读pc质量值
    ,
    value: (_ref = (_data$ = _data[`${(_prop$prefix = prop.prefix) !== null && _prop$prefix !== void 0 ? _prop$prefix : ''}quality`]) !== null && _data$ !== void 0 ? _data$ : _data['quality']) !== null && _ref !== void 0 ? _ref : "original",
    list: [{
      name: "100px",
      value: "100"
    }, {
      name: "200px",
      value: "200"
    }, {
      name: "400px",
      value: "400"
    }, {
      name: "600px",
      value: "600"
    }, {
      name: "800px",
      value: "800"
    }, {
      name: "1000px",
      value: "1000"
    }, {
      name: "1200px",
      value: "1200"
    }, {
      name: "1400px",
      value: "1400"
    }, {
      name: "1600px",
      value: "1600"
    }, {
      name: "2000px",
      value: "2000"
    }, {
      name: window.public.lang["original"],
      value: "original"
    }],
    change: prop.change
  }), _data.dataSize ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "pcInputTextStyle",
    type: "text",
    readOnly: "readonly",
    placeholder: (_data.dataSize || "") + "KB"
  }) : false);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    help: prop.help,
    title: "imageQuality"
  }, quality);
}
/**
 * @method OriginalFormat 图片原格式属性
 * @author sxt
 * @param {object} prop 属性对象
 * @param {data} prop.data -图片数据
 * @param {string} prop.change -修改触发的事件处理函数 
 * @return {object} 属性结构
 */


function OriginalFormat(prop) {
  var _ref2, _data$2;

  const prefix = prop.prefix;

  let _data = prop.data || {}; //_data.uri && _data.uri.indexOf("jpg") != -1 ||  只有是等于原格式时，才不显示原格式属性，正常的图片都显示原格式属性 sxt 2021-3-29


  if (_data[`${prefix}quality`] == "original") {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Radio, {
    title: "originalFormat",
    id: "originalFormat",
    value: (_ref2 = (_data$2 = _data[`${prefix !== null && prefix !== void 0 ? prefix : ''}dataRetain`]) !== null && _data$2 !== void 0 ? _data$2 : _data['dataRetain']) !== null && _ref2 !== void 0 ? _ref2 : "noRetain",
    list: [{
      name: "retain",
      value: "retain"
    }, {
      name: "noRetain",
      value: "noRetain"
    }],
    change: prop.change
  });
}
/**
* @method ColorPicker 调色板组件
* @author sxt 
* @date  2019-8-24
* @param {object} prop 参数对象
* @param {string} prop.skin 通过皮肤定义组件样式
* @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
* @param {string} prop.title 属性名称
* @param {string} prop.id id值
* @param {string} prop.color 默认颜色值
* @param {function} prop.change 修改颜色方法
* @return {object} 调色板组件结构
*/


function ColorPicker(prop) {
  const [color] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(prop.color); //渲染调用方法，

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const typeList = ['em-Button', 'em-Text', 'em-Box', 'em-Component']; //控制控件显示渐变色

    const colorTypeOption = typeList.indexOf(prop.componentType) > -1 ? true : false;
    const colorData = color && color != "rgba(0,0,0)" ? color : color == "rgba(0,0,0)" ? "rgba(0,0,0,0)" : color;
    var xncolorPicker = new XNColorPicker({
      color: colorData,
      selector: "#" + prop.id + ">." + prop.id,
      showprecolor: true,
      //显示预制颜色
      prevcolors: ['#ffffff', '#000000', "#485368", "#2972f4", "#00a3f5", "#319b62", "#de3c36", "#f88825", "#f5c400", "#9a38d7", "#f2f2f2", "#7f7f7f", "#f3f5f7", "#e5efff", "#e5f6ff", "#eafaf1", "#ffe9e8", "#fff3eb", "#fff9e3", "#fdebff", "#d8d8d8", "#595959", "#c5cad3", "#c7dcff", "#c7ecff", "#c3ead5", "#ffc9c7", "#ffdcc4", "#ffeead", "#f2c7ff", "#bfbfbf", "#3f3f3f", "#808b9e", "#99beff", "#99ddff", "#98d7b6", "#ff9c99", "#ffba84", "#ffe270", "#d58eff", "#a5a5a5", "#262626", "#353b45", "#1450b8", "#1274a5", "#277c4f", "#9e1e1a", "#b86014", "#a38200", "#5e2281", "#939393", "#0d0d0d", "#24272e", "#0d3271", "#0c306e", "#184e32", "#58110e", "#5c300a", "#665200", "#3b1551"],
      //预制颜色，不设置则默认
      showhistorycolor: true,
      //显示历史
      historycolornum: 20,
      //历史条数
      format: 'hex',
      //rgba hex hsla,初始颜色类型
      showPalette: true,
      //显示色盘
      show: false,
      //初始化显示
      lang: 'cn',
      // cn 、en
      colorTypeOption: (prop.id == 'bgColor' || prop.id == 'backgroundColor') && colorTypeOption ? 'single,linear-gradient' : 'single',
      canMove: false,
      //选择器位置是否可以拖拽
      alwaysShow: false,
      autoConfirm: true,
      onError: function (e) {},
      onCancel: function (color) {
        document.querySelector(".fcolorpicker").remove();
      },
      onChange: function (e) {
        prop.change(e.colorType == "single" ? e.color.rgba : e.color.str, colorTypeOption);
      },
      onConfirm: function (e) {
        prop.change(e.colorType == "single" ? e.color.rgba : e.color.str, colorTypeOption);
      }
    }); //清除方法
  }, [color]);
  const picker = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: prop.id,
    className: "em-color-picker"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: prop.id,
    style: {
      padding: '5px'
    }
  }));

  if (prop.basic) {
    return picker;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title
  }, picker);
}
/**
 * @method function Search 搜索组件
 * @author sxt 
 * @date  2019-8-24
 * @param {object} prop 属性对象
 * @param {string} prop.skin 通过皮肤定义组件样式 
 * @param {string} prop.title -属性名称
 * @param {string} prop.id -属性id
 * @param {string} prop.placeholder -提示文本值
 * @param {number} prop.value -当前输入的值
 * @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
 * @param {function} prop.change -输入值时触发的事件处理函数
 * @return {object} 输入框结构
 */


function Search(prop) {
  const search = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "pcInputTextStyle",
    id: prop.id || null,
    type: "search",
    placeholder: prop.placeholder || "",
    value: prop.value,
    onChange: prop.change || null
  });

  if (prop.basic) {
    return search;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help,
    children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcDropDownWidth"
    }, search)
  });
}
/**
 * @method function CheckBox 复选组件
 * @author sxt
 * @date  2019-8-24
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.help 提示文本
 * @param {string} prop.title -属性名称
 * @param {string} prop.id -属性id
 * @param {string} prop.value -属性当前选中项的值
 * @param {array} prop.list -选项列表
 * @param {boolean} prop.basic -是否返回基本组件，true 不对组件进行包装，只返回基本组件 false 对组件进行包装，返回包装后的组件
 * @param {function} prop.change -单项选择值发生变化时触发的事件处理函数
 * @return {object} 复选组件结构
 */


function CheckBox(prop) {
  const checkbox = prop.list.map((e, i) => {
    let propValue = prop.value || [];

    if (typeof e == "object") {
      var {
        name,
        value
      } = e;
    } else {
      var name = e,
          value = e;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      key: i,
      className: "em-radio-label"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      name: prop.id,
      id: `${prop.id}-${value}`,
      "data-true": propValue.indexOf(value) != -1 ? true : false,
      checked: propValue.indexOf(value) != -1 ? true : false,
      value: value,
      onChange: prop.change || null
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "radio-Select"
    }, prop.showName ? name : null), name ? prop.isLang ? name : window.public.lang[name] : null);
  });

  if (prop.basic) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: prop.skin || `em-radio-component`
    }, checkbox);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
    skin: prop.skin || 'em-radio-component',
    title: prop.title,
    help: prop.help
  }, checkbox);
}
/**
 * @method function ComboBoxData 弹出下拉框
 * @author sxt 
 * @date  2019-8-24
 * @param {object} prop 属性对象
 * @param {string} prop.skin 通过皮肤定义组件样式 
 * @param {string} prop.title -属性名称
 * @param {string} prop.dataName -默认展示项文本
 * @param {string} prop.dataId -默认展示项id
 * @param {string} prop.name - 读取数据中的文本键名
 * @param {string} prop.isShow -列表是否展开
 * @param {string} prop.isSearch -是否显示搜索
 * @param {string} prop.notAllowed -是否允许选择
 * @param {Array} prop.setList -下拉显示列表
 * @param {function} prop.change -搜索功能
 * @param {function} prop.click -点击展开下拉
 * @param {function} prop.select -下拉切换事件
 * @return {object} 输入框结构
 */


function ComboBoxData(prop) {
  let setList = prop.setList || [];

  if (setList.length == 0) {
    setList = [{
      id: 0,
      [prop.name]: window.public.lang["pleaseChoose"]
    }];
  }

  let nameTitle = window.public.lang[prop.title];
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: prop.className
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "seLectBtn onSelect"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("font", null, nameTitle), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    onClick: prop.click
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "wpComboBoxDataText"
  }, prop.dataName || window.public.lang["pleaseChoose"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "iconfont iconBor"
  }, "\uE650")), prop.isShow ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dateLibrary textConPanl  dataComboBox",
    style: prop.isShow ? {
      "display": "block"
    } : {
      "display": "none"
    }
  }, prop.isSearch ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dataComSearch"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dataformSearch"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    className: "searchFrom1 search",
    placeholder: window.public.lang["searchContent"],
    onChange: prop.change
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "yiyingbaoicon dataButton"
  }, "\uE776"))) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "dataComList"
  }, setList.map((e, i) => {
    let _class = "dataComList_" + (e.layer || 1); //传过来的选中为数组时


    if (Array.isArray(prop.dataId)) {
      if (prop.dataId.indexOf(e.id) != -1) {
        _class = _class + " on select";
      }
    } else {
      if (prop.dataId == e.id) {
        _class = _class + " on ";
      }
    }

    let _noClick = true;

    if (prop.notAllowed) {
      _noClick = false; //数据中存在prop.notAllowed这个字段的数据时，不让选中 sxt 2020-2-22

      if (e[prop.notAllowed]) {
        _class = _class + " notAllowed ";
      } else {
        _noClick = true;
      }
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      "data-value": e[prop.name],
      key: e.id,
      title: e[prop.name],
      className: _class,
      onClick: _noClick ? prop.select.bind(null, e) : null,
      "data-id": e.id
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, e[prop.name]));
  }))) : null));
}

;
/**
 * @instance Widget 属性元件对象
 * @date 2019-11-13
 
 * @version 1.0
 */

const Widget = {
  Help: Help,
  //帮助信息
  Input: Input,
  //输入框
  Textarea: Textarea,
  //文本域
  Button: Button,
  //按钮
  Range: Range,
  //划块
  Select: Select,
  //下拉
  Radio: Radio,
  //单选
  CheckBox: CheckBox,
  //多选
  OnOff: OnOff,
  //开关组件
  ShowInfo: ShowInfo,
  //显示信息组件
  SelectIcon: SelectIcon,
  //选择icon
  Align: Align,
  //距中
  ImageQuality: ImageQuality,
  //图片质量
  OriginalFormat: OriginalFormat,
  //图片原格式
  SelectImage: SelectImage,
  //选择图片
  ColorPicker: ColorPicker,
  //颜色选择
  Search: Search,
  //搜索框
  ComboBoxData: ComboBoxData,
  //弹出下拉框

  /**
   * @method PageSelector 页面选择
   * @date 2020-07-21
   
   * @param {object} opts 参数对象 
   */
  PageSelector: function (opts) {
    //加载模块
    Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(1847)]).then(__webpack_require__.bind(null, /*! ./page_selector/page_selector_controler */ "./system/widgets/page_selector/page_selector_controler.js")).then(({
      PageControler
    }) => PageControler.pageSelector(opts));
  }
};

//# sourceURL=webpack:///./system/widgets/widget.js?