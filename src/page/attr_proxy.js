import components_manager from './components_manager';

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

/**
 * @class {AttrProxy} 属性代理模块
 
 * @version 1.0
 * @date 2019-10-30
 */

class AttrProxy {
  /**@property {Attribute} module 存储控件属性对象*/

  /**@property {string} type 控件类型 */
  constructor() {
    _module.set(this, {
      writable: true,
      value: null
    });

    _type.set(this, {
      writable: true,
      value: ""
    });

    _config.set(this, {
      writable: true,
      value: null
    });
  }
  /** @property {object} config 控件属性配置 */


  get config() {
    //模块存在并且配置属性为空
    if (_classPrivateFieldGet(this, _module) && _classPrivateFieldGet(this, _config) == null) {
      //深拷贝原始配置数据
      _classPrivateFieldSet(this, _config, JSON.parse(JSON.stringify(_classPrivateFieldGet(this, _module).config)));
    } //返回属性配置


    return _classPrivateFieldGet(this, _config);
  }
  /** @property {object} iconList 控件属性icon列表 */


  get iconList() {
    return _classPrivateFieldGet(this, _module) ? _classPrivateFieldGet(this, _module).iconList : null;
  }
  /**
   * @method editTabs 给editTabs接口赋值
   * @date 2020-12-18
   
   * @param {function} fn 一个函数，用于赋给接口
   */


  set editTabs(fn) {
    if (_classPrivateFieldGet(this, _module)) _classPrivateFieldGet(this, _module).editTabs = fn;
  }
  /**
   * @method editGroup 给editGroup接口赋值
   * @date 2020-12-18
   
   * @param {function} fn 一个函数，用于赋给接口
   */


  set editGroup(fn) {
    if (_classPrivateFieldGet(this, _module)) _classPrivateFieldGet(this, _module).editGroup = fn;
  }
  /**
   * @method init 初始化代理
   * @date 2019-10-15
   
   * @param {string} type 控件类型
   * @return {promise} 一个promise对象 
   */


  async init(type, param) {
    //判断是否为null或者控件代理类型是否相同，为null或类型不相等，执行if，不为null或相等，不执行if
    if (_classPrivateFieldGet(this, _module) == null || _classPrivateFieldGet(this, _type) != type) {
      //获取控件模块
      const component = await Object(components_manager)(type);

      if (component) {
        _classPrivateFieldSet(this, _module, (await component.getAttr()));

        if (param == true) {
          //临时构造函数，用于创建新实例
          const Temporary = function () { };

          Temporary.prototype = _classPrivateFieldGet(this, _module);

          _classPrivateFieldSet(this, _module, new Temporary());
        }

        _classPrivateFieldSet(this, _type, type);

        await this.config; //预访问 
      }
    }

    return this;
  }
  /**
   * @method showAttributePanel 显示属性面板
   */


  showAttributePanel(opts) {
    _classPrivateFieldGet(this, _module) && _classPrivateFieldGet(this, _module).showAttributePanel && _classPrivateFieldGet(this, _module).showAttributePanel(opts);
  }
  /**
   * @method selectBox 显示控件选框
   * @date 2020-02-20
   
   * @param {object} opts 参数对象
   */


  selectBox(opts) {
    _classPrivateFieldGet(this, _module) && _classPrivateFieldGet(this, _module).selectBox && _classPrivateFieldGet(this, _module).selectBox(opts);
  }
  /**
   * @method addComponentBefore 控件新增前执行
   * @date 2020-02-05
   
   * @param {object} component 控件数据
   */


  addComponentBefore(component) {
    _classPrivateFieldGet(this, _module) && _classPrivateFieldGet(this, _module).addComponentBefore && _classPrivateFieldGet(this, _module).addComponentBefore(component);
  }
  /**
   * @method addedComponent 控件新增完成之后调用
   * @date 2020-02-05
   
   * @param {string} id 控件id
   */


  addedComponent(id) {
    _classPrivateFieldGet(this, _module) && _classPrivateFieldGet(this, _module).addedComponent && _classPrivateFieldGet(this, _module).addedComponent(id);
  }
  /**
   * @method selectBefore 选中之前调用
   * @date 2020-02-05
   
   * @param {object} node 节点对象
   * @param {object} config 配置对象
   */


  selectBefore(node, config) {
    _classPrivateFieldGet(this, _module) && _classPrivateFieldGet(this, _module).selectBefore && _classPrivateFieldGet(this, _module).selectBefore(node, config);
  }
  /**
   * @method selected 选中之后调用
   * @date 2020-02-05
   
   * @parame {object} 选中控件的数据
   */


  selected(node) {
    _classPrivateFieldGet(this, _module) && _classPrivateFieldGet(this, _module).selected && _classPrivateFieldGet(this, _module).selected(node);
  }
  /**
   * @method selectBlur 选中控件失去焦点时触发
   * @date 2020-06-28
   
   * @param {object} prevNode  控件失去焦点之前，被选中控件的数据
   */


  selectBlur(prevNode) {
    _classPrivateFieldGet(this, _module) && _classPrivateFieldGet(this, _module).selectBlur && _classPrivateFieldGet(this, _module).selectBlur(prevNode);
  }

}

var _module = new WeakMap();

var _type = new WeakMap();

var _config = new WeakMap();

export default AttrProxy;
