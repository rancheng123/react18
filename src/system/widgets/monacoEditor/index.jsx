
import React from 'react';
// 导入 monaco 编辑器相关的模块
import MonacoEditor from './monaco';
import './index.css';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class CodeEditor extends React.Component {
  constructor() {
    super();

    _defineProperty(this, "handleChange", newValue => {
      var _this$props$onChange, _this$props;

      (_this$props$onChange = (_this$props = this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props, newValue);
    });

    _defineProperty(this, "handleEditorDidMount", editor => {
      var _this$props$editorDid, _this$props2;

      (_this$props$editorDid = (_this$props2 = this.props).editorDidMount) === null || _this$props$editorDid === void 0 ? void 0 : _this$props$editorDid.call(_this$props2, editor);
    });

    _defineProperty(this, "handleClick", e => {
      const dom = this.domRef;

      if (dom.classList.contains('full-screen')) {
        dom.classList.remove('full-screen');
        dom.style.width = '100%';
        dom.style.height = '450px';
        dom.style.options = 'relative';
        dom.style.left = 0;
        dom.style.right = 0;
        dom.style.top = 0;
        this.setState({
          minacoheight: '450',
          isfullscreen: false
        });
      } else {
        dom.classList.add('full-screen');
        dom.style.left = '60px';
        dom.style.right = '60px';
        dom.style.top = '60px';
        dom.style.width = '100vw';
        dom.style.height = '100vh';
        dom.style.options = 'fixed';
        this.setState({
          minacoheight: '100vh',
          isfullscreen: true
        });
      }

      e.stopPropagation();
    });

    this.state = {
      minacoheight: '450',
      isfullscreen: false
    };
    this.domRef = null;
  }

  componentWillUnmount() {
    console.log('卸载');
    // window.HTML_EDOTOR &&  window.HTML_EDOTOR.dispose();
    // window.HTML_EDOTOR = null;
    // window.CSS_EDOTOR && window.CSS_EDOTOR.dispose();
    // window.CSS_EDOTOR = null;

    this.setState = () => false;
  } // 编辑类容change


  render() {
    const defaultOptions = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: true
    };
    const {
      language,
      value,
      theme,
      notFullScreen,
      minHeight
    } = this.props || {};
    const {
      minacoheight,
      isfullscreen
    } = this.state;
    // return React.createElement("div", {
    //   className: "monaco-code",
    //   ref: dom => this.domRef = dom
    // }, !notFullScreen ? React.createElement("div", {
    //   className: "monaco-icon",
    //   onClick: this.handleClick
    // }, isfullscreen ? React.createElement("span", {
    //   title: "\u9000\u51FA\u6700\u5927\u5316",
    //   style: {
    //     fontSize: "22px"
    //   },
    //   className: "yiyingbaoicon"
    // }, "\uE9B0") : React.createElement("span", {
    //   title: "\u6700\u5927\u5316",
    //   style: {
    //     fontSize: "22px"
    //   },
    //   className: "yiyingbaoicon"
    // }, "\uE90C")) : null, React.createElement(MonacoEditor, {
    //   height: minHeight || minacoheight,
    //   language: language || 'javascript',
    //   value: value,
    //   options: defaultOptions,
    //   onChange: this.handleChange,
    //   editorDidMount: this.handleEditorDidMount,
    //   theme: theme || 'vs-dark'
    // }));

    return (
      <div className="monaco-code" ref={dom => this.domRef = dom}>
        {!notFullScreen && (
          <div className="monaco-icon" onClick={this.handleClick}>
            {isfullscreen ? (
              <span
                title="退出最大化"
                style={{ fontSize: "22px" }}
                className="yiyingbaoicon"
              >
                \uE9B0
              </span>
            ) : (
              <span
                title="最大化"
                style={{ fontSize: "22px" }}
                className="yiyingbaoicon"
              >
                \uE90C
              </span>
            )}
          </div>
        )}
        <MonacoEditor
          height={minHeight || minacoheight}
          language={language || 'javascript'}
          value={value}
          options={defaultOptions}
          onChange={this.handleChange}
          editorDidMount={this.handleEditorDidMount}
          theme={theme || 'vs-dark'}
        />
      </div>
    )
  }

}

// /* harmony default export */ __webpack_exports__["default"] = (CodeEditor);

export default CodeEditor;