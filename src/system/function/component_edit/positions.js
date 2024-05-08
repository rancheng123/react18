/* eslint-disable */
import Hoverbtns from "../../../config/hover_btns";
import ConfigBtn from './single/ConfigBtn';
import Dispatcher from "../../tools/dispatcher";

/**
 * @description: 位置计算
 * @param {type} 
 * @return: void
 * 
 */

const wh = 29,
  base = 2 * wh,
  cwidth = wh,
  waperPadding = 10;
const positions = {
  virtual: false,

  //是否存在虚拟区域

  /**
   * @description: 查找虚拟控件
   * @param {type} 
   * @return: void
   */
  findVirtual(x, y) {
    if (this.virtual !== false) {
      if (this.findBox(x, y, this.virtual, 1, 'virtual')) {
        const currentNode = this.virtual.node.find(_node => {
          return this.findBox(x, y, _node.position, 1, 'virtual');
        });
        return typeof currentNode == 'undefined' ? this.virtual.node[0].node : currentNode.node;
      } else {
        this.virtual = false;
        return this.virtual;
      }
    } else {
      this.virtual = false;
      return this.virtual;
    }
  },

  /**
   * @description: 查找区域
   * @param {type} 
   * @return: void
   */
  findBox(x, y, box, id, name) {
    const {
      left,
      top,
      right,
      bottom
    } = box;
    // if( x >= 914 && x<=1208 && y>=54 && y<=83  && name == 'virtual'){
    //     const a = x >= left && x <= right && y >= top  && y <= bottom;
    //     console.log(a,x,y,left,right,top,bottom,name);
    // }
    //判断鼠标是不是在控件范围内

    if (x >= left && x <= right && y >= top && y <= bottom) {
      //存储符合条件的控件数据。循环查找过程中，如果出现两个及两个以上符合条件的控件，则按其在父级中的位置，决定存储谁的数据
      //virtual = false;
      return true;
    } else {
      return false;
    }
  },

  /**
   * @description: 按钮组名称宽度，根据名称文字个数返回宽度
   * @param {len} 
   * @return: int
   */
  getTextWidth(len) {
    // const padding = 50;
    const padding = 0;

    switch (len) {
      case 2:
        return 60 + padding;

      case 3:
        return 75 + padding;

      case 4:
        return 85 + padding;

      case 5:
        return 100 + padding;

      case 6:
        return 115 + padding;
    }
  },

  getButtonWidth(type) {
    switch (type) {
      case 'switchs':
        return 50;
    }
  },

  /**
   * @description: 检测两条轴线是否相交
   * @param {type} 
   * @return: void
   */
  crossCheck(a1, b1, a2, b2) {
    return a1 < b2 && a2 < b1 ? true : false;
  },

  /**
   * @description: 校对垂直位置
   * @param {type} 
   * @return: void
   */
  proofreadingVerticalPosition(parentNav, currentNav) {
    const left = parentNav.left < currentNav.left ? parentNav.left : currentNav.left;
    const width = parentNav.width < currentNav.width ? currentNav.width : parentNav.width;
    return {
      top: parentNav.top,
      bottom: currentNav.bottom,
      left: left,
      right: left + width
    };
    //currentNav.top = parentNav.bottom-10;
    //currentNav.bottom = currentNav.top+currentNav.height;
    //return box;
  },

  /**
   * @description: 校对水平位置
   * @param {type} 
   * @return: void
   */
  proofreadingPosition(parentNav, currentNav) {
    let d1 = 0,
      l = this.getRuleWidth();

    if (parentNav.left < 0) {
      d1 = Math.abs(parentNav.left) + l;
    } else if (parentNav.left > 0 && parentNav.left < l) {
      d1 = l - parentNav.left;
    }

    parentNav.left += d1;
    parentNav.right = parentNav.left + parentNav.width;
    parentNav.top = currentNav.top;
    parentNav.bottom = currentNav.bottom;
    currentNav.left += d1;
    currentNav.right = currentNav.left + currentNav.width;
    return {
      currentNav,
      parentNav
    };
  },

  /**
   * @description: 创建固定区域节点
   * @param {type} 
   * @return: void
   */
  createFixedNode(box, current, parent) {
    //console.log(current,parent,'current,parent');
    box.node = [{
      position: current.nav,
      node: {
        current: current.comp.node,
        parent: current.comp.node.parent
      }
    }, {
      position: parent.nav,
      node: {
        current: parent.comp.node,
        parent: parent.comp.node.parent
      }
    }];
    return box;
  },

  /**
   * @description: 创建虚拟区域节点
   * @param {type} 
   * @return: void
   */
  createVirtualNode(current, parent) {
    return {
      left: parent.nav.left,
      right: current.nav.right,
      top: current.nav.top,
      bottom: parent.nav.bottom,
      node: [{
        position: current.nav,
        node: {
          current: current.comp.node,
          parent: current.comp.node.parent
        }
      }, {
        position: parent.nav,
        node: {
          current: parent.comp.node,
          parent: parent.comp.node.parent
        }
      }]
    };
  },

  /**
   * @description: 导航与导航的重叠,由于只有两层级，无需循环判断
   * @param {type} 
   * @return: void
   */
  navToNav(list) {
    if (list.length == 1) {
      return list;
    }

    const [current, parent] = list;
    const xCross = this.crossCheck(current.nav.left, current.nav.right, parent.nav.left, parent.nav.right);
    const yCross = this.crossCheck(current.nav.top, current.nav.bottom, parent.nav.top, parent.nav.bottom);

    if (xCross && yCross) {
      //当前导航与父导航重叠
      if (parent.nav.direction == current.nav.direction) {
        if (current.nav.direction == 'leftTop') {
          current.nav = this.angularPosition({
            inout: 'inside',
            direction: 'leftTop'
          }, current.nav, current.comp);
        } else if (current.nav.direction == 'leftBottom') {
          const diffLeft = Math.abs(current.nav.left - parent.nav.left),
            diffRight = Math.abs(current.nav.right - parent.nav.right),
            distance = Math.abs(parent.nav.right - current.nav.left);

          if (current.nav.name == '图片' && parent.nav.name == '组件') {
            //const diffRight = Math.abs(current.nav.right - parent.nav.right);
            console.log(diffLeft, diffRight, distance);
          }
          if (diffLeft < diffRight || diffLeft == diffRight) {
            //父级往左偏
            parent.nav.left -= distance + waperPadding;
            parent.nav.right = parent.nav.left + parent.nav.width;
            const {
              currentNav,
              parentNav
            } = this.proofreadingPosition(parent.nav, current.nav);
            parent.nav = parentNav;
            current.nav = currentNav;
            //console.log('父级往左偏',parent.nav.left);

            this.virtual = this.createVirtualNode(current, parent);
          }
        }
      }
    } else {
      //if(current.nav.name == '图片' && parent.nav.name == '滚动组件'){
      if (Math.abs(current.nav.top - parent.nav.bottom) < 3 && xCross) {
        //垂直贴边
        const box = this.proofreadingVerticalPosition(parent.nav, current.nav);
        this.virtual = this.createFixedNode(box, current, parent);
      } //console.log(diff)
      //}

    }

    return list;
  },

  /**
   * @description: 初始化
   * @param {rectList} 矩形列表
   * @param {screen} 屏幕对象
   * @return: void
   */
  init(list, docWidth, docHeight) {
    this.docWidth = docWidth;
    this.docHeight = docHeight;
    let rectList = list.map(item => {
      return this.active(item);
    });
    this.navToNav(rectList);
    return rectList;
  },

  /**
   * @description: 计算被选中控件的导航按钮初始化操作
   * @param {type} 
   * @return: void
   */
  active(item) {
    const {
      type,
      skin
    } = item;
    const comp = this.conversion(item);
    let items = this.initItems(type, skin);
    const rs = this.filterItems(item, items); // console.log(rs,'rs')
    //console.log(rs.len,rs.textLen,type)

    let nav = this.createNavObj(rs.len, rs.textLen, type, rs.flen);
    nav.items = rs.items;
    nav = this.initPosition(nav, comp); //初始化控件位置

    nav = this.screenPosition(nav, comp);
    return {
      comp,
      nav
    };
  },

  /**
   * @description: 当前选择
   * @param {type} 
   * @return: void
   */
  currentSelect(item, btns) {
    const comp = this.conversion(item); //const len = this.getLenByItems(btns,'icon');
    //const textLen = this.getLenByItems(btns,'text');

    const rs = this.filterItems(item, btns);
    let nav = this.createNavObj(rs.len, rs.textLen, item.type, rs.flen); //文本、选项卡、可拆叠选中框按钮会遮档内容，把按钮向右外上角显示 sxt 2020-6-15

    if (nav.type == 'em-Text' || nav.type == 'em-Tab' || nav.type == 'em-Collapsible') {
      nav.type = 'em-active';
    }

    nav.items = btns;
    nav = this.initPosition(nav, comp); //初始化控件位置

    nav = this.screenPosition(nav, comp);
    return {
      nav,
      items: rs.items
    };
  },

  /**
   * @description: 初始化按钮组
   * @param {type} 
   * @return: void
   */
  initItems(type, skin) {
    var _HoverConfig$_type$st;

    const _type = type.toLowerCase();

    if (typeof Hoverbtns[_type] == 'undefined') {
      return [];
    }

    const stype = window.public.type;
    const conf = (_HoverConfig$_type$st = Hoverbtns[_type][stype]) !== null && _HoverConfig$_type$st !== void 0 ? _HoverConfig$_type$st : Hoverbtns[_type];
    let btns = conf.btns; //btns 不是数组，则表示其是一个对象。然后做进一步处理

    if (!Array.isArray(btns)) {
      var _conf$btns$skin;

      skin = skin.substring(0, skin.lastIndexOf('.'));
      btns = (_conf$btns$skin = conf.btns[skin]) !== null && _conf$btns$skin !== void 0 ? _conf$btns$skin : conf.btns.all;
    }

    let returnArr = []; //头部等顶级容器不允许收藏和隐藏    分页和搜索组件不允许收藏和隐藏 

    if (/pagecontent|panel|footer|header|lightboxmodal|lightbox|pagination|input/.test(_type)) {
      if (stype == "mo" && (_type == "em-header" || _type == "em-footer" || _type == "em-pagination" || _type == "em-input")) {
        returnArr = [...btns, ...ConfigBtn["defaultBtns"].mo];
      } else {
        returnArr = btns;
      }
    } else {
      returnArr = [...btns, ...ConfigBtn["defaultBtns"].pc];
    }

    return returnArr;
  },

  /**
   * @description: 鼠标经过容器按钮过滤
   * @param {type} 
   * @return: void
   */
  filterHoverboxButton(items, id) {
    let len = items.length;
    let textLen = 2;
    const {
      data: {
        document_data: {
          current
        }
      }
    } = Dispatcher.dispatch(`${id}_get`);
    items = items.map(item => {
      switch (item.type) {
        case 'default':
          if (current == '0') {
            return {
              ...item,
              selected: true
            };
          } else {
            return {
              ...item,
              selected: false
            };
          }

          break;

        case 'currentHover':
          if (current == '1') {
            return {
              ...item,
              selected: true
            };
          } else {
            return {
              ...item,
              selected: false
            };
          }

          break;

        default:
          return item;
          break;
      }
    });
    return {
      items,
      len: len - textLen,
      textLen
    };
  },

  /**
   * @description: 数据源按钮过滤
   * @param {type} 
   * @return: void
   */
  filterSourceDataButton(items, id) {
    let len = items.length;
    const {
      data: {
        document_data: {
          selectionContent
        }
      }
    } = Dispatcher.dispatch(`${id}_get`);

    if (selectionContent == 'databaseData') {
      items = items.map(item => {
        if (item.type == 'selectImage' || item.type == 'ckeditor') {
          len--;
          return {
            ...item,
            hidden: true
          };
        } else {
          return item;
        }
      });
    }

    return {
      items,
      len,
      textLen: 0
    };
  },

  /**
   * @description: 获取项目长度
   * @param {type} 
   * @return: void
   */
  getLenByItems(items, type) {
    if (type == 'icon') {
      return items.reduce((prev, cur) => {
        return cur.hidden || cur.buttonType === 'text' ? --prev : prev;
      }, items.length);
    } else {
      return items.reduce((prev, cur) => {
        return cur.buttonType === 'text' ? ++prev : prev;
      }, 0);
    }
  },

  filterButton(type, id, items) { },

  /**
   * @description: 初始化button个数
   * @param {type} 
   * @return: void
   */
  filterItems(_item, items) {
    const {
      type,
      id
    } = _item;
    let len = items.length; //console.log(_item,'_item')

    switch (type) {
      case 'em-Text': //检测数据源，检测hover容器

      case 'em-Image':
        const {
          data: {
            document_data: {
              selectionContent
            }
          }
        } = Dispatcher.dispatch(`${id}_get`);

        if (selectionContent == 'databaseData') {
          items = items.map(item => {
            // console.log(item.type);
            if (item.type == 'selectImage' || item.type == 'ckeditor') {
              len--;
              return {
                ...item,
                hidden: true
              };
            } else if (item.type == 'quote' && _item.parent.type == 'em-Hoverbox') {
              len--;
              return item;
            } else {
              return item;
            }
          });
          return {
            items,
            len,
            textLen: 0,
            flen: 0
          };
        } else {
          items = items.map(item => {
            if (item.type == 'quote' && _item.parent.type != 'em-Hoverbox') {
              len--;
              return item;
            } else {
              return item;
            }
          });
          return {
            items,
            len,
            textLen: 0,
            flen: 0
          };
        }

      case 'em-Button':
        items = items.map(item => {
          if (item.type == 'quote' && _item.parent.type == 'em-Hoverbox') {
            len--;
            return {
              ...item,
              hidden: true
            };
          } else {
            return item;
          }
        });
        return {
          items,
          len,
          textLen: 0,
          flen: 0
        };

      case 'em-Hoverbox':
        let textLen = 2;
        const {
          data: {
            document_data: {
              current
            }
          }
        } = Dispatcher.dispatch(`${id}_get`);
        items = items.map(item => {
          switch (item.type) {
            case 'default':
              if (current == '0') {
                return {
                  ...item,
                  selected: true
                };
              } else {
                return {
                  ...item,
                  selected: false
                };
              }

            case 'currentHover':
              if (current == '1') {
                return {
                  ...item,
                  selected: true
                };
              } else {
                return {
                  ...item,
                  selected: false
                };
              }

            default:
              return item;
          }
        });
        return {
          items,
          len: len - textLen,
          textLen,
          flen: 0
        };

      default:
        return {
          items,
          len: this.getLenByItems(items, 'icon'),
          textLen: 0,
          flen: 0
        };
    }
  },

  /**
   * @description: comp对象初始化
   * @param {type} 
   * @return: void
   */
  conversion(item) {
    const {
      type,
      id,
      layout: {
        x,
        y,
        width
      }
    } = item;
    const height = window.public.dom.querySelector(`#${id}`).offsetHeight;
    return {
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      height,
      width,
      type,
      node: item
    };
  },

  /**
   * @description: 相对检测策略
   * @param {type} 
   * @return: void
   */
  relativeStrategy(rectList) {
    return rectList.map(({
      component,
      nav
    }) => {
      const {
        top,
        left,
        right,
        bottom
      } = component;
      const {
        width
      } = nav;

      const _top = top - wh;

      return {
        component,
        nav: {
          left,
          top: _top,
          bottom: top,
          right: left + width
        }
      };
    });
  },

  /**
   * @description:屏幕位置检测 
   * @param {type} 
   * @return: void
   */
  screenPosition(nav, comp) {
    const {
      top,
      bottom,
      type,
      right
    } = nav;

    if (top < 0) {
      //导航溢出屏幕顶端
      nav = this.angularPosition({
        inout: 'outside',
        direction: 'leftBottom'
      }, nav, comp);
    } //if(nav.name == '文本'){


    if (bottom > this.docHeight) {
      nav = this.angularPosition({
        inout: 'outside',
        direction: 'rightTop'
      }, nav, comp);
    } //console.log(bottom,this.docHeight);
    //}


    if (right > this.docWidth) {
      const diff = Math.abs(right - this.docWidth);
      nav.left = nav.left - (diff + 15);
      nav.right = nav.left + nav.width; // console.log('111')
    }

    return nav;
  },

  /**
   * @description: 
   * @param {type} 
   * @return: void
   */
  angularPosition({
    inout,
    direction
  }, nav, comp) {
    if (inout == 'outside') {
      return this.angularOutsidePosition(direction, nav, comp);
    } else {
      return this.angularInsidePosition(direction, nav, comp);
    }
  },

  /**
   * @description: 外角定位
   * @param {type} 
   * @return: void
   */
  angularOutsidePosition(direction, nav, {
    top,
    left,
    right,
    bottom,
    width,
    height
  }) {
    nav.inout = 'outside';
    nav.direction = direction;

    switch (nav.direction) {
      case 'centerTop':
        //居中正上
        nav.top = top - nav.height;
        nav.left = width / 2 - nav.width / 2;
        break;

      case 'centerBottom':
        //居中正下
        nav.top = bottom;
        nav.left = width / 2 - nav.width / 2;
        break;

      case 'leftTop':
        //左外上角
        nav.top = top - nav.height;
        nav.left = left;
        break;

      case 'leftBottom':
        //左外下角
        nav.left = left;
        nav.top = bottom;
        break;

      case 'rightTop':
        //右外上角
        nav.top = top - nav.height;
        const d = (this.docWidth - width) / 2; //console.log(nav.type,width,nav.width)

        nav.left = right - (nav.width + waperPadding);
        break;

      case 'rightBottom':
        //右外下角
        break;
    }

    if (nav.left < this.getRuleWidth()) {
      nav.left = this.getRuleWidth();
    }

    nav.right = nav.left + nav.width;
    nav.bottom = nav.top + nav.height;
    return nav;
  },

  /**
   * @description: 内角定位
   * @param {type} 
   * @return: void
   */
  angularInsidePosition(direction, nav, {
    top,
    left,
    right,
    bottom,
    width,
    height
  }) {

    nav.inout = 'inside';
    nav.direction = direction;

    switch (nav.direction) {
      case 'leftTop':
        //左内上角
        nav.left = left;
        nav.top = top + 1; //定位在左内上

        break;

      case 'leftBottom':
        //左内下角
        break;

      case 'rightTop':
        //右内上角
        break;

      case 'rightBottom':
        //右内下角
        break;
    }

    if (nav.left < this.getRuleWidth()) {
      nav.left = this.getRuleWidth();
    }

    nav.right = nav.left + nav.width;
    nav.bottom = nav.top + nav.height;
    return nav;
  },

  /**
   * @description: 获取标尺宽度
   * @param {type} 
   * @return: void
   */
  getRuleWidth() {
    if (document.querySelector('.auxiliary')) {
      return 20;
    } else {
      return 0;
    }
  },

  /**
   * @description: 初始化位置检测
   * @param {type} 
   * @return: void
   */
  initPosition(nav, comp) {
    switch (nav.type) {
      case 'em-Header':
        //居中正下
        nav = this.angularOutsidePosition('centerBottom', nav, comp);
        break;

      case 'em-Hoverbox':
      case 'em-Box':
        //右外上角
        nav = this.angularOutsidePosition('rightTop', nav, comp);
        break;

      case 'em-active':
      case 'em-Component': //左外上角

      case 'em-Search': //左外上角

      case 'em-List':
      case 'em-Scrollcolumn':
        nav = this.angularOutsidePosition('leftTop', nav, comp);
        break;

      case 'em-PageContent': //居中正上

      case 'em-Footer':
        nav = this.angularOutsidePosition('centerTop', nav, comp);
        break;

      default:
        nav = this.relativePosition(nav, comp);
        break;
    }

    return nav;
  },

  /**
   * @description: 相对位置检测
   * @param {type} 
   * @return void
   */
  relativePosition(nav, comp) {
    if (comp.height >= base) {
      //当控件高度 >= 2buttonHeight
      nav = this.angularInsidePosition('leftTop', nav, comp); //左外
    } else {
      //当控件高度 < 2buttonHeight
      nav = this.angularOutsidePosition('leftBottom', nav, comp);
    }

    return nav;
  },

  /**
   * @description: 生成导航对象
   * @param {type} 
   * @return void
   */
  createNavObj(buttonLen, textLen, type, flen = 0) {
    const name = window.public.getName(type); //console.log(name,type)

    const fixedWidth = this.getTextWidth(name.length);
    const itemWidth = buttonLen * cwidth + textLen * 35 + flen; // if(type == 'em-Hoverbox'){
    //     console.log(fixedWidth,buttonLen,textLen)
    // }
    //name:name+' - '+id,

    return {
      name,
      fixedWidth,
      itemWidth,
      width: fixedWidth + itemWidth,
      height: wh,
      type
    };
  },

  /**
   * @description: 获取当前与父级节点数组
   * @param {type} 
   * @return void
   */
  getParentNodes(node) {

    node.current.parent = node.parent;
    let nodes = [node.current],
      ns;

    while (typeof node.parent != 'undefined') {
      if (node.parent.selectable != false) {
        // node.parent.btns = getBtnArea(node.parent,0);
        if (node.parent.btns != false) {
          nodes.push(node.parent);
        }
      }

      node = node.parent;
    }

    if (nodes.length >= 2) {
      //if(nodes[1])
      if (nodes[1].id == 'document') {
        ns = [nodes[0]];
      } else {
        ns = [nodes[0], nodes[1]];
      }

      const {
        document: {
          body: {
            clientHeight: bodyHeight,
            clientWidth
          }
        },
        innerHeight,
        scrollY
      } = document.querySelector('#iframe').contentWindow;

      let _height;

      if (bodyHeight <= innerHeight) {
        _height = bodyHeight;
      } else {
        _height = innerHeight + scrollY;
      }

      const rectList = positions.init(ns, clientWidth, _height);
      ns.forEach((item, i) => {
        item.absolute = rectList[i]['nav'];
      });
      return ns;
    }

    return false;
  }

};

export default positions;