function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default class SingleDrag {
  static init(mouse, type = 'client') {
    this.type = type;
    this.setTemp(mouse);
  }

  static getAngleByRadian(radian) {
    return radian * 180 / Math.PI;
  }

  static move(mouse) {
    const x = mouse[`${this.type}X`] - this.tempX;
    const y = mouse[`${this.type}Y`] - this.tempY;

    let _y = -(mouse[`${this.type}Y`] - this.tempY);

    if (Math.abs(_y) === 0) {
      _y = 0;
    }

    const radian = Math.atan2(_y, x);
    const angle = this.getAngleByRadian(radian);
    this.setTemp(mouse);
    return {
      angle,
      offsetX: x,
      offsetY: y,
      currentX: mouse[`${this.type}X`],
      currentY: mouse[`${this.type}Y`]
    };
  }

  static setTemp(mouse) {
    this.tempX = mouse[`${this.type}X`];
    this.tempY = mouse[`${this.type}Y`];
  }

}

_defineProperty(SingleDrag, "angle", void 0);

_defineProperty(SingleDrag, "tempX", void 0);

_defineProperty(SingleDrag, "tempY", void 0);
