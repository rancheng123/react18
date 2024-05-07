
// 导入 React 库
import React from 'react';
// 导入 widget_library_config.json 文件
import WidgetLibraryConfig from '@/config/widget_library_config.js';
// 导入 component_library_config.json 文件
import componentLibraryConfig from '@/config/component_library_config.js';
// 导入 drag_add 模块
import DragAdd from '../drag_add';
// 导入 components_manager函数
import componentsManager from '@/components/components_manager';
// 导入 toolbar 模块
import Toolbar from "../toolbar";


var nmbTerm = null; //用来存储切换控件库内选项的index

var nmbTermid = null; //用来存储切换控件库内选项的id   

export default class WidgetLibraryControler extends React.Component {
  constructor(props) {
    super(props);
    let configType = props.configType || "";
    /**@property {object} info 拖拽控件的信息 */

    this.info = null;
    this.configType = configType; //类型为组件时

    if (configType == "component") {
      this.tabs = componentLibraryConfig.group[137].tabs || {}; // //currentTab=tabs[0].id,

      this.group = JSON.parse(JSON.stringify(componentLibraryConfig.group[137].group || {}));
    } else {
      /**@property {object} tabs 控件列表*/
      this.tabs = WidgetLibraryConfig.tabs;
      /**@property {object} group 控件内容列表*/

      this.group = JSON.parse(JSON.stringify(WidgetLibraryConfig.group));
    }
    /**@property {string} skin 拖拽控件的皮肤名 */


    this.skin = ''; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
  }

  static widgetLibrary(toolBarsRoot, configType) {
    toolBarsRoot.render(<WidgetLibraryControler configType={configType}  toolBarsclose={()=> toolBarsRoot.unmount()}/>)
  }
  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    const {
      public: { lang },
    } = window;

    return (
      <Toolbar
          title={lang.add + this.state.current.name}
          close={()=> this.props.toolBarsclose()}
          // help={this.controler.help.bind(this.controler)}
        >
          {this.menus()}
          {this.content()}
          {this.configType !== "component" && this.anchor()}
        </Toolbar>
    )

  }
  
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */
  init() {
    var tabs = this.tabs || [],
        tabsinx = '';

    if (nmbTerm && nmbTermid && tabs[nmbTerm] && nmbTermid == tabs[nmbTerm].id) {
      tabsinx = nmbTerm;
    }

    this.state = {
      current: tabsinx != '' ? tabs[tabsinx] : tabs[0]
    }; //初始化时如果tabsinx值为''的话，打开时就默认选中第一个选项，否则打开就是之前关闭时的位置 lw date 2021-2-3
  }
  /**
   * @method selectTab 切换控件项方法
   * @param {string} tab 切换的值
   */
  selectTab(tab) {
    nmbTermid = tab.id;
    var tabsArray = this.tabs; //获取控件库数组 

    this.setState({
      current: tab,
      jump: "",
      top: 0
    });

    for (var i = 0; i < tabsArray.length; i++) {
      if (tab == tabsArray[i]) {
        //遍历对比进行存值 
        nmbTerm = i;
      }
    }
  }

  // close(close) {
    // this.__proto__.close = close;
    // Toolbar.close();
  // }

  help() {}
  /**
   * @method scrollTo 滚动条变化时，锚点定位方法
   */
  scrollTo() {
    const _anchor = document.querySelector(".anchorsMain .selected"),
          _parent = document.querySelector(".content_2"),
          {
      offsetHeight: conHeight
    } = _parent,
          {
      offsetHeight: mHeight,
      scrollTop: parNodePar
    } = _parent.parentNode; //当前项存在下一个元素时


    if (_anchor.nextElementSibling) {
      //获取下一个元素的top值
      let _nextName = _anchor.nextElementSibling.dataset.anchorName,
          _next = document.getElementById(_nextName),
          _nextTop = _next.offsetTop; //滚动条的位置大于下一个元素的top时，赋值


      if (parNodePar > _nextTop) {
        return this.setState({
          jump: _nextName
        });
      }
    } //当前项存在上一个元素时


    if (_anchor.previousElementSibling) {
      //获取上一个元素的top值
      let _prevName = _anchor.previousElementSibling.dataset.anchorName,
          _prev = document.getElementById(_prevName),
          _prevTop = _prev.offsetTop; //滚动条的位置小于等于下一个元素的top时，赋值


      if (parNodePar <= _prevTop) {
        return this.setState({
          jump: _prevName
        });
      }
    } //父级高度+滚动条top大于等于内容总高时，证明在最底部，最后一个元素选中


    if (mHeight + parNodePar >= conHeight) {
      const _last = document.querySelector(".anchorsMain>li:last-child");

      return this.setState({
        jump: _last.dataset.anchorName
      });
    }
  }


  /**
   * @method anchorMouseEnter 锚点移入方法
   * @param {string} value 切换的值
   */
  anchorMouseEnter(value) {
    this.setState({
      prompt: value
    });
  }


  /**
  * @method anchorMouseLeave 锚点移出方法
  */
  anchorMouseLeave() {
    this.setState({
      prompt: ""
    });
  }


  /**
  * @method jumpAnchor 点击锚点方法
  * @param {string} value 切换的值
  */
  jumpAnchor(value) {
    this.setState({
      jump: value
    });
  }


  /**
   * @method getData 获取控件数据
   * @return {object} 控件数据 
   */
  async getData() {
    if (this.skin) {
      const [type, classname] = this.skin.split(".");
      const module = await componentsManager(type);
      if (module) {
        const name = window.humpJoin(classname, "_");
        const data = await module.getData(name);
        return data ? data.items[this.skin] : null;
      }
    }

    return null;
  }


  /**
   * @method start 拖拽开始执行方法
   * @param {string} skin 皮肤
   * @param {event} event 事件对象
   */
  start(skin, event) {
    this.skin = skin;
    new DragAdd(this).start(event);
  }

  /**
   * @method menus 工具库右侧导航项
   * @return {object} 工具库右侧导航项结构
   */
  menus() {
    return (
      <ul className="toolFontit">
        {this.tabs.map((e, i) => {
          return (
            <li
              key={e.id}
              className={this.state.current.id !== e.id ? null : "on"}
              onClick={()=>this.selectTab(e)}
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
   * @return {object} 组件库内容项结构
   */
  componentHtml() {
    let components = this.group[this.state.current.id];
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
                    onMouseDown={(event)=> this.start(e.skin,event)}
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
   * @return {object} 工具库内容项结构
   */
  toolLibraryHtml() {
    let { tabs, group } = this.group[this.state.current.id];
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
                          onMouseDown={(event)=> this.start(skin,event)}
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
   * @return {object} 工具库内容项结构
   */
  content() {
    let configType = this.configType; //类型为组件库时，走组件库的结构 sxt 2021-1-20

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
   * @return {object} 工具库锚点项结构
   */
  anchor() {
    let { current, jump, prompt } = this.state,
      { tabs } = this.group[current.id];
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
                  onMouseEnter={()=>this.anchorMouseEnter(e)}
                  onMouseLeave={()=>this.anchorMouseLeave(e)}
                >
                  <a
                    href={"#" + e.id}
                    onClick={()=> this.jumpAnchor(e)}
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
