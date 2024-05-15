// 导入 React 库
import { Component } from 'react';
import { createRoot } from 'react-dom/client';
// 导入 collection 模块
import Collection from './collection';
// 导入 layer 模块
import Layer from '../../../system/widgets/layer';
// 导入 drag_add 模块
import DragAdd from '../drag_add';

export default class CollectionControler extends Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次
    this.props = props
    this.init();
  }

  static collection(toolBarsRoot) {
    toolBarsRoot.render(<CollectionControler toolBarsclose={() => toolBarsRoot.unmount()} />)
  }

  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    return (
      <Collection toolBarsclose={this.props.toolBarsclose} colists={this.state.colists} controler={this} />
    )
  }

  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */
  init() {
    let colists = "";
    this.state = {
      colists: []
    };
  }

  componentDidMount() {
    // store.subscribe(() => {
    //   this.setState({});
    // });
  }

  componentWillMount() {
    // 模拟获取数据
    const data = localStorage.colistsResp ? JSON.parse(localStorage.colistsResp) : [];
    this.setState({
      colists: data
    })
    // console.log('渲染', dataRespConfig,);
    // localStorage.dataResp = JSON.stringify(localStorage.dataResp);
    // localStorage.colistsResp = JSON.stringify(data);


    // let isLoad = window.public.isCellection;
    // if (!isLoad) {
    //   this.getAjaxList();
    // } else {
    //   if (localStorage.colistsResp) {
    //     let colists = JSON.parse(localStorage.colistsResp);
    //     this.setState({
    //       colists: colists
    //     });
    //   }
    // }
  }

  // close(close) {
  //   this.__proto__.close = close;
  // }

  help() { }


  //获取收藏列表
  getAjaxList() {
    let _collList = {};
    let _last = null;
    fetch("/desktop/index.php/Edit/Collection/getcollist", {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `edition=${localStorage.editionResp}&pagetype=6`
    }).then(response => response.json()).then(data => {
      if (data.suc == 0) {
        window.public.isCellection = true;
        _collList = data.msg;

        if (_collList.colists) {
          localStorage.dataResp = JSON.stringify(_collList.colfield);
          localStorage.colistsResp = JSON.stringify(_collList.colists);
          localStorage.editionResp = _collList.edition;
          this.setState({
            colists: _collList.colists
          });
        } else {
          //请求不成功时，获取缓存的值 
          if (localStorage.colistsResp) {
            let colists = JSON.parse(localStorage.colistsResp);
            this.setState({
              colists: colists
            });
          }
        }
      } else {// Layer.alert({area:["420px","225px"],skin:"",close:true,cancel:true,ensure:true,content:window.public.lnag["addFailed"]})
        //pageSaveTips(Public.lang["failedGetList"]);
      }
    }).catch(error => console.log("Error", error));
  }
  /**
   * @method emptyList 全部清除方法
   */
  emptyList(e) {

    // 模拟清空
    localStorage.dataResp = "";
    localStorage.colistsResp = "";
    localStorage.editionResp = "";
    this.setState({
      colists: ""
    });



    // let _times = new Date().getTime();

    // fetch("/desktop/index.php/Edit/Collection/dels", {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: `edition=${_times}&pagetype=6`
    // }).then(response => response.json()).then(data => {
    //   if (data.suc == 0) {
    //     localStorage.dataResp = "";
    //     localStorage.colistsResp = "";
    //     localStorage.editionResp = "";
    //     this.setState({
    //       colists: ""
    //     });
    //   } else {
    //     Layer.alert({
    //       area: ["420px", "225px"],
    //       skin: "",
    //       close: true,
    //       cancel: true,
    //       ensure: true,
    //       content: window.public.lnag["emptyFailed"]
    //     });
    //   }
    // }).catch(error => console.log("Error", error));
    e.stopPropagation();
  }


  /**
   * @method deleteList 单个清除方法
   * @param {string} id 删除的项id
   * @return {object} 控件数据 
   */
  deleteList(id, e) {

    // 模拟单个删除
    var _list = JSON.parse(localStorage.colistsResp),
      _index = null;

    _list.findIndex(function (e, i) {
      if (e.id == id) {
        _index = i;
      }
    });

    _list.splice(_index, 1);

    this.setState({
      colists: _list
    });
    window.localStorage.colistsResp = JSON.stringify(_list);


    // let _times = new Date().getTime();

    // fetch("/desktop/index.php/Edit/Collection/delcoll", {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: `id=${id}&edition=${_times}`
    // }).then(response => response.json()).then(data => {
    //   if (data.suc == 0) {
    //     localStorage.editionResp = _times;

    //     var _list = JSON.parse(localStorage.colistsResp),
    //       _index = null;

    //     _list.findIndex(function (e, i) {
    //       if (e.id == id) {
    //         _index = i;
    //       }
    //     });

    //     _list.splice(_index, 1);

    //     this.setState({
    //       colists: _list
    //     });
    //     window.localStorage.colistsResp = JSON.stringify(_list);
    //   } else {
    //     Layer.alert({
    //       area: ["420px", "225px"],
    //       skin: "",
    //       close: true,
    //       cancel: true,
    //       ensure: true,
    //       content: window.public.lnag["deleteFailed"]
    //     });
    //   }
    // }).catch(error => console.log("Error", error));
    e.stopPropagation();
  }


  /**
   * @method start 拖拽开始执行方法
   * @param {string} skin 皮肤
   * @param {event} event 事件对象
   */
  start(id, event) {
    this.id = id;
    new DragAdd(this).start(event);
  }


  /**
   * @method getData 获取控件数据
   * @return {object} 控件数据 
   */
  async getData() {

    if (this.id) {
      let data = await JSON.parse(localStorage.dataResp)[this.id];
      console.log(data);
      let structure = data.structure;

      if (structure) {
        //收藏的控件把禁拖属性和禁删属性都去掉 
        delete structure.isDragable;
        delete structure.removable;
      }

      return data;
    }

    return null;
  }

}

