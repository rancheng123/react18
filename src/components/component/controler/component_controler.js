import Dispatcher from '@/system/tools/dispatcher'
export default  class ComponentControler {
  constructor(component) {
    this.component = component;
  }
  /**
   * @method calcWidth 计算控件宽度
   * @date 2020-05-15
   * @author wyq
   * @param {numbe} value1 边距值
   * @param {number} value2 边距值
   * @return {number} 计算后的宽度
   */


  calcWidth(value1, value2, id) {
    //获取控件元素
    const component = window.public.dom.querySelector(`#${id}`); //获取控件宽度

    const width = component.offsetWidth;
    console.log(width, "计算宽度");
    const cwidth = width - (width * (value1 / 100) + width * (value2 / 100));

    if (width > 961) {
      //修改控件宽度
      Dispatcher.dispatch(`${id}_set`, {
        args: ['component.layout.width', width]
      });
    } //返回控件宽度


    return cwidth;
  }
  /**
   * @method componentDidMount 加载之前执行方法
   * @date 2019-12-09
   * @author sxt 
   */


  componentDidMount() {
    var _this$state$data$them;

    let id = this.state.component.id;
    let autoWidth = this.state.component.autoWidth;
    let style = ((_this$state$data$them = this.state.data.theme_data) === null || _this$state$data$them === void 0 ? void 0 : _this$state$data$them.style) || {};

    try {
      if (window.public.type == 'pc') {
        var _window, _window$pageData;

        let paddingRight = style["paddingRight"] || 0,
            paddingLeft = style["paddingLeft"] || 0;
        let siteId = (_window = window) === null || _window === void 0 ? void 0 : (_window$pageData = _window.pageData) === null || _window$pageData === void 0 ? void 0 : _window$pageData.siteId,
            isShow = true; //这个用户先不用计算宽度

        if (siteId == "11d0df1f4fd25c5c81578c9c100e3825") {
          isShow = false;
        } //autoWidth存在时，只有单位是%的时候，才走算法。


        if (isShow && paddingLeft > 0 && paddingRight > 0 && style['paddingRightUnit'] == '%' && style['paddingLeftUnit'] == '%') {
          var element = window.public.dom.querySelector(`#${id}`);
          var parent = element.parentNode,
              isTrue = false; // 获取父元素  

          if (parent && parent.classList && parent.classList.contains('auto-margin')) {
            isTrue = true;
          }

          if (isTrue) {
            //计算控件宽度 
            const cwidth = this.calcWidth(paddingLeft, paddingRight, id);
            let param = {};
            let num = paddingRight + paddingLeft;
            param[`media_paddingRight`] = `calc((100% - ${cwidth}px) / ${num} * ${paddingRight})`;
            param[`media_paddingLeft`] = `calc((100% - ${cwidth}px) / ${num} * ${paddingLeft})`;

            if (cwidth > 961) {
              //修改控件边距
              Dispatcher.dispatch(`${id}_set`, {
                args: ['theme_data.style.', param]
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error, "报错了");
    }
  }

}
