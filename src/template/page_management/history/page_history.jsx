
// 导入React库
import React from 'react';
import Layer from '@/system/widgets/layer';

/**
 * @class HistoryRecord 页面历史操作记录
 * @author  
 */

class PageHistory {
  constructor(controler) {
    /**@property controler seo控制器实例 */
    this.controler = controler;
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
   * @method render 视图入口方法
   * @author sxt
   * @return {object} 组件结构
   */


  render() {
    const {
      data
    } = this.state;
    return React.createElement(Layer.open, {
      titles: [window.public.lang["histotyRecord"]],
      offset: ['300px', '0px'],
      area: ["345px", "474px"],
      skin: "em-function-seo",
      ensure: false,
      close: true
    }, React.createElement("div", {
      className: "histoty-record"
    }, React.createElement("ul", null, this.histotyRecord(data))));
  }

  histotyRecord(list) {
    return list.map(({
      id,
      description
    }) => {
      return React.createElement("li", {
        key: id
      }, React.createElement("span", null, description), "\xA0|\xA0", React.createElement("a", {
        href: "javascript:void(0)",
        onClick: this.controler.pageDataReduction.bind(this.controler, id)
      }, "\u8FD8\u539F"));
    });
  }

}

export default  PageHistory;