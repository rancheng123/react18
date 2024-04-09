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
   * @method items 控件外层包裹结构
   * @date 2019-11-4
   * @author wyq
   * @param {object} props 参数对象
   * @param {string} porps.id 控件id
   * @param {object} props.children 控件子节点集合 
   * @return {object} 控件外层包裹结构
   */
  items(props) {
    const {
      id,
      data
    } = props;

    if (props.childs == undefined) {
      props.childs = (e, i) => {
        return React.createElement(Util.linkDecorator, {
          className: `${id}`,
          id: e,
          key: i,
          link: data[e].link,
          type: props.type || "html",
          key: e
        }, React.createElement(Component.icon, {
          id: id,
          icon: data[e].icon || {}
        }), React.createElement("span", {
          className: `${id}set`
        }, data[e].label));
      };
    }

    return React.createElement("div", {
      className: "footerNavBox"
    }, props.items.map(props.childs));
  },

  /**
   * @method items 控件外层包裹结构
   * @date 2019-11-4
   * @author wyq
   * @param {object} props 参数对象
   * @param {string} porps.id 控件id
   * @param {object} props.children 控件子节点集合 
   * @return {object} 控件外层包裹结构
   */
  AMPitems(props) {
    const {
      id,
      data,
      state = {}
    } = props;

    if (props.childs == undefined) {
      props.childs = (e, i) => {
        return React.createElement(Util.linkDecorator, {
          className: `${id}`,
          id: e,
          key: i,
          link: data[e].link,
          type: props.type || "html",
          key: e
        }, React.createElement(Component.ampIcon, {
          id: id,
          icon: data[e].icon || {},
          state: state
        }), React.createElement("span", {
          className: `${id}set `
        }, data[e].label));
      };
    }

    return React.createElement("div", {
      className: "footerNavBox"
    }, props.items.map(props.childs));
  },

  /**
   * @method MIPitems 控件外层包裹结构
   * @date 2019-11-4
   * @author wyq
   * @param {object} props 参数对象
   * @param {string} porps.id 控件id
   * @param {object} props.children 控件子节点集合 
   * @return {object} 控件外层包裹结构
   */
  MIPitems(props) {
    const {
      id,
      data,
      state = {}
    } = props;

    if (props.childs == undefined) {
      props.childs = (e, i) => {
        return React.createElement(Util.linkDecorator, {
          className: `${id}`,
          id: e,
          key: i,
          link: data[e].link,
          type: props.type || "html",
          key: e
        }, React.createElement(Component.mipIcon, {
          id: id,
          icon: data[e].icon || {},
          state: state
        }), React.createElement("span", {
          className: `${id}set `
        }, data[e].label));
      };
    }

    return React.createElement("div", {
      className: "footerNavBox"
    }, props.items.map(props.childs));
  },

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
        className: `${id}iIc langIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return React.createElement("img", {
        className: `${id}iIc langIcon`,
        src: iconSrc
      });
    } //返回null


    return null;
  },

  /**
   * @method ampIcon 获取ampIcon结构
   * @param {object} props 参数列表
   * @param {string} props.id 控件id
   * @param {object} props.icon 图标对象
   * @return {object} icon结构
   */
  ampIcon(props) {
    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      state
    } = props;
    let {
      data: {
        theme_data: {
          style = {}
        }
      }
    } = state;
    let {
      iconSize = 2.4,
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
        className: `${id}iIc langIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return React.createElement("amp-img", {
        width: imgFixed,
        height: imgFixed,
        layout: "fixed",
        "data-amp-auto-lightbox-disable": "true",
        class: `${id}iIc langIcon`,
        src: iconSrc
      });
    } //返回null


    return null;
  },

  /**
   * @method ampIcon 获取ampIcon结构
   * @param {object} props 参数列表
   * @param {string} props.id 控件id
   * @param {object} props.icon 图标对象
   * @return {object} icon结构
   */
  mipIcon(props) {
    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      state
    } = props;
    let {
      data: {
        theme_data: {
          style = {}
        }
      }
    } = state;
    let {
      iconSize = 2.4,
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
        className: `${id}iIc langIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return React.createElement("mip-img", {
        width: imgFixed,
        height: imgFixed,
        layout: "fixed",
        class: `${id}iIc langIcon`,
        src: iconSrc
      });
    } //返回null


    return null;
  }

};

export default Component
