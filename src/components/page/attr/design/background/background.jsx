
import React from "react"; // 导入 React 库
import Widget from "@/system/widgets/widget"; // 导入 Background 变量

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * @class {Background} 背景视图类
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */

class Background {
  constructor(controler) {
    this.controler = controler;
    this.backgroundColor = this.backgroundColor.bind(this);
    this.backgroundPanel = this.backgroundPanel.bind(this);
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} state 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }

  render() {
    var _this$state$;

    let prefix = this.props.prefix;
    const type = (_this$state$ = this.state[`${prefix}type`]) !== null && _this$state$ !== void 0 ? _this$state$ : this.state.type;
    let preix = window.public.type;
    let skin = this.props.node.current.skin || "",
        typeList = this.props.list;
    let btnShow = true; //如果是mo端和是高级幻灯片并且类型是backgroundPanel，则只展示一项，并隐藏切换选项

    if (preix == 'mo' && skin.indexOf("advanced") != -1 && typeList.indexOf("backgroundPanel") != -1) {
      Background.LIST['Image'] = ['size'];
      btnShow = false;
    } else {
      if (preix == 'mo') {
        Background.LIST['Image'] = ['opacity', 'size', 'backgroundColor', 'showMode', 'position', 'positionSet'];
      } else {
        Background.LIST['Image'] = ['opacity', 'size', 'backgroundColor', 'showMode', 'position', 'imageWebp', 'positionSet'];
      }

      btnShow = true;
    } //类型为图片，并且是hover设置时，只显示透明度和颜色设置 sxt 2022-11-14


    if (type == "Image" && prefix && prefix.indexOf("hover") != -1) {
      Background.LIST['Image'] = ['opacity', 'backgroundColor'];
    }

    return React.createElement("div", {
      className: "pcbgColorBox"
    }, "\u3000         ", React.createElement("ul", {
      className: "pcConAttDesign"
    }, btnShow ? this.props.list.map((e, i) => React.createElement("li", {
      className: "pcAttList",
      key: i
    }, this[e] && this[e]())) : null, this.props.list.indexOf('backgroundPanel') != -1 ? React.createElement("li", {
      className: "pcAttList"
    }, this.example()) : null, type == 'Image' || type == 'video' ? React.createElement("li", {
      className: "pcAttList",
      key: type
    }, Background.LIST[type].map(e => this[e]())) : null));
  }
  /**
   * @method backgroundColor 背景颜色属性
   * @author wyq
   * @param {object} prop 参数对象
   * @param {string} prop.title 属性名称
   * @param {string} prop.key 属性键名
   * @return {object} 属性结构 {Public.lang[prop.title]}
   */


  backgroundColor() {
    var _this$state;

    const key = this.props.prefix + "bgColor",
          componentType = this.state.componentType,
          type = (_this$state = this.state[this.props.prefix + 'type']) !== null && _this$state !== void 0 ? _this$state : this.state.type;
    var LinearGradient = '';

    if (this.props.prefix == 'hover') {
      LinearGradient = this.state.hoverLinearGradient;
    } else if (this.props.prefix == 'click') {
      LinearGradient = this.state.clickLinearGradient;
    } else {
      LinearGradient = this.state.LinearGradient;
    }

    return React.createElement(Widget.ColorPicker, {
      id: "bgColor",
      title: "bgColor",
      componentType: componentType,
      color: this.state[key] || this.state.bgColor || LinearGradient || 'rgba(255,255,255,1)',
      change: type ? this.controler.setImageColor.bind(this.controler) : this.controler.set.bind(this.controler, key)
    });
  }
  /**
   * @method backgroundColor 背景颜色属性
   * @author wyq
   * @return {object} 属性结构 {Public.lang[prop.title]}
   */


  backgroundPanel() {
    var _this$state2;

    const type = (_this$state2 = this.state[this.props.prefix + 'type']) !== null && _this$state2 !== void 0 ? _this$state2 : this.state.type;
    let prefix = this.props.prefix,
        _isColor = false;

    if (prefix && prefix.indexOf("hover") != -1) {
      if (type == "Image" || type == "video") {
        return null;
      } else {
        _isColor = true;
      }
    }

    const componentType = this.state.componentType;
    var color = 'rgba(255,255,255,1)';
    var LinearGradient = '';

    if (this.props.prefix == 'hover') {
      LinearGradient = this.state.hoverLinearGradient;
    } else if (this.props.prefix == 'click') {
      LinearGradient = this.state.clickLinearGradient;
    } else {
      LinearGradient = this.state.LinearGradient;
    }

    if (this.state[`${this.props.prefix}bgColor`] && this.state[`${this.props.prefix}bgColor`] != '') {
      color = this.state[`${this.props.prefix}bgColor`];
    } else if (LinearGradient && LinearGradient != '') {
      color = LinearGradient;
    }

    return React.createElement("div", null, React.createElement("h5", {
      className: "pcConAttTitle"
    }, window.public.lang.bgSetUp), React.createElement("div", {
      style: {
        display: 'flex'
      },
      className: "stripBtn pcConAttCon"
    }, React.createElement(Widget.ColorPicker, {
      componentType: componentType,
      id: "backgroundColor",
      title: "bgColor",
      basic: true,
      color: color,
      change: this.controler.color.bind(this.controler)
    }), _isColor ? null : React.createElement(Widget.Button, {
      btnName: `+ ${window.public.lang.image}`,
      click: this.controler.showSource.bind(this.controler, 'image'),
      basic: true,
      skin: type == 'Image' ? 'on' : null
    }), _isColor ? null : React.createElement(Widget.Button, {
      btnName: `+ ${window.public.lang.video}`,
      click: this.controler.showSource.bind(this.controler, "video"),
      basic: true,
      skin: type == 'video' ? 'on' : null
    }), React.createElement(Widget.Button, {
      btnName: `+ ${window.public.lang.iconColor}`,
      click: this.showColorPicker,
      basic: true,
      skin: type == 'BackgroundColor' ? 'on' : null
    })));
  }

  showColorPicker() {
    document.querySelector('#backgroundColor>.backgroundColor>.fcolorpicker-curbox').click();
  }

  example() {
    var _this$state$2, _this$state$3, _this$state$4;

    const type = (_this$state$2 = this.state[`${this.props.prefix}type`]) !== null && _this$state$2 !== void 0 ? _this$state$2 : this.state.type; //是移动端并且是高级幻灯片皮肤，则不显示

    let skin = this.props.node.current.skin;
    let show = true;

    if (this.props.prefix == 'mo' && skin.indexOf("advanced") != -1) {
      show = false;
    }

    var color = 'rgba(255,255,255,1)';
    var LinearGradient = '';

    if (this.props.prefix == 'hover') {
      LinearGradient = this.state.hoverLinearGradient;
    } else if (this.props.prefix == 'click') {
      LinearGradient = this.state.clickLinearGradient;
    } else {
      LinearGradient = this.state.LinearGradient;
    }

    if (LinearGradient && LinearGradient != '') {
      color = LinearGradient;
    } else if (this.state[`${this.props.prefix}bgColor`] && this.state[`${this.props.prefix}bgColor`] != '') {
      color = this.state[`${this.props.prefix}bgColor`];
    } else if (this.state.bgColor && this.state.bgColor != '') {
      color = this.state.bgColor;
    }

    return show ? React.createElement("div", {
      className: "background-example",
      style: type == 'BackgroundColor' ? {
        background: color
      } : null
    }, type ? React.createElement("i", {
      className: "background-example-colse iconfont yiyingbaoicon",
      onClick: this.controler.clear.bind(this.controler)
    }, "\uE99D") : React.createElement("div", {
      className: "background-default"
    }, React.createElement("i", {
      className: "bg-default-icon pageiconfont"
    }, "\uE674"), React.createElement("span", {
      className: "bg-default-title"
    }, "\u70B9\u51FB\u4E0A\u65B9\u201C\u6309\u94AE\u201D\u8FDB\u884C\u80CC\u666F\u8BBE\u7F6E")), type == 'Image' ? React.createElement("img", {
      src: (_this$state$3 = this.state[`${this.props.prefix}uri`]) !== null && _this$state$3 !== void 0 ? _this$state$3 : this.state.uri
    }) : null, type == 'video' ? React.createElement("video", {
      src: (_this$state$4 = this.state[`${this.props.prefix}uri`]) !== null && _this$state$4 !== void 0 ? _this$state$4 : this.state.uri,
      controls: true
    }) : null) : null;
  }

  opacity() {
    var _ref, _this$state$5;

    return React.createElement(Widget.Range, {
      title: "pictureTransparency",
      change: this.controler.setOpacity.bind(this.controler),
      min: 0,
      max: 1,
      step: 0.1,
      value: (_ref = (_this$state$5 = this.state[`${this.props.prefix}opacity`]) !== null && _this$state$5 !== void 0 ? _this$state$5 : this.state.opacity) !== null && _ref !== void 0 ? _ref : 1
    });
  }

  size() {
    return React.createElement(Widget.ImageQuality, {
      id: "imageQuality",
      data: this.state,
      prefix: this.props.prefix,
      help: "qualityTips",
      change: this.controler.setQuality.bind(this.controler, "quality")
    });
  }

  showMode() {
    var _ref2, _this$state$6;

    return React.createElement(Widget.Radio, {
      title: "selectionContent",
      id: "selectShowlist",
      list: [{
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
      }, //实际大小
      {
        name: 'equalRatio',
        value: "no-repeat center center / contain"
      }],
      value: (_ref2 = (_this$state$6 = this.state[`${this.props.prefix}positionMode`]) !== null && _this$state$6 !== void 0 ? _this$state$6 : this.state.positionMode) !== null && _ref2 !== void 0 ? _ref2 : 'repeat',
      change: this.controler.selectShowMode.bind(this.controler)
    });
  }

  position() {
    var _ref3, _this$state$7;

    return React.createElement(Widget.Radio, {
      title: "selectionContent",
      id: "",
      list: [{
        name: 'fixed',
        value: "fixed"
      }, {
        name: 'nofixed',
        value: "initial"
      }],
      value: (_ref3 = (_this$state$7 = this.state[`${this.props.prefix}attachment`]) !== null && _this$state$7 !== void 0 ? _this$state$7 : this.state.attachment) !== null && _ref3 !== void 0 ? _ref3 : 'initial',
      change: this.controler.selectPositionMode.bind(this.controler)
    });
  }

  positionSet() {
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
      var _ref4, _this$state$8;

      return React.createElement("label", {
        key: i
      }, React.createElement("input", {
        type: "radio",
        name: "item",
        checked: ((_ref4 = (_this$state$8 = this.state[`${this.props.prefix}posVal`]) !== null && _this$state$8 !== void 0 ? _this$state$8 : this.state.posVal) !== null && _ref4 !== void 0 ? _ref4 : 'left top') != position[e] ? "" : "checked",
        value: e,
        onChange: this.controler.positionSet.bind(this.controler, position[e])
      }), React.createElement("p", null, e));
    }))));
  }
  /**
   * @method imageWebp   设置图片webp是否开启 
   * @author sxt
   * @param {object} 更改按钮文本内容
   */


  imageWebp() {
    let isWebp = this.state.isWebp;

    if (isWebp === false) {
      isWebp = false;
    } else {
      isWebp = true;
    }

    return React.createElement(Widget.Radio, {
      title: "WebP",
      id: "",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: isWebp,
      change: this.controler.setImgWebp.bind(this.controler, "isWebp")
    });
  }

}

_defineProperty(Background, "LIST", {
  'Image': ['opacity', 'size', 'backgroundColor', 'showMode', 'position', 'positionSet'],
  'video': ['opacity', 'backgroundColor']
});

export default Background
