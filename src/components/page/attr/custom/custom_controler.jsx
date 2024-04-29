
// 导入 React 库
import React from "react";
import ReactDOM from 'react-dom';
// 导入 Custom 组件
import Custom from "./custom";
// 导入自定义配置
import customConfig from "@/config//custom_config.json";
// 导入组件管理器
import componentsManager from "@/components/components_manager";
// 导入调度器
import Dispatcher from "dispatcher";



/**
 * @class {CustomControler} 样式切换功能类
 * @author sxt
 * @version 1.0
 * @date 2020-2-6
 */

export default class CustomControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    this.view = new Custom(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @static custom 插入结构方法
   * @author sxt 
   * @date 2020-2-6
   * @param {object} opts 参数列表
  */


  static custom(opts) {
    const {
      node,
      element,
      config
    } = opts;
    ReactDOM.render(React.createElement(this, {
      id: node.current.id,
      node: node,
      config: config
    }), element);
  }
  /**
   * @static render 返回结构
   * @author sxt 
   * @date 2020-2-6
   * @return {object} 结构
  */
  render() {
    debugger
    return React.createElement(this.view.render, null);
  }
  /**
   * @static init 初始化方法
   * @author sxt 
   * @date 2020-2-6
  */


  init() {
    let currentId = this.props.id; //当前控件id

    let parentId = this.props.node.parent.id; //父级id

    let parentData = Dispatcher.dispatch(`${parentId}_get`),
        //父级数据
    components = parentData && parentData.component.components || [],
        //父级控件数组
    _index = 0; //当前控件所在父级位置
    //id为document时，取children sxt 2020-7-9

    if (parentId == "document") {
      components = parentData && parentData.component.children || [];
    }

    let datas = Dispatcher.dispatch(`${currentId}_get`); //获取控件数据

    const {
      component: {
        layout
      },
      data = {}
    } = datas; //循环查找控件所在父级位置

    for (let i = 0; i < components.length; i++) {
      if (currentId == components[i].id) {
        _index = i;
        break;
      }
    }

    this.state = {};
    this.state.parentId = parentId;
    this.state.currentId = currentId;
    this.state.index = _index;
    this.state.datas = datas; //控件数据

    let skin = data.theme_data.skin,
        skinArr = skin.split("."),
        currentData = customConfig.group[skinArr[0]]; //当前控件样式配置数据

    this.state.skin = skin; //当前控件皮肤

    this.state.tabs = currentData.tabs; //控件分类项

    this.state.currentTab = skinArr[1]; //当前默认选中项

    this.state.group = currentData.group; //控件样式列表数据
  }
  /**
  * @method clickTabs 设置上部选项的切换
  * @author sxt 
   * @date 2020-2-7
  * @param {string} value 切换值
  */


  clickTabs(value) {
    this.setState({
      currentTab: value
    });
  }
  /**
  * @method changeStyle 修改样式数据方法
  * @author sxt 
   * @date 2020-2-10
  * @param {Object} newComponent 新数据里的值
   * @param {Object} state state对象
   * @return {Object} 设置的新数据
  */


  changeStyle(newComponent, state) {
    let stateData = state.datas.data || {},
        layout = state.datas.component.layout;

    if (stateData.document_data) {
      newComponent.data = stateData.document_data;
    } //存在document_data时再改变


    if (stateData.animation_data) {
      newComponent.animation = stateData.animation_data;
    } //存在动画数据时


    if (layout) {
      newComponent.structure.layout = layout;
    }

    return newComponent;
  }
  /**
  * @method getStyleMargin 获取数据中的margin的数据
  * @author sxt 
   * @date 2020-2-12
  * @param {Object} style style数据
   * @return {Object} Margin数据
  */


  getStyleMargin(style) {
    // "marginTop":"0",
    // "marginRight":"32",
    // "marginBottom":"0", 
    // "marginLeft":"32",
    // "momarginTop": "1",
    // "momarginRight": "auto",
    // "momarginBottom": "1",
    // "momarginLeft": "auto",
    // "marginTopUnit": "rem",
    // "marginRightUnit": "%",
    // "marginBottomUnit": "rem",
    // "marginLeftUnit": "%",
    // "momarginTopUnit": "rem",
    // "momarginRightUnit": "%",
    // "momarginBottomUnit": "rem",
    // "momarginLeftUnit": "%",
    //修改margin时，要把margin和momargin及单位都要保留 sxt 2021-3-23
    return {
      marginTop: style.marginTop || "",
      marginRight: style.marginRight || "",
      marginBottom: style.marginBottom || "",
      marginLeft: style.marginLeft || "",
      momarginTop: style.momarginTop || "",
      momarginRight: style.momarginRight || "",
      momarginBottom: style.momarginBottom || "",
      momarginLeft: style.momarginLeft || "",
      marginTopUnit: style.marginTopUnit || "",
      marginRightUnit: style.marginRightUnit || "",
      marginBottomUnit: style.marginBottomUnit || "",
      marginLeftUnit: style.marginLeftUnit || "",
      momarginTopUnit: style.momarginTopUnit || "",
      momarginRightUnit: style.momarginRightUnit || "",
      momarginBottomUnit: style.momarginBottomUnit || "",
      momarginLeftUnit: style.momarginLeftUnit || ""
    };
  }
  /**
  * @method setMargin 获取数据中的margin的数据
  * @author sxt 
   * @date 2020-2-12
  * @param {Object} component 新控件数据
   * @param {Object} state state对象
   * @return {Object} style数据
  */


  setMargin(component, state) {
    let stateStyle = state.datas.data.theme_data.style || {},
        margin = this.getStyleMargin(stateStyle); //保留原有的禁拖和禁删属性   wh 2022-9-3

    let isDragable = state.datas.component.isDragable,
        removable = state.datas.component.removable;
    let newStyle = component.style.style;

    if (isDragable === true || isDragable === false) {
      component.structure = { ...component.structure,
        isDragable
      };
    }

    if (removable === true || removable === false) {
      component.structure = { ...component.structure,
        removable
      };
    }

    component.style.style = { ...newStyle,
      ...margin
    };
    return component;
  }
  /**
  * @method addSelect 新增切换样式方法
  * @author sxt 
   * @date 2020-2-11
   * @param {string} componentType 控件类型
  * @param {Object} component 新数据里的值
   * @param {Object} state state对象
  */


  addSelect(componentType, component, state, event) {
    let newComponent = {}; //类型为列表和表单时，所有数据都替换

    if (componentType == "em-List" || componentType == "em-Form" || componentType == "em-Search" || componentType == "em-Menu") {
      newComponent = component;
    } else {
      newComponent = JSON.parse(JSON.stringify(component));
      newComponent = this.changeStyle(newComponent, state); //存在单独处理方法时

      if (this.selectedData) {
        //调用控件中写的单独方法，component 新数据  newComponent改完theme_data的数据  stata 状态对象
        let selectedData = this.selectedData(component, newComponent, state);
        newComponent = selectedData;
      }
    }

    let add = `${state.parentId}_addComponent`,
        remove = `${state.parentId}_removeComponent`,
        notRender = ""; // if(componentType=="em-MoHeader"||componentType=="em-MoFooter"){
    //     add="addComponent";
    //     remove="removeComponent";
    //     notRender=true;//此参数为true时，不渲染结构 
    // }

    Dispatcher.dispatch(`${remove}`, {
      args: [state.currentId, () => {
        Dispatcher.dispatch(`${add}`, {
          args: [newComponent, state.index, (target, child, current) => {
            //选中控件
            Dispatcher.dispatch(`selectedComponent`, {
              args: [event, 0, 0, current.id, function () {
                //先判断结构有没有再模拟点击，属性面板 sxt 2020-4-10
                let customIco = document.querySelector("#property-buttons .functionUL .customIco");

                if (customIco) {
                  customIco.click();
                }
              }]
            });
          }]
        });
      }, notRender]
    });
  }
  /**
  * @method selected 样式切换
  * @author sxt 
   * @date 2020-2-7
  * @param {string} skin 切换的皮肤
  */


  selected(skin, event) {
    event.persist();
    let state = this.state || {};
    this.setState({
      skin: skin
    }); //获取此皮肤下的数据

    this.getData(skin).then(component => {
      component = this.setMargin(component, state); //保留切换前样式的margin值

      let componentType = state.datas.component.componentType; //获取控件类型

      if (componentType == "em-Box" || componentType == "em-SlideShow" || componentType == "em-MoFooter" || componentType == "em-Submenu" || componentType == "em-MoHeader" || componentType == "em-Panel") {
        let themeData = component.style || {},
            docData = component.data || {}; //只改样式数据时，控件中会写selectedThemeData方法

        if (this.selectedThemeData) {
          //调用控件中写的单独方法，themeData 新themeData数据  state
          let selectedThemeData = this.selectedThemeData(themeData, state);
          themeData = selectedThemeData;
        }

        Dispatcher.dispatch(`${state.currentId}_set`, {
          args: [`theme_data.`, themeData]
        }); //修改控件中document_data数据 sxt 2020-7-9

        if (this.selectedDocumentData) {
          //调用控件中写的单独方法，themeData 新themeData数据  state
          let selectedDocumentData = this.selectedDocumentData(docData, state);
          docData = selectedDocumentData;
          Dispatcher.dispatch(`${state.currentId}_set`, {
            args: [`document_data.`, docData]
          });
        }

        Dispatcher.dispatch(`${state.currentId}_set`, {
          args: [`component.skin`, skin]
        }); //控件是移动端头部和移动端底部时，修改顶层数据，进行结构渲染 sxt 2021-2-1

        if (componentType == "em-MoHeader" || componentType == "em-MoFooter" || componentType == "em-Panel") {
          let length = skin && skin.split('.')[3];
          Dispatcher.dispatch(`document_set`, {
            value: {
              len: length
            }
          });
          this.props.node.current.skin = skin; //修改下node中控件结构的皮肤，用于属性面板按照控件渲染 
          //Dispatcher.dispatch(`document_set`,{args:[`component.id`,"masterPage"]})
        } // let child=window.public.dom.getElementById(`${state.currentId}`);
        // let {left,top,width,height} = child.getBoundingClientRect();
        // //计算控件中心坐标
        // left = left,top = top;
        // //选中控件
        // Dispatcher.dispatch(`selectedComponent`,{args:[event,left,top,function (){
        //     document.querySelector(".component-selected .toolBtn .custom").click();
        // }]});

      } else {
        //此方法是新增控件实现样式切换
        this.addSelect(componentType, component, state, event);
      }
    });
  }
  /**
   * @method getData 获取控件数据
   * @date 2020-2-7
   * @author sxt
   * @param {string} skin 皮肤
   * @return {object} 控件数据 
   */


  async getData(skin) {
    if (skin) {
      const [type, classname] = skin.split(".");
      const module = await componentsManager(type);

      if (module) {
        const name = window.humpJoin(classname, "_");
        const data = await module.getData(name);
        return data ? data.items[skin] : null;
      }
    }

    return null;
  }

}
