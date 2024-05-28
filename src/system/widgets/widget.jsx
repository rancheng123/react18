import React, { useState, useEffect } from 'react'
import * as antd from 'antd';
/**
 * @method Container 容器组件，存放属性组件的外层结构
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
  <div className=""></div>

  // return React.createElement("div", {
  //   className: prop.skin || null
  // }, prop.title ? React.createElement("h5", {
  //   className: "pcConAttTitle "
  // }, window.public.lang[prop.help] && prop.help ? React.createElement(Help, {
  //   help: prop.help
  // }) : null, (_window$public$lang$p = window.public.lang[prop.title]) !== null && _window$public$lang$p !== void 0 ? _window$public$lang$p : prop.title, React.createElement("span", null, prop.unit ? ` (${prop.unit})` : "")) : null, React.createElement("div", {
  //   className: "pcConAttCon"
  // }, prop.children));

  return (
    <div className={prop.skin || null}>
      {prop.title ? (
        <h5 className="pcConAttTitle">
          {window.public.lang[prop.help] && prop.help ? (
            <Help help={prop.help} />
          ) : null}
          {window.public.lang[prop.title] || prop.title}
          <span>{prop.unit ? ` (${prop.unit})` : ""}</span>
        </h5>
      ) : null}
      <div className="pcConAttCon">{prop.children}</div>
    </div>
  )
}


/**
 * @method Help 帮助信息
 * @param {object} prop 属性对象
 * @param {string} prop.skin 通过皮肤定义组件样式 
 * @param {string} prop.help 提示文本
 * @return {object} 帮助信息组件结构
 */
function Help(prop) {
  const title = window.public.lang[prop.help]; // onMouseEnter = {e=>$(e.currentTarget).tooltip()} 不引jq无法调取事件（存在的问题）

  return React.createElement("div", {
    className: prop.skin || "helpcon",
    title: title,
    "data-placement": "bottom",
    "data-original-title": title
  }, React.createElement("img", {
    src: "/desktop/Public/images/controlProperty/help.png",
    className: "helpImg"
  }));
}


/**
 * @method function Input 输入组件
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

  // const input = React.createElement("input", {
  //   className: "pcInputTextStyle",
  //   id: prop.id || null,
  //   type: (_prop$type = prop.type) !== null && _prop$type !== void 0 ? _prop$type : 'text',
  //   readOnly: prop.readonly || null,
  //   placeholder: prop.placeholder || "",
  //   value: prop.value,
  //   help: prop.help || '',
  //   min: (_prop$min = prop.min) !== null && _prop$min !== void 0 ? _prop$min : null,
  //   max: (_prop$max = prop.max) !== null && _prop$max !== void 0 ? _prop$max : null,
  //   onBlur: prop.blur || null,
  //   onChange: prop.change || null,
  //   maxLength: (_prop$maxlength = prop.maxlength) !== null && _prop$maxlength !== void 0 ? _prop$maxlength : null
  // });
  const input = (
    <input
      className="pcInputTextStyle"
      id={prop.id || null}
      type={prop.type || 'text'}
      readOnly={prop.readonly || null}
      placeholder={prop.placeholder || ""}
      value={prop.value}
      help={prop.help || ''}
      min={prop.min || null}
      max={prop.max || null}
      onBlur={prop.blur || null}
      onChange={prop.change || null}
      maxLength={prop.maxlength || null}
    />
  )

  if (prop.basic) {
    return input;
  }

  // return React.createElement(Container, {
  //   skin: prop.skin,
  //   title: prop.title,
  //   help: prop.help
  // }, input, prop.maxLength ? React.createElement("span", {
  //   className: "maxlengthInput"
  // }, prop.value.length, "/", prop.maxLength) : null, prop.children);
  return (
    <Container
      skin={prop.skin}
      title={prop.title}
      help={prop.help}
    >
      {input}
      {prop.maxLength && <span className="maxlengthInput">
        {prop.value.length} / {prop.maxLength}
      </span>}
      {prop.children}
    </Container>
  )
}


/**
 * @method function Textarea 文本域组件
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

  const textarea = React.createElement("textarea", {
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

  return React.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help
  }, textarea, prop.maxlength ? React.createElement("span", {
    className: "maxlengthTextarea"
  }, prop.value.length, "/", prop.maxlength) : null);
}


/**
 * @method function Radio 单选组件
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
 * @param {function} prop.linkLayout -单项选择值布局
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

    // return React.createElement("label", {
    //   key: i,
    //   className: "em-radio-label"
    // }, React.createElement("input", {
    //   type: "radio",
    //   name: prop.id,
    //   id: `${prop.id}-${value}`,
    //   checked: value != propValue ? "" : "checked",
    //   value: value,
    //   onChange: prop.change || null
    // }), React.createElement("i", {
    //   className: "radio-Select"
    // }, prop.showName ? name : null), name ? prop.isLang ? name : window.public.lang[name] : null);


    return (
      <label key={i} className="em-radio-label" style={{ display: prop.linkLayout == 'vertical' ? 'block' : 'inline-block' }}>
        {/* <antd.Radio 
          type="radio"
          name={prop.id}
          id={`${prop.id}-${value}`}
          checked={value != propValue ? "" : "checked"}
          value={value}
          onChange={prop.change || null}
       /> */}
        <input
          type="radio"
          name={prop.id}
          id={`${prop.id}-${value}`}
          checked={value != propValue ? "" : "checked"}
          value={value}
          onChange={prop.change || null}
        />
        {/* <i className="radio-Select">{prop.showName ? name : null}</i> */}
        {name ? (prop.isLang ? name : window.public.lang[name]) : null}
      </label>
    )
  });

  if (prop.basic) {
    // return React.createElement("div", {
    //   className: prop.skin || `em-radio-component`
    // }, radio);
    return (
      <div className={prop.skin || `em-radio-component`}>
        {radio}
      </div>
    )
  }

  // return React.createElement(Container, {
  //   skin: prop.skin || `em-radio-component`,
  //   title: prop.title,
  //   help: prop.help
  // }, radio);

  return (
    <Container
      skin={prop.skin || `em-radio-component`}
      title={prop.title}
      help={prop.help}
    >
      {radio}
    </Container>

  )
}


