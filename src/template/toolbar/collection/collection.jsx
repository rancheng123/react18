// 导入 React 库
import React from 'react';
// 导入 toolbar 模块
import Toolbar from '../toolbar';
/**
 * @class {Collection} 收藏视图类
 */
export default class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props, 333);
  }
  /**@property {object} state 获取最新的state属性 */


  // get state() {
  //   return this.controler.state;
  // }
  /**@property {object} props 获取最新的props属性 */


  // get props() {
  //   return this.controler.props;
  // }
  /**
  * @method render 挂载组件方法
  * @return {object} 待渲染的组件对象
  */
  render() {
    return (
      <>
        <Toolbar title={window.public.lang["collection"]} close={() => this.props.toolBarsclose()}>
          {this.content()}
        </Toolbar>
      </>
    )
  }


  /**
   * @method close 关闭方法
   */
  close() {
    Toolbar.close(this.props);
  }

  /**
    * @method menus 工具库内容项
    * @return {object} 工具库内容项结构
  */
  content() {
    console.log('生成', this.props);
    //let {controlType} = this.state,{tabs,group} = data.group[controlType];
    // let state = this.state || {},
    //   colists = state.colists;

    let colists = this.props.colists;

    if (colists && colists.length) {
      return (
        <div>
          <div className="toolCollect">
            <ul>
              {colists.map((e, i) => {
                return (
                  <li key={e.id} data-id={e.id}>
                    <p onMouseDown={this.props.controler.start.bind(this.props.controler, e.id)}>
                      <span>{e.title}</span>
                      <i onClick={this.props.controler.deleteList.bind(this.props.controler, e.id)} className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe797;' }}></i>
                    </p>
                    <div style={{ height: '34px', background: '#F2F2F3', textAlign: 'center', lineHeight: "34px" }}>
                      占位图
                    </div>
                    {/* <a onClick={this.props.controler.deleteList.bind(this.props.controler, e.id)} className="yscIcon yiyingbaoicon">
                      {"\uE808"}
                    </a> */}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="panlBottom">
            <button className="contorlBtn" onClick={this.props.controler.emptyList.bind(this.props.controler)}>
              <font>{window.public.lang["emptyAll"]}</font>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div id='toolText'>
          <div className="toolCollEmpty"></div>
        </div>
      );
    }

  }

}

