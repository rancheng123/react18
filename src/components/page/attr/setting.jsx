
// 导入 React 库
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
// 导入公共属性管理器 public_attr_manager 模块
import PublicAttrManager from "./public_attr_manager";
// 导入 widget 模块
import Widget from "@/system/widgets/widget";
// 导入 dispatcher 模块
import Dispatcher from "@/system/tools/dispatcher.js";


/**
 * @instance {Setting} 设置实例
 * @author wyq
 * @version 1.0
 * @date 2019-11-26
 */

const Setting = {
  /**@property tabs 显示项集合*/
  tabs: null,

  /**@property group 项的具体属性配置*/
  group: null,

  /**@property node 控件数据*/
  node: null,

  /**@property ele 父级节点对象*/
  ele: null,

  /**@property publicAttr 公用属性模块 */
  publicAttr: null,

  /**
   * @method setting 插入设计属性模块
   * @date 2019-11-26
   * @author wyq
   * @param {object} opts 参数对象
   * @param {object} opts.list 设置项配置对象
   * @param {object} opts.node 控件数据
   * @param {object} opts.element 父级元素节点 
   */
  setting(opts) {
    if (opts.list && opts.node) {
      const SettingComponent = this.render.bind(this);
      this.config = opts.config
      this.tabs = opts.list.tabs;
      this.group = opts.list.group
      this.publicAttr = opts.publicAttr;
      this.node = opts.node
      this.ele = opts.element;
      // ReactDOM.render(<SettingComponent />, this.ele);
      opts.root.render(<SettingComponent  root={opts.root}/>);
    }
  },

  /**
   * @method render 设置项结构
   * @date 2019-11-26
   * @author wyq
   * @return {object} 设置项结构
   */
  render({root}) {
    const [tab, selectTab] = useState(this.tabs[0]);
    useEffect(() => {
      this.showTabContent(tab,root);
    }, [tab]);
    // return React.createElement("div", {
    //   className: "pcInteractContent"
    // }, React.createElement("ul", {
    //   className: "pcSetUpActive"
    // }, this.tabs.map((e, i) => {
    //   return React.createElement("li", {
    //     key: i,
    //     className: e != tab ? '' : 'on',
    //     onClick: () => selectTab(e)
    //   }, window.public.lang[e]);
    // })), React.createElement("div", {
    //   id: "em-set-content"
    // }));

    return (
      <div className="pcInteractContent">
        <ul className="pcSetUpActive">
          {this.tabs.map((e, i) => {
            return (
              <li
                key={i}
                className={e !== tab ? '' : 'on'}
                onClick={() => selectTab(e)}
              >
                {window.public.lang[e]}
              </li>
            );
          })}
        </ul>
        <div id="em-set-content"></div>
      </div>
    )
  },

  /**
   * @method showTabContent 选中当前点击项并显示对应内容
   * @date 2019-11-26
   * @author wyq
   * @param {object} tab 当前选中项 
   */
  async showTabContent(tab,root) {
    const list = this.group[tab];
    const element = this.ele.querySelector("#em-set-content");

    if (list && list.include.indexOf('code') != -1) {
      return ReactDOM.render(Setting.code(tab), element);
    }
    
    const design = await PublicAttrManager.design();
    
    //插入设计属性
    design.design({
      list: list,
      disableUnit: true,
      node: this.node,
      prefix: tab,
      publicAttr: this.publicAttr,
      element: element,
      root
    });
  },

  code(tab) {
    const {
      current: {
        id
      }
    } = this.node;
    const {
      data: {
        document_data = {}
      }
    } = Dispatcher.dispatch(`${id}_get`);

    function Code() {
      const [code, setCode] = useState(document_data[`${tab}code`]);
      return React.createElement("ul", {
        className: "pcConAttDesign"
      }, React.createElement("li", {
        className: "pcAttList"
      }, React.createElement(Widget.Input, {
        id: "runCoding",
        title: "runCoding",
        value: code,
        placeholder: "\u6B64\u5904\u8BF7\u8F93\u5165\u63D0\u4EA4\u540E\u9700\u8981\u6267\u884C\u7684\u4EE3\u7801",
        change: Setting.setCode.bind(Setting, setCode, tab)
      }), React.createElement("p", {
        className: "formTips btntips",
        dangerouslySetInnerHTML: {
          __html: `注释：1、多个事件代码之间用;分隔<br/>2、如果存在有""情况，需要将""替换为''${tab == 'submit' ? '<br/>3、只有表单里的按钮才会执行提交代码' : ''}`
        }
      })));
    }

    return React.createElement(Code, null);
  },

  setCode(setCode, tab, event) {
    const id = this.node.current.id;
    const value = event.target.value;
    setCode(value);
    Dispatcher.dispatch(`${id}_set`, {
      args: [`document_data.${tab}code`, value]
    });
  }

};

export { Setting }
