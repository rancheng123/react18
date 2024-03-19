const Dispatcher = {
  /**
   * @method register 注册行为
   * @date 2019-09-12
   
   * @param {string} name 行为的名称 
   * @param {function} callback 事件监听器
   * @param {object} [context] 事件监听器的上下文对象
   */
  register(name, callback, context) {
    //检测是否已经存在相同的行为
    if (!this._events.has(name)) {
      //上下文对象存在，绑定上下文。
      if (context) {
        callback = callback.bind(context);
      }

      this._events.set(name, callback);
    } else {
      console.error("以注册同名事件处理方法");
    }
  },

  /**
   * @method unregister 取消注册行为
   * @date 2019-09-12
   
   * @param {string} name 行为名称 
   */
  unregister(name) {
    if (this._events.has(name)) {
      this._events.delete(name);
    } else {
      console.error("没有此事件处理方法");
    }
  },

  /**
   * @method dispatch 派发
   * @date 2019-08-24
   
   * @param {string} type 触发的行为名称
   * @param {object} opts 参数对象
   * @param {string|array|object} [opts.value] 传递给行为的参数
   * @param {array} [opts.args] 传递给行为的参数列表
   */
  dispatch(action, opts = {}) {
    //利用try-catch来捕获异常
    try {
      //判断行为是否合法
      if (action && typeof action == "string") {
        //检测是否存在行为
        if (this._events.has(action)) {
          const fn = this._events.get(action); //触发行为


          return opts.args ? Reflect.apply(fn, undefined, opts.args) : opts.value ? fn(opts.value) : fn();
        } else {
          console.error(action + "未找到此行为");
        }
      } else {
        console.error("请输入合法的行为");
      }
    } catch (err) {
      console.error(err.message);
    }
  },

  /**
   * @method has 查看是否已经注册此行为
   * @date 2019-12-30
   
   * @param {string} name 行为名称
   */
  has(name) {
    return this._events.has(name);
  },

  /**
   *@method clear 清空所有注册行为
   *@date 2020-01-07
   *@author wyq 
   */
  clear() {
    this._events.clear();
  }

};
Object.defineProperty(Dispatcher, "_events", {
  enumerable: false,
  configurable: false,
  value: new Map()
}); //提供一个修改数据的接口，方便数据出问题时，修改控件数据 2022-1-17 by wyq

console.change = (action, params) => Dispatcher.dispatch(action, params);

export default Dispatcher;

//# sourceURL=webpack:///./system/tools/dispatcher.js?