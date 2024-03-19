import React from 'react';


/**
 * @class {Header} 编辑页头部视图类
 
 * @version 1.0
 * @date 2019-09-10
 */

export default class Header {
  constructor(controler) {
    /**@property controler header控制器实例 */
    this.controler = controler; // {"iconClass":"iconfont","iconName":"","event":"pageWidth"},
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} props 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-10
   
   * @return {object} 待渲染的组件对象
   */


  render() {
    return React.createElement("header", {
      id: "ediHeader",
      className: this.state.hidden ? "takeBack" : null
    }, this.pageManagement(), this.list(), React.createElement("div", {
      className: "hideBtn",
      "data-hidden": this.state.hidden,
      onClick: this.controler.hidden.bind(this.controler)
    }, React.createElement("i", {
      className: "iconfont"
    }, "\uE60D")));
  }
  /**
   * @method pageManagement 页面管理结构
   * @date 2019-09-10
   
   * @return {object} 页面管理结构
   */


  pageManagement() {
    var location = window.public.location,
        pageId = location.getHash('pageid'),
        //取页面id	lw 2021-3-10
    pageType = window.public.type,
        splicingPageId = '';

    if (pageId) {
      //如果页面id存在则进行拼接 lw 2021-3-10
      splicingPageId = `#pageid=${pageId}`;
    }

    if (pageType == 'mo') {
      //为mo的时候进行拼接 
      splicingPageId = `#type=mo`;

      if (pageId) {
        splicingPageId = `#type=mo&pageid=${pageId}`;
      }
    }

    return React.createElement("div", {
      className: "ediHeLeft"
    }, React.createElement("img", {
      src: window.pageData.logo,
      width: "150",
      style: {
        paddingTop: "2px"
      }
    }), React.createElement("div", {
      className: "edipage",
      onClick: this.controler.pageManage.bind(this.controler)
    }, React.createElement("i", {
      className: "iconfont"
    }, "\uE659"), React.createElement("span", null, `${window.public.lang.currentPage}:${this.state.page}`), React.createElement("i", {
      className: "iconfont pageBtn"
    }, "\uE60C")), pageData.Multilingual.length > 0 ? React.createElement("div", {
      className: "lanpage",
      onClick: this.controler.textPlann.bind(this.controler)
    }, pageData.Multilingual.map((e, i) => {
      if (e.is_new == 1) {
        return React.createElement("span", null, e.language_zh);
      }
    }), React.createElement("i", {
      className: "iconfont pageBtn"
    }, "\uE60C")) : null, this.state.plann == true ? React.createElement("ul", {
      className: "lanClick"
    }, pageData.Multilingual.map((e, i) => {
      return React.createElement("li", {
        className: e.is_new == 1 ? "on" : "",
        key: e.id
      }, React.createElement("a", {
        href: `${e.siteid}${splicingPageId}`
      }, e.language_zh));
    })) : null);
  }
  /**
   * @method list 右侧按钮列表结构
   * @date 2019-09-10
   
   * @return {object} 右侧按钮列表结构
   */
  //<li onClick={this.controler.setRuler.bind(this.controler)}  ></li>


  list() {
    return React.createElement("div", {
      className: "ediHeRight"
    }, React.createElement("ul", {
      className: "e_ulBox"
    }, this.controler.btn_list.map((e, i) => {
      //判断是否存在配置
      if (e) {
        let iconHtml = e.iconName != undefined ? e.iconName : e.title,
            stateIcon = this.state[e.iconName];
        iconHtml = stateIcon ? stateIcon : iconHtml; // 优化title获取的方式 将原来的语言包内的数组修改为JSON格式放在btn_list数组内，该数组在header_controler.js文件内  2020/12/11 lw

        return React.createElement("li", {
          key: i,
          title: e.title,
          id: e.event,
          onClick: e.event ? this.controler[e.event].bind(this.controler) : null
        }, React.createElement("a", {
          href: e.href,
          target: e.target || null
        }, e.event == "rulerShow" ? React.createElement("svg", {
          t: "1582531184791",
          width: "30",
          height: "48",
          className: "icon",
          viewBox: "0 0 1024 1024",
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg",
          "p-id": "5778"
        }, React.createElement("path", {
          d: "M413.84598 635.535515h292.849778V342.685737H413.84598v292.849778z m341.656565 97.614869v48.806788h97.620041v-48.806788h-97.620041z m-146.421656 48.806788h97.614869v-48.806788h-97.614869v48.806788z m-146.428121 0h97.62004v-48.806788h-97.62004v48.806788z m-146.42295 0h97.614869v-48.806788h-97.614869v48.806788zM169.80299 733.150384v48.806788h97.614869v-48.806788H169.80299z m97.614869 146.426828h48.811959v-97.62004h-48.811959v97.62004z m48.811959-244.041697h-48.811959v97.614869h48.811959v-97.614869z m0-146.428121h-48.811959v97.62004h48.811959v-97.62004z m0-146.421657h-48.811959v97.614869h48.811959v-97.614869z m0-146.428121h-48.811959v97.614869h48.811959v-97.614869z",
          "p-id": "5779",
          fill: "#ffffff"
        })) : React.createElement("i", {
          className: e.iconClass,
          dangerouslySetInnerHTML: {
            __html: iconHtml
          }
        })));
      }

      return null;
    })));
  }

}