/**
 * @method function Button 按钮组件
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
  const button = React.createElement("button", {
    className: "em-button-component",
    onClick: prop.click
  }, prop.btnName);

  if (prop.basic) {
    return button;
  }

  return React.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help
  }, button);
}


/**
 * @method function Range 划块组件
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
 * @param {function} prop.onBlur -失去焦点时触发的事件处理函数
 * @return {object} 拖拽范围结构
 */
function Range(prop) {
  var _prop$children;

  // const range = React.createElement("div", {
  //   className: `em-drag-slider${prop.units ? ' em-drag-select-slider' : ''}`
  // }, React.createElement("input", {
  //   type: "range",
  //   className: "slider-range-input",
  //   step: prop.step || 1,
  //   min: prop.min || 0,
  //   max: prop.max,
  //   value: prop.value,
  //   onChange: prop.change,
  //   onBlur: prop.blur
  // }), React.createElement("input", {
  //   type: "number",
  //   className: "slider-number-input",
  //   step: prop.step || 1,
  //   min: prop.min || 0,
  //   max: prop.max,
  //   value: prop.value,
  //   onChange: prop.change,
  //   onBlur: prop.blur || null
  // }), prop.units ? React.createElement(Select, {
  //   basic: true,
  //   isChoose: true,
  //   list: prop.units,
  //   value: prop.unit,
  //   disabled: prop.disabled,
  //   change: prop.selectChange
  // }) : null, prop.units == undefined && prop.unit ? React.createElement("span", {
  //   className: "unitNumber"
  // }, prop.unit) : null); 
  const range = <div className={`em-drag-slider${prop.units ? ' em-drag-select-slider' : ''}`}>
    <input
      type="range"
      className="slider-range-input"
      step={prop.step || 1}
      min={prop.min || 0}
      max={prop.max}
      value={prop.value}
      onChange={prop.change}
      onBlur={prop.blur}
    />

    {/* <antd.Slider 
          step={prop.step || 1}
          min={prop.min || 0}
          max={prop.max}
          value={prop.value}
          onChange={prop.change}
          onBlur={prop.blur}
        /> */}
    <input
      type="number"
      className="slider-number-input"
      step={prop.step || 1}
      min={prop.min || 0}
      max={prop.max}
      value={prop.value}
      onChange={prop.change}
      onBlur={prop.blur || null}
    />
    {prop.units ? (
      <div style={{ width: '68px' }}>
        <Select
          basic={true}
          isChoose={true}
          list={prop.units}
          value={prop.unit}
          disabled={prop.disabled}
          change={prop.selectChange}
        />
      </div>

      // <antd.Select
      //   id={prop.id}
      //   value={prop.value || ""}
      //   disabled={prop.disabled}
      //   onChange={prop.change}
      // >
      //   {/* <option value="">{window.public.lang["pleaseChoose"]}</option> */}
      //   {prop.isChoose ? null :<antd.Select.Option  value="">{window.public.lang["pleaseChoose"]}</antd.Select.Option> } 
      //   {prop.units.map((e, i) => 
      //     e.hidden !== true ? (
      //       <antd.Select.Option  key={i} label={e.name} value={e.value}>{e.name}</antd.Select.Option>
      //     ) : null
      //   )}
      // </antd.Select>

    ) : null}
    {prop.units == undefined && prop.unit ? (
      <span className="unitNumber">{prop.unit}</span>
    ) : null}
  </div>



  //如果basic为true只返回基本结构
  if (prop.basic) {
    return range;
  }

  // return React.createElement(Container, {
  //   skin: prop.skin,
  //   title: prop.title,
  //   help: prop.help
  // }, range, (_prop$children = prop.children) !== null && _prop$children !== void 0 ? _prop$children : null);

  return (
    <Container
      skin={prop.skin}
      title={prop.title}
      help={prop.help}
    >
      {range}
      {prop.children !== null && prop.children !== undefined ? prop.children : null}
    </Container>
  )
}


