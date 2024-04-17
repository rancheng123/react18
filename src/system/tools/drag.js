import Dispatcher from "./dispatcher";

let range = null,
  point = "";
const Drag = {
  /**@property {string} id  当前占位的父级id*/
  id: "",

  /**@property {string} prevId 上一个占位的父级id */
  prevId: "",

  /**@property {number} index 当前占位所在位置的索引*/
  index: undefined,

  /**@property {string} name 父级容器的控件类型*/
  name: "",

  /**@property {string} seatId 占位符id*/
  seatId: "",

  /**@property {boolean} isApply 标识控件是否应用到所有页面的 */
  isApply: false,

  /**@property {number} height 占位符高度 */
  height: 55,

  /**@property {string} display 标识控件是显示还是隐藏 默认显示 */
  display: "block",

  /**@property {string} insertStatus 控件插入状态 */
  insertStatus: "",

  /** 是否是当前选中组件在同一个位置, 用于解决出现占位符，其实控件位置没变的问题 */
  isHasComponentExist: false,

  /**
   * @proeprty {object} uninserts 禁止插入控件配置
   * @description in:允许插入的控件类型 ex：禁止插入的控件类型  name:ex 和 in的作用范围仅限于本身。 root:ex 和 in的作用范围不只限于本身，还包括其子级容器:
   * */
  //"combinationType":"Combination",
  inserts: {
    "em-Header": {
      in: /Component|List|SlideShow|Combination/,
      name: "em-Header",
    },
    "em-PageContent": {
      in: /Component|List|SlideShow|Flipper|Sidebar|Combination/,
      name: "em-PageContent",
    },
    "em-Footer": {
      in: /Component|List|SlideShow|Combination/,
      name: "em-Footer",
    },
    "em-List": {
      root: true,
      unable: true,
      in: /Text|Button|Image|Datetime|Box|Line|Component/,
    },
    "em-Lightbox": {
      root: true,
      ex: /Lightbox|Flipper/,
    },
    "em-Flipper": {
      root: true,
      ex: /Flipper|Sidebar/,
    },
    "em-Component": {
      root: true,
      ex: /Flipper|Sidebar|Combination/,
    },
    "em-Column": {
      root: true,
      ex: /Flipper|Sidebar|Combination/,
    },
    "em-Box": {
      root: true,
      ex: /Flipper|Sidebar|Combination/,
    },
  },

  /**@property {object} seat 占位数据 */
  get seat() {
    var _window$public$getNam;

    return {
      structure: {
        type: "Placeholder",
        componentType: "em-Text",
        skin: "text.title.s36.36",
      },
      data: {
        text: `添加到${
          (_window$public$getNam = window.public.getName(this.insertName)) !==
            null && _window$public$getNam !== void 0
            ? _window$public$getNam
            : "这里"
        }`,
      },
      style: {
        skin: "text.title.s36.36",
        style: {
          borWidth: 1,
          borStyle: "dashed",
          borColor: "rgb(202, 202, 202)",
          bgColor: "rgba(244, 247, 252)",
          textAlign: "center",
          lineHeight: 5,
          seatTransition: "line-height 0.15s ease",
        },
      },
    };
  },

  /**
   * @method setRange 设置插入范围
   * @date 2020-07-25
   
   * @param {string} exp 一个或多个控件类型，以|分割
   */
  setRange(exp) {
    //参数为有效值且为字符串，执行赋值
    range = exp && typeof exp == "string" ? new RegExp(exp) : null;
  },

  /**
   * @method setPoint 设置指定插入到某个容器
   * @date 2021-02-19
   
   * @param {string} exp 一个或多个控件id，以.分割
   */
  setPoint(exp) {
    //参数为有效值且为字符串，执行赋值
    point = exp && typeof exp == "string" ? exp : "";
  },

  /**
   * @method getComElement 获取控件数据与元素
   * @date 2019-10-21
   
   * @param {object} component 控件数据
   * @param {number} i 控件索引
   * @param {number} len 容器内子控件的个数
   * @param {string} pid 父级id
   * @return {array} 控件数据与元素
   */
  getComElement(component, i, len, pid) {
    const type = component.componentType; //范围匹配，只针对顶层数据，非顶层数据，不进行范围匹配。未指定范围，也不进行匹配

    if (pid != "Document" || range == null || range.test(type)) {
      if (type == "em-Content") {
        const page = Dispatcher.dispatch("getPageData", {
          value: component.pageId,
        });
        component = page.component;
      }

      let element = window.public.dom.querySelector(`#${component.id}`); //所有控件默认为显示

      this.display = "block"; //容器内最后一个控件没有结构或处于隐藏状态

      if (i == len - 1 && (element == null || element.offsetWidth == 0)) {
        //标识元素为隐藏
        this.display = "none"; //获取父级节点
        console.log(window.public.dom, "window.public.dom");
        element = window.public.dom.querySelector(`#${this.id}`);
      }

      return [component, element];
    }

    return [];
  },

  /**
   * @method spliceSeat 追加占位
   * @date 2019-10-22
   
   * @param {object} [opts] 参数对象
   * @param {function} opts.removed 占位删除成功执行
   * @param {funciton} opts.added 添加占位成功执行
   */
  spliceSeat(opts) {
    const { id, index, prevId, seat, seatId, name } = this; //页面中有占位，则执行删除操作

    if (seatId) {
      if (this.prevId) {
        this.seatId = this.prevId = "";
      } //删除占位符

      Dispatcher.dispatch(`${prevId}_removeComponent`, {
        args: [seatId, null, false],
      }); //占位删除成功后执行的回调函数

      opts && opts.removed && opts.removed();
    } //新增占位符

    this.seatId = Dispatcher.dispatch(`${id}_addComponent`, {
      args: [
        seat,
        index,
        (parent, target) => {
          //给占位符添加动画
          const time = setTimeout(() => {
            //设置行高
            if (target) {
              target.style.lineHeight = this.height + "px";
            } //取消定时器

            clearTimeout(time);
          }, 50);
        },
        false,
      ],
    }); //占位添加成功后执行的回调函数

    opts && opts.added && opts.added(name);

    if (!this.prevId) {
      this.prevId = id;
    }
  },

  selectComponent(event, element, resolve) {
    function select() {
      let { left, top, width, height } = element.getBoundingClientRect(); //计算控件中心坐标

      (left = left + width / 2), (top = top + height / 2); //选中控件

      Dispatcher.dispatch(`selectedComponent`, {
        args: [event, left, top, element.id, resolve],
      });
    } //如果element存在则执行选中方法

    if (element != undefined) {
      //获取图片元素
      const img = element.querySelector("img"); //判断控件内部否含有图片，含有图片，等图片加载完毕后在执行选中

      img == undefined
        ? select()
        : (img.onload = () => ((img.onload = null), select()));
    }
  },

  /**
   * @method scrollingPage 滚动页面
   * @date 2021-01-29
   
   * @param {number} y 鼠标指针y轴坐标 
   */
  scrollingPage(y) {
    const modal = document.querySelector(".property-modal"),
      { win, dom } = window.public,
      pageHeight = dom.body.scrollHeight; //获取滚动条距离顶部的偏移

    let value = dom.documentElement.scrollTop || dom.body.scrollTop; //鼠标指针坐标小于零并且滚动条顶部偏移大于零

    if (y < 0 && value > 0) {
      value = value - 15;
    } //鼠标指针坐标大于屏幕高度并且滚动条顶部偏移小于页面高度
    else if (y > win.innerHeight && value < pageHeight) {
      value = value + 15;
    } //执行滚动

    modal.scrollTo(0, value);
  },

  /**
   * @method drag 拖拽算法封装方法
   * @date 2019-10-21
   
   * @param {number} x x轴
   * @param {number} y y轴
   * @param {object} [opts] 参数对象
   * @param {number} [opts.width] 拖拽对象宽度
   * @param {number} [opts.height] 拖拽对象高度
   * @param {boolean} opts.isApply 是否应用到所有页面
   * @param {function} opts.removed 占位删除成功执行
   * @param {funciton} opts.added 添加占位成功执行
   */
  drag(x, y, opts) {
    var _opts$height;

    const data = Dispatcher.dispatch("getIframeData"); //如果存在应用到所有属性，给应用到所有属性赋值

    if (opts && opts.isApply) {
      this.isApply = opts.isApply;
    } //滚动页面

    this.scrollingPage(
      y +
        ((_opts$height = opts.height) !== null && _opts$height !== void 0
          ? _opts$height
          : 0)
    ); //判断是否存在站点数据并且应用到所有页面

    if (data && opts.isApply != true) {
      const regxp = /Header|PageContent|Footer/;
      let {
          component: { children: components, type: pid },
        } = data,
        i = 0,
        len = components.length,
        isinsert = true,
        inserts = null;

      while (i < len) {
        const [component, element] = this.getComElement(
          components[i],
          i,
          len,
          pid
        ); //存在控件数据，并且可以获取到元素节点，继续执行

        if (component && element) {
          let { left, top, right, bottom, height } =
              element.getBoundingClientRect(),
            style = getComputedStyle(element, null),
            mleft = parseInt(style.marginLeft || 0),
            mright = parseInt(style.marginRight || 0),
            mtop = parseInt(style.marginTop || 0),
            mbottom = parseInt(style.marginBottom || 0),
            { id, componentType, type, insertable, eachable, selectable } =
              component; //把坐标值减去marginleft

          (left = left - mleft), (right = right + mright); //判断当前拖拽元素与当前控件元素是否产生了交集

          if (
            ((y <= bottom + mbottom || i == len - 1) &&
              y >= top - mtop &&
              type != "Placeholder") ||
            point.indexOf(id) != -1
          ) {
            const child = /Container|Page/.test(type) && component.components; //控件是容器，且不失header、footer、content 或控件是隐藏，则top + 20，bottom - 20.以方便往容器的上侧与下侧拖入控件

            if (
              (child && !regxp.test(componentType)) ||
              this.display == "none"
            ) {
              (top = top + 5), (bottom = bottom - 5);
            } //判断控件是不是容器控件且控件不是隐藏的或结构不存在的

            if (
              child &&
              ((x < right &&
                x > left &&
                y >= top &&
                y <= bottom &&
                eachable != false &&
                this.display != "none") ||
                point.indexOf(id) != -1)
            ) {
              //记录父级id 记录控件类型 当控件是容器，但不允许插入控件时给isinset赋false，表示允许循环容器内部，但不允许向容器内插入控件
              (this.id = pid = id),
                (this.name = componentType),
                (isinsert = insertable); //控件可以被选中，则存储其控件名称 2020-11-17 wyq

              if (selectable != false) {
                this.insertName = this.name;
              } //读取允许插入控件配置

              if (inserts == null || inserts.unable != true) {
                var _this$inserts$this$na;

                inserts =
                  (_this$inserts$this$na = this.inserts[this.name]) !== null &&
                  _this$inserts$this$na !== void 0
                    ? _this$inserts$this$na
                    : inserts;
              } //判断容器内是否存在其它控件，如果有，则循环内部控件，没有则表示是新增操作

              if (child.length) {
                (components = child), (i = 0), (len = components.length);
                continue;
              } //this.index 为-1表示新增操作

              (this.index = -1), (this.height = height); //记录占位符高度
            } //控件是隐藏的且鼠标指针在范围内，则在隐藏控件前面插入控件
            else if (this.display == "none" && eachable != false) {
              (this.index = 0), (this.height = 65);
            } else if (
              y <= top + (bottom - top) / 2 &&
              !(components[i - 1] && components[i - 1].type == "Placeholder")
            ) {
              //判断是在控件上方插入还是下方插入
              (this.index = i), (this.height = 65);
            } else if (
              y > top + (bottom - top) / 2 &&
              !(components[i + 1] && components[i + 1].type == "Placeholder")
            ) {
              (this.index = i + 1), (this.height = 65);
            } else {
              return;
            } //容器内允许拖入什么控件

            if (
              (inserts &&
                (inserts.root || this.name == inserts.name) &&
                inserts.in &&
                inserts.in.test(opts.type) != true) ||
              (inserts.ex && inserts.ex.test(opts.type))
            ) {
              return;
            } //id存在并且允许插入控件.

            if (this.id && isinsert != false) {
              //index 为-1，表示新增，因此赋0值
              const index = this.index != -1 ? this.index : 0; //插入位置如果已经有占位了，便不再重复执行插入占位操作

              (components[index] || {}).type != "Placeholder" &&
                this.spliceSeat(opts);
              break;
            }
          }
        }

        i++;
      }
    }
  },

  /**
   * @method end 拖拽结束
   * @date 2019-10-22
   
   * @param {event} event 事件对象
   * @param {object} component 控件数据
   * @param {boolean} unadd 如果值为true，不执行新增操作
   * @param {boolean} isSwitch 是控件位置切换操作
   * @param {boolean} unuseNewId 新增控件的时候是否不创建新id
   */
  end(event, component, unadd, isSwitch = false, unuseNewId) {
    // 所有自由布局去掉虚线
    //Drag.handlePageToggleDash('end');
    unuseNewId = true;
    const { prevId: id, seatId, isApply } = this;

    //id、占位符id或是否应用到全部没有值，则返回null
    if (!(id && seatId) && !isApply) {
      return null;
    }

    return new Promise((resolve) => {
      //清空插入状态
      this.insertStatus = ""; //id且占位符id存在，执行新增操作

      if (id && seatId) {
        //删除占位符
        Dispatcher.dispatch(`${id}_removeComponent`, {
          args: [
            seatId,
            (p, c, index) => {
              //新增控件
              unadd != true &&
                Dispatcher.dispatch(`${id}_addComponent`, {
                  args: [
                    component,
                    index,
                    (target, child) => {
                      this.selectComponent(event, child, resolve);
                    },
                    false, // 表示要渲染ui，为true则不渲染ui
                    unuseNewId, // 上一个已删除组件的 id，为前进和后退处理
                    isSwitch, // 是否位置更换的删除组件种类
                  ],
                });
            },
            false,
            false,
            false,
          ], // 第一个false 是 unrender， 第三个 false 是 isrecord
        });
        this.index = undefined;
        this.id = this.prevId = this.seatId = this.name = "";
      } //是否应用到所有页面的控件存在，执行新增操作
      else if (isApply) {
        //新增控件
        unadd != true &&
          Dispatcher.dispatch(`addComponent`, {
            args: [
              component,
              undefined,
              (target, child) => {
                this.selectComponent(event, child, resolve);
              },
              false, // 表示要渲染ui，为true则不渲染ui
              unuseNewId, // 上一个已删除组件的 id，为前进和后退处理
              isSwitch, // 是否位置更换的删除组件种类
            ],
          }); //还原属性默认值

        this.isApply = false;
      }
    });
  },
};

//注册插入位置方法
Dispatcher.register("darg_range", Drag.setRange);

//注册指定插入到某个容器
Dispatcher.register("drag_point", Drag.setPoint);

export default Drag;
