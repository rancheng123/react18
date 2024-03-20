/* eslint-disable */
import React from 'react';
import Dispatcher from '../../tools/dispatcher';
import Rule from './ruler';

export default class RulerControler extends React.Component {
  constructor(props) {
    super(props);
    this.space = 100; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Header} view 初始化 view 实例*/

    this.view = new Rule(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-10
   
   * @return {object} 待渲染的组件对象
   */


  render() {
    return React.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @date 2019-09-10
   
   */


  init() {
    this.vertical = new Array(Math.ceil(1090 / this.space)).fill(0);
    let windowWidth = window.innerWidth; //window.public.minWidth

    this.horizontal = new Array(Math.ceil(windowWidth / this.space)).fill(0); //获取后台存储的辅助线的数据

    let guid = pageData.guid && JSON.parse(pageData.guid) || {};
    let state = {
      hidden: false,
      width: window.public.minWidth,
      top: 0
    };
    this.state = { ...state,
      ...guid
    };
  }
  /**
   * @method componentDidMount 组件第一次挂载完毕执行方法
   * @date 2020-01-07
   
   */


  componentDidMount() {
    Dispatcher.register("rulerHidden", this.close, this);
    Dispatcher.register("rulerTop", this.setTop, this); //注册获取辅助线功能

    Dispatcher.register("getRuler", this.getRuler, this);
  }
  /**
   * @method componentWillUnmount 卸载组件时执行方法
   * @date 2020-01-07
   
   */


  componentWillUnmount() {
    Dispatcher.unregister("rulerHidden");
    Dispatcher.unregister("rulerHeight");
  }
  /**
   * @method getRuler 返回辅助线数据 
   * @date 2020-02-24
   * @author sxt 
   * @return {Object} guidHor和guidVer
   */


  getRuler() {
    let {
      guidHor = [],
      guidVer = []
    } = this.state || {};
    return {
      guidHor: guidHor,
      guidVer: guidVer
    };
  }
  /**
   * @method close 关闭标尺 
   * @date 2020-01-07
   
   * @param {boolean} ishidden 布尔值 true 关闭 false 不关闭 
   */


  close(ishidden) {
    this.setState({
      hidden: ishidden
    });
  }
  /**
   * @method setWidth 设置宽度
   * @date 2020-01-07
   
   * @param {number} width 宽度值 
   */


  setWidth(width) {
    this.setState({
      width: width
    });
    this.horizontal = new Array(Math.ceil(width / this.space)).fill(0);
  }
  /**
   * @method setTop 设置头部辅助线位置
   * @date 2020-01-14
   
   * @param {number} top top值 
   */


  setTop(top) {
    this.setState({
      top: top
    });
  }
  /**
   * @function drag 拖拽开始
   * @date 2020-02-26
   * @author sxt 
   * @param {String} type 类型
   * @param {String} id 当前项id
   * @param {String} i 当前项位置
   * @param {Object} event 事件对象
   */


  start(type, id, i, event) {
    try {
      const {
        target,
        clientX,
        clientY
      } = event,
            {
        left,
        top,
        width,
        height
      } = target.getBoundingClientRect();
      let parent = document.querySelector(`#${id}`),
          topVal = 68;
      const scrollTop = document.querySelector(".property-modal").scrollTop; //获取滚动条高度

      let opts = {
        left: clientX,
        top: clientY - topVal,
        topVal: topVal,
        type: type,
        index: i,
        parent: parent,
        scrollTop: scrollTop
      };
      document.onmousemove = this.drag.bind(this, opts);
      document.onmouseup = this.end.bind(this, opts);
    } catch (error) {
      console.error(error.message);
    }

    event.stopPropagation();
  }
  /**
   * @function drag 拖拽开始
   * @date 2020-02-26
   * @author sxt 
   * @param {Object} opts 位置数据
   * @param {Object} event 事件对象
   */


  drag(opts, event) {
    let {
      left,
      top,
      type,
      index,
      parent,
      topVal
    } = opts;
    let {
      target,
      clientX,
      clientY
    } = event;
    let _move = 0;

    if (type == "left") {
      _move = clientX;
      parent.style[type] = _move + "px";
    } else {
      _move = clientY - topVal;
      parent.style[type] = _move + opts.scrollTop + "px";
    }

    opts.move = _move;
  }
  /**
  * @function end 拖拽结束
  * @date 2020-02-26
  * @author sxt 
  * @param {Object} opts 位置数据
  * @param {Object} event 事件对象
  */


  end(opts, event) {
    let state = this.state || {};
    document.onmousemove = document.onmouseup = null;
    let {
      type,
      move,
      index
    } = opts;

    if (move) {
      if (type == "left") {
        let guidHor = state.guidHor.concat([]);
        guidHor[index].value = move;
        this.setState({
          guidHor: guidHor
        });
      } else {
        let guidVer = state.guidVer.concat([]);
        guidVer[index].value = move + opts.scrollTop;
        this.setState({
          guidVer: guidVer
        });
      }

      this.sendData();
    }
  }
  /**
   * @function addGuid 添加辅助线
   * @date 2020-02-26
   * @author sxt 
   * @param {Object} o 绑定事件的节点
   * @param {Object} e 事件对象
   * @param {Object} n 当前组件类
   */


  addGuid(type, event) {
    let state = this.state || {},
        _data = state[type] || [];

    let _id = "";

    if (type == "guidHor") {
      _id = "ediCusLin-" + parseInt(Math.random() * 10000);

      _data.push({
        id: _id,
        value: event.clientX
      });
    } else {
      let scrollTop = document.querySelector(".property-modal").scrollTop; //获取滚动条高度

      _id = "ediCuscol-" + parseInt(Math.random() * 10000);
      let value = event.clientY + scrollTop - 60;

      if (typeof value == "number") {
        _data.push({
          id: _id,
          value: value
        });
      }
    }

    this.setState({
      [type]: _data
    });
    this.sendData();
  }
  /**
  * @function focus 失去焦点事件
  * @date 2020-02-26
  * @author sxt 
  * @param {String} i 当前项位置
  * @param {Object} e 事件对象
  */


  focus(i, e) {
    const _target = e.target;

    document.onkeydown = (e = event) => {
      if (e.key == "Enter") this.blur(i, _target), document.onkeydown = null;
    };
  }
  /**
   * @method bindMouse 绑定change事件
      * @date 2020-02-26
      * @author sxt 
   * @param {Object} o 父级节点
   * @param {Object} state 状态对象
   * @param {String} id id值
   */


  blur(i, e) {
    const _target = e.hasOwnProperty("target") ? e.target : e,
          _guid = _target.closest(".ediCusLin,.ediCuscol");

    let state = this.state || {};
    let _value = _target.value;

    if (_value != "") {
      _value = Number(_value);
    }

    if (_guid.id.indexOf("ediCusLin") != -1) {
      if (typeof _value == "number" && _value < window.innerWidth - 23) {
        let _horVal = state.guidHor[i].value,
            guidHor = state.guidHor.concat([]);
        guidHor[i].value = _value;
        this.setState({
          guidHor: guidHor
        });

        if (_value != _horVal) {
          this.sendData();
        }
      }
    } else {
      let bodHeight = document.body.offsetHeight - 68;

      if (typeof _value == "number" && _value > 20 && _value < bodHeight) {
        let _guidVal = state.guidVer[i].value,
            guidVer = state.guidVer.concat([]);
        guidVer[i].value = _value;
        this.setState({
          guidVer: guidVer
        });

        if (_value != _guidVal) {
          this.sendData();
        }
      }
    }
  }
  /**
  * @method delete 删除辅助线
   * @date 2020-02-26
   * @author sxt
  * @param {String} i 数组当前位置
  * @param {String} type 类型
  */


  delete(i, type) {
    let state = this.state || {},
        relerType = type != "top" ? "guidHor" : "guidVer",
        newList = state[relerType];
    newList.splice(i, 1);
    this.setState({
      [relerType]: newList
    });
    this.sendData();
  }
  /**
  * @method sendData 向后台发送辅助线数据
   * @date 2020-02-26
   * @author sxt
  */


  sendData() {
    let _state = this.state || {};

    let ajaxData = JSON.stringify({
      "guidHor": _state.guidHor,
      "guidVer": _state.guidVer
    });
    fetch("/desktop/index.php/Edit/index/scale", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `sId=${pageData.siteId}&data=${ajaxData}`
    }).then(response => response.json()).then(data => {
      if (data.suc == 0) {} else {// Layer.alert({area:["420px","225px"],skin:"",close:true,cancel:true,ensure:true,content:window.public.lnag["addFailed"]})
      }
    }).catch(error => console.log("Error", error));
  }

}

//# sourceURL=webpack:///./system/function/ruler/ruler_controler.js?