/**
 * @method function Select 下拉选择组件
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
 * @param {object} prop.styles -样式
 * @return {object} 下拉选择组件结构
 */
function Select(prop) {
  // const select = React.createElement("select", {
  //   className: "em-select-box",
  //   id: prop.id,
  //   value: prop.value || "",
  //   disabled: prop.disabled,
  //   onChange: prop.change
  // }, prop.isChoose ? null : React.createElement("option", {
  //   value: ""
  // }, window.public.lang["pleaseChoose"]), prop.list.map((e, i) => e.hidden != true ? React.createElement("option", {
  //   key: i,
  //   label: e.name,
  //   value: e.value
  // }, e.name) : null)); 

  const select = (
    // <select
    //   className="em-select-box"
    //   id={prop.id}
    //   value={prop.value || ""}
    //   disabled={prop.disabled}
    //   onChange={prop.change}
    // >
    //   {prop.isChoose ? null : <option value="">{window.public.lang["pleaseChoose"]}</option>}
    //   {prop.list.map((e, i) => 
    //     e.hidden !== true ? (
    //       <option key={i} label={e.name} value={e.value}>{e.name}</option>
    //     ) : null
    //   )}
    // </select>
    <antd.Select
      id={prop.id}
      value={prop.value || ""}
      disabled={prop.disabled}
      onChange={prop.change}
      style={{ width: '100%', ...prop.styles }}
    >
      {/* <option value="">{window.public.lang["pleaseChoose"]}</option> */}
      {/* {prop.isChoose ? null :<antd.Select.Option  value="">{window.public.lang["pleaseChoose"]}</antd.Select.Option> }  */}
      {prop.list.map((e, i) =>
        e.hidden !== true ? (
          <antd.Select.Option key={i} label={e.name} value={e.value}>{e.name}</antd.Select.Option>
        ) : null
      )}
    </antd.Select>
  )


  //如果basic为true只返回基本结构
  if (prop.basic) {
    return select;
  }

  // return React.createElement(Container, {
  //   skin: prop.skin,
  //   help: prop.help,
  //   title: prop.title
  // }, select);

  return (
    <Container
      skin={prop.skin}
      help={prop.help}
      title={prop.title}
    >
      {select}
    </Container>
  )
}


/**
 * @method function  OnOff 开关组件
 * @param {object} prop 属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {string} prop.title -属性名称
 * @param {boolean} prop.checked -当前选择的值
 * @param {function} prop.change -拖拽范围值发生变化时触发的事件处理函数
 * @return {object} 开关组件组件结构
 */


