
import React from 'react';
import { createRoot } from 'react-dom/client';
// 导入dispatcher模块
import Dispatcher from '@/system/tools/dispatcher';

// 导入模块
import Position from './position';

/**
 * @class {PositionControler} 定位控制器类
 */
export class PositionControler extends React.Component {
  constructor(props) {
    super(props);
    /**@property {number} parentWidth 控件父级宽度数据 */

    this.parentWidth = 0;
    /**@property {number} heihgt 控件高度数据 */

    this.height = 0;
    /**@property {object} layout 控件选中框布局数据 */

    this.layout = null; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Position} view 初始化 view 实例*/

    this.view = new Position(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @static position 创建定位属性
   * @param {object} opts 参数列表
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   * @param {object} opts.group 属性配置项
   * @param {object} opts.node 控件对象
   * @param {string} opts.prefix 拼接前缀
   * @param {PublicAttribute} opts.publicAttr 共用属性实例
   * @param {boolean} opts.disableUnit 禁止选择单位
   */
  static position(opts) {
    const {
      node,
      element,
      prefix,
      publicAttr,
      group,
      disableUnit
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      const PositionControler = this;
      // ReactDOM.render(React.createElement(PositionControler, {
      //   id: node.current.id,
      //   node: node,
      //   group: group !== null && group !== void 0 ? group : {
      //     padding: true,
      //     margin: true
      //   },
      //   publicAttr: publicAttr,
      //   prefix: prefix,
      //   disableUnit: disableUnit
      // }), element);

      if (opts.allShow) {
        return (
          <PositionControler
            id={node.current.id}
            node={node}
            group={group !== null && group !== undefined ? group : { padding: true, margin: true }}
            publicAttr={publicAttr}
            prefix={prefix}
            disableUnit={disableUnit}
            key={Date.now() + 'position'}
          />
        )
      } else {
        const root = createRoot(element);
        root.render(<PositionControler
          id={node.current.id}
          node={node}
          group={group !== null && group !== undefined ? group : { padding: true, margin: true }}
          publicAttr={publicAttr}
          prefix={prefix}
          disableUnit={disableUnit}
        />)
      }


    }
  }


  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    // return React.createElement(this.view.render, null);
    return <this.view.render />;
  }


  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */
  init() {
    const {
      data
    } = Dispatcher.dispatch(`${this.props.id}_get`),
      {
        theme_data: {
          style = {}
        }
      } = data;
    this.state = style;
    this.layout = this.getLayout(); //保存控件原始高度

    this.height = this.layout.height;
  }


  /**
   * @method getLayout 获取控件选中框布局数据
   * @return {object} 控件选中框布局数据：x和y坐标     
   */
  getLayout() {
    const {
      props: {
        id
      },
      state: {
        marginLeft,
        marginTop,
        marginLeftUnit,
        marginTopUnit
      }
    } = this;
    const select = document.querySelector('#select-box .ediBox');
    const {
      style: {
        left,
        top
      }
    } = select;
    let mleft = 0,
      mtop = 0;
    window.public.unit.selector = `#${id}`;

    if (marginLeftUnit != 'px') {
      mleft = window.public.unit.px(marginLeft, marginLeftUnit);
    }

    if (marginLeftUnit != 'px') {
      mtop = window.public.unit.px(marginTop, marginTopUnit);
    }

    return {
      left: parseFloat(left) - mleft,
      top: parseFloat(top) - mtop
    };
  }


  /**
   * @method setLayout 设置控件选中框布局数据
   * @param {string} type 类型
   * @param {string} setType 设置的类型类型
   * @param {number} value 值  
   */
  setLayout(type, value, setType) {
    const {
      props: {
        id
      },
      state = {},
      layout
    } = this; //计算值

    const key = (window.public.type == 'pc' ? '' : 'mo') + setType + "Unit",
      unit = state[key] || "%";

    if (unit != "px") {
      window.public.unit.selector = `#${id}`;
      value = window.public.unit.px(value, unit);
    } //更新选中框


    Dispatcher.dispatch(`${id}_select_setLayout`, {
      value: prevState => ({
        ...prevState,
        [type]: layout[type] + parseFloat(value)
      })
    });
  }


  /**
   * @method marginTop 设置上边距
   * @param {object} event 事件对象
   */
  marginTop(event) {
    this.setLayout('top', Number(event.target.value || 0), 'marginTop');
    this.set('marginTop', event, "margin");
  }


  /**
   * @method marginLeft 设置左边距
   * @param {object} event 事件对象
   */
  marginLeft(event) {
    this.set('marginLeft', event, "margin");
  }


  /**
   * @method marginLeft 设置右边距
   * @param {object} event 事件对象
   */
  marginRight(event) {
    this.set('marginRight', event, "margin");
  }


  /**
   * @method marginBottom 设置下边距
   * @param {object} event 事件对象
   */
  marginBottom(event) {
    this.set('marginBottom', event, "margin");
  }


  /**
   * @method paddingTop 设置上补白
   * @param {object} event 事件对象
   */
  paddingTop(event) {
    this.set('paddingTop', event);
  }


  /**
   * @method paddingBottom 设置下补白
   * @param {object} event 事件对象
   */
  paddingBottom(event) {
    this.set('paddingBottom', event);
  }


  /**
   * @method paddingLeft 设置左补白
   * @param {object} event 事件对象
   */
  paddingLeft(event) {
    this.set('paddingLeft', event);
  }

  /**
   * @method paddingRight 设置右补白
   * @param {object} event 事件对象
   */
  paddingRight(event) {
    this.set('paddingRight', event);
  }

  /**
   * @method set 设置属性值
   * @param {string} key 键值 
   * @param {event} event 事件对象 
   * @param {string} type key类型 
   * @param {string} keyName 区分是否为失去焦点事件 
   */
  set(key, event, type, keyName) {
    let value;

    if (type == "margin") {
      //为margin的时候 才支持输入负号 
      value = event.target.value;

      if (keyName && value == "") {
        //如果keyName存在且value的值为空，则执行下面语句。
        value = 0;
      }
    } else {
      value = Number(event.target.value || 0);
    } //拼接键


    key = (window.public.type == 'pc' ? '' : 'mo') + key; //更新面板

    this.setState({
      [key]: value
    }); //修改控件数据

    if (value === 0 || value) {
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.${key}`, value]
      });
    }
  }


  /**
   * @virtual selected 单位更换后触发回调
   */
  selected() { }

  /**
   * @virtual blur 失去焦点执行方法
   */
  blur(key, event) {
    this.set(key, event, "margin", key);
  }

}
