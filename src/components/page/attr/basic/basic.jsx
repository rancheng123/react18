import React from 'react';
import Widget from '@/system/widgets/widget';

/**
 * @class {Basic} 基本属性视图类
 */
export default class Basic {
  constructor() { }
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
   * @return {object} 待渲染的组件对象
   */
  render() {
    let groupList = this.state.groupList || [];

    // return React.createElement("div", {
    //   className: "pc-basic-setting"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, groupList.map(e => React.createElement("li", {
    //   key: e,
    //   className: "pcAttList"
    // }, this[e] && this[e]()))));
    return (
      <div className="pc-basic-setting">
        <ul className="pcConAttDesign">
          {groupList.map(e => (
            <li key={e} className="pcAttList">
              {this[e] && this[e]()}
            </li>
          ))}
        </ul>
      </div>
    )
  }


  /**
  * @method link 设置链接
  * @param {object} 设置链接结构。
  */
  link() {

    const {
      state: {
        link
      }
    } = this;
    // return React.createElement(Widget.ShowInfo, {
    //   title: "setUpLink",
    //   id: "set-up-link",
    //   value: link ? link.value : window.public.lang["addButtonLink"],
    //   click: this.controler.link.bind(this.controler)
    // });

    return (
      <Widget.ShowInfo
        title="setUpLink"
        id="set-up-link"
        value={link ? link.value : window.public.lang["addButtonLink"]}
        click={this.controler.link.bind(this.controler)}
      />
    )
  }
  /**
    * @method Anchor 锚点
    * @return {object} 锚点
    */
  anchorSet() {
    let content = this.controler.getParentType(this.props.node, "em-PageContent");

    if (content) {
      let isParentList = this.state.isParentList;

      if (isParentList) {
        //控件在列表中时，不需要锚点属性，预览列表中的控件是没id的 
        return null;
      }

      // return React.createElement(Widget.Radio, {
      //   title: "anchor",
      //   id: "",
      //   list: [{
      //     name: "openTurn",
      //     value: "true"
      //   }, {
      //     name: "closeOff",
      //     value: "false"
      //   }],
      //   value: this.state.anchor || false,
      //   change: this.controler.setAnchor.bind(this.controler, "anchor")
      // });

      return (
        <Widget.Radio
          title="anchor"
          id=""
          list={[
            {
              name: "openTurn",
              value: "true"
            },
            {
              name: "closeOff",
              value: "false"
            }
          ]}
          value={this.state.anchor || false}
          change={this.controler.setAnchor.bind(this.controler, "anchor")}
        />
      )
    }
  }



  // 控件名称
  controlsName() {
    let value = this.state.componentName;
    let componentName = this.state.componentType; //slice(3)

    let componentId = this.props.id;
    // return React.createElement(Widget.Input, {
    //   value: value || "",
    //   title: 'controlsName',
    //   placeholder: `${window.public.getName(componentName)}(${componentId})`,
    //   change: this.controler.setControlsName.bind(this.controler, 'componentName')
    // });

    return (
      <Widget.Input
        value={value || ""}
        title="controlsName"
        placeholder={`${window.public.getName(componentName)}(${componentId})`}
        change={this.controler.setControlsName.bind(this.controler, 'componentName')}
      />
    )
  }
  /**
   * @method align 对齐方式
   * @return {object} 对齐结构
   */
  align(props = {
    title: 'btnAlign'
  }) {
    var _ref, _state$;

    const {
      props: {
        prefix
      },
      state
    } = this;
    const align = (_ref = (_state$ = state[`${prefix}align`]) !== null && _state$ !== void 0 ? _state$ : state.align) !== null && _ref !== void 0 ? _ref : 'center';
    // return React.createElement(Widget.Align, {
    //   id: "btnAlign",
    //   title: props.title,
    //   value: align,
    //   change: this.controler.setAlign.bind(this.controler)
    // });

    return (
      <Widget.Align
        id="btnAlign"
        title={props.title}
        value={align}
        change={this.controler.setAlign.bind(this.controler)}
      />
    )
  }

}