function OnOff(prop) {
  return React.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help
  }, React.createElement("label", {
    className: "em-on-off switchBtn btnColor"
  }, React.createElement("input", {
    type: "checkbox",
    onChange: prop.change,
    checked: prop.checked,
    className: "input input-switch"
  }), React.createElement("div", {
    className: "statusBtn"
  }, React.createElement("p", {
    className: "closeBtn"
  }, React.createElement("i", null, "▁")), React.createElement("p", {
    className: "openBtn"
  }, React.createElement("i", null, "✔")))));
}


/**
 * @method ShowInfo 显示信息组件
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
  // const show = React.createElement("div", null, React.createElement("div", {
  //   className: "setDataP",
  //   onClick: prop.click
  // }, React.createElement("p", {
  //   className: "pcsetDataSource"
  // }, prop.value), !prop.unuseArrow ? React.createElement("i", {
  //   className: "iconBor" + (prop.iconClass ? " " + prop.iconClass : "")
  // }, prop.icon || "▼") : null), prop.isButton ? React.createElement("button", {
  //   className: "pcwindow.publicButton",
  //   onClick: prop.btnClick
  // }, window.public.lang[prop.btnTitle]) : null);

  const show = (
    <div>
      <div className="setDataP" onClick={prop.click}>
        <p className="pcsetDataSource">{prop.value}</p>
        {!prop.unuseArrow && <i className={`iconBor${prop.iconClass ? ' ' + prop.iconClass : ''}`}>
          {prop.icon || '▼'}
        </i>}
      </div>
      {prop.isButton && <button className="pcwindow.publicButton" onClick={prop.btnClick}>
        {window.public.lang[prop.btnTitle]}
      </button>}
    </div>
  )

  if (prop.basic) {
    return show;
  }

  // return React.createElement(Container, {
  //   skin: prop.skin,
  //   title: prop.title,
  //   help: prop.help,
  //   children: show
  // });

  return (
    <Container
      skin={prop.skin}
      title={prop.title}
      help={prop.help}
    >
      {show}
    </Container>
  )
}


/**
 * @method function SelectIcon 选择Icon组件
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
  return React.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help,
    children: React.createElement("div", null, React.createElement("div", {
      className: "btnIconDiv"
    }, React.createElement("p", {
      className: `pcBtnBg OperatingImg yiyingbaoicon`,
      style: {
        lineHeight: "35px",
        background: icon.iconSrc
      }
    }, icon.iconName ? React.createElement("i", null, icon.iconName) : null, icon.iconSrc ? React.createElement("img", {
      src: icon.iconSrc
    }) : null), prop.delIcon ? React.createElement("div", {
      className: "iconClose"
    }, React.createElement("img", {
      width: "17",
      onClick: prop.delIcon || null,
      src: "http://www.eyingbao.com/system/webdesign/images/createWebClose.png",
      style: {
        "cursor": "pointer"
      }
    })) : null), React.createElement("button", {
      type: "text",
      className: "publicButton",
      onClick: prop.click
    }, window.public.lang["choice"]))
  });
}


/**
 * @method function Align 对齐方式组件
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
      value: "left",
      icon: "&#xe782;"
    }, {
      value: "center",
      icon: "&#xe791;"
    }, {
      value: "right",
      icon: "&#xe785;"
    }, {
      value: "justify",
      icon: "&#xe794;"
    }];
  }

  // return React.createElement(Container, {
  //   skin: `em-align-select ${skin}`,
  //   title: title
  // }, React.createElement(Input, {
  //   readonly: "readonly",
  //   basic: true,
  //   value: window.public.lang[value]
  // }), React.createElement("ul", {
  //   className: "pcBoxAlign"
  // }, React.createElement(Radio, {
  //   list: list,
  //   basic: true,
  //   value: prop.value,
  //   id: id,
  //   skin: "em-align-radio",
  //   change: prop.change
  // })));

  const changeAlign = (value, event) => {
    event.target.alignValue = value
    prop.change(event)
  }

  return (
    <Container
      skin={`em-align-select ${skin}`}
      title={title}
    >
      <Input
        readonly="readonly"
        basic={true}
        value={window.public.lang[value]}
      />
      <ul className="textalign_ul">
        {/* <Radio
          list={list}
          basic={true}
          value={prop.value}
          id={id}
          skin="em-align-radio"
          change={prop.change}
        /> */}
        {
          list.map(item => {
            return (
              <li
                className={`textalign_li ${prop.value == item.value ? 'textalign_li_active' : ''}`}
                key={item.value}
                id={id}
                onClick={(event) => changeAlign(item.value, event)}
              >
                <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.icon }}></i>
              </li>
            )
          })
        }
      </ul>
    </Container>
  )
}


