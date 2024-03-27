
// 导入 dispatcher 模块
import Dispatcher from '../../system/tools/dispatcher';


/**
 * @class PageControler 页面设置控制器类
 * @date 2020-04-11
 * @author wyq
 */

const Page = {
  /**
   * @method exec 执行命令
   * @date 2020-06-10
   * @author wyq
   */
  exec() {
    console.command = str => {
      str && this[str] && this[str]();
      console.log('%c老%c王%c好%c帅', 'color:#4284f4;', 'color:#ea4335;', 'color:#fbbc04;', 'color:#4284f4;');
    };
  },

  /**
   * @method set 设置数据
   * @date 2020-06-10
   * @author wyq
   */
  set() {
    const iframeData = Dispatcher.dispatch('document_get');
    const {
      component: {
        children: [header, content, footer]
      },
      data: {
        theme_data = {}
      }
    } = iframeData;
    const {
      component: page
    } = Dispatcher.dispatch(`${content.pageId}_get`);
    const value = theme_data.document.style.w1920u,
          num = value + value;
    const componentList = [].concat(header.components, page.components, footer.components); //循环数组

    componentList.forEach(e => {
      //控件是否是一行多列
      if (e.componentType == 'em-Component') {
        const {
          data: {
            theme_data: {
              style = {}
            }
          }
        } = Dispatcher.dispatch(`${e.id}_get`); //如果paddingLeft不存在或等于零，则转换为自动边距

        if (style.paddingLeft == undefined || style.paddingLeft == 0) {
          //计算宽度
          const width = this.calcWidth(e.id, value, value); //设置页面边距

          Dispatcher.dispatch(`${e.id}_set`, {
            args: ['theme_data.style.', {
              paddingLeft: value,
              paddingLeftUnit: '%',
              media_paddingLeft: `calc((100% - ${width}px) / ${num} * ${value})`,
              paddingRight: value,
              paddingRightUnit: '%',
              media_paddingRight: `calc((100% - ${width}px) / ${num} * ${value})`
            }]
          });
        }
      }
    });
  },

  /**
   * @method clear 清空数据
   * @date 2020-06-10
   * @author wyq
   */
  clear() {
    Dispatcher.dispatch('document_remove', {
      value: 'theme_data.document'
    });
  },

  /**
   * @method calcWidth 计算控件宽度
   * @date 2020-05-15
   * @author wyq
   * @param {numbe} value1 边距值
   * @param {number} value2 边距值
   * @return {number} 计算后的宽度
   */
  calcWidth(id, value1, value2) {
    //获取控件元素
    const component = window.public.dom.querySelector(`#${id}`); //获取控件宽度

    const width = component.offsetWidth;
    const cwidth = width - (width * (value1 / 100) + width * (value2 / 100)); //修改控件宽度

    Dispatcher.dispatch(`${id}_set`, {
      args: ['component.layout.width', width]
    }); //返回控件宽度

    return cwidth;
  }

};

export default Page;

//# sourceURL=webpack:///./ui/toolbar/set_up/page.js?