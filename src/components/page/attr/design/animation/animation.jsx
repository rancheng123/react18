
import React from 'react';
import Widget from '@/system/widgets/widget';

export default class Animation {
  constructor(controler) {
    /**@property controler 边框控制器实例 */
    this.controler = controler;
    this.tabs = this.tabs.bind(this);
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
  * @method animationEffect 动画结构
  * @return {object} 动画结构
  */


  animationEffect() {
    var _this$props, _this$props$node;

    //const {panel:{state:{data:{document_data : {animationClass}}}}} = this;
    const name = this.state.tab + "AnimationClass";
    let list = [{
      name: window.public.lang["noEffect"],
      value: "noEffect"
    }, {
      name: window.public.lang["enlarge"],
      value: "enlargeImage"
    }, {
      name: window.public.lang["narrow"],
      value: "narrowImage"
    }, {
      name: window.public.lang["shiftUp"],
      value: "moveImage"
    }, {
      name: window.public.lang["shiftDown"],
      value: "downImage"
    }, {
      name: window.public.lang["leftShift"],
      value: "leftImage"
    }, {
      name: window.public.lang["rightShift"],
      value: "rightImage"
    }, {
      name: window.public.lang["bounce"],
      value: "bounceImage"
    }, {
      name: window.public.lang["shake"],
      value: "swingImage"
    }, {
      name: window.public.lang["rotate2D"],
      value: "rotateImage2D"
    }, {
      name: window.public.lang["rotate"],
      value: "rotateImage"
    }];

    if (this.state.componentType == "em-Button" && this.state.skin.indexOf('iconBtn') == -1 && this.state.skin != "backtop.backtop.s323.436") {
      list.push({
        name: window.public.lang["borderSlide"],
        value: "borderSlide"
      });
      list.push({
        name: window.public.lang["backgroundAnimation"],
        value: "backgroundAnimation"
      });
      list.push({
        name: window.public.lang["backgroundBottomAna"],
        value: "backgroundBottomAna"
      });
      list.push({
        name: window.public.lang["shadowAcross"],
        value: "shadowAcross"
      });
    } //是图片控件并且在列表中时，


    const parentStr = JSON.stringify(((_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$node = _this$props.node) === null || _this$props$node === void 0 ? void 0 : _this$props$node.parent) || '');

    if (this.state.componentType == 'em-Image' && parentStr.includes('em-List')) {
      let switchConfig = {
        name: window.public.lang["switchInmage"],
        value: "switchInmage"
      }; // 切换

      list.push(switchConfig);
    }

    // return React.createElement(Widget.Select, {
    //   id: "animation",
    //   title: "selectAnimat",
    //   value: this.state[name],
    //   list: list,
    //   change: this.controler.change.bind(this.controler, name)
    // });

    return (
      <Widget.Select
        id="animation"
        title="selectAnimat"
        value={this.state[name]}
        list={list}
        change={this.controler.change.bind(this.controler, name)}
      />
    )
  }
  /**
   * @method duration 动画延迟结构
   * @return {object} 动画延迟结构
   */


  duration() {
    const name = this.state.tab + "duration";
    // return React.createElement(Widget.Range, {
    //   id: "durations",
    //   title: "durations",
    //   min: 0,
    //   max: 10,
    //   step: 0.1,
    //   unit: "s",
    //   value: this.state[name] || 0,
    //   change: this.controler.setDuration.bind(this.controler, name)
    // });
    return (
      <Widget.Range
        id="durations"
        title="durations"
        min={0}
        max={10}
        step={0.1}
        unit="s"
        value={this.state[name] || 0}
        change={this.controler.setDuration.bind(this.controler, name)}
      />
    )
  }
  /**
   * @method tabs 文本选项结构
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
          {tabs.map((e, index) => (
            <li
              key={index} // 通常使用唯一标识符作为key，这里使用数组索引作为示例
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

}
