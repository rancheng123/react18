export default class MenuDragTools {
  //分类id
  catList = []
  /**
   * 
   * @param {*} data 
   * @return void
   */
  static init(data) {
    this.catList = this.getCatList(data);
    this.data = this.copyData(data);
  }
  /**
   * 
   * @param {*} data 
   */


  static copyData(data) {
    return JSON.parse(JSON.stringify(data));
  }
  /**
   * @return object
   */


  static getConf() {
    return {
      offset: 20,
      l1: 15,
      l2: 10
    };
  }
  /**
   * 
   * @param {*} data 
   */


  static getCatList(data) {
    const list = [];
    data.forEach(ele => {
      list.push(ele.parent_id);
      list.push(ele.pid);
    });
    return [...new Set(list)];
  }
  /**
   * 
   * @param {*} data 
   */


  static listorder(data) {
    const final = [];
    this.catList.forEach(cat => {
      const list = [];
      data.forEach(column => {
        if (column.parent_id == cat) {
          list.push(column);
        }
      });
      list.forEach((v, i, arr) => {
        v.listorder = i;
        v.first = 0;
        v.last = 0;
        v.len = arr.length - 1;

        if (i == 0) {
          v.first = 1;
        }

        if (i == arr.length - 1) {
          v.last = 1;
        }

        delete v.child;
        final.push(v);
      });
    });
    this.data = this.copyData(final);
    return final;
  }
  /**
   * 
   * @param {*} obj 
   */


  static getPoint(obj) {
    let t = 0,
        l = 0;

    do {
      t += obj.offsetTop; //获取该元素对应父容器的上边距  

      l += obj.offsetLeft; //对应父容器的上边距  

      obj = obj.offsetParent;
    } while (obj);

    return {
      top: t,
      left: l
    };
  }
  /**
   * 
   * @param {*} data 
   * @param {*} id 
   */


  static dgJson(data, id = 0, level = 1) {
    level++;
    const _data = [];
    data.forEach(item => {
      if (item.parent_id == id) {
        const children = this.dgJson(data, item.pid);
        children.length ? item.child = children : null;

        _data.push(item);
      }

      item.level = level;
    });
    return _data;
  }
  /**
   * 
   * @param {*} current 
   * @param {*} data 
   */


  static findLevel(current, data) {
    let _data = current,
        i = 1;

    while (typeof _data == 'object' && _data.parent_id != '0') {
      i++;
      _data = data.find(item => {
        return item.pid == _data.parent_id;
      });
    }

    return i;
  }
  /**
   * 
   * @param {*} current 
   * @param {*} data 
   */


  static hasChild(current, data) {
    return data.findIndex(item => {
      return item.parent_id == current.pid;
    });
  }
  /**
   * 
   * @param {*} data 
   */


  static decode(data) {
    let _data = [];
    data.forEach(item => {
      if (item.hasOwnProperty('child')) {
        this.decode(item.child).forEach(item => {
          _data.push(item);
        }); //delete item.child;
      }

      _data.push(item);
    });
    return _data;
  }
  /**
   * 
   * @param {*} data 
   * @param {*} pid 
   */


  static getSameList(data, pid) {
    return data.filter(item => {
      if (item.parent_id == pid && item.type != 'plac') {
        return true;
      }
    });
  }
  /**
   * 
   * @param {*} data 
   * @param {*} pid 
   */


  static getDiffList(data, pid) {
    return data.filter(item => {
      if (item.parent_id != pid && item.type != 'plac') {
        return true;
      }
    });
  }
  /**
   * 
   * @param {*} data 
   * @param {*} pid 
   */


  static findEle(data, pid) {
    return data.find((item, i) => {
      return item.pid == pid;
    });
  }

  static createPlac(pid, parent_id) {
    return {
      pid,
      parent_id,
      name: '放在这里?',
      type: 'plac',
      hidden: 0
    };
  }

  static box(top, right, bottom, left, pid, name) {
    return {
      top,
      right,
      bottom,
      left,
      pid,
      name
    };
  }

}

// _defineProperty(MenuDragTools, "catList", []);

//# sourceURL=webpack:///./ui/page_management/menu_drag/MenuDragTools.js?