/** 
* @method SelectImage 选择图片组件
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

  return React.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help,
    children: React.createElement("div", {
      className: "pcConChangeImg",
      onClick: prop.click
    }, React.createElement("div", {
      className: "pcClick_img_sel"
    }, src ? React.createElement("img", {
      src: src,
      className: "pcSelect_img"
    }) : null, React.createElement("span", {
      className: "pcSelect_middel_span"
    })), React.createElement("div", {
      id: "pcSelectImg"
    }, React.createElement("i", {
      className: "pcImgSizeMass"
    }, ratio.split(";")[0]), React.createElement("span", {
      className: "pcTitle_xzimg"
    }, window.public.lang["clickChangeImage"])))
  });
}


/**
 * @method ImageQuality 图片质量组件
 * @param {object} prop -属性对象
 * @param {string} pro.skin 通过皮肤定义组件样式 
 * @param {data} prop.data -图片数据
 * @param {function} prop.change -修改触发的事件处理函数
 * @return {object} -图片质量属性结构
 */
function ImageQuality(prop) {
  var _ref, _data$, _prop$prefix;

  let _data = prop.data || {};

  // const quality = React.createElement("div", null, React.createElement(Select, {
  //   id: "imageQuality",
  //   unuseLi: true,
  //   basic: true // mo端先读mo质量，没有再读pc质量值
  //   ,
  //   value: (_ref = (_data$ = _data[`${(_prop$prefix = prop.prefix) !== null && _prop$prefix !== void 0 ? _prop$prefix : ''}quality`]) !== null && _data$ !== void 0 ? _data$ : _data['quality']) !== null && _ref !== void 0 ? _ref : "original",
  //   list: [{
  //     name: "100px",
  //     value: "100"
  //   }, {
  //     name: "200px",
  //     value: "200"
  //   }, {
  //     name: "400px",
  //     value: "400"
  //   }, {
  //     name: "600px",
  //     value: "600"
  //   }, {
  //     name: "800px",
  //     value: "800"
  //   }, {
  //     name: "1000px",
  //     value: "1000"
  //   }, {
  //     name: "1200px",
  //     value: "1200"
  //   }, {
  //     name: "1400px",
  //     value: "1400"
  //   }, {
  //     name: "1600px",
  //     value: "1600"
  //   }, {
  //     name: "2000px",
  //     value: "2000"
  //   }, {
  //     name: window.public.lang["original"],
  //     value: "original"
  //   }],
  //   change: prop.change
  // }), _data.dataSize ? React.createElement("input", {
  //   className: "pcInputTextStyle",
  //   type: "text",
  //   readOnly: "readonly",
  //   placeholder: (_data.dataSize || "") + "KB"
  // }) : false);


  const quality = (
    <div>
      <Select
        id="imageQuality"
        unuseLi={true}
        basic={true} // mo端先读mo质量，没有再读pc质量值
        value={(_ref = (_data$ = _data[`${(_prop$prefix = prop.prefix) !== null && _prop$prefix !== void 0 ? _prop$prefix : ''}quality`]) !== null && _data$ !== void 0 ? _data$ : _data['quality']) !== null && _ref !== void 0 ? _ref : "original"}
        list={[{
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
        }]}
        change={prop.change}
      />
      {_data.dataSize ? (
        <input
          className="pcInputTextStyle"
          type="text"
          readOnly
          placeholder={(_data.dataSize || "") + "KB"}
        />
      ) : false}
    </div>
  )
  // return React.createElement(Container, {
  //   skin: prop.skin,
  //   help: prop.help,
  //   title: "imageQuality"
  // }, quality);

  return (
    <Container
      skin={prop.skin}
      help={prop.help}
      title="imageQuality"
    >
      {quality}
    </Container>
  )
}


