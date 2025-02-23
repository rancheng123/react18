
import React from 'react';
import CodeEditor from '@/system/widgets/monacoEditor/index';

/**
 * @class {Custom} 样式切换视图类
 */
export default class Customcss {
  constructor(controler) {
    /**@property controler 样式控制器实例 */
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
   * @method render 组件渲染方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    //let {tabs,currentTab,componentType}=this.state||{};
    // return React.createElement("div", {
    //   className: "pc-basic-customcss"
    // }, React.createElement("div", {
    //   style: {
    //     padding: "8px"
    //   }
    // }, React.createElement("div", {
    //   style: {
    //     color: "#6e737d",
    //     marginBottom: "6px",
    //     fontSize: 12
    //   }
    // }, React.createElement("span", null, "\u4EC5\u4E3A\u6B64\u63A7\u4EF6\u6DFB\u52A0\u81EA\u5B9A\u4E49\u6837\u5F0F")), React.createElement("div", {
    //   style: {
    //     border: "1px solid #ccc",
    //     borderRadius: "4px",
    //     padding: "2px"
    //   }
    // }, React.createElement(CodeEditor, {
    //   language: "css",
    //   theme: "vs-dark",
    //   minHeight: "400",
    //   notFullScreen: "true",
    //   value: this.state.customcss,
    //   onChange: this.controler.changeText.bind(this.controler),
    //   editorDidMount: () => { }
    // })), React.createElement("p", {
    //   style: {
    //     color: "#6e737d",
    //     marginTop: "6px",
    //     fontSize: 12
    //   }
    // }, "\u4F60\u9700\u8981\u67E5\u770B\u5F53\u524D\u63A7\u4EF6\u7684class\u540D\u79F0\uFF0C\u5728\u8FDB\u884C\u81EA\u5B9A\u4E49\u6837\u5F0F\u7684\u7F16\u8F91\u3002")));


    return (
      <div className="pc-basic-customcss">
        <div style={{ padding: "8px" }}>
          <div style={{ color: "#6e737d", marginBottom: "6px", fontSize: 12 }}>
            <span>仅为此控件添加自定义样式</span>
          </div>
          <div style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "2px" }}>
            <CodeEditor
              language="css"
              theme="vs-dark"
              minHeight="400"
              notFullScreen={true}
              value={this.state.customcss}
              onChange={this.controler.changeText.bind(this.controler)}
              editorDidMount={() => { }}
            />
          </div>
        </div>
        <p style={{ color: "#6e737d", marginTop: "6px", fontSize: 12 }}>
          你需要查看当前控件的class名称，进行自定义样式的编辑。
        </p>
      </div>
    )

  }

}
