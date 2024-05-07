
import React from 'react';
import Util from '@/components/page/util/util';

/**
 * @instance {Component} 控件公用HTML视图实例
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
      }
    } = props; //判断是否存在图标icon

    if (iconName) {
      return React.createElement("i", {
        className: `${id}Ic btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return React.createElement("div", {
        className: `${id}Ic btnIcon`
      }, React.createElement("img", {
        className: "btnImg lazyload",
        "data-src": iconSrc,
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
      style = {},
      headStyle,
      type
    } = props;
    let {
      iconSize = 1.4,
      iconSizeUnit = "rem",
      moiconSize,
      moiconSizeUnit,
      moclickiconSize
    } = headStyle || style;
    let imgFixed = type == "click" ? moclickiconSize || iconSize : moiconSize || iconSize,
      //头部搜索点击时的图片icon lw 2021-4-19
      imgUnit = type == "click" ? iconSizeUnit : moiconSizeUnit || iconSizeUnit;

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
      }));
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
      style = {},
      headStyle,
      type
    } = props;
    let {
      iconSize = 1.4,
      iconSizeUnit = "rem",
      moiconSize,
      moiconSizeUnit,
      moclickiconSize
    } = headStyle || style;
    let imgFixed = type == "click" ? moclickiconSize || iconSize : moiconSize || iconSize,
      //头部搜索点击时的图片icon lw 2021-4-19
      imgUnit = type == "click" ? iconSizeUnit : moiconSizeUnit || iconSizeUnit;

    if (imgUnit == "rem" || imgUnit == "em") {
      imgFixed = imgFixed * 10;
    } //判断是否存在图标icon


    if (iconName) {
      return React.createElement("i", {
        className: `${id}Ic btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return React.createElement("div", {
        className: `${id}Ic btnIcon`
      }, React.createElement("mip-img", {
        width: imgFixed,
        height: imgFixed,
        layout: "fixed",
        class: "btnImg",
        src: iconSrc
      }));
    } //返回null


    return null;
  },

  /**
   * @method script json数据
   * @author wyq
   * @date 2020-11-30
   * @param {object} props 参数列表
   */
  script(props) {
    const {
      document_data: {
        clickcode = '',
        doublecode = '',
        submitcode = ''
      }
    } = props;

    if (clickcode || doublecode || submitcode) {
      const data = `{"clickcode":"${clickcode}","doublecode":"${doublecode}","submitcode":"${submitcode}"}`;
      return React.createElement("script", {
        className: "button-code",
        type: "text/json",
        dangerouslySetInnerHTML: {
          __html: data
        }
      });
    } //返回空


    return null;
  }

};

export default Component
