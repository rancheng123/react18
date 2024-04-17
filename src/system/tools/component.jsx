import React from 'react';
import dataManager from './data/data_manager'

/**
 * @function 组件包装器
 * @date 2019-09-21
 
 * @param {object} View 视图对象 
 * @param {object} Controler 控制器对象 
 * @return {class} 包装后的类
 */

function ComponentDecorator(View, Controler) {
  if (!View) {
    return null;
  }

  const str = View.toString(),
        type = str.slice(0, str.indexOf(" "));
  /**
   * @class {Component} 组件类
   
   * @version 1.0
   * @date 2019-09-18
   */

  return class Component extends React.Component {
    constructor(props) {
      super(props);
      const attribute = {
        state: {
          get: () => {
            return this.state;
          }
        },
        props: {
          get: () => {
            return this.props;
          }
        }
      }; //获取数据处理对象

      this.data = dataManager(props.component.documentType); //是否传入控制器，传入实例化控制器

      if (typeof Controler === "function") {
        this.controler = new Controler(this); //设置getter属性 state、props 

        Object.defineProperties(this.controler, attribute);
      }
      /**@property {Component} view 初始化 view 实例*/


      this.view = type == "class" ? new View() : {
        render: View
      }; //设置getter属性 state、props 

      Object.defineProperties(this.view, attribute); //给view 入口方法绑定this

      this.view.render = this.view.render.bind(this.view); //组件挂载前的初始化方法，整个生命周期内只执行一次

      this.init();
    }
    /**
     * @method render 挂载组件方法
     * @date 2019-09-18
     
     * @return {object} 待渲染的组件对象
     */


    render() {
      return React.createElement(this.view.render, null);
    }
    /**
     * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
     * @date 2019-09-18
     
     */


    init() {
      this.state = {
        component: this.props.component,
        data: this.props.data
      };
      this.controler && this.controler.init && this.controler.init();
    }
    /**
     * @method componentDidMount 组件渲染后执行，整个声明周期内只执行一次
     * @date 2019-09-18
     
     */


    componentDidMount() {
      this.data.install(this);
      this.controler && this.controler.componentDidMount && this.controler.componentDidMount();
    }

    componentDidUpdate() {
      this.controler && this.controler.componentDidUpdate && this.controler.componentDidUpdate();
    }
    /**
     * @method componentWillUnmount 组件卸载后执行
     * @date 2019-09-18
     
     */


    componentWillUnmount() {
      this.data.uninstall(this);
      this.controler && this.controler.componentWillUnmount && this.controler.componentWillUnmount();
    }

  };
}

export default ComponentDecorator;
