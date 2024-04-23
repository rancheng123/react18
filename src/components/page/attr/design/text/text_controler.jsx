
import React from "react"; // 导入 React 库
import {createRoot} from "react-dom/client"; // 导入 ReactDOM 库
import Dispatcher from "@/system/tools/dispatcher"; // 导入 TextControler 变量
import Text from "./text"; // 导入 Text 变量

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class TextControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Link} view 初始化 view 实例*/

    this.view = new Text(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  /**
  * @static text 创建文本属性
  * @author sxt 
  * @date 2019-09-30
  * @param {object} opts 参数列表
  * @param {object} opts 参数列表
  * @param {object} opts.element 节点对象
  * @param {object} opts.group 属性配置项
  * @param {object} opts.node 控件对象
  * @param {string} opts.prefix 拼接前缀
  * @param {PublicAttribute} opts.publicAttr 共用属性实例
  * @param {boolean} opts.disableUnit 禁止选择单位
  */
  static text(opts = {}) {
    const {
      group,
      node,
      element,
      prefix,
      publicAttr,
      disableUnit
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      const textRoot = createRoot(element)


      textRoot.render(
        <TextControler
          id={node.current.id}
          node={node}
          prefix={prefix}
          group={group}
          publicAttr={publicAttr}
          disableUnit={disableUnit}
        />
      );
      
      // ReactDOM.render(React.createElement(TextControler, {
      //   id: node.current.id,
      //   node: node,
      //   prefix: prefix,
      //   group: group,
      //   publicAttr: publicAttr,
      //   disableUnit: disableUnit
      // }), element);
    }
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-30
   * @author sxt
   * @return {object} 待渲染的组件对象
   */


  render() {
    // return React.createElement(this.view.render, null);
    return <this.view.render />
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @author 
   */


  init() {
    const fnName = `${this.props.id}_get`;
    const {
      data: {
        theme_data,
        document_data
      }
    } = Dispatcher.dispatch(fnName); //将存在的fontLabel的值赋给state中 lw 2021-3-29；

    this.state = {
      sign: document_data.sign,
      fontLabel: document_data.fontLabel,
      tab: ''
    }; //theme_data数据存在并且存在style数据，则与state合并

    if (theme_data && theme_data.style) {
      Object.assign(this.state, theme_data.style);
    }
    let group = this.props.group;
    this.state.list = TextControler.LIST;

    if (group) {
      // if (group.tabs) { 
      //     this.tabs = group.tabs, this.state.tab = this.tabs[0].type; 
      // }
      if (group.tabs) {
        this.tabs = group.tabs, this.state.tab = this.tabs[0].type;

        if (group.group) {
          group = group.group[this.state.tab];
        }
      }

      this.state.list = window.public.configure(TextControler.LIST, group);
    }
  }

  componentDidMount() {
    // 暂时注掉
    // let src = `${pageData.apiServiceUrl}index.php/fonts?list_rows=120`;
    // fetch(src, {
    //   method: 'GET',
    //   headers: {
    //     "webToken": pageData.webToken,
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // }).then(response => response.json()).then(data => {
    //   if (data.data) {
    //     this.setState({
    //       customList: data.data.data || []
    //     });
    //   }
    // }).catch(err => console.log("Oh, error", err));
  }
  /**
   * @method selectTab 起换选项
   * @date 2019-12-31
   * @author wyq
   * @param {string} tab 切换的项 
   */


  selectTab(tab) {
    let state = {
      tab
    };

    if (this.props.group.group) {
      state.list = window.public.configure(TextControler.LIST, this.props.group.group[tab]);
      this.setState({
        tab: tab,
        list: state.list
      });
    } else {
      this.setState({
        tab: tab
      });
    }
  }
  /**
   * @method  setDate 设置日期格式
   * @date 2019-11-7
   * @author wyq
   * @param {event} e 事件对象
   */


  setDate(event) {
    const value = event.target.value;
    this.setState({
      sign: value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.sign`, value]
    });
  }
  /**
  * @method  setFamilyType 设置字体类型
  * @date 2020-8-13
  * @author sxt
  * @param {string} key 属性名
  * @param {event} e 事件对象
  */


  setFamilyType(key, value, e) {
    if (!value) {
      value = e.target.value;
    } //this.setState({ [key]: _value })


    this.set(key, value);

    if (value == 'default') {
      this.setState({
        "fontFamily": ''
      });
      this.set("fontFamily", '');
    } // Dispatcher.dispatch(`${this.props.id}_set`, {
    //     args: [`document_data.${key}`, _value]
    // })

  } //设置字体


  selectFamily(key, value) {
    this.set(key, value);
    this.setState({
      familyShow: false
    });
  } //显示字体选择结构


  showFamily(key) {
    let isShow = this.state.familyShow ? false : true;
    this.setState({
      [key]: isShow
    });
  } //弹出上传字体


  uploadFamily() {
    alert("大师上传");
  }
  /**
   * @method set 设置样式数据
   * @date 2019-11-7
   * @author wyq 
   * @param {string} key 键值
   * @param {string} value 属性值
   */


  set(key, value) {
    this.setState({
      [key]: value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.style.${key}`, value]
    });
  }
  /**
   * @method range 滑块拖拽方法
   * @date 2019-11-7
   * @author wyq 
   * @param {string} key 键值
   * @param {event} event 事件对象
   */


  range(key, event) {
    this.set(key, Number(event.target.value || 0));
  }
  /**
   * @method change 单选、下拉值修改时执行方法
   * @date 2019-11-7
   * @author wyq
   * @param {string} key 键值
   * @param {event} event 事件对象
   */


  change(key, event) {

    console.log(key, event);
    let _value = event.target.value;
    let padLeft = this.state.tab + "padLeft",
        padLeftkey = this.props.prefix + padLeft;
    let padRight = this.state.tab + "padRight",
        padRightkey = this.props.prefix + padRight;

    if (_value == 'left') {
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.${padLeftkey}`, 10]
      }); //切换居左时，补上padLeft的单位，没有单位会导致设置项不显示 sxt 2021-2-19

      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.padLeftUnit`, "px"]
      });
      this.setState({
        [padLeftkey]: 10,
        "padLeftUnit": "px"
      });
    } else if (_value == 'right') {
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.${padRightkey}`, 10]
      });
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.padRightUnit`, "px"]
      });
      this.setState({
        [padRightkey]: 10,
        "padRightUnit": "px"
      });
    } else if (_value == "center") {
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.${padLeftkey}`, 0]
      });
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.${padRightkey}`, 0]
      });
      this.setState({
        [padLeftkey]: 0,
        [padRightkey]: 0
      });
    }

    this.set(key, event.target.value);
  } // changeAlign(key, e) {
  //     this.set(key, event.target.value);
  // }

  /**
  * @method click 点击设置属性方法
  * @date 2019-11-7
  * @author wyq
  * @param {string} key 键值
  * @param {event} event 事件对象
  */


  click(key, event) {
    this.set(key, event.currentTarget.dataset.value);
  }
  /**
   * @method setThemeData 选择H1~H6标签
   * @date 2021-3-29
   * @author lw
   * @param {string} key 键值
   * @param {event} event 事件对象
  */


  setThemeData(key, e) {
    let _value = e.target.value;
    this.setState({
      [key]: _value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }

}

_defineProperty(TextControler, "LIST", ["ceshi","size", "letterSpace", "family", "color", "style", "align", "marginLeft", "marginRight"]);
export {TextControler}