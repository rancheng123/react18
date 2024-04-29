
// 导入其他模块
import TemplateResource from './template_resource';
import ResourceControler from '../resourceControler';
import Layer from '@/system/widgets/layer';
import Dispatcher from '@/system/tools/dispatcher';


/**
 * @class {TemplateResourceControler} 图片资源面板控制器类
 */
class TemplateResourceControler extends ResourceControler {
  constructor(props) {
    super(props);

    //组件挂载前的初始化方法，整个生命周期内只执行一次
    this.init();

    /**@property {TemplateResource} view 初始化 view 实例*/
    this.view = new TemplateResource(this);

    //给view 入口方法绑定this
    this.view.render = this.view.render.bind(this.view);
    this.ajaxUrl = "/desktop/index.php/Edit/Temp/responseTempList";
  }

  /**
  * @method init 初始化方法
  */
  init() {
    this.tabs = ["wholeClassify", "languageClassify", "hot"];
    //新增语言分类选项和热门选项 
    let innerHeight = window.innerHeight;

    //页面高度  用页面高度去计算,图片显示几列
    let _height = innerHeight - 50 * 2,
      size = parseInt((_height - (54 + 85 + 65 + 32 + 26)) / 148);

    this.state = Object.assign({
      type: "wholeClassify",
      resourceType: "template",
      industry: 0,
      orderBy: 0,
      language: 0,
      size: size,
      page: 1
    }, this.props.initialData);
  }


  /**
  * @method componentDidMount 组件完成挂载 结构已经显示
  */
  componentWillMount() {
    let _type = this.state.type;
    this.change("type", _type);
  }

  /**
   * @method selected 选中方法,
   */
  selectImg(prop) {
    Layer.alert({
      area: ["420px", "225px"],
      skin: "",
      close: true,
      cancel: true,
      ensure: this.getAjaxTemplate.bind(this, prop.id),
      content: window.public.lang["replaceTemplatePrompt"]
    });
  }

  previewBtn(previewurl, event) {
    window.open(previewurl);
    event.stopPropagation();
  }


  /**
   * @method getAjaxPage 切换页面请求方法
   * @param {string} id 当前页面id 
   * @return {object} 当前页面数据
   */
  getAjaxTemplate(id) {
    document.querySelector("#function-modal .layer-close").click();
    Dispatcher.dispatch("hideToolbars");
    let newData = {
      userSiteId: pageData.siteId,
      templateId: id
    };
    return fetch("/desktop/index.php/Edit/Temp/index", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newData)
    }).then(response => response.json()).then(data => {
      if (data.suc == 0) {
        window.public.location.removeHash("pageid");
        location.reload();
      }
    }).catch(error => console.log("Error", error));
  }

  /**
   * @method setTab 设置导航项切换
   * @param {String} key 设置属性名称
   * @param {String} value 设置属性值 
   * @param {e} event 事件对象
   * */
  setTab(key, value, e) {
    let _state = this.state || {};

    this.setState({
      key: ""
    });
    this.change(key, value, e);
  }

  /**
   * @method change 设置公用方法 
   * @param {String} key 设置属性名称
   * @param {String} value 设置属性值 
   * @param {e} event 事件对象
   * */
  change(key, value, e) {
    if (value == undefined) {
      let _target = e.currentTarget;
      value = _target.id || _target.children[0].id;
    }

    let _state = this.state || {};

    let objData = null;

    if (value == "wholeClassify") {
      objData = Object.assign(_state, {
        [key]: value,
        language: 0,
        page: 1
      });
    }

    if (value == "languageClassify") {
      objData = Object.assign(_state, {
        [key]: value,
        industry: 0,
        page: 1
      });
    }

    if (value == "hot") {
      objData = Object.assign(_state, {
        [key]: value,
        industry: 0,
        language: 0,
        page: 1
      });
    }

    objData = Object.assign(_state, {
      [key]: value,
      page: 1,
      key: ""
    });
    super.getResourceList(objData).then(data => {
      if (data) {
        this.setState({
          [key]: value,
          templateList: data.list,
          totalPages: data.page
        });
      }
    });
  }
  /**
   * @method inputChange 搜索框change 
   * @param {String} key 设置属性名称
   * @param {String} value 设置属性值 
   * @param {e} event 事件对象
   * */
  inputChange(key, e) {
    let _value = e.target.value;
    this.setState({
      [key]: _value
    });
  }

  /**
   * @method search 搜索事件
   * */
  search() {
    let _state = this.state || {};

    let objData = Object.assign(_state, {
      page: 1
    });
    super.getResourceList(objData).then(data => {
      if (data) {
        this.setState({
          templateList: data.list,
          totalPages: data.page
        });
      }
    });
  }

}


export { TemplateResourceControler }