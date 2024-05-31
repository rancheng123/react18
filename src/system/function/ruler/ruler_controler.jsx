/* eslint-disable */
import React from 'react';
import Dispatcher from '../../tools/dispatcher';

export default class RulerControler extends React.Component {
  constructor(props) {
    super(props);
    this.space = 100;
    //组件挂载前的初始化方法，整个生命周期内只执行一次
    this.init();
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
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
    this.state = {
      ...state,
      ...guid,
      lockingIndexList: []
    };
  }
  /**
   * @method componentDidMount 组件第一次挂载完毕执行方法   
   */


  componentDidMount() {
    Dispatcher.register("rulerHidden", this.close, this);
    Dispatcher.register("rulerTop", this.setTop, this); //注册获取辅助线功能

    Dispatcher.register("getRuler", this.getRuler, this);
  }
  /**
   * @method componentWillUnmount 卸载组件时执行方法
   */


  componentWillUnmount() {
    Dispatcher.unregister("rulerHidden");
    Dispatcher.unregister("rulerHeight");
  }

  /**
   * @method getRuler 返回辅助线数据 
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
   * @param {boolean} ishidden 布尔值 true 关闭 false 不关闭 
   */

  close(ishidden) {
    this.setState({
      hidden: ishidden
    });
  }

  /**
   * @method setWidth 设置宽度
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
   * @param {number} top top值 
   */

  setTop(top) {
    this.setState({
      top: top
    });
  }

  /**
   * @function drag 拖拽开始
   * @param {String} type 类型
   * @param {String} id 当前项id
   * @param {String} i 当前项位置
   * @param {Object} event 事件对象
   */
  start(type, id, i, event) {
    // 清空右键弹窗展示索引,隐藏右键弹窗
    this.setState({
      rightPopIndex: null
    })

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
   * @param {Object} o 绑定事件的节点
   * @param {Object} e 事件对象
   * @param {Object} n 当前组件类
   */
  addGuid(type, event) {

    // 清空右键弹窗展示索引,隐藏右键弹窗
    this.setState({
      rightPopIndex: null
    })

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
  * @param {String} i 数组当前位置
  * @param {String} type 类型
  */
  delete(i, type) {
    let state = this.state || {},
      relerType = type != "top" ? "guidHor" : "guidVer",
      newList = state[relerType];
    newList.splice(i, 1);
    this.setState({
      [relerType]: newList,
      rightPopIndex: null
    });
    this.sendData();
  }


  /**
  * @method sendData 向后台发送辅助线数据
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
      if (data.suc == 0) { } else {// Layer.alert({area:["420px","225px"],skin:"",close:true,cancel:true,ensure:true,content:window.public.lnag["addFailed"]})
      }
    }).catch(error => console.log("Error", error));
  }

  // 右键点击事件
  handContextMenu(event, i) {
    event.stopPropagation();
    event.preventDefault()
    // 展示右键菜单
    this.setState({
      rightPopIndex: i,
      rightPopX: event.clientX,
      rightPopY: event.clientY
    })
  }

  // 锁定
  locking(i) {
    let arr = this.state.lockingIndexList
    arr.indexOf(i) !== -1 ? arr.splice(arr.indexOf(i), 1) : arr.push(i)
    this.setState({
      lockingIndexList: arr,
      // 清空右键弹窗展示索引,隐藏右键弹窗
      // rightPopIndex: null
    })
  }

  //解锁
  unlock(i) {
    // 解锁
    let arr = this.state.lockingIndexList
    if (arr.indexOf(i) !== -1) {
      arr.splice(arr.indexOf(i), 1)
    }
    this.setState({
      lockingIndexList: arr,
      // 清空右键弹窗展示索引,隐藏右键弹窗
      // rightPopIndex: null
    })
  }




  ruler(props) {
    return (
      <div
        className={`${props.dir}Number`}
        onClick={this.addGuid.bind(this, props.type)}
        onContextMenu={(event) => { event.stopPropagation(); event.preventDefault() }}
      >
        <i className={`ruler${props.dir}`}></i>
        <div className={"rul" + props.dir + "Num"} style={props.style || null}>
          <ul className={props.dir + "Nber"}>
            {
              props.numbers.map((item, index) => {
                return <li key={index}>{index * this.space}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  getGuid(type, event) {
    let state = this.state || {};
    let _data = [], idName = "";

    if (type == "left") {
      _data = state.guidHor || [];
      idName = "guidHor-";
    } else {
      _data = state.guidVer || [];
      idName = "ediCuscol-";
    }

    return _data.map((e, i) => {
      let _id = e.id,
        _value = e.value;

      if (!_value) {
        return null;
      }
      // 获取是否锁定状态
      let _isLocking = this.state.lockingIndexList.indexOf(i) !== -1 ? true : false;

      return (
        <div
          className={_id.split("-")[0]}
          id={_id}
          key={_id}
          data-index={i}
          style={{ [type]: _value }}>
          <div className="cusLines"></div>
          <div className="cusLinCon">
            <i
              className="iconfont"
              data-draggable="true"
              onContextMenu={(event) => this.handContextMenu(event, i)}
              onMouseDown={_isLocking ? null : this.start.bind(this, type, _id, i)}>
              
            </i>
            <p className="cusLinNum">
              <input
                type="text"
                className="coordinte"
                placeholder={_value}
                onFocus={this.focus.bind(this, i)}
                onBlur={this.blur.bind(this, i)}
              />
              <span>px</span>
              {
                // 锁定结构
                _isLocking && <i className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe763;' }}></i>
              }
            </p>
            {
              //  右键弹窗结构
              this.state.rightPopIndex == i ?
                <div className='rightPop' style={{ top: this.state.rightPopY + 10, left: this.state.rightPopX + 10 }} >
                  <div className='rightPopItem' onClick={this.delete.bind(this, i, type)}>删除</div>
                  {
                    _isLocking ? <div className='rightPopItem' onClick={this.unlock.bind(this, i)}>解锁</div> : <div className='rightPopItem' onClick={this.locking.bind(this, i)}>锁定</div>
                  }

                </div> : null
            }
          </div>
        </div>
      )
    });
  }


  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {

    return (
      <div className='auxiliary' style={{ height: this.props.height }}>
        {
          !this.state.hidden && (
            <div>
              {
                this.ruler({ numbers: this.horizontal, dir: "top", type: "guidHor" })
              }
              {
                this.ruler({ numbers: this.vertical, dir: "right", type: "guidVer" })
              }
              <div id="horizontal">
                {this.getGuid("left")}
              </div>
              <div id="vertical">
                {this.getGuid("top")}
              </div>

            </div>
          )
        }
        <div className="ediLines">
          <div className="ediConLines">
            <div className="eLines eLi3" style={{ top: this.state.top }} />
          </div>
        </div>
      </div>
    )
  }

}
