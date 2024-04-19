
// 导入 React 库
import React from "react";
// 导入 react-dom 库
import ReactDOM from "react-dom";
// 导入 Background 组件
import Background from "./background";
// 导入 dispatcher 模块
import Dispatcher from "@/system/tools/dispatcher";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * @class {BackgroundControler} 背景控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */

class BackgroundControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Link} view 初始化 view 实例*/

    this.view = new Background(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  static background(opts) {
    const {
      group,
      node,
      element,
      prefix
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      const BackgroundControler = this;
      let list = this.LIST;

      if (group) {
        list = window.public.configure(this.LIST, group);
      }

      ReactDOM.render(React.createElement(BackgroundControler, {
        id: opts.id || node.current.id,
        node: node,
        prefix: prefix,
        list: list
      }), element);
    }
  }

  render() {
    return React.createElement(this.view.render, null);
  }

  init() {
    const {
      data: {
        theme_data
      },
      component
    } = Dispatcher.dispatch(`${this.props.id}_get`);
    this.state = {}; //theme_data数据存在并且存在style数据，则与state合并

    if (theme_data) {
      var _theme_data$style, _theme_data$backgroun;

      const style = (_theme_data$style = theme_data.style) !== null && _theme_data$style !== void 0 ? _theme_data$style : {},
            prefix = this.props.prefix,
            key = `${prefix}bgColor`;
      this.state = {
        bgColor: style.bgColor,
        LinearGradient: style.LinearGradient,
        hoverLinearGradient: style.hoverLinearGradient,
        clickLinearGradient: style.clickLinearGradient,
        componentType: component.componentType,
        isWebp: theme_data.isWebp,
        [key]: style[key],
        ...((_theme_data$backgroun = theme_data.background) !== null && _theme_data$backgroun !== void 0 ? _theme_data$backgroun : {})
      };
    }
  }
  /**
   * @method set 设置颜色
   * @author sxt 
   * @param {string} key 键值
   * @param {string} value 属性值
   */


  set(key, value) {
    //更新面板ui 
    if (typeof value == 'string' && value.indexOf('linear-gradient') > -1) {
      if (key == 'hoverbgColor') {
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.style.hoverLinearGradient`, value]
        });
        this.setState({
          'hoverLinearGradient': value
        });
      } else if (key == 'clicktextColor') {
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.style.clickLinearGradient`, value]
        });
        this.setState({
          'clickLinearGradient': value
        });
      } else {
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.style.LinearGradient`, value]
        });
        this.setState({
          'LinearGradient': value
        });
      }

      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.${key}`, '']
      });
    } else {
      if (key == 'hoverbgColor') {
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.style.hoverLinearGradient`, '']
        });
        this.setState({
          'hoverLinearGradient': ''
        });
      } else if (key == 'clicktextColor') {
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.style.clickLinearGradient`, '']
        });
        this.setState({
          'clickLinearGradient': ''
        });
      } else {
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.style.LinearGradient`, '']
        });
        this.setState({
          'LinearGradient': ''
        });
      }

      this.setState({
        [key]: value
      });
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.${key}`, value]
      });
    }
  }
  /**
   * @method setOpacity
   * @date 2019-12-16
   */


  setOpacity(event) {
    const {
      value
    } = event.target;
    const prefix = this.props.prefix;
    this.setState({
      [`${prefix}opacity`]: value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.background.${prefix}opacity`, value]
    });
  }
  /**
   * @method changeBackgroundColor 
   * @date 2019-12-16
   */


  setImageColor(color) {
    const prefix = this.props.prefix;
    this.setState({
      [`${prefix}bgColor`]: color
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.background.${prefix}bgColor`, color]
    });
  }
  /**
   * @method selectShowMode
   * @date 2019-12-16
   */


  selectShowMode(event) {
    const {
      value
    } = event.target;
    const prefix = this.props.prefix;
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.background.${prefix}positionMode`, value]
    });
    this.setState({
      [`${prefix}positionMode`]: value
    });
  }
  /**
   * @method selectPositionMode
   * @date 2019-12-16
   */


  selectPositionMode(event) {
    const {
      value
    } = event.target;
    const prefix = this.props.prefix;
    this.setState({
      [`${prefix}attachment`]: value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.background.${prefix}attachment`, value]
    });
  }
  /**
   * @method positionSet
   * @date 2019-12-16
   */


  positionSet(position) {
    const prefix = this.props.prefix;
    this.setState({
      [`${prefix}posVal`]: position
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.background.${prefix}posVal`, position]
    });
  }
  /**
   * @method setOriginal 设置质量方法
   * @date 2019-11-7
   * @author sxt
   * @param {string} key 键值
   * @param {event} event 事件对象
   */


  setQuality(key, event) {
    let value = event.target.value; // let preix = window.public.type

    key = this.props.prefix + key; //拼上当前的类型，区分设计和设置 sxt 2021-1-16

    let imgQualityKey = this.props.prefix + 'imgQuality'; //想要区分设计和设置时，要加上前缀再设置数据 sxt 2021-1-16

    let imgQuality = '';
    let uri = this.state[`uri`];
    let prefixQuality = "@!w"; //质量前缀，默认为w，只有图片格式为jpg时，拼jw sxt 2021-8-20

    if (uri.indexOf(".jpg") != -1) {
      prefixQuality = "@!jw";
    }

    if (value != 'original') {
      imgQuality = `${prefixQuality}${value}`;
    }

    this.setState({
      [key]: value,
      [imgQualityKey]: imgQuality
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.background.`, {
        [key]: value,
        [imgQualityKey]: imgQuality
      }]
    });
    this.getDataSize(uri + this.state[imgQualityKey]).then(data => data && this.setState({
      dataSize: data
    }));
  }
  /**
   * @method getDataSize ajax返回图片size
   * @author sxt
   */


  getDataSize(uri) {
    return fetch(`/index.php/webdesign/getImgSize?imgsrc=${uri}&u_siteID=${window.pageData.siteId}`, {
      method: 'GET' // credentials: 'same-origin',
      // body: JSON.stringify({ imgsrc: uri, u_siteID: window.pageData.siteId || "6e495b26f1bff3757f963934bfabc56b" }),

    }).then(response => response.json()).then(data => data ? data : "").catch(err => console.log("Oh, error", err));
  }
  /**
   * @method showSource 展示资源库
   * @author wyq
   * @date 2022-02-23
   * @param {string} type 资源类型
   */


  showSource(type) {
    __webpack_require__.e(/*! import() */ "resource_manager").then(__webpack_require__.bind(null, /*! ../../../../../system/function/resource/resource_manager */ "./system/function/resource/resource_manager.js")).then(({
      resourceManager
    }) => resourceManager(type)).then(module => module.resource({
      selected: this[type].bind(this)
    }));
  }
  /**
   * @method image 更换图片方法
   * @author wyq
   * @date 2022-02-23
   * @param {object} param0 存放图片路径资源的对象 
   */


  image({
    ima_path
  }) {
    const prefix = this.props.prefix; //判断数据类型是否是图片类型

    if (this.state[`${prefix}type`] == 'Image') {
      this.setState({
        [`${prefix}uri`]: ima_path
      });
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.background.${prefix}uri`, ima_path]
      });
    } else {
      this.setBackgroundData({
        [`${prefix}uri`]: ima_path,
        [`${prefix}type`]: 'Image'
      });
    }

    Dispatcher.dispatch(`${this.props.id}_set`, {
      value: {
        load: true
      }
    });
  }
  /**
   * @method video 更换视频方法
   * @author wyq
   * @date 2022-02-23
   * @param {object} param0 存放视频路径资源的对象 
   */


  video({
    videoUrl
  }) {
    const prefix = this.props.prefix;

    if (this.state[`${prefix}type`] == 'video') {
      this.setState({
        [`${prefix}uri`]: videoUrl
      });
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.background.${prefix}uri`, videoUrl]
      });
    } else {
      this.setBackgroundData({
        [`${prefix}uri`]: videoUrl !== null && videoUrl !== void 0 ? videoUrl : '',
        [`${prefix}type`]: 'video'
      });
    }

    Dispatcher.dispatch(`${this.props.id}_set`, {
      value: {
        uri: videoUrl
      }
    });
  }
  /**
   * @method color 更换背景色方法
   * @author wyq
   * @date 2022-02-22
   * @param {string} bgColor 背景色 
   */


  color(bgColor, colorTypeOption) {
    const prefix = this.props.prefix;

    if (this.state[`${prefix}type`] == 'BackgroundColor') {
      if (bgColor.indexOf('linear-gradient') > -1) {
        this.setState({
          [`${prefix}LinearGradient`]: bgColor
        });
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.background.${prefix}LinearGradient`, bgColor]
        });
        this.setState({
          [`${prefix}bgColor`]: ''
        });
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.background.${prefix}bgColor`, '']
        });

        if (colorTypeOption == true) {
          var bgArrowsColor = (bgColor.split(',')[1] + ',' + bgColor.split(',')[2] + ',' + bgColor.split(',')[3] + ',' + bgColor.split(',')[4]).split(' ')[0];
          Dispatcher.dispatch(`${this.props.id}_set`, {
            args: [`theme_data.background.${prefix}bgArrowsColor`, bgArrowsColor]
          });
          this.setState({
            [`${prefix}bgArrowsColor`]: bgArrowsColor
          });
        }
      } else {
        this.setState({
          [`${prefix}bgColor`]: bgColor
        });
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.background.${prefix}bgColor`, bgColor]
        });
        this.setState({
          [`${prefix}LinearGradient`]: ''
        });
        Dispatcher.dispatch(`${this.props.id}_set`, {
          args: [`theme_data.background.${prefix}LinearGradient`, '']
        });

        if (colorTypeOption == true) {
          this.setState({
            [`${prefix}bgArrowsColor`]: bgColor
          });
          Dispatcher.dispatch(`${this.props.id}_set`, {
            args: [`theme_data.background.${prefix}bgArrowsColor`, bgColor]
          });
        }
      }
    } else {
      if (bgColor.indexOf('linear-gradient') > -1) {
        // this.setState({[`${prefix}bgColor`]:''})
        if (colorTypeOption == true) {
          var bgArrowsColor = (bgColor.split(',')[1] + ',' + bgColor.split(',')[2] + ',' + bgColor.split(',')[3] + ',' + bgColor.split(',')[4]).split(' ')[0];
          this.setBackgroundData({
            [`${prefix}LinearGradient`]: bgColor,
            [`${prefix}bgArrowsColor`]: bgArrowsColor,
            [`${prefix}type`]: 'BackgroundColor'
          });
        } else {
          this.setBackgroundData({
            [`${prefix}LinearGradient`]: bgColor,
            [`${prefix}type`]: 'BackgroundColor'
          });
        }
      } else {
        this.setBackgroundData({
          [`${prefix}bgColor`]: bgColor,
          [`${prefix}type`]: 'BackgroundColor'
        });
      }
    }

    Dispatcher.dispatch(`${this.props.id}_set`, {
      value: {
        load: true
      }
    });
  }
  /**
   * @method clear 清除背景数据
   * @author wyq
   * @date 2022-02-23
   */


  clear() {
    const prefix = this.props.prefix;
    let data = {
      [`${prefix}type`]: "",
      [`${prefix}uri`]: "",
      [`${prefix}bgColor`]: ""
    }; //如果存在键名，执行循环

    Object.keys(this.state).forEach(key => {
      //根据条件进行赋值
      if (prefix == '' && key.indexOf('mo') != -1 || prefix == 'mo' && key.indexOf('mo') == -1) {
        data[key] = this.state[key];
      }
    });
    this.setState(data);
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.background`, data]
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      value: {
        load: true
      }
    });
  }
  /**
   * @method setBackgroundData 设置背景数据
   * @author wyq
   * @date 2022-02-23
   * @param {object} data 背景数据 
   */


  setBackgroundData(data) {
    let stateData = {}; //循环数据

    Object.keys(this.state).forEach(e => {
      const key = this.props.prefix == '' ? e.indexOf('mo') != -1 && e : e.indexOf('mo') == -1 && e; //为存在地值进行赋值

      if (key && this.state[key]) {
        data[key] = this.state[key];
      } //
      else if (this.state[e]) {
          stateData[e] = undefined;
        }
    });
    this.setState({ ...stateData,
      ...data
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.background`, data]
    });
  }
  /**
  * @method setImgWebp 设置图片webp开关
  * @date 2022-4-19
  * @author sxt
  * @param {string} key 键值
  * @param {event} event 事件对象
  */


  setImgWebp(key, event) {
    let value = event.target.value == "true" ? true : false;
    this.setState({
      [key]: value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.${key}`, value]
    });
    this.setState({
      [key]: value
    });
  }

}

_defineProperty(BackgroundControler, "LIST", ["backgroundColor"]);

export { BackgroundControler }; 