
// 导入模块
import { useState, useEffect } from "react"; // 导入 React 模块
import { createRoot } from 'react-dom/client';
import DesignManager from "./design_manager"; // 导入 DesignManager 变量


/**@private prefix 属性前缀*/

let prefix = "",

  /**@private disableUnit 禁止单位选择*/
  disableUnit = "",

  /**@property tabs 属性项集合 */
  tabs = ["background", "border", "radius", "shadow", "text", "icon", "space", "animation", "hoveranimation", "position", "divider", "levelnav"];
const iconsList = ['&#xe784', '&#xe784', '&#xe784', '&#xe784', '&#xe784', '&#xe784', '&#xe784', '&#xe784', '&#xe784', '&#xe784', '&#xe784', '&#xe784'];


const textsLIst = {
  position: "定位",
  background: "背景",
  border: "边框",
  radius: "圆角",
  shadow: "阴影",
  text: "文字",
  space: "间距",
};
/**
 * @instance {Design} 设计实例
 */
const Design = {
  /**@property config 属性配置对象 */
  config: null,

  /**@property node 控件数据 */
  node: null,

  /**@property publicAttr 公用属性模块 */
  publicAttr: null,

  /**
   * @method design 插入设计属性模块
   * @param {object} opts 参数对象
   * @param {object} opts.list 配置对象
   * @param {object} opts.node 控件数据
   * @param {object} opts.element 插入到的父级节点
   */
  design(opts) {
    var _opts$prefix;
    const DesignComponent = this.render.bind(this);
    this.config = opts.config


    // 
    this.group = opts.list;

    this.publicAttr = opts.publicAttr, this.node = opts.node; //设置项禁用所有单位选择属性
    disableUnit = opts.disableUnit;
    prefix = (window.public.type == 'pc' ? '' : 'mo') + ((_opts$prefix = opts.prefix) !== null && _opts$prefix !== void 0 ? _opts$prefix : "");
    tabs = window.public.configure(tabs, this.group);
    // const ele = ReactDOM.createRoot(opts.element)
    const root = createRoot(opts.element)
    root.render(<DesignComponent root={root} />)
    // ReactDOM.render(React.createElement(DesignComponent, null), opts.element);
  },

  /**
   * @method render 设计项结构
   * @return {object} 设计项结构
   */
  render() {
    const [tab, selectedTab] = useState(tabs[0]);
    // useEffect(() => this.showTab(tab), [tab]);

    const [children, setChildren] = useState(null);
    useEffect(() => {
      const init = async () => {
        let res = []

        if (this.group.group.allShow) {
          // 如果所有项都显示，则直接显示所有项
          for (let index = 0; index < tabs.length; index++) {
            const result = await this.showTab(tabs[index])
            res.push(result)
          }
        } else {
          // 分组展示
          this.showTab(tab)
        }

        setChildren(res)
      }
      init()

    }, [tab]);


    // return React.createElement("div", {
    //   className: "pcPagePropertiesCon"
    // }, React.createElement("div", {
    //   className: "pcDesignLeft"
    // }, React.createElement("ul", {
    //   className: "pcPatternUl"
    // }, tabs.map((e, i) => {
    //   return React.createElement("li", {
    //     key: e,
    //     className: tab != e ? null : "on",
    //     onClick: () => selectedTab(e)
    //   }, React.createElement("i", {
    //     className: `pc-${e}-icon iconfont`,
    //     dangerouslySetInnerHTML: {__html: iconsList[i]}
    //   }));
    // }))), React.createElement("div", {
    //   className: "pcDesignRight",
    //   id: "pro-design"
    // }));

    return (
      <div className="pcPagePropertiesCon">

        {/* 参考站的侧边栏 */}
        {
          //  分组展示
          !this.group.group.allShow &&
          (<div className="pcDesignLeft">
            <ul className="pcPatternUl">
              {tabs.map((e, i) => (
                <li key={e} className={tab !== e ? null : "on"} onClick={() => selectedTab(e)}>
                  {/* <i className={`pc-${e}-icon iconfont`} dangerouslySetInnerHTML={{ __html: iconsList[i] }} /> */}
                  {textsLIst[e]}
                </li>
              ))}
            </ul>
          </div>)
        }

        <div className="pcDesignRight" id="pro-design" >{children}</div>
      </div>
    )
  },

  /**
   * @method showTab 选中当前点击项并显示对应内容
   * @param {object} tab 当前选中项 
   */
  async showTab(tab) {
    const content = document.querySelector("#pro-design");
    const param = {
      element: content,
      prefix,
      disableUnit,
      node: this.node,
      config: this.config,
      publicAttr: this.publicAttr,
    };

    // 统一获取渲染根节点
    // if(!root){
    //   root =  createRoot(content) 
    // }
    // param.root  = root


    //判断是否有属性项的配置      
    if (this.group.group) {
      param.group = this.group.group[tab];
      if (param.group && param.group.all) {
        var _param$group$skin;

        const skin = this.node.current.skin;
        param.group = (_param$group$skin = param.group[skin]) !== null && _param$group$skin !== void 0 ? _param$group$skin : param.group.all;
      }
    }

    // 增加判断是否需要直接显示全部属性
    if (this.group.group.allShow) {
      param.allShow = true
    }

    // 调用生成dom函数
    const res = await this[tab](param);
    return res

  },

  /**
   * @method background 载入背景模块
   * @param {object} opts 参数对象 
   */
  async background(opts) {
    const background = await DesignManager.background("controler");
    return background.background(opts);
  },

  /**
   * @method border 载入边框模块
   * @param {object} opts 参数对象 
   */
  async border(opts) {
    const border = await DesignManager.border("controler");
    return border.border(opts);
  },

  /**
   * @method radius 载入圆角模块
   * @param {object} opts 参数对象 
   */
  async radius(opts) {
    const radius = await DesignManager.radius("controler");
    return radius.radius(opts);
  },

  /**
   * @method shadow 载入阴影模块
   * @param {object} opts 参数对象 
   */
  async shadow(opts) {
    const shadow = await DesignManager.shadow("controler");
    return shadow.shadow(opts);
  },

  /**
   * @method text 载入文本模块
   * @param {object} opts 参数对象 
   */
  async text(opts) {
    const text = await DesignManager.text("controler");
    //  text.text(opts);
    return text.text(opts);
  },

  /**
  * @method animation 载入动画模块
  * @param {object} opts 参数对象 
  */
  async animation(opts) {
    const animation = await DesignManager.animation("controler");
    return animation.animation(opts);
  },

  /**
   * @method hoveranimation 蒙层载入动画模块
   * @param {object} opts 参数对象 
   */
  async hoveranimation(opts) {
    const hoveranimation = await DesignManager.hoveranimation("controler");
    return hoveranimation.hoveranimation(opts);
  },

  /**
   * @method icon 载入图标模块
   * @param {object} opts 参数对象 
   */
  async icon(opts) {
    const icon = await DesignManager.icon("controler");
    return icon.icon(opts);
  },

  /**
   * @method position 载入定位模块
   * @param {object} opts 参数对象 
   */
  async position(opts) {
    const position = await DesignManager.position("controler");
    //  position.position(opts);
    return position.position(opts);

  },

  /**
   * @method space 载入间距模块
   * @param {object} opts 参数列表 
   */
  async space(opts) {
    const space = await DesignManager.space("controler");
    return space.space(opts);
  },

  /**
   * @method levelnav 载入事件方法模块
   * @param {object} opts 参数对象 
   */
  async levelnav(opts) {
    const levelnav = await DesignManager.levelnav("controler");
    return levelnav.levelnav(opts);
  }

};

export default Design
