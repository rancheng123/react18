
// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '../../util/util';


/**
 * @class {Page} 页面视图类
 */
export default class Page {
  constructor() {
    this.style = this.style.bind(this);
    this.fontStyle = this.fontStyle.bind(this);
  }

  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    let {
      state: {
        hidden,
        component: {
          documentType,
          children
        },
        data
      },
      props: {
        pages
      }
    } = this;
    let components = children.concat([]),
      pid = Util.pid,
      page = pages[pid];

    if (hidden == undefined) {
      hidden = page.data.document_data[pid].hidden;
    }

    if (/top/.test(hidden)) {
      components.splice(0, 1);
    }

    if (/bottom/.test(hidden)) {
      components.splice(3, 1);
    }

    if (/all/.test(hidden)) {
      components.splice(0, 1);
      components.splice(2, 1);
    }

    // return React.createElement("div", {
    //   id: documentType
    // }, React.createElement(this.style, {
    //   pid: pid
    // }), React.createElement("div", {
    //   className: "document-bg"
    // }), React.createElement(this.fontStyle, {
    //   pid: pid
    // }), React.createElement(Util.children, {
    //   components: components,
    //   data: data,
    //   page: page
    // }));

    return (
      <div id={documentType}>
        <this.style pid={pid} />
        <div className="document-bg" />
        <this.fontStyle pid={pid} />
        <Util.children components={components} data={data} page={page} />
      </div>
    )

  }
  /**
   * @method style 页面样式
   * @param {object} props 参数对象
   * @param {string} props.pid 页面id
   * @return {object} 样式结构
   */
  style(props) {
    const {
      state: {
        component: {
          documentType: id
        },
        data: {
          design_data,
          theme_data
        }
      }
    } = this; //判断design_data数据是否存在

    if (design_data) {
      const background = design_data[props.pid]; //判断是否存在对应background数据

      if (background) {
        const {
          bgColor,
          uri,
          imgQuality = '',
          positionMode = '',
          posVal,
          attachment,
          opacity,
          quality,
        } = background;
        // return React.createElement("style", {
        //   id: `${id}_style`
        // }, `.${id}-bg{
        //     ${bgColor ? `background-color:${bgColor};` : ''}
        //     ${uri ? `background:url(${uri + imgQuality}) ${positionMode};` : ''}
        //     ${posVal ? `background-position:${posVal};` : ''}
        //     ${attachment ? `background-attachment:${attachment};` : ''}
        //     ${opacity ? `opacity:${opacity};` : ''}
        // }`);
        // TODO 图片质量的实现目前通过设置bakground-size来实现的
        return (
          <style id={`${id}_style`}>
            {`.${id}-bg{
              ${bgColor ? `background-color:${bgColor};` : ''}
              ${uri ? `background:url(${uri}) ${positionMode};` : ''}
              ${posVal ? `background-position:${posVal};` : ''}
              ${attachment ? `background-attachment:${attachment};` : ''}
              ${opacity ? `opacity:${opacity};` : ''}
              ${quality ? `background-size:${quality}px auto` : ''}
          }`}
          </style>
        )
      }

      return null;
    }

    return null;
  }

  fontStyle() {
    const {
      state: {
        component: {
          documentType: id
        },
        data: {
          theme_data
        }
      }
    } = this;

    if (theme_data) {
      const {
        SITE_HEADER: {
          style: {
            fontPageFamily
          }
        }
      } = theme_data;

      if (fontPageFamily) {
        return React.createElement("style", {
          id: `${id}_fontAllPageStyle`
        }, `
               .container {
                ${fontPageFamily ? `font-family:${fontPageFamily}` : ''}
               }
               #SITE_FOOTER {
                ${fontPageFamily ? `font-family:${fontPageFamily}` : ''}
               }

               #SITE_HEADER {
                ${fontPageFamily ? `font-family:${fontPageFamily}` : ''}
               }
               `);
      }

      return null;
    }

    return null;
  }

}
