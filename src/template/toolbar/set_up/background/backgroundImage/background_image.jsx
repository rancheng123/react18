
import React from 'react';
import Widget from '@/system/widgets/widget';
import Layer from '@/system/widgets/layer';


/**
 * @class {BackgroundImage} 背景视图类
 */
export default class BackgroundImage {
  constructor(controler) {
    /**@property controler 背景控制器实例 */
    this.controler = controler;
    this.opacity = this.opacity.bind(this);
    this.backgroundColor = this.backgroundColor.bind(this);
    this.getLine = this.getLine.bind(this);
    this.showMode = this.showMode.bind(this);
    this.position = this.position.bind(this);
    this.positionSet = this.positionSet.bind(this);
    this.size = this.size.bind(this);
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
    const {
      opacity,
      positionMode,
      posVal,
      attachment,
      bgColor
    } = this.state;
    return React.createElement(Layer.open, {
      area: ['288px', '773px'],
      offset: ['calc(100% - 830px)', '95px'],
      titles: [window.public.lang["editBackground"]],
      close: true
    }, React.createElement(this.opacity, {
      value: opacity
    }), React.createElement(this.backgroundColor, {
      value: bgColor
    }), React.createElement(this.getLine, {
      title: window.public.lang["pictureSize"]
    }), React.createElement("div", {
      className: "pageLinkbox pcAttList"
    }, React.createElement(this.size, null)), React.createElement(this.getLine, {
      title: window.public.lang["zoomPosition"]
    }), React.createElement(this.showMode, {
      value: positionMode
    }), React.createElement(this.getLine, {
      title: window.public.lang["backgroundFixed"]
    }), React.createElement(this.position, {
      value: attachment
    }), React.createElement(this.positionSet, {
      value: posVal
    }));
  }
  /**
  * @method opacity
  */


  opacity({
    value
  }) {
    // return React.createElement("div", null, React.createElement("div", {
    //   className: "aniDistance"
    // }, React.createElement("div", {
    //   className: "aniSpantit"
    // }, window.public.lang["pictureTransparency"], "(%)"), React.createElement(Widget.Range, {
    //   change: this.controler.setOpacity.bind(this.controler),
    //   min: 0,
    //   max: 1,
    //   step: 0.1,
    //   value: value
    // })), React.createElement("hr", {
    //   className: "hr-short"
    // }));


    return (
      <div>
        <div className="aniDistance">
          <div className="aniSpantit">
            {window.public.lang["pictureTransparency"]} (%)
          </div>
          <Widget.Range
            change={this.controler.setOpacity.bind(this.controler)}
            min={0}
            max={1}
            step={0.1}
            value={value}
          />
        </div>
        <hr className="hr-short" />
      </div>
    )
  }
  /**
  * @method backgroundColor
  */


  backgroundColor({
    value
  }) {
    return React.createElement("div", null, React.createElement("div", {
      className: "opacityColor"
    }, React.createElement("div", {
      className: "opacityCoLab"
    }, window.public.lang["bgColor"]), React.createElement(Widget.ColorPicker, {
      id: "backgroundImgColor",
      title: "bgColor",
      basic: true,
      color: value,
      change: this.controler.changeBackgroundColor.bind(this.controler)
    })), React.createElement("hr", {
      className: "hr-short"
    }));
  }
  /**
  * @method getLine
  */


  getLine({
    title
  }) {
    return React.createElement("div", {
      className: "imgteTitle"
    }, title);
  }
  /**
  * @method size
  */


  size() {
    // return React.createElement("div", {
    //   className: "imgteCon"
    // }, React.createElement(Widget.ImageQuality, {
    //   id: "imageQuality",
    //   data: this.state,
    //   change: this.controler.setQuality.bind(this.controler, 'quality')
    // }));
    return (
      <div className="imgteCon">
        <Widget.ImageQuality
          id="imageQuality"
          data={this.state}
          change={this.controler.setQuality.bind(this.controler, 'quality')}
        />
      </div>
    )
  }
  /**
  * @method showMode
  */


  showMode({
    value
  }) {
    const list = [{
      name: 'tile',
      value: "repeat"
    }, //平铺
    {
      name: 'zoomToFill',
      value: "no-repeat center center / cover"
    }, //缩放到填充
    {
      name: 'actualSize',
      value: "no-repeat"
    } //实际大小
    ];
    // return React.createElement("div", {
    //   className: "imgteCon"
    // }, React.createElement(Widget.Radio, {
    //   title: "selectionContent",
    //   id: "selectShowlist",
    //   list: list,
    //   value: value,
    //   change: this.controler.selectShowMode.bind(this.controler)
    // }));

    return (
      <div className="imgteCon">
        <Widget.Radio
          title="selectionContent"
          id="selectShowlist"
          list={list}
          value={value}
          change={this.controler.selectShowMode.bind(this.controler)}
        />
      </div>
    )
  }
  /**
  * @method position
  */


  position({
    value
  }) {
    const list = [{
      name: 'fixed',
      value: "fixed"
    }, {
      name: 'nofixed',
      value: "initial"
    }];
    // return React.createElement("div", {
    //   className: "imgteCon"
    // }, React.createElement(Widget.Radio, {
    //   title: "selectionContent",
    //   id: "",
    //   list: list,
    //   value: value,
    //   change: this.controler.selectPositionMode.bind(this.controler)
    // }));

    return (
      <div className="imgteCon">
        <Widget.Radio
          title="selectionContent"
          id="" // 如果id不需要动态变化，可以赋予一个具体的字符串值
          list={this.props.list || this.state.list} // 根据实际情况选择props或state
          value={this.props.value || this.state.value} // 根据实际情况选择props或state
          change={this.controler.selectPositionMode.bind(this.controler)}
        />
      </div>
    )
  }
  /**
  * @method positionSet
  */


  positionSet({
    value
  }) {
    const position = {
      "↖ ": "left top",
      "↑": "center top",
      "↗": "right top",
      "←": "left center",
      "㊣": "center center",
      "→": "right center",
      "↙": "left bottom",
      "↓": "center bottom",
      "↘": "right bottom"
    };
    return React.createElement("div", {
      className: "scrollEffects imgteCon"
    }, React.createElement("div", {
      className: "imgDescribe"
    }, React.createElement("font", {
      className: "fontText"
    }, window.public.lang["backgroundPosition"]), React.createElement("div", {
      className: "scrollItem"
    }, Object.keys(position).map((e, i) => {
      return React.createElement("label", {
        key: i
      }, React.createElement("input", {
        type: "radio",
        name: "item",
        checked: value != position[e] ? "" : "checked",
        value: e,
        onChange: this.controler.positionSet.bind(this.controler, position[e])
      }), React.createElement("p", null, e));
    }))));
  }

}
