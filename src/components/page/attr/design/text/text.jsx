
// 导入模块
import React from "react"; // 导入 React 库
import Widget from "@/system/widgets/widget"; // 导入 Widget
import fonts from "./fonts.json"; // 导入 fonts 
import {BackgroundControler  } from "./../background/background_controler";
export default class Text {
  constructor(controler) {
    /**@property controler 边框控制器实例 */
    this.controler = controler;
    this.tabs = this.tabs.bind(this); 
    console.log(this.controler);
    //unit 绑定this，实现伪继承
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
    // return React.createElement("div", {
    //   className: "pcTextBox"
    // }, React.createElement(this.tabs, null), React.createElement("ul", {
    //   className: "pcConAttDesign",
    //   key: this.state.tab
    // }, this.state.list.map((e, i) => React.createElement("li", {
    //   key: i,
    //   className: "pcAttList"
    // }, this[e] && this[e]()))));

    return (
      <div className="pcTextBox">
        <this.tabs />
        <ul className="pcConAttDesign" key={this.state.tab}>
          {this.state.list.map((e, i) => (
            <li key={i} className="pcAttList">
              {this[e] && this[e]()}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  /**
   * @method tabs 文本选项结构
   * @date 2019-12-31
   * @author wyq
   * @return {object} 文本选项结构
   */


  tabs() {
    const tabs = this.controler.tabs;
    
    if (tabs) {
      // return React.createElement("ul", {
      //   className: "pcSetUpActive"
      // }, tabs.map(e => {
      //   return React.createElement("li", {
      //     className: e.type != this.state.tab ? null : 'on',
      //     onClick: this.controler.selectTab.bind(this.controler, e.type)
      //   }, window.public.lang[e.name]);
      // }));

      return (
        <ul className="pcSetUpActive">
          {tabs.map(e => (
            <li
              key={e.type}
              className={e.type !== this.state.tab ? null : 'on'}
              onClick={this.controler.selectTab.bind(this.controler, e.type)}
            >
              {window.public.lang[e.name]}
            </li>
          ))}
        </ul>
      )
    }

    return null;
  }
  /**
   * @method size 文本大小结构
   * @author sxt
   * @return {object} 文本大小结构
   */


  size() {
    // return React.createElement(this.unit, {
    //   id: "textSize",
    //   title: "textSize",
    //   sname: "textSize",
    //   uname: "textSizeUnit",
    //   unpercent: true,
    //   disabled: this.props.disableUnit
    // });
    return (
      <this.unit
        id="textSize"
        title="textSize"
        sname="textSize"
        uname="textSizeUnit"
        unpercent={true}
        disabled={this.props.disableUnit}
      />
    )
  }
  /**
   * @method lineHeight 文本行高结构
   * @author sxt
   * @date 2020-2-6
   * @return {object} 文本行高结构
   */


  lineHeight() {
    // return React.createElement(this.unit, {
    //   id: "lineHeight",
    //   title: "lineHeight",
    //   sname: "lineHeight",
    //   uname: "lineHeightUnit",
    //   disabled: this.props.disableUnit,
    //   unrem: true,
    //   unem: true
    // });

    <this.unit
      id="lineHeight"
      title="lineHeight"
      sname="lineHeight"
      uname="lineHeightUnit"
      disabled={this.props.disableUnit}
      unrem={true}
      unem={true}
    />

  }
  /**
   * @method font 文本字体结构
   * @author sxt
   * @param {object} prop 参数对象
   * @param {number} index 索引
   * @return {object} 文本字体结构
   */


  family() {
    let state = this.state || {};
    let tab = state.tab,
        prefix = this.props.prefix;
    const name = tab + "fontFamily";
    const key = prefix + name;
    let familyTypeName = tab + "familyType",
        familyTypeKey = prefix + familyTypeName,
        familyType = state[familyTypeKey] || state[familyTypeName] || "default";
    let familyShow = state.familyShow;
    let fontValue = state[key] || state[name] || window.public.lang["font"];
    let customList = state.customList || []; //自定义字体存在，并且字体类型为id时，找数组中的title sxt 2020-8-14

    if (customList.length >= 1 && fontValue.indexOf("font_") != -1) {
      for (let i = 0; i < customList.length; i++) {
        let keyFont = `font_${customList[i].id}`;

        if (keyFont == fontValue) {
          fontValue = customList[i].name;
        }
      }
    }

    // return React.createElement("div", null, React.createElement("h5", {
    //   className: "pcConAttTitle verTop"
    // }, " ", window.public.lang["font"]), React.createElement("div", {
    //   className: "pcConAttCon"
    // }, React.createElement(Widget.Radio, {
    //   title: "font",
    //   id: "",
    //   basic: true,
    //   list: [{
    //     name: "default",
    //     value: "default"
    //   }, {
    //     name: "custom",
    //     value: "custom"
    //   }],
    //   value: familyType,
    //   change: this.controler.setFamilyType.bind(this.controler, familyTypeKey, "")
    // }), familyType == "custom" ? React.createElement("div", {
    //   className: "pcConAttfont"
    // }, React.createElement(Widget.ShowInfo, {
    //   title: "font",
    //   id: "",
    //   basic: true,
    //   value: fontValue,
    //   click: this.controler.showFamily.bind(this.controler, "familyShow")
    // })) : null, familyShow && familyType == "custom" ? this.familyBox() : null)); 
    
    return (
      <div>
        <h5 className="pcConAttTitle verTop"> {window.public.lang["font"]} </h5>
        <div className="pcConAttCon">
          <Widget.Radio
            title="font"
            id=""
            basic={true}
            list={[{ name: "default", value: "default" }, { name: "custom", value: "custom" }]}
            value={familyType}
            change={this.controler.setFamilyType.bind(this.controler, familyTypeKey, "")}
          />
          {familyType === "custom" ? (
            <div className="pcConAttfont">
              <Widget.ShowInfo
                title="font"
                id=""
                basic={true}
                value={fontValue}
                click={this.controler.showFamily.bind(this.controler, "familyShow")}
              />
            </div>
          ) : null}
          {familyShow && familyType === "custom" ? this.familyBox() : null}
        </div>
      </div>
    )


    // return (<Widget.Select id="font" title="font" list={fonts}
    //     value={this.state[key] || this.state[name]}
    //     change={this.controler.change.bind(this.controler, key)}
    // />)
  } 
  
  
  //字体列表
  familyList(list = [], key, value) {
    let empower = ["楷体", "宋体", "黑体", "仿宋", "Arial", "思源黑体", "思源柔黑", "思源宋体", "BreeSerif", "Comfortaa", "Crimson", "KumbhSans", "Lato", "LeagueGothic", "LibreBaskerville", "Lora", "Manrope", "Merriweather", "NotoSans", "Poly", "SourceSansPro", "Ubuntu"];
    return list.map(e => {
      let name = e.name,
          size = e.size,
          hoveName = window.public.lang["fontFree"];

      if (!empower.includes(name)) {
        hoveName = window.public.lang["fontEmpower"];
      }

      // return React.createElement("li", {
      //   key: e.value,
      //   className: e.value == value ? 'on' : null,
      //   onClick: this.controler.selectFamily.bind(this.controler, key, e.value)
      // }, React.createElement("p", {
      //   className: "textNameP"
      // }, name, size ? React.createElement("span", {
      //   className: "textNameSize"
      // }, " (", size, ")") : null), React.createElement("span", {
      //   className: "textHoverSpan"
      // }, hoveName));

      return (
        <li
          key={e.value}
          className={e.value === value ? 'on' : null}
          onClick={this.controler.selectFamily.bind(this.controler, key, e.value)}
        >
          <p className="textNameP">
            {name}
            {size ? <span className="textNameSize"> ({size}) </span> : null}
          </p>
          <span className="textHoverSpan">{hoveName}</span>
        </li>
      )
    });
  } 
  
  //自定义字体列表
  familyCustomList(list = [], key, value) {
    if (list.length >= 1) {
      return list.map(e => {
        let keyFont = `font_${e.id}`;
        return React.createElement("li", {
          key: e.id,
          className: keyFont == value ? 'on' : null,
          onClick: this.controler.selectFamily.bind(this.controler, key, keyFont)
        }, e.name);
      });
    } else {
      return null;
    }
  } 
  
  
  //字体选择父级结构
  familyBox() {
    let state = this.state || {},
        tab = state.tab,
        prefix = this.props.prefix;
    let name = tab + "fontFamily",
        key = prefix + name;
    let fontValue = state[key] || state[name];
    let familySourceName = tab + "familySource",
        familySourceKey = prefix + familySourceName,
        familySource = state[familySourceKey] || state[familySourceName] || "system";
    let tabList = [{
      name: "systemFont",
      value: "system"
    }, {
      name: "customFont",
      value: "custom"
    }];
    let customList = state.customList || [];
    // return React.createElement("div", {
    //   className: "fontStyle-box"
    // }, React.createElement("div", {
    //   className: "tabs-header"
    // }, tabList.map(e => {
    //   return React.createElement("div", {
    //     key: e.value,
    //     className: e.value == familySource ? 'tab-item tab_active' : "tab-item",
    //     onClick: this.controler.setFamilyType.bind(this.controler, familySourceKey, e.value)
    //   }, window.public.lang[e.name]);
    // })), React.createElement("div", {
    //   className: "tabs-content"
    // }, familySource == "system" ? React.createElement("div", {
    //   className: "font-family-type-wrap type-wrap01"
    // }, React.createElement("ul", null, this.familyList(fonts, key, fontValue))) : null, familySource == "custom" ? React.createElement("div", {
    //   className: "font-family-type-wrap type-wrap02"
    // }, customList.length < 1 ? React.createElement("p", {
    //   className: "noFont"
    // }, window.public.lang["uploadFontHelp"]) : null, React.createElement("div", {
    //   className: "type-wrapCon"
    // }, React.createElement("ul", null, this.familyCustomList(customList, key, fontValue)))) : null));


    return (
      <div className="fontStyle-box">
          <div className="tabs-header">
            {tabList.map(e => (
              <div
                key={e.value}
                className={e.value === familySource ? 'tab-item tab_active' : 'tab-item'}
                onClick={this.controler.setFamilyType.bind(this.controler, familySourceKey, e.value)}
              >
                {window.public.lang[e.name]}
              </div>
            ))}
          </div>
          <div className="tabs-content">
            {familySource === 'system' ? (
              <div className="font-family-type-wrap type-wrap01">
                <ul>{this.familyList(fonts, key, fontValue)}</ul>
              </div>
            ) : null}
            {familySource === 'custom' ? (
              <div className="font-family-type-wrap type-wrap02">
                {customList.length < 1 ? <p className="noFont">{window.public.lang['uploadFontHelp']}</p> : null}
                <div className="type-wrapCon">
                  <ul>{this.familyCustomList(customList, key, fontValue)}</ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
    )
  }
  /**
  * @method color 文本字体颜色结构
  * @author sxt
  * @return {object} 文本字体颜色结构
  */
  color() {
    var _color;
    const name = this.state.tab + "textColor",
          key = this.props.prefix + name;
    let color = this.state[key]; 
    
    //mo端没有字体颜色，默认走pc端字体颜色 2021-03-09 by wyq
    if (color == undefined && key.indexOf('mo') != -1) color = this.state[name];
    // return React.createElement(Widget.ColorPicker, {
    //   id: "textColor",
    //   title: "textColor",
    //   color: (_color = color) !== null && _color !== void 0 ? _color : 'rgba(0,0,0,0)',
    //   change: this.controler.set.bind(this.controler, key)
    // });

    return (
      <Widget.ColorPicker
        id="textColor"
        title="textColor"
        color={(_color = color) !== null && _color !== void 0 ? _color : 'rgba(0,0,0,0)'}
        change={this.controler.set.bind(this.controler, key)}
      />
    )
  }
  /**
   * @method style 文本样式结构
   * @author sxt
   * @return {object} 文本样式结构 
   */
  style() {
    // return React.createElement("div", null, React.createElement("h5", {
    //   className: "pcConAttTitle"
    // }, window.public.lang["textStyle"]), React.createElement("div", {
    //   className: "pcConAttCon"
    // }, React.createElement("ul", {
    //   className: "fontStyle"
    // }, [{
    //   name: "B",
    //   value: "bold",
    //   key: "fontWeight"
    // }, {
    //   name: "I",
    //   value: "italic",
    //   key: "fontStyle"
    // }, {
    //   name: "U",
    //   value: "underline",
    //   key: "textDec"
    // }, {
    //   name: "S",
    //   value: "line-through",
    //   key: "textDec"
    // }].map((e, i) => {
    //   //添加删除线 lw date 2021-2-3 
    //   const name = this.state.tab + e.key;
    //   const key = this.props.prefix + name; //初始默认值

    //   let value = e.name != 'U' ? 'normal' : 'none',
    //       className = "honor"; //如果当前项的值与数据中的值不相等，则表示点击属性时，需要把循环项的值赋给数据，否则把初始化的默认值赋给数据。

    //   if (e.value != (this.state[key] || this.state[name])) {
    //     value = e.value, className = null;
    //   }

    //   return React.createElement("li", {
    //     key: i,
    //     className: className,
    //     "data-value": value,
    //     onClick: this.controler.click.bind(this.controler, key)
    //   }, e.name);
    // }))));

    return (
      <div>
        <h5 className="pcConAttTitle">{window.public.lang["textStyle"]}</h5>
        <div className="pcConAttCon">
          <ul className="fontStyle">
            {[
              { name: "B", value: "bold", key: "fontWeight" },
              { name: "I", value: "italic", key: "fontStyle" },
              { name: "U", value: "underline", key: "textDec" },
              { name: "S", value: "line-through", key: "textDec" }
            ].map((e, i) => {
              //添加删除线 lw date 2021-2-3 
              const name = this.state.tab + e.key;
              const key = this.props.prefix + name; //初始默认值

              let value = e.name != 'U' ? 'normal' : 'none';
              let className = "honor";

              // 如果当前项的值与数据中的值不相等，则表示点击属性时，需要把循环项的值赋给数据，否则把初始化的默认值赋给数据。
              if (e.value != (this.state[key] || this.state[name])) {
                value = e.value;
                className = null;
              }

              return (
                <li
                  key={i}
                  className={className}
                  data-value={value}
                  onClick={this.controler.click.bind(this.controler, key)}
                >
                  {e.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  }
  /**
   * @method align 文本对齐结构
   * @author sxt
   * @return {object} align 文本对齐结构
   */


  align() {
    const name = this.state.tab + "textAlign",
          componentType = this.props.node.current.componentType || null; //用来判断什么时候展示两端对齐 lw 2021-4-9

    const key = this.props.prefix + name;
    // return React.createElement(Widget.Align, {
    //   id: "textAlign",
    //   componentType: componentType,
    //   title: "textAlign",
    //   value: this.state[key] || this.state[name] || "left",
    //   change: this.controler.change.bind(this.controler, key)
    // });


    return (
      <Widget.Align
        id="textAlign"
        componentType={componentType}
        title="textAlign"
        value={this.state[key] || this.state[name] || "left"}
        change={this.controler.change.bind(this.controler, key)}
      />
    )
  }
  /**
   * @method marginLeft 文本左边距结构
   * @author sxt
   * @return {object} 文本左边距
   */


  marginLeft() {
    const name = this.state.tab + "textAlign";
    const key = this.props.prefix + name;
    let align = this.state[key] || this.state[name] || "left";

    if (align == "left" || align == "center") {
      // return React.createElement(this.unit, {
      //   id: "margin-left",
      //   title: "marginLeft",
      //   sname: "padLeft",
      //   uname: "padLeftUnit",
      //   disabled: this.props.disableUnit
      // });

      return (
        <this.unit
          id="margin-left"
          title="marginLeft"
          sname="padLeft"
          uname="padLeftUnit"
          disabled={this.props.disableUnit}
        />
      )
    }
  }
  /**
   * @method marginRight 文本右边距结构
   * @author sxt
   * @return {object} 文本左边距
   */


  marginRight() {
    const name = this.state.tab + "textAlign";
    const key = this.props.prefix + name;
    let align = this.state[key] || this.state[name] || "left";

    if (align == "right" || align == "center") {
      // return React.createElement(this.unit, {
      //   id: "margin-right",
      //   title: "marginRight",
      //   sname: "padRight",
      //   uname: "padRightUnit",
      //   disabled: this.props.disableUnit
      // });

      return (
        <this.unit
          id="margin-right"
          title="marginRight"
          sname="padRight"
          uname="padRightUnit"
          disabled={this.props.disableUnit}
        />
      )
    }
  }
  /**
   * @method date 日期结构
   * @author sxt
   * @return {object} 日期
   */


  date() {
    const pub = window.public;
    return React.createElement(Widget.Select, {
      id: "font",
      title: "dateFormat",
      value: this.state.sign ? pub.dateFormat(this.state.sign) : "",
      list: [{
        name: pub.dateFormat("y.M.d"),
        value: "y.M.d"
      }, {
        name: pub.dateFormat("y-M-d"),
        value: "y-M-d"
      }, {
        name: pub.dateFormat("y/M/d"),
        value: "y/M/d"
      }, {
        name: pub.dateFormat("y M d"),
        value: "y M d"
      }, {
        name: pub.dateFormat("y-M-d h:m:s", "", "", {
          param: {
            hour12: false
          }
        }),
        value: "y-M-d h:m:s"
      }, {
        name: pub.dateFormat("y.M.d h:m"),
        value: "y.M.d h:m"
      }, {
        name: pub.dateFormat("y-M-d h:m"),
        value: "y-M-d h:m"
      }, {
        name: pub.dateFormat("M y d", "", "en-US", {
          M: "short"
        }),
        value: "M y d"
      }],
      change: this.controler.setDate.bind(this.controler)
    });
  }
  /**
    * @method headLine 选择H1 - H6标签
    * @author lw
    * @param {object} prop 参数对象 
    * @return {object} 选择H1 - H6标签结构
    */
  headLine() {
    // return React.createElement(Widget.Select, {
    //   id: "textTheme",
    //   title: "Headline",
    //   value: this.state.fontLabel || "not",
    //   list: [{
    //     name: "H1",
    //     value: "h1"
    //   }, {
    //     name: "H2",
    //     value: "h2"
    //   }, {
    //     name: "H3",
    //     value: "h3"
    //   }, {
    //     name: "H4",
    //     value: "h4"
    //   }, {
    //     name: "H5",
    //     value: "h5"
    //   }, {
    //     name: "H6",
    //     value: "h6"
    //   }, {
    //     name: window.public.lang["not"],
    //     value: "not"
    //   }],
    //   change: this.controler.setThemeData.bind(this.controler, "fontLabel")
    // });


    return (
      <Widget.Select
        id="textTheme"
        title="Headline"
        value={this.state.fontLabel || "not"}
        list={[
          { name: "H1", value: "h1" },
          { name: "H2", value: "h2" },
          { name: "H3", value: "h3" },
          { name: "H4", value: "h4" },
          { name: "H5", value: "h5" },
          { name: "H6", value: "h6" },
          { name: window.public.lang["not"], value: "not" }
        ]}
        change={this.controler.setThemeData.bind(this.controler, "fontLabel")}
      />
    )
  }

  letterSpace() {
    // return React.createElement(this.unit, {
    //   id: "letter-space",
    //   title: "letterSpace",
    //   sname: "letterSpace",
    //   uname: "letterSpaceUnit",
    //   unpercent: true,
    //   disabled: this.props.disableUnit
    // });

    return (
      <this.unit
        id="letter-space"
        title="letterSpace"
        sname="letterSpace"
        uname="letterSpaceUnit"
        unpercent={true}
        disabled={this.props.disableUnit}
      />
    )
  }

  // 背景颜色
  // background(){
  //   const dom = BackgroundControler.background(this.props.opts) 
  //   return (
  //     dom
  //   )
  // }

}
