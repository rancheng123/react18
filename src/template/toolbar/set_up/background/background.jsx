// 导入 React 库
import React from 'react';
// 导入 widget 模块
import Widget from '@/system/widgets/widget.js';

/**
 * @class {Background} 背景视图类
 * @author wyq
 * @version 1.0
 * @date 2020-04-11
 */

export default class Background {
  constructor(controler) {
    /**@property controler 背景控制器实例 */
    this.controler = controler;
    this.backgroundThumb = this.backgroundThumb.bind(this);
    this.backgroundList = this.backgroundList.bind(this);
    this.backgroundType = this.backgroundType.bind(this);
    this.showColorPanel = this.showColorPanel.bind(this);
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
   * @date 2019-12-16
   * @author qxs
   * @return {object} 待渲染的组件对象
   */


  render() {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "relative",
      style: {
        height: '174px'
      }
    }, React.createElement(this.backgroundThumb, null), React.createElement(this.backgroundType, null)), React.createElement(this.backgroundList, null), React.createElement("div", {
      className: "panlBottom"
    }, React.createElement("button", {
      className: "contorlBtn",
      onClick: this.controler.showApplyPanel.bind(this.controler)
    }, React.createElement("font", null, window.public.lang.applyAllPage))));
  }
  /**
   * backgroundThumb
   */


  backgroundThumb() {
    const {
      uri,
      type,
      bgColor
    } = this.state;

    switch (type) {
      case 'Image':
        return React.createElement("div", {
          className: "stripSetBox"
        }, React.createElement(Widget.Button, {
          btnName: window.public.lang["setUp"],
          click: this.controler.showImagePanel.bind(this.controler)
        }), React.createElement("div", {
          className: "stripBgColor",
          style: {
            backgroundColor: "#eee"
          }
        }, React.createElement("p", null)), React.createElement("img", {
          src: uri,
          width: "300",
          height: "174"
        }));

      case 'video':
        return React.createElement("div", {
          className: "stripSetBox"
        }, React.createElement("div", {
          className: "stripBgColor",
          style: {
            backgroundColor: "#eee"
          }
        }, React.createElement("p", null)), React.createElement("img", {
          src: uri,
          width: "300",
          height: "174"
        }));

      case 'BackgroundColor':
        return React.createElement("div", {
          style: {
            height: '134px',
            backgroundColor: bgColor
          }
        });

      default:
        return null;
    }
  }
  /**
   * backgroundList
   */


  backgroundList() {
    const imgList = ['stripv2.jpg', 'stripv3.jpg', 'stripv4.jpg', 'stripv5.jpg', 'stripv6.jpg', 'stripv7.jpg'];
    return React.createElement("ul", {
      style: {
        overflow: 'auto',
        height: '410px'
      },
      className: "conStyle stripStyle"
    }, React.createElement("li", null, React.createElement("h5", null, window.public.lang["chooseBackground"])), React.createElement("li", null, React.createElement("div", {
      onClick: this.controler.backgroundColor.bind(this.controler, ''),
      className: "BgstyleList noBg"
    }, window.public.lang["noBackground"]), imgList.map((img, i) => {
      const _img = `http://img.bjyyb.net/pcbj/${img}`;
      return React.createElement("div", {
        key: i,
        className: "BgstyleList",
        onClick: this.controler.backgroundImage.bind(this.controler, _img, this.state, '400'),
        style: {
          backgroundImage: `url(${_img})`
        }
      });
    })));
  }
  /**
   * showColorPanel
   */


  showColorPanel() {
    document.querySelector('#backgroundColor>.backgroundColor>.fcolorpicker-curbox').click();
  }
  /**
   * backgroundType
   */


  backgroundType() {
    const {
      bgColor
    } = this.state;
    return React.createElement("div", {
      style: {
        display: 'flex'
      },
      className: "stripBtn"
    }, React.createElement(Widget.ColorPicker, {
      id: "backgroundColor",
      title: "bgColor",
      basic: true,
      color: bgColor,
      change: this.controler.backgroundColor.bind(this.controler)
    }), React.createElement(Widget.Button, {
      btnName: window.public.lang["iconColor"],
      click: this.showColorPanel
    }), React.createElement(Widget.Button, {
      btnName: window.public.lang["image"],
      click: this.controler.selectImageShow.bind(this.controler)
    }), React.createElement(Widget.Button, {
      btnName: window.public.lang["video"],
      click: this.controler.selectVideoShow.bind(this.controler)
    }));
  }

}
