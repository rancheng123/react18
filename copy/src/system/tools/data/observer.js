__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Observer", function() { return Observer; });
/**
 * @function Observer 节点观察者 观察节点的增加和删除
 * @date 2018-11-1
 
 * @param {string} action 观察的行为
 * @param {string} id 要监听的控件id 
 * @param {string} cid 新增或删除的子控件的id
 * @param {function} fn 触发观察者时执行的回调函数 
 */
function Observer(action, id, cid, fn) {
  const element = window.public.dom.querySelector(`#${id}`); //判断控件节点是否存在

  if (element) {
    Observer.args = [...arguments].slice(4); //给处理函数赋值

    Observer.cid = cid, Observer.action = action, Observer.handler = fn; //判断观察者实例和处理函数是否存在

    if (!Observer.observe && Observer.handler) {
      //实例化观察者对象
      Observer.observe = new MutationObserver(list => {
        const len = list.length;
        const mutation = len > 1 ? list[len - 1] : list[0];
        const {
          target,
          addedNodes,
          removedNodes
        } = mutation,
              ctarget = Observer.action == 'add' ? addedNodes[0] : removedNodes[0]; //判断处理函数存在并且当前触发观察的节点对象与操作的子控件id相同

        if (Observer.handler && (ctarget == undefined || Observer.cid == ctarget.id)) {
          //取消订阅
          Observer.observe.disconnect(); //追加参数

          Observer.args.unshift(target, ctarget); //用变量存储值

          const handler = Observer.handler,
                args = Observer.args; //删除处理函数

          delete Observer.handler;
          delete Observer.args;
          delete Observer.cid;
          delete Observer.action; //调用处理函数

          Reflect.apply(handler, Observer, args);
        }
      });
    } //订阅


    Observer.observe.observe(element, {
      childList: true,
      subtree: true
    });
  }
}

//# sourceURL=webpack:///./system/tools/data/observer.js?