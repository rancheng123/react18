import React from 'react'

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    /**@property controler header控制器实例 */
    this.controler = props;
    /**@property toolbars 工具栏配置 */

    this.toolbars = [{
      iconClass: "yiyingbaoicon",
      iconName: "",
      type: "componentLibrary"
    }, {
      iconClass: "iconfont",
      iconName: "",
      type: "widgetLibrary"
    }, {
      iconClass: "yiyingbaoicon",
      iconName: "",
      type: "setUp"
    }, {
      iconClass: "yiyingbaoicon",
      iconName: "",
      type: "template"
    }, {
      iconClass: "yiyingbaoicon",
      iconName: "",
      type: "collection"
    }]; //绑定this

    this.state = props.state

    this.iframe = this.iframe.bind(this);
  }


  render() {
    const {
      state: {
        type,
        height,
        rulerShow,
        edibtn
      }
    } = this;
    let _style = null;

    if (type == 'pc' && rulerShow) {
      _style = {
        top: "48px",
        height: "calc(100% - 48px)"
      };
    } //页面为pc，并且头部工具栏隐藏时，top变化 sxt 2022-12-12


    if (type == 'pc' && !edibtn) {
      _style = {
        top: "20px",
        height: "calc(100% - 20px)"
      };
    }

    const siteId = window.pageData.siteId;

    const dom = (
      <div id='ediMain' className={`${type}-content`} style={_style}>
        <div id='edit-container'>
          <iframe 
            id="iframe"
            scrolling="no"
            // onLoad={this.props.load.bind(this.props)}
            src={`/test.html`} 
            // src={`/desktop/index.php/Edit/Response/edit/sid/${siteId}.html${this.state.search}`} 
          />
        </div>
      </div>
    )

    return dom
  }

  iframe() {
    const siteId = window.pageData.siteId;
    return React.createElement("div", {
      id: "edit-container"
    }, React.createElement("iframe", {
      src: `/desktop/index.php/Edit/Response/edit/sid/${siteId}.html${this.state.search}`,
      id: "iframe",
      scrolling: "no",
      onLoad: this.controler.load.bind(this.controler)
    }));
  }

  prompt() {
    if (this.state.type == 'mo') {
      return React.createElement("span", {
        className: "remo_help"
      }, window.public.lang.moEditPrompt, React.createElement("br", null), window.public.lang.moEditPrompta, React.createElement("i", null, "\xD7"));
    }

    return null;
  }

  button() {
    if (this.state.type == 'mo') {
      return React.createElement("div", {
        className: "showPanel",
        onClick: this.controler.showPanel.bind(this.controler)
      }, React.createElement("i", null), React.createElement("span", null, this.state.display == true ? '隐藏导航' : '显示侧导航'));
    }

    return null;
  }
  /**
   * @method DesignPagebtns 弹出设计面板结构
   * @date 2021-1-23
   * @author lw
   */


  DesignPagebtns() {
    if (this.state.type == 'mo' && this.state.display == false) {
      return React.createElement("div", {
        className: "pageStyle",
        onClick: this.controler.showDesignpage.bind(this.controler)
      }, React.createElement("i", null), React.createElement("span", null, "\u8BBE\u8BA1\u9875\u9762"));
    }

    return null;
  }

  toolbar() {
    let edibtn = this.state.edibtn;

    if (this.state.type == 'pc') {
      return React.createElement("div", {
        id: "ediTool"
      }, edibtn ? React.createElement("div", {
        id: "ediToolbtn"
      }, React.createElement("ul", {
        className: "edibtn"
      }, this.toolbars.map((e, i) => {
        return React.createElement("li", {
          key: i,
          "data-type": e.type,
          className: e.type != this.state.toolbar ? e.type : `${e.type} on`,
          onClick: this.controler.showToolbars.bind(this.controler, e.type)
        }, React.createElement("a", null, React.createElement("i", {
          className: e.iconClass
        }, e.iconName), React.createElement("p", null, window.public.lang.toolbars[i])));
      }))) : null, React.createElement("div", {
        id: "edit-toolbar-content"
      }));
    }

    return null;
  }

}
