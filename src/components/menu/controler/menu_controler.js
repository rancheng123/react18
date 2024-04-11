__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuControler", function() { return MenuControler; });
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");

class MenuControler {
  constructor(component) {
    this.component = component;
  }
  /**
   * @method 获取外部数据
   * @date 2019-12-09
   * @author sxt 
   * @return Promise
   */


  getSourceData() {
    let stateData = this.state.data || {},
        menuData = stateData.menu_data || {},
        {
      dataSource = {}
    } = menuData;
    let level = dataSource.level || "0";
    let newdata = {
      sid: pageData.siteId,
      selectAll: true,
      sourceType: "nav_list",
      justIdList: [],
      displayContent: [],
      level: level
    };
    let ajaxData = { ...newdata,
      ...dataSource
    };
    return fetch("/desktop/index.php/Edit/NavData/getNavData", {
      method: 'POST',
      headers: {},
      body: JSON.stringify(ajaxData)
    }).then(response => response.json()).then(data => data.suc == 0 ? data.data : {});
  }
  /**
   * @method 加载请求导航数据方法
   * @date 2019-12-09
   * @author sxt 
   */


  async load() {
    let menuData = this.state.data.menu_data || {};
    let list = menuData.menuList || [];

    if (!list.length) {
      const data = (await this.getSourceData()) || {},
            tree = data.tree || [];
      let id = this.state.component.id; //走新增数据方法，解析没有menu_data的数据的Bug。sxt 2020-4-11

      dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch('addData', {
        args: [id, `menu_data.${id}`, {
          menuList: tree
        }, false]
      });
      dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
        args: [`theme_data.style.menuLilen`, tree.length]
      });
    }
  }
  /**
   * @method submenuListTransition submenuList中的键名转换
   * @date 20201-03-18
   * @author wyq
   */


  submenuListTransition() {
    const {
      component: {
        id
      },
      data: {
        menu_data = {}
      }
    } = this.state; //submenulist 是一个对象，执行逻辑

    if (menu_data.submenuList && Array.isArray(menu_data.submenuList) != true) {
      const keys = Object.keys(menu_data.submenuList); //存在数字键则循环转换键

      if (/^\d+$/.test(keys[0])) {
        //循环
        const isSet = keys.some(key => {
          const item = menu_data.menuList.find(e => e.id == key); //是否查找到数据

          if (item) {
            //设置新键来存储值
            menu_data.submenuList[item.pid] = menu_data.submenuList[key]; //删除老键及存储的值

            delete menu_data.submenuList[key];
            return true;
          }

          return false;
        }); //isSet 值为true 执行设置，否则不执行

        isSet && dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
          args: ['menu_data.submenuList', { ...menu_data.submenuList
          }]
        });
      }
    }
  }
  /**
   * @method componentDidMount 加载之前执行方法
   * @date 2019-12-09
   * @author sxt 
   */


  componentDidMount() {
    //自定义次级导航绑定关系转换，变换键的值。
    this.submenuListTransition();
    this.load();
  }

}

//# sourceURL=webpack:///./components/menu/controler/menu_controler.js?