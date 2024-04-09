// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';


/**
 * @instance {Component} 控件公用HTML视图实例
 * @author wyq
 * @version 1.0
 * @date 2019-10-18
 */

const Component = {
  /**
   * @method icon 获取icon结构
   * @param {object} props 参数列表
   * @param {string} props.id 控件id
   * @param {object} props.icon 图标对象
   * @return {object} icon结构
   */
  icon(props) {
    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      type
    } = props; //判断是否存在图标icon

    if (iconName) {
      return React.createElement("i", {
        className: `${id}Ic  ${id}${type} btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return React.createElement("div", {
        className: `${id}Ic btnIcon ${id}${type}`
      }, React.createElement("img", {
        className: "btnImg lazyload",
        "data-src": iconSrc,
        "data-webp": Util.webp(iconSrc),
        src: Util.source ? 'https://img.bjyyb.net/grey.png' : iconSrc
      }));
    } //返回null


    return null;
  },

  ampIcon(props) {
    //iconSize
    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      style = {}
    } = props;
    let {
      iconSize = 1.4,
      iconSizeUnit = "rem",
      moiconSize,
      moiconSizeUnit
    } = style;
    let imgFixed = moiconSize || iconSize,
        imgUnit = moiconSizeUnit || iconSizeUnit;

    if (imgUnit == "rem" || imgUnit == "em") {
      imgFixed = imgFixed * 10;
    } //判断是否存在图标icon


    if (iconName) {
      return React.createElement("i", {
        className: `${id}Ic btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      const webp = Util.webp(iconSrc);
      return React.createElement("div", {
        className: `${id}Ic btnIcon`
      }, React.createElement("amp-img", {
        width: imgFixed,
        height: imgFixed,
        "data-amp-auto-lightbox-disable": "true",
        layout: "fixed",
        class: "btnImg",
        src: iconSrc
      }, webp ? React.createElement("amp-img", {
        src: webp,
        "data-amp-auto-lightbox-disable": "true",
        class: "btnImg",
        tabIndex: "0",
        layout: "fixed",
        "custom-fallback": "fallback",
        width: imgFixed,
        height: imgFixed
      }) : null));
    } //返回null


    return null;
  },

  mipIcon(props) {
    //iconSize
    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      style = {}
    } = props;
    let {
      iconSize = 1.4,
      iconSizeUnit = "rem",
      moiconSize,
      moiconSizeUnit
    } = style;
    let imgFixed = moiconSize || iconSize,
        imgUnit = moiconSizeUnit || iconSizeUnit;

    if (imgUnit == "rem" || imgUnit == "em") {
      imgFixed = imgFixed * 10;
    } //判断是否存在图标icon


    if (iconName) {
      return React.createElement("i", {
        className: `${id}Ic btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      const webp = Util.webp(iconSrc);
      return React.createElement("div", {
        className: `${id}Ic btnIcon`
      }, React.createElement("mip-img", {
        width: imgFixed,
        height: imgFixed,
        layout: "fixed",
        class: "btnImg",
        src: iconSrc
      }, webp ? React.createElement("source", {
        srcSet: webp,
        type: "image/webp"
      }) : null));
    } //返回null


    return null;
  }

};

export default Component;