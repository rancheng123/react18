import Dispatcher from "./dispatcher";

const History = {
  /**@property {number} max 最大历史条目 */
  max: 40,

  /**@property {number} point 当前条目位置 */
  point: 0,

  /**@property {object} histories 历史纪录数据*/
  histories: [],

  /**
   * 
   */
  async bind() {
    if (typeof window !== 'undefined') {
      if (window.Mousetrap) {
        Mousetrap.bind('ctrl+z', this.undo);
        Mousetrap.bind('ctrl+y', this.redo);
      } else {
        setTimeout(() => {
          this.bind()
        }, 10)
      }
    }
  },

  add(item) {
    this.histories.push(item);
    if (this.histories.length >= this.max) {
      this.histories.splice(0, 1);
    }
  },

  undo() {
    if (History.point <= History.max) {
      History.point = History.point + 1;
      const {
        action,
        param
      } = History.histories[History.point];
      const params = Array.isArray(param) ? {
        args: param
      } : {
        value: param
      };
      Dispatcher.dispatch(action, params);
    }
  },

  redo() {
    if (History.point >= 0) {
      History.point = History.point - 1;
      const {
        action,
        param
      } = History.histories[History.point];
      const params = Array.isArray(param) ? {
        args: param
      } : {
        value: param
      };
      Dispatcher.dispatch(action, params);
    }
  }

}; //执行事件绑定

History.bind();

export default History;
