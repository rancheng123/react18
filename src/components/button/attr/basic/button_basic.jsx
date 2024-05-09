
import React from "react";
import Basic from "@/components/page/attr/basic/basic"
import Widget from "@/system/widgets/widget"

export default class ButtonBasic extends Basic {
  constructor(controler) {
    super();
    /**@property controler 边框控制器实例 */

    this.controler = controler;
    this.unit = this.props.publicAttr.unit.bind(this);
  }
  /**
   * @method  selectionContentSet 内容来源
   * @return {object} 内容来源属性结构
   */
  selectionContentSet() {
    // return React.createElement(Widget.Radio, {
    //   title: "selectionContent",
    //   id: "",
    //   list: [{
    //     name: "custom",
    //     value: "custom"
    //   }, {
    //     name: "databaseData",
    //     value: "databaseData"
    //   }],
    //   value: this.state.selectionContent || "custom",
    //   change: this.controler.setContent.bind(this.controler)
    // });

    return (
      <Widget.Radio
        title="selectionContent"
        id=""
        list={[
          {
            name: "custom",
            value: "custom"
          },
          {
            name: "databaseData",
            value: "databaseData"
          }
        ]}
        value={this.state.selectionContent || "custom"}
        change={this.controler.setContent.bind(this.controler)}
      />
    )
  }
  /**
   * @method inputText输入框   changText更改文本 
   * @param {object} 更改按钮文本内容
   */
  inputText() {
    let _selectionContent = this.state.selectionContent || "custom";

    if (_selectionContent == "custom") {
      // return React.createElement(Widget.Input, {
      //   title: "buttonText",
      //   id: "buttonText",
      //   readonly: false,
      //   value: this.state.label,
      //   change: this.controler.changText.bind(this.controler, "label")
      // });
      return (
        <Widget.Input
          title="buttonText"
          id="buttonText"
          readonly={false}
          value={this.state.label}
          change={this.controler.changText.bind(this.controler, "label")}
        />
      )
    }

    return null;
  }


  /**
  * @method link 链接
  * @return {object} 链接结构
  */
  link() {
    const {
      state: {
        controlType
      }
    } = this;
    return controlType != "formButton" ? super.link() : null;
  }


  /**
  * @method selectIcon 选择Icon结构
  * @return {object} 选择Icon结构
  */
  selectIcon() {
    let icon = this.state.icon || {};
    // return React.createElement(Widget.SelectIcon, {
    //   id: "selectIcon",
    //   title: "selectIcon",
    //   icon: icon,
    //   delIcon: this.controler.delIcon.bind(this.controler),
    //   click: this.controler.showIcon.bind(this.controler)
    // });

    return (
      <Widget.SelectIcon
        id="selectIcon"
        title="selectIcon"
        icon={icon}
        delIcon={this.controler.delIcon.bind(this.controler)}
        click={this.controler.showIcon.bind(this.controler)}
      />
    )
  }


  /**
  * @method dataText 数据源文本   
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

      // return React.createElement(Widget.ShowInfo, {
      //   title: "dataSources",
      //   id: "",
      //   value: _value,
      //   click: this.controler.showDataSource.bind(this.controler)
      // });
      return (
        <Widget.ShowInfo
          title="dataSources"
          id=""
          value={_value}
          click={() => this.controler.showDataSource.bind(this.controler)}
        />
      )
    }

    return null;
  }


  /**
   * @method maxWidth 最大宽度
   * @return {object} 最大宽度
   */
  maxWidth() {
    // return React.createElement(this.unit, {
    //   title: "maxWidth",
    //   id: "maxWidth",
    //   sname: `maxWidth`,
    //   uname: `maxWidthUnit`,
    //   change: this.controler.setThemeData.bind(this.controler, `${this.props.prefix}maxWidth`)
    // });
    return (
      <this.unit
        title="maxWidth"
        id="maxWidth"
        sname={`maxWidth`}
        uname={`maxWidthUnit`}
        change={this.controler.setThemeData.bind(this.controler, `${this.props.prefix}maxWidth`)}
      />
    )
  }


  /**
   * @method marginLeft 文本左边距结构
   * @return {object} 文本左边距
   */
  marginLeft() {
    var _ref, _state$;

    const {
      props: {
        prefix
      },
      state
    } = this;
    const align = (_ref = (_state$ = state[`${prefix}align`]) !== null && _state$ !== void 0 ? _state$ : state.align) !== null && _ref !== void 0 ? _ref : 'center';

    if (align != 'left') {
      return null;
    }

    // return React.createElement(this.unit, {
    //   id: "margin-left",
    //   title: "marginLeft",
    //   sname: `marginLeft`,
    //   uname: `marginLeftUnit`,
    //   change: this.controler.setMargin.bind(this.controler, `${prefix}marginLeft`)
    // });

    return (
      <this.unit
        id="margin-left"
        title="marginLeft"
        sname={`marginLeft`}
        uname={`marginLeftUnit`}
        change={this.controler.setMargin.bind(this.controler, `${prefix}marginLeft`)}
      />
    )
  }


  /**
   * @method marginRight 文本右边距结构
   * @return {object} 文本左边距
   */
  marginRight() {
    if (this.state.align != 'right') {
      return null;
    }

    // return React.createElement(this.unit, {
    //   id: "margin-right",
    //   title: "marginRight",
    //   sname: `marginRight`,
    //   uname: `marginRightUnit`,
    //   change: this.controler.setMargin.bind(this.controler, `${this.props.prefix}marginRight`)
    // });

    return (
      <this.unit
        id="margin-right"
        title="marginRight"
        sname={`marginRight`}
        uname={`marginRightUnit`}
        change={this.controler.setMargin.bind(this.controler, `${this.props.prefix}marginRight`)}
      />
    )
  }

}