/**
 * @method OriginalFormat 图片原格式属性
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

  return React.createElement(Radio, {
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
  const [color] = useState(prop.color); //渲染调用方法，

  useEffect(() => {
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
      onError: function (e) { },
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
  // const picker = React.createElement("div", {
  //   id: prop.id,
  //   className: "em-color-picker"
  // }, React.createElement("div", {
  //   className: prop.id,
  //   style: {
  //     padding: '5px'
  //   }
  // }));

  const picker = (
    <div id={prop.id} className="em-color-picker">
      <span></span>
      <div className={prop.id} style={{ padding: '5px' }}>

      </div>
    </div>
  )



  if (prop.basic) {
    return picker;
  }

  // return React.createElement(Container, {
  //   skin: prop.skin,
  //   title: prop.title
  // }, picker);
  return (
    <Container skin={prop.skin} title={prop.title}>
      {picker}
    </Container>
  )
}


/**
 * @method function Search 搜索组件
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
  const search = React.createElement("input", {
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

  return React.createElement(Container, {
    skin: prop.skin,
    title: prop.title,
    help: prop.help,
    children: React.createElement("div", {
      className: "pcDropDownWidth"
    }, search)
  });
}


/**
 * @method function CheckBox 复选组件
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

    return React.createElement("label", {
      key: i,
      className: "em-radio-label"
    }, React.createElement("input", {
      type: "checkbox",
      name: prop.id,
      id: `${prop.id}-${value}`,
      "data-true": propValue.indexOf(value) != -1 ? true : false,
      checked: propValue.indexOf(value) != -1 ? true : false,
      value: value,
      onChange: prop.change || null
    }), React.createElement("i", {
      className: "radio-Select"
    }, prop.showName ? name : null), name ? prop.isLang ? name : window.public.lang[name] : null);
  });

  if (prop.basic) {
    return React.createElement("div", {
      className: prop.skin || `em-radio-component`
    }, checkbox);
  }

  return React.createElement(Container, {
    skin: prop.skin || 'em-radio-component',
    title: prop.title,
    help: prop.help
  }, checkbox);
}


/**
 * @method function ComboBoxData 弹出下拉框
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
  return React.createElement("div", {
    className: prop.className
  }, React.createElement("div", {
    className: "seLectBtn onSelect"
  }, React.createElement("font", null, nameTitle), React.createElement("p", {
    onClick: prop.click
  }, React.createElement("span", {
    className: "wpComboBoxDataText"
  }, prop.dataName || window.public.lang["pleaseChoose"]), React.createElement("i", {
    className: "iconfont iconBor"
  }, "\uE650")), prop.isShow ? React.createElement("div", {
    className: "dateLibrary textConPanl  dataComboBox",
    style: prop.isShow ? {
      "display": "block"
    } : {
      "display": "none"
    }
  }, prop.isSearch ? React.createElement("div", {
    className: "dataComSearch"
  }, React.createElement("div", {
    className: "dataformSearch"
  }, React.createElement("input", {
    type: "text",
    className: "searchFrom1 search",
    placeholder: window.public.lang["searchContent"],
    onChange: prop.change
  }), React.createElement("button", {
    className: "yiyingbaoicon dataButton"
  }, "\uE776"))) : null, React.createElement("ul", {
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

    return React.createElement("li", {
      "data-value": e[prop.name],
      key: e.id,
      title: e[prop.name],
      className: _class,
      onClick: _noClick ? prop.select.bind(null, e) : null,
      "data-id": e.id
    }, React.createElement("span", null, e[prop.name]));
  }))) : null));
}

/**
 * @instance Widget 属性元件对象
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
   * @param {object} opts 参数对象 
   */
  PageSelector: function (opts) {
    //加载模块
    // Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(1847)]).then(__webpack_require__.bind(null, /*! ./page_selector/page_selector_controler */ "./system/widgets/page_selector/page_selector_controler.js")).then(({
    //   PageControler
    // }) => PageControler.pageSelector(opts));

    import('./page_selector/page_selector_controler.jsx').then(({ PageControler }) => PageControler.pageSelector(opts))
  }
};

export default Widget
