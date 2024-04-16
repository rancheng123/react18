
import Dispatcher from "@/system/tools/dispatcher";
import TextBasic from "./text_basic";
import BasicControler from "@/components/page/attr/basic/basic_controler";
import AttrProxy from "@/components/page/attr_proxy";
import LinkControler from "@/system/function/link/link_controler";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class TextBasicControler extends BasicControler {
  constructor(props) {
    super(props);
    /**@property {Link} view 初始化 view 实例*/

    this.view = new TextBasic(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  /**
   * @method  setContent 设置数据源类型
   * @date 2019-11-9
   * @author sxt
   * @param {event} e 事件对象
   */
  setContent(e) {
    const _value = e.target.value;
    let {
      props: {
        id,
        config,
        node: {
          current: {
            skin,
            type
          }
        }
      }
    } = this,
        hidden = true;
    Dispatcher.dispatch(`${id}_set`, {
      args: [`document_data.selectionContent`, _value]
    });

    if (_value == "custom") {
      Dispatcher.dispatch(`${id}_remove`, {
        value: 'document_data.dataSource'
      });
      this.setState({
        "dataSource": "",
        "selectionContent": _value
      });
      hidden = false;
    } else {
      this.setState({
        "dataSource": {},
        "selectionContent": _value
      });
    } //设置属性按钮值


    const btns = Dispatcher.dispatch('select_button', {
      args: [config, skin, 0, 'hidden', hidden]
    }); //重新加载属性按钮

    Dispatcher.dispatch('select_loadButtons', {
      value: btns
    }); //设置面板图片项显示隐藏 

    this.setPictureTab(id, type, skin, hidden);
  }

  setLink(datas) {
    this.setState({
      "link": datas.data
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.link`, datas.data]
    });
  }
  /**
   * @method setLink 设置链接
   * @author sxt
   */


  showLink() {
    let _link = this.state.link || {};

    LinkControler.link({
      initialData: _link,
      ensure: this.setLink.bind(this)
    }); // alert("设置链接")
  }
  /**
  * @method minHeight 滑块拖拽触发改变文本高度的方法
  * @date 2020-04-17
  * @author LBY
  * @param {string} key 键值 
  * @param {event} event 事件对象 
  */


  minHeight(e) {
    // console.log(1111)
    let layout = this.state.layout || [];

    const _value = Number(e.target.value);

    this.setState({
      "layout": {
        'height': _value
      }
    }); //是数组时直接赋值成对象 

    if (Array.isArray(layout)) {
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`component.layout`, {
          "height": _value
        }]
      });
    } else {
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`component.layout.height`, _value]
      });
    }
  }
  /**
  * @method minHeight 滑块拖拽触发改变文本高度的方法
  * @date 2020-04-17
  * @author LBY
  * @param {string} key 键值 
  * @param {event} event 事件对象 
  */


  setAccordingNumber(e) {
    var _e$target$value, _this$state$layout;

    const value = Number((_e$target$value = e.target.value) !== null && _e$target$value !== void 0 ? _e$target$value : 0); //layout中存在showRow，删除layout中的showRow

    if (((_this$state$layout = this.state.layout) !== null && _this$state$layout !== void 0 ? _this$state$layout : {}).showRow) {
      //删除showRow
      Dispatcher.dispatch(`${this.props.id}_remove`, {
        value: 'component.layout.showRow'
      });
      delete this.state.layout.showRow;
    }

    this.setState({
      'showRow': value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.style.showRow`, value]
    });
  }
  /**
    * @method showDataSource 显示数据源面板-文本-按钮
    * @author sxt
    */


  showDataSource() {
    const promise = Promise.all(/*! import() | data_source_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("data_source_controler")]).then(__webpack_require__.bind(null, /*! ../../../../system/function/data_source/data_source_controler */ "./system/function/data_source/data_source_controler.js"));

    let _this = this;

    let parentData = this.getParentType(this.props.node, "em-List"); //查找当前控件是否在列表中

    promise.then(module => {
      module.DataSourceControler && module.DataSourceControler.dataSource({
        initialData: this.state.dataSource,
        data_source_type: "Text",
        identifier_item: "goods",
        ensure: data => {
          let newData = JSON.parse(JSON.stringify(data)); //先把对象拷贝出来，防止对象赋值改变 sxt 2021-3-12

          data.sourceName = "text";

          let _showText = (data.companyLabelText || "") + (data.companyValue || data.companyDefaultValue || ""),
              _linkData = this.state.link || {},
              _companyField = data.companyField;

          newData.data_source_type = "Link"; //类型为电话时设置链接数据

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
            _linkData.dataSource = newData;
            _linkData.consultName = window.public.lang["whatsappPc"];
            _linkData.dataSource.sourceName = "account";
            _linkData.value = `${window.public.lang["onlineConsulting"]} ${_linkData.consultName}`;
          }

          if (parentData) {
            data.type = "list";
          }

          ; //控件在列表中，添加type=list 用于后台替换列表数据

          Dispatcher.dispatch(`${_this.props.id}_set`, {
            args: [`document_data.dataSource`, data]
          });
          Dispatcher.dispatch(`${_this.props.id}_set`, {
            args: [`document_data.text`, _showText]
          });
          Dispatcher.dispatch(`${_this.props.id}_set`, {
            args: [`document_data.link`, _linkData]
          });

          _this.setState({
            "dataSource": data,
            text: _showText,
            link: _linkData
          });
        }
      });
    });
  }
  /**
   * @method setPictureTab 设置图片面板选项显示隐藏
   * @author wyq
   * @date 2020-12-30
   * @param {string} id 控件id 
   * @param {string} type 控件类型 
   * @param {string} skin 控件皮肤 
   * @param {boolean} hidden 显示或隐藏  
   */


  setPictureTab(id, type, skin, hidden) {
    new AttrProxy().init(type).then(module => {
      //弹出属性面板        
      module.showAttributePanel({
        index: 0,
        reload: true,
        id: "component-property",
        node: {
          current: {
            id,
            skin,
            type
          }
        }
      });
    });
  }
  /**
   * @method  setOverFlowPart 给文本设置显示方式
   * @date 2021-3-2
   * @author sxt
   * @param {string} key 属性名
   * @param {event} e 事件对象
   */


  setOverFlowPart(key, e) {
    let _value = e.target.value;
    this.setState({
      [key]: _value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    }); //类型为自动时，清掉高的属性，反之则加上height属性 sxt 2021-3-4

    if (_value == "automatic") {
      Dispatcher.dispatch(`${this.props.id}_remove`, {
        value: 'component.layout'
      });
    } else {
      this.setState({
        "layout": {
          'height': 6
        }
      });
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`component.layout`, {
          'height': 6
        }]
      });
    }
  }

}

_defineProperty(TextBasicControler, "LIST", ["selectionContentSet", "dataText", "links", "minHeight", "accordingNumber", "overflowPart"]);


export {TextBasicControler}