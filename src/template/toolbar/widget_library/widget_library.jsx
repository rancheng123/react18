// 导入 React 库
import React from "react";
// 导入 toolbar 模块
import Toolbar from "../toolbar";

/**
 * @class {WidgetLibrary} 工具库视图类
 * @author sxt
 * @date  2019-9-23
 */

export default class WidgetLibrary extends React.Component{
  constructor(controler) {
    super(controler)
    /**@property controler WidgetLibrary控制器实例 */
    this.controler = controler;
    this.state = this.controler.state;
    this.props =  this.controler.props;
    this.menus = this.menus.bind(this);
    this.content = this.content.bind(this);
    this.anchor = this.anchor.bind(this);
  }
  /**@property {object} state 获取最新的state属性 */

  // get state() {
  //   return this.controler.state;
  // }
  /**@property {object} props 获取最新的props属性 */

  // get props() {
  //   return this.controler.props;
  // }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-25
   * @author sxt
   * @return {object} 待渲染的组件对象
   */
  componentWillReceiveProps(){
    console.log('componentWillReceiveProps');
  }

  render() {
    const {
      public: { lang },
    } = window;
    let configType = this.controler.configType;
    // return React.createElement(Toolbar, {
    //   id: this.props.id,
    //   title: lang.add + this.state.current.name,
    //   help: this.controler.help.bind(this.controler)
    // }, React.createElement(this.menus, null), React.createElement(this.content, null), configType != "component" ? React.createElement(this.anchor, null) : null);
    return (
      <Toolbar
          id={this.props.id}
          title={lang.add + this.state.current.name}
          // help={this.controler.help.bind(this.controler)}
        >
          {this.menus()}
          {this.content()}
          {configType !== "component" && this.anchor()}
        </Toolbar>
    )
  }
  /**
   * @method close 关闭方法
   * @date 2019-12-05
   * @author wyq
   */

  close() {
    Toolbar.close();
  }
  /**
   * @method menus 工具库右侧导航项
   * @date 2019-09-25
   * @author sxt
   * @return {object} 工具库右侧导航项结构
   */

