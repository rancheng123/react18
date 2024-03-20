import React from 'react';

export default class MouseRightClickMenu extends React.Component {
  constructor(controler) {
    super(controler)
    /**@property controler 边框控制器实例 */
    this.controler = controler;
    this.state = controler.state;
    this.props = controler;
  }
  /**
   * @method render 组件渲染方法
   * @author sxt
   * @return {object} 待渲染的组件对象
   */


  render() {
    return React.createElement("div", null, this.rightClick());
  }
  /**
   * @method rightClick 右键菜单增加控件选中功能结构
   * @author lby
   * @return {object} 右键菜单
   */
  // {arr.map(item => <li id={item.id} key={item.id} onMouseDown={this.controler.rightClick.bind(this.controler)} >{ item.name??window.public.getName(item.type)}</li>)}


  rightClick() {
    let arr = this.state.data ? this.state.data : [];

    if (arr && arr.length != 0) {
      let _marginLeft = '-10px';

      if (window.public.type == "pc") {
        let winW = window.innerWidth,
            left = this.state.style.left || winW,
            rightClickWidth = 210 + 130; //

        if (winW - left <= rightClickWidth) {
          _marginLeft = '-340px';
        }
      }

      return React.createElement("div", {
        className: "rightClick",
        onMouseMove: this.controler.theMouseMove.bind(this.controler),
        style: {
          'display': 'block',
          'position': 'absolute',
          'left': this.state.style.left,
          'bottom': this.state.style.bottom,
          'right': this.state.style.right,
          'top': this.state.style.top
        }
      }, React.createElement("ul", {
        className: "rightClick-popUp"
      }, this.controler.Property_panel_list.map((e, i) => {
        if (e) {
          return React.createElement("li", {
            key: i,
            className: e.iconClass,
            title: e.title,
            id: e.event,
            onMouseDown: e.event ? this.controler[e.event].bind(this.controler) : null
          }, React.createElement("span", null, e.title), React.createElement("span", {
            className: e.iconC
          }, e.name, e.iconC ? "" : ''), e.secondary ? React.createElement("ul", {
            className: "rightClick rightclickCascade",
            style: {
              'position': 'absolute',
              'left': '100%',
              'top': '-15px',
              'marginLeft': _marginLeft,
              'zIndex': '1'
            }
          }, arr.map(item => {
            var _item$name;

            return React.createElement("li", {
              id: item.id,
              key: item.id,
              onMouseDown: this.controler.rightClick.bind(this.controler)
            }, (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : window.public.getName(item.type));
          })) : null);
        }

        return null;
      })));
    }

    return null;
  }
}
