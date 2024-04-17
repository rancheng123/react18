import components_manager from '@/components/components_manager';
/**
 * @class {AttrProxy} 属性代理模块
 */
export default class AttrProxy {

  constructor() {
    /**@property {Attribute} _module 存储控件属性对象*/
    this._module = null;
    /**@property {string} _type 控件类型 */
    this._type = '';
    /** @property {object} _config 控件属性配置 */
    this._config = null;
  }
  
  get config() {
    if (this._module && this._config === null) {
      // 深拷贝原始配置数据
      this._config = JSON.parse(JSON.stringify(this._module.config));
    }
    //返回属性配置
    return this._config;
  }

  /** @property {object} iconList 控件属性icon列表 */
  get iconList() {
    return this._module ? this._module.iconList : null;
  }
  /**
   * @method editTabs 给editTabs接口赋值
   * @param {function} fn 一个函数，用于赋给接口
   */

  set editTabs(fn) {
    if (this._module) {
      this._module.editTabs = fn
    }
  }
  /**
   * @method editGroup 给editGroup接口赋值
   * @param {function} fn 一个函数，用于赋给接口
   */

  set editGroup(fn) {
    if (this._module) {
      this._module.editGroup = fn
    }
  }
  /**
   * @method init 初始化代理
   * @param {string} type 控件类型
   * @return {promise} 一个promise对象 
   */

  async init(type, param) {
    //判断是否为null或者控件代理类型是否相同，为null或类型不相等，执行if，不为null或相等，不执行if
    if (this._module == null || this._type != type) {
      //获取控件模块
      const component = await components_manager(type);
      if (component) {
        this._module = await component.getAttr();

        if (param == true) {
          //临时构造函数，用于创建新实例
          const Temporary = function () {};

          Temporary.prototype = this._module;
          
          this._module = new Temporary();
        }

        this._type = type;
        
        await this.config; //预访问 
      }
    }
    return this;
  }
  /**
   * @method showAttributePanel 显示属性面板
   */

  showAttributePanel(opts) {
    this._module && this._module.showAttributePanel && this._module.showAttributePanel(opts)
  }
  /**
   * @method selectBox 显示控件选框
   * @param {object} opts 参数对象
   */

  selectBox(opts) {
    this._module && this._module.selectBox && this._module.selectBox(opts)
  }
  /**
   * @method addComponentBefore 控件新增前执行
   * @param {object} component 控件数据
   */


  addComponentBefore(component) {
    this._module && this._module.addComponentBefore && this._module.addComponentBefore(component)
  }
  /**
   * @method addedComponent 控件新增完成之后调用
   * @param {string} id 控件id
   */

  addedComponent(id) {
    this._module && this._module.addedComponent && this._module.addedComponent(id);
  }
  /**
   * @method selectBefore 选中之前调用
   * @param {object} node 节点对象
   * @param {object} config 配置对象
   */

  selectBefore(node, config) {
    this._module && this._module.selectBefore && this._module.selectBefore(node, config)
  }
  /**
   * @method selected 选中之后调用
   * @parame {object} 选中控件的数据
   */

  selected(node) {
    this._module && this._module.selected && this._module.selected(node);
  }
  /**
   * @method selectBlur 选中控件失去焦点时触发
   * @param {object} prevNode  控件失去焦点之前，被选中控件的数据
   */

  selectBlur(prevNode) {
    this._module && this._module.selectBlur && this._module.selectBlur(prevNode)
  }
}