  menus() {
    // return React.createElement("ul", {
    //   className: "toolFontit"
    // }, this.controler.tabs.map((e, i) => {
    //   return React.createElement("li", {
    //     key: e.id,
    //     className: this.state.current.id != e.id ? null : "on",
    //     onClick: this.controler.selectTab.bind(this.controler, e)
    //   }, React.createElement("a", null, React.createElement("span", null, e.name)));
    // }));
    return (
      <ul className="toolFontit">
        {this.controler.tabs.map((e, i) => {
          return (
            <li
              key={e.id}
              className={this.state.current.id !== e.id ? null : "on"}
              onClick={this.controler.selectTab.bind(this.controler, e)}
            >
              <a>
                <span>{e.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
  /**
   * @method componentHtml 组件库内容项
   * @date 2021-1-20
   * @author sxt
   * @return {object} 组件库内容项结构
   */

  componentHtml() {
    let components = this.controler.group[this.state.current.id];
    // return React.createElement("div", {
    //   className: "content_2 content blockbox",
    //   id: `component-${this.state.current.id}`,
    //   style: {
    //     position: "relative"
    //   }
    // }, components.map((e, i) => {
    //   return React.createElement("div", {
    //     key: i
    //   }, React.createElement("div", {
    //     className: "imgTopic"
    //   }, React.createElement("div", {
    //     className: "imgThemeStyle"
    //   }, React.createElement("div", {
    //     key: e.skin,
    //     "data-key": e.skin,
    //     className: e.skinStyle || e.skin.split(".").slice(2, 4).join("-"),
    //     onMouseDown: this.controler.start.bind(this.controler, e.skin)
    //   }))));
    // }));

    return (
      <div
        className="content_2 content blockbox"
        id={`component-${this.state.current.id}`}
        style={{ position: "relative" }}
      >
        {components.map((e, i) => {
          return (
            <div key={i}>
              <div className="imgTopic">
                <div className="imgThemeStyle">
                  <div
                    key={e.skin}
                    data-key={e.skin}
                    className={
                      e.skinStyle || e.skin.split(".").slice(2, 4).join("-")
                    }
                    onMouseDown={this.controler.start.bind(
                      this.controler,
                      e.skin
                    )}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  /**
   * @method toolLibraryHtml 工具库内容项
   * @date 2021-1-20
   * @author sxt
   * @return {object} 工具库内容项结构
   */

  toolLibraryHtml() {
    let { tabs, group } = this.controler.group[this.state.current.id];
    // return React.createElement("div", {
    //   className: "content_2 content",
    //   style: {
    //     position: "relative"
    //   }
    // }, tabs.map((e, i) => {
    //   return React.createElement("div", {
    //     key: i
    //   }, React.createElement("a", {
    //     name: e.id
    //   }), React.createElement("div", {
    //     className: "toolSmalltit",
    //     style: {
    //       position: "relative"
    //     },
    //     id: e.id
    //   }, React.createElement("h4", null, e.name)), React.createElement("div", {
    //     className: "imgTopic"
    //   }, React.createElement("div", {
    //     className: "imgThemeStyle"
    //   }, React.createElement("ul", {
    //     id: `em-${e.id}`
    //   }, group[e.id].map(t => {
    //     const {
    //       skin,
    //       videoPath,
    //       skinStyle
    //     } = t;
    //     return React.createElement("li", {
    //       key: skin,
    //       "data-key": skin,
    //       className: skinStyle || skin.split(".").slice(2, 4).join("-"),
    //       onMouseDown: this.controler.start.bind(this.controler, skin)
    //     }, React.createElement(this.video, {
    //       path: videoPath
    //     }), t.need_pay ? React.createElement("div", {
    //       className: "component_pay"
    //     }, React.createElement("p", null)) : null);
    //   })))));
    // }));

    return (
      <div className="content_2 content" style={{ position: "relative" }}>
        {tabs.map((e, i) => {
          return (
            <div key={i}>
              <a name={e.id} />
              <div
                className="toolSmalltit"
                style={{ position: "relative" }}
                id={e.id}
              >
                <h4>{e.name}</h4>
              </div>
              <div className="imgTopic">
                <div className="imgThemeStyle">
                  <ul id={`em-${e.id}`}>
                    {group[e.id].map((t) => {
                      const { skin, videoPath, skinStyle } = t;
                      return (
                        <li
                          key={skin}
                          data-key={skin}
                          className={
                            skinStyle || skin.split(".").slice(2, 4).join("-")
                          }
                          onMouseDown={this.controler.start.bind(
                            this.controler,
                            skin
                          )}
                        >
                          {this.video({path:videoPath})}
                          {t.need_pay ? (
                            <div className="component_pay">
                              <p></p>
                            </div>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  /**
   * @method menus 工具库内容项
   * @date 2019-09-25
   * @author sxt
   * @return {object} 工具库内容项结构
   */

  content() {
    let configType = this.controler.configType; //类型为组件库时，走组件库的结构 sxt 2021-1-20

    if (configType == "component") {
      return this.componentHtml();
    } else {
      return this.toolLibraryHtml();
    }
  }
  /**
   * @method video 视频结构
   * @param {object} props 参数对象
   * @param {string} props.path 视频路径
   * @return {object} 视频结构
   */

  video(props) {
    if (props.path) {
      // return React.createElement("div", {
      //   className: "desVideo",
      //   onMouseEnter: e => e.currentTarget.querySelector("video").play(),
      //   onMouseLeave: e => {
      //     const _video = e.currentTarget.querySelector("video");

      //     _video.currentTime = 0, _video.pause();
      //   }
      // }, React.createElement("video", {
      //   style: {
      //     width: "100%",
      //     height: "60px"
      //   },
      //   src: props.path,
      //   loop: true
      // }));
      return (
        <div
          className="desVideo"
          onMouseEnter={(e) => e.currentTarget.querySelector("video").play()}
          onMouseLeave={(e) => {
            const _video = e.currentTarget.querySelector("video");
            _video.currentTime = 0;
            _video.pause();
          }}
        >
          <video
            style={{ width: "100%", height: "60px" }}
            src={props.path}
            loop
          />
        </div>
      );
    }

    return null;
  }
  /**
   * @method menus 工具库锚点项
   * @date 2019-09-25
   * @author sxt
   * @return {object} 工具库锚点项结构
   */

  anchor() {
    let { current, jump, prompt } = this.state,
      { tabs } = this.controler.group[current.id];
    // return React.createElement("div", {
    //   className: "anchorsCon open"
    // }, React.createElement("div", {
    //   className: "anchorsSection"
    // }, React.createElement("ul", {
    //   className: "anchorsMain"
    // }, tabs.map((e, i) => {
    //   if (i == 0 && !jump) {
    //     jump = e.id;
    //   }

    //   return React.createElement("li", {
    //     key: e + i,
    //     className: e.id != jump ? "" : "selected",
    //     "data-anchor-name": e.id,
    //     onMouseEnter: this.controler.anchorMouseEnter.bind(this.controler, e.id),
    //     onMouseLeave: this.controler.anchorMouseLeave.bind(this.controler, e.id)
    //   }, React.createElement("a", {
    //     href: "#" + e.id,
    //     onClick: this.controler.jumpAnchor.bind(this.controler, e.id)
    //   }, React.createElement("div", {
    //     className: "anchorsPin"
    //   })), e.id != (prompt || jump) ? null : React.createElement("div", {
    //     className: "anchor-popover"
    //   }, React.createElement("h4", null, e.name), React.createElement("section", null)));
    // }))));

    return (
      <div className="anchorsCon open">
        <div className="anchorsSection">
          <ul className="anchorsMain">
            {tabs.map((e, i) => {
              if (i === 0 && !jump) {
                jump = e.id;
              }

              return (
                <li
                  key={e + i}
                  className={e.id !== jump ? "" : "selected"}
                  data-anchor-name={e.id}
                  onMouseEnter={this.controler.anchorMouseEnter.bind(
                    this.controler,
                    e.id
                  )}
                  onMouseLeave={this.controler.anchorMouseLeave.bind(
                    this.controler,
                    e.id
                  )}
                >
                  <a
                    href={"#" + e.id}
                    onClick={this.controler.jumpAnchor.bind(
                      this.controler,
                      e.id
                    )}
                  >
                    <div className="anchorsPin" />
                  </a>
                  {e.id !== (prompt || jump) ? null : (
                    <div className="anchor-popover">
                      <h4>{e.name}</h4>
                      <section />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

//# sourceURL=webpack:///./ui/toolbar/widget_library/widget_library.js?
