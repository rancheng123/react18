
const distance = 8; //吸附距离px

const bufferDistance = 8; //缓冲距离px

const lightColor = {
  high: '#cd7cff',
  default: '#91f7fd'
};
//辅助线吸附高亮与低亮颜色值

/*
 * @Author:eric
 * @Date: 2020-02-26 14:38:27
 * @LastEditTime: 2020-03-03 09:59:55
 * @LastEditors: Please set LastEditors
 * @Description: 吸附功能v3版
 */
const adsorptionv3 = {
  init(current, container, ruler) {
    const containerBox = this.getBox(container);
    this.box = this.getBox(current);
    this.horIdMap = new Map();
    this.verIdMap = new Map();
    this.line = {};
    this.setExtract(containerBox, ruler);
    this.idLine = [];
    this.side = {
      left: {
        inline: false,
        movepx: 0
      },
      right: {
        inline: false,
        movepx: 0
      },
      top: {
        inline: false,
        movepx: 0
      },
      bottom: {
        inline: false,
        movepx: 0
      }
    }, this.lastPosition = {
      horizontal: '',
      vertical: ''
    };
  },

  /**
   * @description: 设置高亮或低亮状态
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-02-29 10:46:06
   */
  setLight(direction, value, type) {
    let id = false;

    if (direction == '') {
      if (this.horIdMap.has(value)) {
        id = this.horIdMap.get(value);
      } else if (this.verIdMap.has(value)) {
        id = this.verIdMap.get(value);
      }
    } else {
      if (direction == 'left' || direction == 'right') {
        id = this.horIdMap.get(value);
      } else {
        id = this.verIdMap.get(value);
      }
    }

    if (id) {
      const dom = document.getElementById(id);
      dom.querySelector('.cusLines').style.backgroundColor = lightColor[type];

      if (type == 'default') {
        this.idLine = this.idLine.filter(x => x != id);
      } else {
        this.idLine.push(id);
      }
    }
  },

  /**
   * @description: 清除辅助线高亮状态
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-02-29 11:19:18
   */
  clearLightColor() {
    this.idLine.forEach(id => {
      document.getElementById(id).querySelector('.cusLines').style.backgroundColor = lightColor['default'];
    });
    this.idLine = [];
  },

  /**
   * @description: 提取容器内的辅助线
   * @param {box} 容器大小
   * @param {ruler} 辅助线数组
   * @return: void
   * @author: Eric
   * @Date: 2020-02-28 16:33:04
   */
  setExtract(box, ruler) {
    this.horizontal = ruler.guidHor.filter(item => {
      if (item.value >= box.left && item.value <= box.right) {
        this.horIdMap.set(item.value, item.id);
        return true;
      } //return item.value >= box.left  && item.value <= box.right

    }).map(item => {
      return item.value;
    });
    this.vertical = ruler.guidVer.filter(item => {
      if (item.value >= box.top && item.value <= box.bottom) {
        this.verIdMap.set(item.value, item.id);
        return true;
      } //return item.value >= box.top  && item.value <= box.bottom

    }).map(item => {
      return item.value;
    });
    const left = this.horizontal.map(item => item).sort((a, b) => b - a);
    const right = this.horizontal.map(item => item).sort((a, b) => a - b);
    const top = this.vertical.map(item => item).sort((a, b) => b - a);
    const bottom = this.vertical.map(item => item).sort((a, b) => a - b);
    this.line['horRight'] = this.line['left'] = left.map(item => [item, item + distance]);
    this.line['horLeft'] = this.line['right'] = right.map(item => [item - distance, item]);
    this.line['verBottom'] = this.line['top'] = top.map(item => [item, item + distance]);
    this.line['verTop'] = this.line['bottom'] = bottom.map(item => [item - distance, item]);
    this.line['horizontal'] = [...this.line['left'], ...this.line['right']];
    this.line['vertical'] = [...this.line['top'], ...this.line['bottom']];
  },

  //获取盒子数据

  /**
   * @description: 
   * @param {x} x值
   * @param {y} y值
   * @param {width} 宽度
   * @param {height} 高度 
   * @return: object
   * @author: Eric
   * @Date: 2020-02-28 16:45:55
   */
  getBox({
    x,
    y,
    width,
    height
  }) {
    return {
      top: y,
      right: x + width,
      bottom: y + height,
      left: x
    };
  },

  /////////////////////////////////////////////////////

  /**
   * @description: 辅助线边缘检测
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-03-02 18:46:43
   */
  positionCheck(direction, value, side) {
    if (direction === false) return direction;
    let line = false;

    if (side == 'left' || side == 'right') {
      if (direction == 'left') {
        line = this.line['horRight'].find(item => {
          return value > item[0] && value < item[1];
        });
        return line ? line[0] : false;
      } else {
        line = this.line['horLeft'].find(item => {
          return value > item[0] && value < item[1];
        });
        return line ? line[1] : false;
      }
    }

    if (side == 'top' || side == 'bottom') {
      if (direction == 'top') {
        line = this.line['verBottom'].find(item => {
          return value > item[0] && value < item[1];
        });
        return line ? line[0] : false;
      } else {
        line = this.line['verTop'].find(item => {
          return value > item[0] && value < item[1];
        });
        return line ? line[1] : false;
      }
    }
  },

  /**
   * @description: 通过方向获取方位
   * @param {direction} 
   * @return: string
   * @author: Eric
   * @Date: 2020-03-02 12:58:43
   */
  getPositionBydirection(direction) {
    switch (direction) {
      case 'left':
      case 'right':
        return 'horizontal';

      case 'top':
      case 'bottom':
        return 'vertical';
    }
  },

  getDirection(position, value) {
    if (value == 0) return false;

    if (position == 'horizontal') {
      if (value < 0) {
        return 'left';
      } else {
        return 'right';
      }
    } else {
      if (value < 0) {
        return 'top';
      } else {
        return 'bottom';
      }
    }
  },

  /**
   * @description: 离开辅助线
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-03-02 18:22:48
   */
  clearSide(side) {
    this.setLight('', this.side[side].inline, 'default');
    this.side[side].movepx = 0;
    this.side[side].inline = false;
  },

  /**
   * @description: 单边吸附
   * @param {side}
   * @param {offsetDistance} 
   * @return: void
   * @author: Eric
   * @Date: 2020-03-02 12:56:53
   */
  sideHandle(side, offsetDistance, distance, length) {
    let state = true;
    const position = this.getPositionBydirection(side);
    let curDirection = this.getDirection(position, offsetDistance); //当前方向

    const {
      inline,
      movepx
    } = this.side[side];
    const {
      lastPosition: {
        [position]: pos
      }
    } = this;
    curDirection = curDirection ? curDirection : this.lastPosition[position];

    if (curDirection) {
      //鼠标方向发生了变化
      if (inline) {
        //已经吸附了
        if (curDirection == pos) {
          //同向
          if (movepx >= bufferDistance) {
            //用户已在吸附的状态下，连续累计鼠标移动5像素了，此时就不要在吸附了
            this.clearSide(side);
          } else {
            //进入累计移动像素阶段
            this.side[side].movepx += Math.abs(offsetDistance);
            state = false;
            this.setLight(side, inline, 'high');
          }
        } else {
          //反向
          this.clearSide(side);
        }
      } else {
        //未吸附，强制吸附
        const auxLine = this.positionCheck(curDirection, distance, side); //查找辅助线

        if (auxLine) {
          //有辅助线
          this.setLight(side, auxLine, 'high');
          this.side[side].inline = auxLine;

          switch (side) {
            case 'left':
            case 'top':
              state = [auxLine - distance, auxLine];
              break;

            case 'right':
            case 'bottom':
              state = [auxLine - distance, auxLine - length];
              break;
          }
        }
      }
    } else {
      this.clearSide(side);
    }

    this.lastPosition[position] = curDirection; //更新上一次方向

    return state;
  },

  /**
   * @description: 水平吸附
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-03-02 15:07:19
   */
  horizontalHandle(offsetDistance, left, right, width) {
    const leftSide = this.sideHandle('left', offsetDistance, left, width);

    if (leftSide === true) {
      return this.sideHandle('right', offsetDistance, right, width);
    } else {
      return leftSide;
    }
  },

  /**
   * @description: 垂直吸附
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-03-02 15:07:19
   */
  verticalHandle(offsetDistance, top, bottom, height) {
    const topSide = this.sideHandle('top', offsetDistance, top, height);

    if (topSide === true) {
      return this.sideHandle('bottom', offsetDistance, bottom, height);
    } else {
      return topSide;
    }
  }

};


export default adsorptionv3
