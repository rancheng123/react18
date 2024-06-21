import React from 'react'
import { createRoot } from 'react-dom/client'
import Dispatcher from '@/system/tools/dispatcher';
import Widget from '@/system/widgets/widget';
// /* harmony import */ var _shadow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shadow */ "./components/page/attr/design/shadow/shadow.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * @class {RadiusControler} 阴影控制器类
 */
class ShadowControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Link} view 初始化 view 实例*/

    // this.view = new _shadow__WEBPACK_IMPORTED_MODULE_3__["Shadow"](this); //给view 入口方法绑定this

    // this.view.render = this.view.render.bind(this.view);
  }
  /**@static LIST 属性列表 */


  /**
   * @static radius 圆角渲染
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   */
  static shadow(opts) {
    const {
      group,
      node,
      element,
      prefix
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      let list = this.LIST;

      if (group) {
        list = window.public.configure(this.LIST, group);
      }

      if (opts.allShow) {
        return (
          <ShadowControler
            id={opts.id || node.current.id}
            node={node}
            prefix={prefix}
            list={list}
          />
        )
      } else {
        const root = createRoot(element);
        root.render(<ShadowControler
          id={opts.id || node.current.id}
          node={node}
          prefix={prefix}
          list={list}
        />)
      }


      // ReactDOM.render(React.createElement(ShadowControler, {
      //   id: opts.id || node.current.id,
      //   node: node,
      //   prefix: prefix,
      //   list: list
      // }), element);
    }
  }

  isShadowControler() {
    debugger
    return (
      <Widget.OnOff
        title="openShadow"
        checked={this.state.isShadow}
        change={this.isShadow.bind(this)}
      />
    );
  }

  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */

  render() {
    const { isShadow } = this.state;
    const { list } = this.props;
    const DOM = (
      <div className='pcTextBox'>
        <ul className='pcConAttDesign'>
          {
            isShadow ? list.map((e, i) => {
              return (
                <li className='pcAttList' key={i}>
                  {
                    this[e] && this[e]()
                  }
                </li>
              )
            }) : <li className='pcAttList'>{this.isShadowControler()}</li>
          }
        </ul>
      </div>
    )
    return DOM
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */

  init() {
    const fnName = `${this.props.id}_get`;
    const {
      data: {
        theme_data
      }
    } = Dispatcher.dispatch(fnName); //theme_data数据存在并且存在style数据，则与state合并

    if (theme_data && theme_data.style) {
      const key = `${this.props.prefix}shadow`;
      const shadow = theme_data.style[key] || theme_data.style.shadow; //判断是否拥有阴影值

      if (shadow) {
        const [x, y, vague, size, color] = shadow.split("px ");
        const deg = this.deg(x, y);
        this.state = {
          deg: deg,
          distance: this.distance(deg, x),
          vague: vague,
          size: size,
          color: color,
          isShadow: true
        };
      } else {
        this.state = {
          isShadow: false
        };
      }
    } else {
      this.state = {};
    }
  }
  /**
   * @method start 拖拽旋转开始
   * @param {event} event 事件对象 
   */
  start(event) {
    const {
      currentTarget: target
    } = event;
    const {
      left,
      top,
      width
    } = target.getBoundingClientRect();
    let opts = {
      x: left,
      y: top,
      radius: width / 2
    }; //绑定mousemove事件

    target.onmousemove = this.drag.bind(this, opts); //绑定mouseup事件

    target.onmouseup = this.end.bind(this, opts);
    event.stopPropagation();
  }
  /**
   * @method drag 拖拽旋转进行中
   * @param {object} opts 参数对象 
   * @param {event} event 事件对象 
   */


  drag(opts, event) {
    const {
      pageX,
      pageY
    } = event,
      {
        y,
        x,
        radius
      } = opts; //通过坐标计算角度

    opts.deg = this.deg(pageX - x - radius, pageY - y - radius);
    this.setState({
      deg: opts.deg
    });
  }
  /**
   * @method end 拖拽旋转结束
   * @param {object} opts 参数对象 
   * @param {event} event 事件对象 
   */


  end(opts, event) {
    const target = event.currentTarget; //取消绑定事件

    target.onmousemove = target.onmouseup = null; //设置值

    this.set("deg", opts.deg);
  }
  /**
   * @method deg 通过坐标计算角度
   * @param {number} x x轴坐标 
   * @param {number} y y轴坐标
   * @param {number} r 半径
   * @return {number} 角度值
   */


  deg(x, y) {
    let deg = 0; //只有x坐标或y坐标不等于零，才计算角度

    if (x != 0 || y != 0) {
      deg = Math.atan2(Math.floor(y), Math.floor(x)) * 180 / Math.PI;
      deg = deg >= -90 && deg <= 180 ? 90 + deg : 360 + (90 + deg);
    }

    return Math.round(deg);
  }
  /**
   * @method distance 计算距离
   * @date 2019-11-12
   * @author wyq
   * @param {number} deg 角度值 
   * @param {number} x坐标值
   * @return {number} 距离值 
   */


  distance(deg, x = 0) {
    //角度值不为零时，通过角度值来计算距离
    if (deg != 0) {
      //根据角度反向算出距离 ，sxt 2020-6-16
      // const arc = deg * Math.PI/ 180;
      // return Math.abs(x / (1 * Math.sin(arc)))
      const _sin = Math.sin(deg * Math.PI / 180);

      return Math.abs(Math.ceil(x / _sin));
    }

    return 0;
  }
  /**
   * @method set 设置阴影值
   * @param {string} name 属性类型
   * @param {string} value 属性值
   */


  set(key, value) {
    const {
      props: {
        id,
        prefix
      }
    } = this;
    this.setState({
      [key]: value
    }, () => {
      const {
        state: {
          deg = 0,
          distance,
          size,
          vague,
          color
        }
      } = this; //计算坐标值

      const arc = (deg - 90) * Math.PI * 1 / 180,
        a = Math.ceil(distance * 1 * Math.sin(arc)),
        b = Math.ceil(distance * 1 * Math.cos(arc));
      const key = `theme_data.style.${`${prefix}shadow`}`,
        value = `${b}px ${a}px ${vague}px ${size}px ${color}`;
      Dispatcher.dispatch(`${id}_set`, {
        args: [key, value]
      });
    });
  }
  /**
   * @method range 滑块拖拽触发方法
   * @param {string} key 键值 
   * @param {event} event 事件对象 
   */


  range(key, event) {
    this.set(key, Number(event.target.value || 0));
  }
  /**
   * @method isShadow 是否启用阴影
   * @param {object} event 事件对象
   */


  isShadow(event) {
    const {
      props: {
        prefix,
        id
      }
    } = this;
    const {
      target: {
        checked
      }
    } = event,
      key = prefix + "shadow"; //判断是启用阴影还是禁用阴影

    if (checked) {
      const deg = this.deg(0, 0),
        value = '0px 0px 4px 0px rgb(204, 204, 204)';
      Dispatcher.dispatch(`${id}_set`, {
        args: [`theme_data.style.${key}`, value]
      });
      this.setState({
        deg: deg,
        distance: this.distance(deg, 0),
        vague: 4,
        size: 0,
        color: 'rgb(204, 204, 204)',
        isShadow: true
      });
    } else {
      Dispatcher.dispatch(`${id}_remove`, {
        args: [`theme_data.style.${key}`]
      });
      this.setState({
        isShadow: false
      });
    }
  }

}

_defineProperty(ShadowControler, "LIST", ["isShadow", "direction", "distance", "size", "vague", "color"]);

export { ShadowControler }