// 导入 layer 模块
import Layer from '../../system/widgets/layer';
// 导入系统工具中的 drag 模块
import Drag from '../../system/tools/drag';
// 导入页面属性代理组件
import AttrProxy from '@/components/page/attr_proxy';

/**
 * @class DragAdd 拖拽新增实例 封装拖拽新增算法
 * @date 2020-02-18
 * @author wyq
 */

export default class DragAdd {
  constructor(component) {
    this.component = component;
  }
  /**
  * @method componentMask 控件遮罩层
  * @date 2019-10-22
  * @author wyq
  * @param {Element} element 要追加节点元素的父级节点对象
  * @param {number} left 遮罩层距离视图左侧的距离
  * @param {number} top 遮罩层距离视图顶部的距离
  * @param {number} width 遮罩层的宽度
  * @param {number} height 遮罩层的高度
  */


  componentMask(element, left, top, width, height) {
    const last = element.lastChild; //判断参数长度，决定是追加操作还是删除操作

    if (arguments.length > 1) {
      const css = `width:${width}px;height:${height}px;top:${top}px;left:${left}px;`; //判断是否存在此元素，存在此元素则直接更新坐标

      if (last.id == "component-mask") {
        last.style.cssText = css;
      } else {
        const div = document.createElement("div"); //隐藏蒙层

        document.querySelector('#selected-mask').style.opacity = 0;
        div.id = "component-mask", div.style.cssText = css; //追加元素

        element.appendChild(div);
      }
    } //如果存在此元素，则执行删除操作
    else {
      //还原蒙层
      document.querySelector('#selected-mask').style.opacity = '';
      last.id == "component-mask" && last.remove();
    }
  }
  /**
   * @method start 拖拽开始执行方法
   * @date 2019-10-22
   * @author wyq
   * @param {event} event 事件对象
   */


  start(event) {
    try {
      const {
        currentTarget: target,
        clientX,
        clientY
      } = event,
        {
          left,
          top,
          width,
          height
        } = target.getBoundingClientRect();
      let opts = {
        main: target.closest("#ediMain"),
        left: clientX - left,
        top: clientY - top,
        width: width,
        height: height,
        isdrag: true,
        bounding: target.closest("#ediTool").offsetLeft
      };
      document.onmousemove = this.drag.bind(this, opts);
      document.onmouseup = this.end.bind(this, opts);
    } catch (error) {
      console.error(error.message);
    }

    event.stopPropagation();
  }
  /**
   * @method drag 拖拽进行中
   * @date 2019-10-22
   * @author wyq
   * @param {object} opts 参数列表 
   * @param {event} event 事件对象 
   */


  drag(opts, event) {
    const {
      left: x,
      top: y,
      width,
      height,
      bounding,
      main
    } = opts;
    let left = event.clientX - x,
      top = event.clientY - y - main.offsetTop;
    if (!opts.component) {
      //关闭面板
      // this.component.view.close(); 
      this.component.view ? this.component.view.close() : this.component.props.toolBarsclose();

      //获取控件数据  
      this.component.getData().then(component => opts.component = component);
    } else {
      //控件是否允许拖入
      if (this.isDragIn(opts.component)) {
        const {
          component: {
            structure,
            component = structure
          }
        } = opts;
        let type = component.combinationType || component.componentType; //先获取combinationType的属性，此属性存在证明是组件库中的控件，是不允许嵌套的，sxt 2021-2-2

        //生成控件遮罩层
        this.componentMask(main, left, top, width, height, bounding);

        Drag.drag(left, top, {
          width,
          height,
          isApply: component.isApply,
          type: type
        });
      } else {
        opts.isdrag && this.noDragPrompt();
        opts.isdrag = false;
      }
    }
  }
  /**
   * @method end 拖拽结束
   * @date 2019-10-22
   * @author wyq
   * @param {object} opts 参数对象 
   * @param {event} event 事件对象
   */


  async end(opts, event) {
    //try 
    try {
      const {
        currentTarget: target
      } = event; //清除move与up事件

      target.onmousemove = target.onmouseup = null;

      //如果不允许拖入，直接返回，不再执行后续逻辑
      if (opts.isdrag != true) {
        this.noDragPrompt('close');
        return void 0;
      } //卸载遮罩层


      this.componentMask(opts.main);

      if (opts.component) {
        const {
          component: {
            structure,
            component = structure
          }
        } = opts;
        const proxy = await new AttrProxy().init(component.componentType);

        //生成时间
        const time = new Date().toLocaleString('zh-cn', {
          hour12: false
        });

        //记录拖入时间 wyq change 2020-10-26
        opts.component.structure.drag_in_time = time;

        //控件新增之前执行
        proxy.addComponentBefore(opts.component);

        //如果新增成功，执行回调
        const promise = Drag.end(event, opts.component);

        //如果promise为true，表示新增成功，执行新增成功回调方法
        if (promise) {
          promise.then(id => proxy.addedComponent(id));
        }
      }
    } catch (e) {
      console.error(e.message);
      console.info(e.stack);
    }
  }
  /**
   * @method isDragIn 是否允许拖入提示
   * @author wyq
   * @date 2021-10-8
   * @param {object} component 控件数据
   * @returns {boolean} 是否允许拖入。true 允许 false 不允许
   */


  isDragIn(component) {
    const componentType = component.structure.componentType; //判断是否是翻屏控件

    if (componentType == 'em-Flipper') {
      const element = window.public.dom.querySelector(`[data-type='${componentType}']`); //页面中是否已经存在翻屏控件，存在返回false

      if (element != null) {
        return false;
      }
    } //默认返回true


    return true;
  }
  /**
   * @method noDragPrompt 禁拖提示
   * @author wyq
   * @date 2021-10-8
   */


  noDragPrompt(action) {
    //是否存在action，存在值为close，执行关闭操作，只不存在，执行弹出提示操作。
    if (action != 'close') {
      //弹出提示框
      Layer.alert({
        area: ["350px", "230px"],
        icon: 'warn',
        close: true,
        ensure: true,
        content: window.public.lang.noDragPrompt
      });
    } else {
      //获取提示框关闭按钮节点对象
      const closeBtn = document.querySelector("#info-prompt .layer-close"); //存在关闭按钮节点对象则执行关闭提示框操作

      closeBtn && closeBtn.click();
    }
  }

}
