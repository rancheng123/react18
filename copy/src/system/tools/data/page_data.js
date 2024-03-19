__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageData", function() { return PageData; });
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./system/tools/data/data.js");


/**
 * @instance PageData 页面数据处理
 * @date 2020-1-11
 
 */

const PageData = {
  /**
   * @method install 安装数据处理相关方法
   * @date 2019/09/16
   
   * @param {object} component  组件状态对象
   */
  install(component) {
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('document_set', this.set, component);
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('document_get', this.getIframeData, component);
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('document_remove', PageData.remove, component);
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('getPageData', this.getPageData, component);
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('getIframeData', this.getIframeData, component);
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('getData', this.getData, component);
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('addData', this.addData, component);
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('addComponent', this.addComponent, component);
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('removeData', this.removeData, component);
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('removeComponent', this.removeComponent, component);
  },

  /**
   * @method uninstall 安装数据处理相关方法
   * @date 2019/09/16
   
   */
  uninstall() {
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('document_set');
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('document_get');
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('document_remove');
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('getPageData');
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('getIframeData');
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('getData');
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('addData');
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('addComponent');
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('removeData');
    _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].unregister('removeComponent');
  },

  /**
   * @function getPageData 获取当前页面数据
   * @param {String} [id] 当前页面id
   * @return {Object} 当前页面数据
   */
  getPageData(id) {
    const {
      props: {
        pages
      },
      state: {
        component: {
          children
        }
      }
    } = this,
          page = pages[id || (children[2] || {}).pageId];
    return page ? {
      component: page.structure,
      data: page.data
    } : null;
  },

  /**
   * @function getIfimeData 获取IfimeData数据
   * @return {Object} iframeData页面数据
   */
  getIframeData() {
    const {
      state: {
        component,
        data
      }
    } = this;
    return {
      component: component,
      data: data
    };
  },

  /**
   * @method getData 获取控件的属性数据
   * @date 2019-10-24
   
   * @param {object} component 控件结构数据 
   * @param {string} pageId 页面id 
   * @return {object} 对应属性数据
   */
  getData(component, pageId) {
    let data = _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch("document_get").data; //如果控件不是根控件，则查找控件是在框架中还是在页面中的

    if (component.type != 'Document') {
      const {
        data: pdata
      } = _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch("getPageData", {
        value: pageId
      }); //页面数据

      data = _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch("hasData", {
        args: [component, data, pdata]
      });
    }

    return {
      component: component,
      data: data
    };
  },

  /**
   * @method addData 新增一条属性和样式数据
   * @date 2019-11-23
   
   * @param {string} id 控件id
   * @param {string} key 键 
   * @param {string} value 值 
   */
  addData(id, key, value) {
    const {
      component,
      data: {
        document_data
      }
    } = _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_get`);
    const {
      data
    } = _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch("getData", {
      value: component
    });
    const [dataType, dataid, type] = key.split("."); //判断是否存在对应数据，存在则直接增加，不存在则新增此类型数据

    data[dataType] ? data[dataType][dataid] = value : data[dataType] = {
      [dataid]: value
    }; //判断是否是新增项数据

    if (type == 'items' && document_data) {
      const len = document_data.items.length; //items中新增id

      _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
        args: [`document_data.items.${len}`, dataid, false]
      }); //控件中新增一条items数据

      _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
        args: [`items.${dataid}`, value, false]
      });
    } else {
      const query = PageData.dataNames[PageData.dataTypes.indexOf(dataType)]; //存储对应数据id

      _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
        args: [`component.${query}`, dataid, false]
      }); //控件不是根控件时，给控件增加数据

      _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
        args: [dataType, value, false]
      });
    }
  },

  /**
   * @method removeData 删除一条属性和数据 
   * @date 2019-11-23
   
   * @param {string} id 控件id 
   * @param {string} key 键 
   * @return {object} 被删除的数据
   */
  removeData(id, key) {
    const {
      component,
      data: {
        document_data
      }
    } = _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_get`);
    const {
      data
    } = _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch("getData", {
      value: component
    });
    const [dataType, dataid, type] = key.split(".");
    let value = null; //判断是否存在对应数据,存在则执行删除操作

    if (data[dataType]) {
      value = data[dataType][dataid], delete data[dataType][dataid];
    } //判断是否是新增项数据


    if (type == 'items' && document_data) {
      const index = document_data.items.indexOf(dataid); //在items中删除项数据

      _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_remove`, {
        args: [`items.${dataid}`, false]
      }); //在items中删除id

      _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_remove`, {
        args: [`document_data.items.${index}`, false]
      });
    } else {
      const query = PageData.dataNames[PageData.dataTypes.indexOf(dataType)]; //删除存储的键

      _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_remove`, {
        args: [`component.${query}`, false]
      }); //控件不是根控件时，删除控件中的数据

      _dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_remove`, {
        args: [dataType, false]
      });
    }

    return value;
  },

  /**
   * @method hasData 查看控件数据存在到哪个数据中，并返回该数据
   * @date 2019-10-24
   
   * @param {object} component 控件结构数据
   * @param {object} idata 框架数据 
   * @param {object} pdata 页面数据
   * @return {object} 包含控件数据的数据
   */
  hasData(component, idata, pdata) {
    const {
      dataNames: names,
      dataTypes: types
    } = this; //循环

    for (let i = 0, len = names.length; i < len; i++) {
      const id = component[names[i]],
            type = types[i]; //判断控件是否包含对应数据id且数据中存在对应类型的数据

      if (id && (idata[type] || pdata[type])) {
        //判断框架数据中是否存在控件的数据
        if (idata[type][id]) {
          return idata;
        } //判断页面数据中是否包含控件的数据


        if (pdata[type][id]) {
          return pdata;
        } //两种数据都不包含控件数据的情况下，返回null


        return null;
      }
    } //两种数据都不包含控件数据，返回null


    return null;
  }

}; //继承

PageData.__proto__ = _data__WEBPACK_IMPORTED_MODULE_1__["Data"]; //注册包含数据事件

_dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].register('hasData', PageData.hasData, PageData);

//# sourceURL=webpack:///./system/tools/data/page_data.js?