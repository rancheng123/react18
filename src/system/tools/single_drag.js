export default class SingleDrag {
  angle = undefined
  tempX = undefined
  tempY = undefined
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
