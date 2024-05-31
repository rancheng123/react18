// 导入React和ReactDOM库
import React from "react";
import ReactDOM from "react-dom";

// 导入其他模块
import PageHistory from "./page_history";
import Layer from "@/system/widgets/layer";

export default class PageHistoryControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {space} view 初始化 view 实例*/

    this.view = new PageHistory(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  static pageManagement() {
    const element = document.querySelector("#page-management");
    ReactDOM.render(React.createElement(PageHistoryControler, null), element);
  }
  /**
   * @method  render 挂载组件方法
   * @author sxt
   */

  render() {
    return React.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */

  init() {
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    const { pid } = this.props;
    let newData = {
      sid: pageData.siteId,
      pid,
      module: "page",
    };
    return fetch("/desktop/index.php/Edit/DBLog/index", {
      method: "POST",
      headers: {},
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data.msg,
        });
      });
  }
  /**
   * @description: 页面数据还原
   * @param {type}
   * @return: void
   */

  pageDataReductionHandle(id) {
    fetch("/desktop/index.php/Edit/DBLog/recoveryDbLog", {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.suc) {
          document
            .getElementById("pageSet")
            .querySelector(".layer-close")
            .click();
          window.public.reload();
        } else {
          alert(data.msg);
        }
      });
  }
  /**
   * @description: 页面数据还原提示
   * @param {id} 页面日志id
   * @return: void
   */
  pageDataReduction(id) {
    Layer.alert({
      area: ["420px", "225px"],
      skin: "",
      close: true,
      cancel: true,
      ensure: this.pageDataReductionHandle.bind(this, id),
      content: "确定要还原页面数据吗?",
    });
  }
}
