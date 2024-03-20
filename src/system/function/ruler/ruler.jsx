/* eslint-disable */
import React from 'react';

export default class Ruler {
  constructor(controler) {
    /**@property controler header控制器实例 */
    this.controler = controler;
    this.ruler = this.ruler.bind(this);
    this.line = this.line.bind(this);
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} props 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }

  render() {
    //style = {{left:`calc((100% - ${window.public.minWidth}px) / 2)`}} 
    return React.createElement("div", {
      className: "auxiliary",
      style: {
        height: this.props.height
      }
    }, !this.state.hidden ? React.createElement("div", null, React.createElement(this.ruler, {
      numbers: this.controler.horizontal,
      dir: "top",
      type: "guidHor"
    }), React.createElement(this.ruler, {
      numbers: this.controler.vertical,
      dir: "right",
      type: "guidVer"
    }), React.createElement("div", {
      id: "horizontal"
    }, this.getGuid("left")), React.createElement("div", {
      id: "vertical"
    }, this.getGuid("top"))) : null, React.createElement(this.line, null));
  }
  /**
  * @function getGuid 获取辅助线结构
  * @param {Object} n 当前组件类
  * @param {String} type 辅助线类型 
  * @return {String} 辅助线结构
  */


  getGuid(type, event) {
    let state = this.state || {};
    let _data = [],
        idName = "";

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

      return React.createElement("div", {
        className: _id.split("-")[0],
        key: _id,
        style: {
          [type]: _value
        },
        id: _id,
        "data-index": i
      }, React.createElement("div", {
        className: "cusLines"
      }), React.createElement("div", {
        className: "cusLinCon"
      }, React.createElement("i", {
        className: "iconfont",
        "data-draggable": "true",
        onMouseDown: this.controler.start.bind(this.controler, type, _id, i)
      }, ""), React.createElement("p", {
        className: "cusLinNum"
      }, React.createElement("input", {
        type: "text",
        className: "coordinte",
        placeholder: _value,
        onFocus: this.controler.focus.bind(this.controler, i),
        onBlur: this.controler.blur.bind(this.controler, i)
      }), React.createElement("span", null, "px"), React.createElement("i", {
        className: "iconfont",
        "data-emname": "del-guid",
        onClick: this.controler.delete.bind(this.controler, i, type)
      }, ""))));
    });
  }

  line() {
    return React.createElement("div", {
      className: "ediLines"
    }, React.createElement("div", {
      className: "ediConLines"
    }, React.createElement("div", {
      className: "eLines eLi3",
      style: {
        top: this.state.top
      }
    })));
  }

  ruler(props) {
    return React.createElement("div", {
      className: props.dir + "Number",
      onClick: this.controler.addGuid.bind(this.controler, props.type)
    }, React.createElement("i", {
      className: "ruler" + props.dir
    }), React.createElement("div", {
      className: "rul" + props.dir + "Num",
      style: props.style || null
    }, React.createElement("ul", {
      className: props.dir + "Nber"
    }, props.numbers.map((e, i) => React.createElement("li", {
      key: i
    }, i * this.controler.space)))));
  }

}

//# sourceURL=webpack:///./system/function/ruler/ruler.js?