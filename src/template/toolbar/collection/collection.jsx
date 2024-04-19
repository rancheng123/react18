// 导入 React 库
import React from 'react';
// 导入 toolbar 模块
import Toolbar from '../toolbar';

/**
 * @class {Collection} 收藏视图类
 * @author sxt 
 * @date  2020-2-12
 */

export default class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

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
      * @date 2019-09-25
      * @author sxt
      * @return {object} 待渲染的组件对象
      */


  render() {
    return (
      <>
        <Toolbar title={ window.public.lang["collection"]}  close={()=> this.props.toolBarsclose()}>
            {this.content()}
        </Toolbar>
      </>
    )
  }
  /**
   * @method close 关闭方法
   * @date 2019-12-05
   * @author wyq
   */


  close() {
    Toolbar.close(this.props);
  }
  /**
      * @method menus 工具库内容项
      * @date 2019-09-25
      * @author sxt
      * @return {object} 工具库内容项结构
      */


  content() {
    //let {controlType} = this.state,{tabs,group} = data.group[controlType];
    let state = this.state || {},
        colists = state.colists;

    if (colists && colists.length) {
      return (
        <div>
          <div className="toolCollect">
            <ul>
              {colists.map((e, i) => {
                return (
                  <li key={e.id} data-id={e.id}>
                    <p onMouseDown={this.controler.start.bind(this.controler, e.id)}>
                      {e.title}
                    </p>
                    <a onClick={this.controler.deleteList.bind(this.controler, e.id)} className="yscIcon yiyingbaoicon">
                      {"\uE808"}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="panlBottom">
            <button className="contorlBtn" onClick={this.controler.emptyList.bind(this.controler)}>
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
