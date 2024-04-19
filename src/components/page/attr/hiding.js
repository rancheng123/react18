
// 导入模块
import Dispatcher from "@/system/tools/dispatcher"; // 导入 dispatcher 模块

//let show = false; //列出隐藏

let lastSysType;
const show = {
  pc: false,
  mo: false
};
const Hiding = {
  /**
   * @description: 
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-03-03 13:31:13
   */
  hidingHandle(hidden, hiddenList, systype, doc, id, pageId) {
    // let hlist = (typeof hiddenList == 'undefined')?[]:hiddenList;
    // if(hidden){
    //     hlist = hlist.filter(x=>x!=id); //显示,移除数组
    // }else{
    //     hlist.push(id); //隐藏，加入数组
    // }
    // Dispatcher.dispatch(`${pageId}_set`,{
    //     args:[`document_data.${systype}hiddenList`,hlist]
    // });
    // Dispatcher.dispatch(`${id}_set`,{
    //     args:[`document_data.${systype}hidden`,hidden?0:1]
    // });
    Dispatcher.dispatch(`${id}_set`, {
      args: ['theme_data.style.', {
        [systype + 'hidden']: hidden ? '' : 'none'
      }]
    });
    const ele = doc.getElementById(id);

    if (hidden) {
      this.showEle(ele, show[systype]);
    } else {
      this.hiddenEle(ele, show[systype]);
    }
  },

  /**
   * @description: 当前控件隐藏或显示
   * @param {opts} 
   * @return: void
   * @author: Eric
   * @Date: 2020-02-27 15:23:18
   */
  hiding(opts) {
    const {
      public: {
        type: systype,
        hiding
      }
    } = window;
    const doc = document.getElementById('iframe').contentWindow.document;
    const {
      component: {
        id: pageId
      }
    } = Dispatcher.dispatch("getPageData"); //当前页面数据

    const {
      node: {
        current: {
          id
        }
      }
    } = opts;
    const {
      data: {
        theme_data: {
          style: {
            pchidden,
            mohidden
          }
        }
      }
    } = Dispatcher.dispatch(`${id}_get`);
    const {
      data: {
        document_data: {
          mohiddenList,
          mohiddenSwitch,
          pchiddenList,
          pchiddenSwitch
        }
      }
    } = Dispatcher.dispatch(`${pageId}_get`);

    if (systype == 'pc') {
      this.hidingHandle(pchidden, pchiddenList, systype, doc, id, pageId);
    } else {
      this.hidingHandle(mohidden, mohiddenList, systype, doc, id, pageId);
    }
  },

  /**
   * @description: 查找隐藏的控件数据
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-04-14 13:26:18
   */
  showHandler(type, systype) {
    let hlist = null;
    let {
      data: {
        theme_data
      }
    } = Dispatcher.dispatch(type); //判断是否存在theme_data 数据

    if (theme_data) {
      hlist = []; //循环theme_data数据

      for (const key in theme_data) {
        var _theme_data$key;

        const {
          skin = '',
          style
        } = (_theme_data$key = theme_data[key]) !== null && _theme_data$key !== void 0 ? _theme_data$key : {}; //判断是否存在style数据

        if (style) {
          //是移动端并且控件是隐藏，存储控件id
          if (systype == 'mo' && style.mohidden == 'none') {
            hlist.push(key);
          } //是pc端并且控件是隐藏，存储控件id
          else if (systype == 'pc' && style.pchidden == 'none') {
            //过滤移动端头部和底部
            /moHeader|moFooter/.test(skin) == false && hlist.push(key);
          }
        }
      }
    }

    return hlist;
  },

  /**
   * @description: 显示所有隐藏控件
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-02-27 15:23:37
   */
  show() {
    const {
      public: {
        type: systype,
        hiding
      }
    } = window; //if(hiding == 'reset'){ //重置页面
    //show[systype] = false;
    //}

    const doc = document.getElementById('iframe').contentWindow.document;
    const hlist = [...this.showHandler('getPageData', systype), ...this.showHandler('document_get', systype)];
    show[systype] = show[systype] ? false : true;
    hlist.forEach(id => {
      const ele = doc.getElementById(id);
      if (ele) this.handleMask(ele, show[systype]);
    });
    lastSysType = systype;
  },

  /**
   * @description: 强制隐藏
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-02-28 12:26:45
   */
  hiddenEle(ele, show) {
    Dispatcher.dispatch('selectedHidden', {
      value: true
    });

    if (show) {
      this.insertMask(ele);
    } else {
      ele.style.display = 'none';
    }
  },

  /**
   * @description: 插入遮罩层
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-02-28 15:00:58
   */
  insertMask(ele) {
    if (ele) {
      //  只有 position不存在时才赋值relative, 已经存在时赋值会对固定定位的控件会影响(侧边栏) sxt 2020-9-16
      var style = window.getComputedStyle(ele, null),
        _position = style.position; //_position 为static时，证明没有定位，要赋值定位，防止遮档的bug sxt 2020-9-16

      if (_position == "static") {
        ele.style.position = 'relative';
      }

      ele.style.display = 'block';
      ele.setAttribute('data-mask', 1);
      const mask = this.getMask();
      ele.appendChild(mask);
    }
  },

  /**
   * @description: 删除遮罩层
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-03-03 13:16:44
   */
  removeMask(ele) {
    if (ele) {
      const childs = ele.childNodes;
      ele.removeAttribute('style');
      ele.removeAttribute('data-mask'); //Dispatcher.dispatch('selectedHidden',{value:true});

      if (document.querySelector('.hidDivBtn')) Dispatcher.dispatch('selectedHidden', {
        value: true
      });

      for (var i = childs.length - 1; i >= 0; i--) {
        if (childs[i].className == 'mask') {
          ele.removeChild(childs[i]);
        }
      }
    }
  },

  /**
   * @description: 强制显示
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-02-28 12:26:56
   */
  showEle(ele, show) {
    if (show) {
      this.removeMask(ele);
    }
  },

  /**
   * @description: dom插入遮罩层
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-02-27 16:57:03
   */
  handleMask(ele, show) {
    if (show) {
      this.insertMask(ele);
    } else {
      this.removeMask(ele);
    }
  },

  /**
   * @description: 获取遮罩层
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-02-28 12:26:35
   */
  getMask() {
    const maskEle = document.createElement('div');
    maskEle.setAttribute('class', 'mask');
    maskEle.style.position = 'absolute';
    maskEle.style.width = '100%';
    maskEle.style.height = '100%';
    maskEle.style.top = '0';
    maskEle.style.left = '0';
    maskEle.style.backgroundColor = '#000';
    maskEle.style.opacity = '.8';
    return maskEle;
  }

};

export default Hiding