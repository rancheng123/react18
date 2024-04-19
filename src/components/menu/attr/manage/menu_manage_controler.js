// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuManageControler", function() { return MenuManageControler; });
// /* harmony import */ var manage_controler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! manage-controler */ "./components/page/attr/manage/manage_controler.js");
// /* harmony import */ var layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! layer */ "./system/widgets/layer.js");
// /* harmony import */ var _menu_manage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu_manage */ "./components/menu/attr/manage/menu_manage.js");
// /* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
// /* harmony import */ var _page_attr_proxy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../page/attr_proxy */ "./components/page/attr_proxy.js");
// /* harmony import */ var _page_components_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../page/components_manager */ "./components/page/components_manager.js");


// 导入模块
import { MenuManageControler } from "@/components/page/attr/"; // 从 manage-controler 模块导入 MenuManageControler
import layer from "layer"; // 导入 layer 模块
import { MenuManage } from "./menu_manage"; // 从当前目录下的 menu_manage.js 模块导入 MenuManage
import dispatcher from "dispatcher"; // 导入 dispatcher 模块
import { PageProxy } from "../../../page/attr_proxy"; // 从相对路径 ../../../page/attr_proxy.js 导入 PageProxy
import { ComponentsManager } from "../../../page/components_manager"; // 从相对路径 ../../../page/components_manager.js 导入 ComponentsManager




/**
 * @class MenuManageControler  导航项管理控制器类
 * @date 2020-08-21
 * @author wyq
 */

