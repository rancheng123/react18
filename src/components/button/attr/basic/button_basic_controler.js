
import Dispatcher from '@/system/tools/dispatcher';
import ButtonBasic from './button_basic';
import BasicControler from '@/components/page/attr/basic/basic_controler';
import { resourceManager } from '@/system/function/resource/resource_manager.js';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ButtonBasicControler extends BasicControler {
  constructor(props) {
    super(props);
    /**@property {Link} view 初始化 view 实例*/

    this.view = new ButtonBasic(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  init() {
    var _this$state$, _this$state$2;

    super.init();
    let parentData = this.getParentType(this.props.node, "em-Form"); //查找当前控件是否在列表中

    const prefix = this.props.prefix;
    const marginLeft = (_this$state$ = this.state[`${prefix}marginLeft`]) !== null && _this$state$ !== void 0 ? _this$state$ : this.state.marginLeft,
      marginRight = (_this$state$2 = this.state[`${prefix}marginRight`]) !== null && _this$state$2 !== void 0 ? _this$state$2 : this.state.marginRight;

    if (marginLeft == 'auto' && marginRight == 'auto') {
      this.state[`${prefix}align`] = 'center';
    } else {
      this.state[`${prefix}align`] = marginLeft == 'auto' ? 'right' : 'left';
    }

    if (parentData) {
      this.state.controlType = "formButton";
    }

    ;
  }
  /**
  * @method  changText 设置按钮文本
  * @param {string} key 数据名称
  * @param {event} e 事件对象
  */
  changText(key, e) {
    const _value = e.target.value;
    this.setState({
      [key]: _value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }


  /**
   * @method delIcon 删除icon方法
   */
  delIcon() {
    this.setState({
      "icon": {}
    });
    Dispatcher.dispatch(`${this.props.id}_remove`, {
      value: 'document_data.icon'
    });
  }


  /**
   * @method setIcon 设置icon方法
   * @param {Object} datas 返回数据
   * @param {event} event 事件对象
   */
  setIcon(datas) {
    this.setState({
      "icon": datas
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.icon`, datas]
    });
  }


  /**
  * @method showIcon icon显示方法
  * @param {string} key 键值
  * @param {event} event 事件对象
  */
  showIcon() {
    resourceManager("icon").then(module => {
      module.resource({
        selected: this.setIcon.bind(this)
      });
    });
  }


  /**
   * @method  setContent 设置数据源类型
   * @param {event} e 事件对象
   */
  setContent(e) {
    const _value = e.target.value;
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.selectionContent`, _value]
    });

    if (_value == "custom") {
      Dispatcher.dispatch(`${this.props.id}_remove`, {
        value: 'document_data.dataSource'
      });
      this.setState({
        "dataSource": "",
        "selectionContent": _value
      });
    } else {
      this.setState({
        "dataSource": {},
        "selectionContent": _value
      });
    }
  }



  /**
   * @method showDataSource 显示数据源面板-文本-按钮
   */
  showDataSource() {
    const promise = Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("data_source_controler")]).then(__webpack_require__.bind(null, /*! ../../../../system/function/data_source/data_source_controler */ "./system/function/data_source/data_source_controler.js"));

    let _this = this;

    let parentData = this.getParentType(this.props.node, "em-List"); //查找当前控件是否在列表中

    promise.then(module => {
      module.DataSourceControler && module.DataSourceControler.dataSource({
        initialData: this.state.dataSource,
        data_source_type: "Text",
        identifier_item: "goods",
        ensure: data => {
          let newData = JSON.parse(JSON.stringify(data)); //先把对象拷贝出来，防止对象赋值改变 

          data.sourceName = "label";

          let _showText = (data.companyLabelText || "") + (data.companyValue || data.companyDefaultValue || "");

          let _linkData = this.state.link || {},
            _companyField = data.companyField;

          newData.data_source_type = "Link"; // let setLinkData = { companyField: data.companyField, companyName: data.companyName, companyValue: data.companyValue, data_source_type: data.data_source_type, linkType: data.linkType, sourceName: data.sourceName, sourceText: data.sourceText, sourceType: data.sourceType };
          //类型为电话时设置链接数据

          if (_companyField == "tel" || _companyField == "phone" || _companyField == "fax") {
            _linkData.phoneNumber = data.companyValue;
            _linkData.type = "phone";
            _linkData.dataSource = newData;
            _linkData.dataSource.sourceName = "phoneNumber";
            _linkData.value = `${window.public.lang["phone"]} ${data.companyValue}`;
          } //类型为邮箱时设置邮箱数据


          if (_companyField == "email") {
            _linkData.recipient = data.companyValue;
            _linkData.type = "email";
            _linkData.mailTheme = "";
            _linkData.dataSource = newData;
            _linkData.dataSource.sourceName = "recipient";
            _linkData.value = `${window.public.lang["email"]} ${data.companyValue}`;
          } //类型为whatsapp时设置whatsapp数据
          //onlineConsulting   consultValue =="whatsApp" account


          if (_companyField == "whatsapp") {
            _linkData.account = data.companyValue;
            _linkData.type = "onlineConsulting";
            _linkData.consultValue = "whatsApp";
            _linkData.dataSource = newData;
            _linkData.consultName = window.public.lang["whatsApp"];
            _linkData.dataSource.sourceName = "account";
            _linkData.value = `${window.public.lang["onlineConsulting"]} ${_linkData.consultName}`;
          }

          if (_companyField == "whatsappPc") {
            _linkData.account = data.companyValue;
            _linkData.type = "onlineConsulting";
            _linkData.consultValue = "whatsappPc";
            _linkData.consultName = window.public.lang["whatsappPc"];
            _linkData.dataSource = newData;
            _linkData.dataSource.sourceName = "account";
            _linkData.value = `${window.public.lang["onlineConsulting"]} ${_linkData.consultName}`;
          }

          if (parentData) {
            data.type = "list";
          } //控件在列表中，添加type=list 用于后台替换列表数据


          Dispatcher.dispatch(`${_this.props.id}_set`, {
            args: [`document_data.dataSource`, data]
          });
          Dispatcher.dispatch(`${_this.props.id}_set`, {
            args: [`document_data.label`, _showText]
          });
          Dispatcher.dispatch(`${_this.props.id}_set`, {
            args: [`document_data.link`, _linkData]
          });

          _this.setState({
            "dataSource": data,
            label: _showText,
            link: _linkData
          });
        }
      });
    });
  }


  /**
   * @method setThemeData 修改theme_data数据
   * @param {string} key   数据中键
   * @param {object} event 事件对象 
   */
  setThemeData(key, event) {
    let value = event.target.value;

    if (/\d/.test(value)) {
      var _value2;

      value = Number((_value2 = value) !== null && _value2 !== void 0 ? _value2 : 0);
    }

    this.setState({
      [key]: value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.style.${key}`, value]
    });
  }



  /**
   * @method setMargin 设置边距
   * @param {string} key 键值 
   * @param {object} event 事件对象 
   */
  setMargin(key, event) {
    var _event$target$value;

    window.public.unit.selector = `#${this.props.id}`;
    const ele = window.public.dom.querySelector(`#${this.props.id}`);
    const {
      x,
      width
    } = ele.parentNode.getBoundingClientRect();
    const ukey = `${key}Unit`,
      unit = this.state[ukey];
    let value = Number((_event$target$value = event.target.value) !== null && _event$target$value !== void 0 ? _event$target$value : 0); //单位不是像素，通过转换获取像素值

    if (unit != 'px') {
      value = window.public.unit.px(value, unit, ukey);
    } //获取选中框x轴


    const left = x + (key.indexOf('marginLeft') != -1 ? value : width - (value + ele.offsetWidth)); //设置边距

    this.setThemeData(key, event); //设置选中框

    Dispatcher.dispatch(`${id}_select_setLayout`, {
      value: playout => ({
        ...playout,
        left
      })
    });
  }
  /**
   * @method setAlign 设置对齐方式
   */
  setAlign(event) {
    const {
      props: {
        id,
        prefix
      }
    } = this;
    const value = event.target.value;
    const {
      component: {
        selectable
      }
    } = Dispatcher.dispatch(`${id}_get`);
    const ele = window.public.dom.querySelector(`#${id}`);
    const btns = document.querySelectorAll('.occupa-top-left,.occupa-left');
    const {
      x,
      width
    } = ele.parentNode.getBoundingClientRect();
    const mlkey = `${prefix}marginLeft`,
      mlukey = `${mlkey}Unit`,
      mrkey = `${prefix}marginRight`,
      mrukey = `${mrkey}Unit`; //左对齐

    let data = {
      [mlkey]: 0,
      [mlukey]: '%',
      [mrkey]: 'auto',
      [mrukey]: ''
    },
      left = x,
      display = ''; //是否是具中对齐

    if (value == 'center') {
      data = {
        [mlkey]: 'auto',
        [mlukey]: '',
        [mrkey]: 'auto',
        [mrukey]: ''
      };
      left = x + (width - ele.offsetWidth) / 2, display = 'none';
    } //是否是右对齐
    else if (value == 'right') {
      data = {
        [mlkey]: 'auto',
        [mlukey]: '',
        [mrkey]: 0,
        [mrukey]: '%'
      };
      left = x + (width - ele.offsetWidth);
    } //更新面板


    this.setState({
      [`${prefix}align`]: value,
      ...data
    });
    Dispatcher.dispatch(`${id}_set`, {
      args: ['theme_data.style.', data]
    }); //按钮是可以选中的，更新选中框 

    if (selectable != false) {
      //更新选中框
      Dispatcher.dispatch(`${id}_select_setLayout`, {
        value: playout => ({
          ...playout,
          left
        })
      }); //隐藏选中按钮

      btns[0].style.display = btns[1].style.display = display;
    }
  }

}

_defineProperty(ButtonBasicControler, "LIST", ["selectionContentSet", "inputText", "dataText", "link", "selectIcon", "anchorSet", "controlsName", 'maxWidth', 'align', 'marginLeft', 'marginRight']);


export { ButtonBasicControler }