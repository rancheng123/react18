// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Levelnav", function () { return Levelnav; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


// import React from 'react';
// import Widget from '@/system/widgets/widget';
/**
 * @class {Levelnav} 次级展开视图类
 */
export default class Levelnav {
  constructor(controler) {
    this.controler = controler;
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} state 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }

  render() {
    // return React.createElement("div", {
    //   className: "pcbgColorBox"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, this.props.list.map((e, i) => React.createElement("li", {
    //   className: "pcAttList",
    //   key: i
    // }, this[e] && this[e]()))));

    return (
      <div className="pcbgColorBox">
        <ul className="pcConAttDesign">
          {this.props.list.map((e, i) => (
            <li key={i} className="pcAttList">
              {this[e] && this[e]()}
            </li>
          ))}
        </ul>
      </div>
    )
  }

}
