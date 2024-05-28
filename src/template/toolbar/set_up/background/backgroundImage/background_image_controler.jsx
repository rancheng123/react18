
import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '@/system/tools/dispatcher';
import BackgroundImage from './backgroundImage/background_image.jsx';


class BackgroundImageControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Background} view 初始化 view 实例*/

    this.view = new BackgroundImage(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @static backgroundImage 背景图片属性设置渲染
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   */
  static backgroundImage({
    id,
    element
  }) {
    //控件数据与要插入的父级元素是否存在，存在继续执行
    if (element) {
      ReactDOM.render(React.createElement(BackgroundImageControler, {
        id: id
      }), element);
    }
  }
  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    return React.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */
  init() {
    const {
      data: {
        design_data
      }
    } = Dispatcher.dispatch('document_get');
    this.state = {
      opacity: 1,
      posVal: 'center center',
      positionMode: 'repeat',
      attachment: 'initial'
    };

    if (design_data && design_data[this.props.id]) {
      this.state = {
        ...this.state,
        ...design_data[this.props.id]
      };
    }
  }
  /**
   * @method set 设置数据方法
   * @param {string} key 键值
   * @param {event} event 事件对象
   */
  set(key, event) {
    const value = event.target.value;
    this.setState({
      [key]: value
    });
    Dispatcher.dispatch('document_set', {
      args: [`design_data.${this.props.id}.${key}`, value]
    });
  }
  /**
   * @method setOpacity 设置透明度
   * @param {event} event 事件对象
   */
  setOpacity(event) {
    this.set('opacity', event);
  }
  /**
   * @method changeBackgroundColor 修改背景颜色
   * @param {string} color 色值
   */
  changeBackgroundColor(color) {
    Dispatcher.dispatch('document_set', {
      args: [`design_data.${this.props.id}.bgColor`, color]
    });
    this.setState({
      bgColor: color
    });
  }
  /**
   * @method selectShowMode 显示模式
   * @param {event} event 事件对象
   */
  selectShowMode(event) {
    this.set('positionMode', event);
  }
  /**
   * @method selectPositionMode 定位模式
   * @param {event} event 事件对象
   */


  selectPositionMode(event) {
    this.set('attachment', event);
  }
  /**
   * @method positionSet 设置定位
   * @param {string} position 定位方向值
   */


  positionSet(position) {
    Dispatcher.dispatch('document_set', {
      args: [`design_data.${this.props.id}.posVal`, {
        posVal: position
      }]
    });
    this.setState({
      posVal: position
    });
  }
  /**
  * @method setOriginal 设置质量方法
  * @param {string} key 键值
  * @param {event} event 事件对象
  */


  setQuality(key, event) {
    let value = event.target.value,
      imgQuality = '',
      keyQuality = this.props.prefix + "imgQuality"; //想要区分设计和设置时，要加上前缀再设置数据
    //key = this.props.prefix + key;//拼上当前的类型，区分设计和设置

    if (value != 'original') {
      imgQuality = `@!jw${value}`;
    }

    this.setState({
      [key]: value
    });
    Dispatcher.dispatch('document_set', {
      args: [`design_data.${this.props.id}.`, {
        [key]: value,
        imgQuality
      }]
    });
    this.getDataSize(this.state[`${this.props.prefix}uri`] + imgQuality).then(data => data && this.setState({
      dataSize: data
    }));
  }
  /**
  * @method getDataSize ajax返回图片size
  */
  getDataSize(uri) {
    return fetch(`/index.php/webdesign/getImgSize?imgsrc=${uri}&u_siteID=${window.pageData.siteId}`, {
      method: 'GET' // credentials: 'same-origin',
      // body: JSON.stringify({ imgsrc: uri, u_siteID: window.pageData.siteId || "6e495b26f1bff3757f963934bfabc56b" }),

    }).then(response => response.json()).then(data => data ? data : "").catch(err => console.log("Oh, error", err));
  }

}

export { BackgroundImageControler }
