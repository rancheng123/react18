
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default class SingleSelected {
  static init(width, x) {
    this.setWidth(width, 'init');
    this.setX(x);
  }

  static setX(x) {
    this.x = x;
  }

  static setWidth(width, source = '') {
    this.width = width;
  }

  static getWidth() {
    return this.width;
  }

  static getX() {
    return this.x;
  }

}

_defineProperty(SingleSelected, "width", void 0);

_defineProperty(SingleSelected, "x", void 0);

//# sourceURL=webpack:///./components/page/attr/select_box/single_selected.js?