export default class MenuManageControler extends manage_controler__WEBPACK_IMPORTED_MODULE_0__["ManageControler"].Component {
  constructor(props) {
    super(props);
    /**@property {number} 最大项数 */

    this.max = 10;
    /**@property {string} 读取项名称的键*/

    this.nameKey = 'name';
    /**@property {boolean} 是否允许拖拽 */

    this.draggable = false;
    /**@property {boolean} 是否允许新增项 */

    this.isAdd = false;
    /**@property {boolean} 是否允许删除项*/

    this.isDelete = false;
    /**@property {Attr_Proxy} 控件代理 */

    this.proxy = null;
    /**@property {Manage} view 初始化 view 实例*/

    this.view = new _menu_manage__WEBPACK_IMPORTED_MODULE_2__["MenuManage"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @method init 初始化方法
   * @date 2020-08-24
   * @author wyq
   */


  init() {
    const pid = this.props.id;
    const {
      component,
      data: {
        menu_data = {}
      }
    } = dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${pid}_get`);
    const mskin = component.components[0].skin;
    let {
      menuList,
      submenuList = {}
    } = menu_data; //如果submenuList是一个空数组，则把submenuList改变为对象。 2021-03-18 by wyq change

    if (Array.isArray(submenuList) && submenuList.length == 0) {
      dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${pid}_set`, {
        args: [`menu_data.submenuList`, {}]
      });
      submenuList = {};
    } //循环导航项数据


    this.items = menuList.map(e => {
      const pid = e.pid,
        id = submenuList[pid]; //id是否存在

      if (id) {
        const {
          component: {
            skin,
            componentType
          },
          data
        } = dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${id}_get`);
        const type = componentType.split("-")[1].toLowerCase();
        data.component = {
          id,
          skin,
          type,
          componentType
        };

        if (this.submenuState(id)) {
          this.previousShowId = id;
          data.document_data.show = true;
        }

        data.document_data.isSubmenu = true, data.document_data.name = e.name;
        return data;
      }

      const component = {
        id: pid,
        skin: mskin,
        type: 'submenu',
        componentType: "em-Submenu"
      };
      return {
        component,
        document_data: {
          isSubmenu: false,
          name: e.name
        }
      };
    });
    const {
      items: [{
        component: {
          skin,
          type
        }
      }]
    } = this;
    const group = this.props.list[type];
    this.state = {
      current: this.items[0],
      list: group[skin] || group.all
    };
  }
  /**
   * @method submenu 次级导航处理
   * @date 2020-08-24
   * @author wyq
   * @param {object} event 事件对象 
   */


  async submenu(event) {
    const value = event.target.value;
    const id = this.state.current.component.id;
    const index = this.items.findIndex(e => e.component.id == id);
    const current = value == 'true' ? await this.addSubmenu() : this.removeSubmenu(index); //当前项存在数据，执行更新操作

    current && (this.items.splice(index, 1, current), this.setState({
      current
    }));
  }
  /**
   * @method addSubmenu 新增自定义次级导航
   * @date 2020-08-24
   * @author wyq
   * @return {object} 新增项数据
   */


  async addSubmenu() {
    const {
      state: {
        current: {
          component = {},
          document_data = {}
        }
      }
    } = this;
    const {
      skin,
      id: pageid,
      componentType
    } = component; //不存在页面id则禁止开启自定义次级导航

    if (!pageid) {
      return layer__WEBPACK_IMPORTED_MODULE_1__["Layer"].alert({
        content: '导航项为分类或链接类型无法开启自定义次级导航',
        area: ["350px", "230xp"],
        ensure: true
      });
    } //获取控件管理对象


    const module = await Object(_page_components_manager__WEBPACK_IMPORTED_MODULE_5__["componentsManager"])(componentType);
    const data = await module.getData(window.humpJoin(skin.split('.')[1], '_'));

    if (data) {
      const componentData = data.items[skin]; //数据是否存在

      if (componentData) {
        componentData.data.isSubmenu = true;
        const pid = this.props.id,
          name = document_data.name;
        const {
          structure: {
            skin,
            componentType
          }
        } = componentData; //次级导航记录与父级导航哪一项进行关联

        componentData.structure.parentId = pageid; //实例化并初始化代理对象

        this.proxy = await new _page_attr_proxy__WEBPACK_IMPORTED_MODULE_4__["AttrProxy"]().init(componentType); //新增控件

        const id = dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${pid}_addComponent`, {
          value: componentData
        });
        const type = componentType.split("-")[1].toLowerCase(); //设置数据

        dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${pid}_set`, {
          args: [`menu_data.submenuList.${pageid}`, id]
        });
        return {
          component: {
            id,
            skin,
            type,
            componentType
          },
          document_data: {
            isSubmenu: true,
            name
          }
        };
      }
    }
  }
  /**
   * @method removeSubmenu 删除次级导航
   * @date 2020-08-24
   * @author wyq
   * @param {number} index 索引项
   * @return  {object} 删除项的数据
   */


  removeSubmenu(index) {
    const pid = this.props.id;
    const {
      state: {
        current: {
          component: item,
          document_data = {}
        }
      }
    } = this;
    const {
      component,
      data: {
        menu_data
      }
    } = dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${pid}_get`);
    const skin = component.components[0].skin,
      pageid = menu_data.menuList[index].pid;
    const type = item.componentType.split("-")[1].toLowerCase();
    const name = document_data.name; //清空指定插入位置 2021-02-19

    item.skin.indexOf('submenuBox') != -1 && dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`drag_point`, {
      value: ''
    }); //删除控件

    dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${pid}_removeComponent`, {
      value: item.id
    }); //删除指定数据

    Object.keys(menu_data.submenuList).length > 1 ? dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${pid}_remove`, {
      value: `menu_data.submenuList.${pageid}`
    }) : dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${pid}_remove`, {
      value: `menu_data.submenuList`
    }); //清空代理喝阻止事件冒泡

    this.proxy = null;
    return {
      component: {
        id: pageid,
        skin,
        type,
        componentType: item.componentType
      },
      document_data: {
        isSubmenu: false,
        name
      }
    };
  }
  /**
   * @method switchTab 切换选项
   * @param {object} item 要切换的项 
   * @param {event} event 事件对象 
   */


  switchTab(item, event) {
    const id = this.state.current.component.id;
    if (this.submenuState(id)) this.previousShowId = id;
    super.switchTab(item, event);
  }
  /**
  * @method showPanel 显示面板
  * @date 2019-08-24
  * @author wyq
  */


  async showPanel() {
    const id = this.state.current.component.id,
      parent = this.props.node.current; //保证获取到最新的皮肤 2020-09-09

    const {
      component: {
        skin,
        componentType
      }
    } = dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${id}_get`); //proxy不存在则实例化并初始化代理对象

    if (!this.proxy) {
      this.proxy = await new _page_attr_proxy__WEBPACK_IMPORTED_MODULE_4__["AttrProxy"]().init(componentType);
    } //显示次级导航


    this.isShow({
      target: {
        value: 'true'
      }
    }); //显示面板

    this.proxy.showAttributePanel({
      index: 0,
      id: "component-modal",
      node: {
        current: {
          id,
          skin,
          type: componentType,
          //垂直导航不显示次级容器
          unsubmenuBox: parent.skin.indexOf('verMenu') == -1 ? false : true
        },
        parent
      }
    });
  }
  /**
   * @method isShow 是否展示次级导航
   * @date 2020-09-24
   * @author wyq
   * @param {object} event 事件对象 
   */


  isShow(event) {
    const {
      current: {
        component: {
          id,
          skin
        }
      }
    } = this.state;
    let value = event.target.value;
    value = value == 'true' ? true : false;
    this.state.current.document_data.show = value;
    this.setState({
      current: this.state.current
    }); //如果是开启，调用重新计算次级宽度显示的方法 sxt 2022-10-22

    if (value) {
      this.showSubMenuInit(id);
    } //如果显示当前次级，则隐藏已经显示的次级导航


    value && this.previouslyHideSubmenu(); //设置次级导航项

    dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${id}_set`, {
      value: {
        showSub: value
      }
    }); //如果显示的是次级容器样式，设置指定容器插入 wyq 2021-02-19

    skin.indexOf('submenuBox') != -1 && dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`drag_point`, {
      value: value ? this.joinId() : ''
    });
  }
  /**
   * @method showSubMenuInit 计算次级导航的宽度显示
   * @date 2022-10-22
   * @author sxt
   * @param {String} id 控件id 
   */


  showSubMenuInit(id) {
    const {
      component: {
        skin,
        componentType
      },
      data: {
        document_data = {}
      }
    } = dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${id}_get`);
    const fullWidth = document_data.fullWidth; //次级导航开启全屏，计算次级导航宽度和位置

    if (fullWidth) {
      const div = window.public.dom.querySelector(`#${id}`); //只有在元素存在时，才进行逻辑处理，在mo时是不解析次级容器结构，防止没有元素而报错 sxt 2021-3-9

      if (div) {
        const layout = div.parentNode.getBoundingClientRect();
        const x = Math.floor(layout.left);
        const width = window.innerWidth / layout.width * 100;
        dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${id}_set`, {
          args: ['component.layout.', {
            x: -x,
            width
          }]
        });
      }
    }
  }

  submenuState(id) {
    //id必须以字母开头，非字母开头id，为不合法id，返回默认状态
    if (/^[a-z]{1}/.test(id)) {
      const element = window.public.dom.querySelector(`#${id}`);
      return element && element.classList.contains('editShowsubmenu');
    }

    return false;
  }
  /**
   * @method previouslyHideSubmenu 隐藏已经显示的次级导航
   * @date 2021-02-20
   * @author wyq
   */


  previouslyHideSubmenu() {
    //如果存在上一个显示的次级导航项
    if (this.previousShowId) {
      const previousItem = this.items.find(e => e.component.id == this.previousShowId);
      previousItem.document_data.show = false; //隐藏次级导航项

      dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${this.previousShowId}_set`, {
        value: {
          showSub: false
        }
      }); //清空属性

      this.previousShowId = '';
    }
  }
  /**
   * @method joinId 自下向上链接控件id
   * @date 2021-02-19
   * @author wyq
   * @return {string} 拼接后的id字符串
   */


  joinId() {
    let current = this.props.node.current,
      idList = [];

    while (current.parent) {
      idList.unshift(current.id);
      current = current.parent;
    }

    return idList.join('.');
  }

}
