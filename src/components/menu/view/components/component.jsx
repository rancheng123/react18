// 导入模块
import React from "react";
import Util from "@/components/page/util/util";

/**
 * @function getSubmenuData 获取次级导航数据
 * @param {object} state 状态对象 
 * @param {object} e 导航项数据
 * @param {number} i 项索引
 * @return {object} 次级导航数据
 */

function getSubmenuData(state, e, i) {
  const {
    component: {
      components
    },
    data: {
      menu_data = {},
      document_data: {
        twoNav
      }
    }
  } = state;
  const { menuList, submenuList = {} } = menu_data,
    len = components.length; //是否存在二级且是否开启二级   并且有二级元素的时候，防止二级被误删除报错的bug 

  if (twoNav && len >= 1) {
    //默认次级导航数据
    let data = [{
      name: "子级导航1",
      id: "sub123"
    }, {
      name: "子级导航2",
      id: "sub124"
    }, {
      name: "子级导航3",
      id: "sub125"
    }, {
      name: "子级导航4",
      id: "sub126"
    }]; //如果不存在导航项数据参数并且是编辑页

    if (e == undefined && !Util.source) {
      let index = menuList.findIndex(e => e.child && !submenuList[e.pid]); //查找第一个存在导航次级数据的项

      data = index >= 0 ? menuList[index].child : (index = menuList.findIndex(e => !submenuList[e.pid]), data); //存在二级返回数据，否则返回null

      return data ? {
        component: components[0],
        index,
        data,
        isClone: false
      } : null;
    } //存在导航项数据并且绑定了自定义次级导航或预览页


    if (e != undefined && (len > 1 || Util.source)) {
      let component = components.find(c => c.id == submenuList[e.pid]),
        isClone = false,
        child; //判断是否存在自定义导航数据

      if (component) {
        child = !Util.source && !e.child || component.skin.indexOf('submenuBox') != -1 ? data : e.child;
      }

      if (Util.source && component == undefined && e.child) {
        component = components[0], child = e.child, isClone = true;
      } //存在二级返回数据，否则返回null


      return child ? {
        component,
        index: i,
        data: child,
        isClone
      } : null;
    }
  }

  return null;
}
/**
 * @instance {Component} 控件公用HTML视图实例
 */


const Component = {
  /**
   * 
   * @param {*} props 
   */
  box(props) {
    return (
      <div id={props.id} className={props.className || null}>
        {props.children}
      </div>
    )
  },

  /**
  * @method getLinkHref 导航链接获取方法
  * @param {Object} prop  当前项数据
  * @param {String} target 页面打开方式
  * @return {Object} 拼接好的链接数据
  */
  getLinkHref(prop, target) {
    //页面类型为链接页面时
    if (prop.pageType == "JumpLink") {
      //prop.link.target=target; 链接要走自己的窗口打开方式，不用走导航的 
      return prop.link;
    } else {
      return {
        url: prop.url,
        target: target,
        type: "externalLinks"
      };
    }
  },

  /**
   * 
   */
  icon() {
    return <i></i>
  },

  /**
  * @method menuLi li基本结构
  * @return {object} li基本结构
  */
  menuLi(type, state, typeData) {
    //align 次级显示位置（居左 居中 居右）
    let {
      showItem,
      component: {
        id
      },
      data: {
        menu_data = {},
        document_data: {
          arrowIcon,
          sort,
          dropdownIcon,
          target,
          align = "left"
        }
      }
    } = state;
    let menuList = (menu_data || {}).menuList || [];

    if (menuList.length < 1) {
      return null;
    }

    if (sort == "inverted") {
      menuList = [...menuList].reverse();
    } //sort栏目排序  倒序时把数组反转


    const pubChild = getSubmenuData(state);
    return menuList.map((e, i) => {
      let _selected = e.isCurrent || i == 0 ? "selected" : "";
      //标注当前选中项
      //在发布的时候拼接占位

      if (Util.source) {
        _selected = `{$navs_${e.pid || e.id}}`;
      }

      let link = Component.getLinkHref(e, target); //类型为pc时

      if (type == "pc") {
        const child = getSubmenuData(state, e, i) || pubChild;
        let isIcon = false,
          showIconClass = "",
          alignClass = `subMenuAlign${align}`; //alignClass 是给次给显示位置添加的class sxt 2021-2-22
        //能显示icon时，单独给li加个class sxt 2020-6-15 

        if (child && e.child && dropdownIcon) {
          isIcon = true;
          showIconClass = "showArrowstyle";
        }

        const getChildren = () => {
          if (typeData) {
            return (
              <div className="twoLayerTitle">
                <div>
                  <div className="pageNameTilte">{e.name}</div>
                  <div className="subNameTilte">{e.subTitle}</div>
                </div>
                {
                  isIcon && <i className={`${id}i iconfont`}>{arrowIcon}</i>
                }
              </div>
            )
          }
          return (
            <React.Fragment>
              <p>{e.name}</p>
              {
                (isIcon && !typeData) && <i className={`${id}i iconfont`}>{arrowIcon}</i>
              }
            </React.Fragment>
          )
        }

        const DOM = (
          <li
            key={e.id}
            className={`${id}Li mainNavLi hoverMenuLi  ${showIconClass}  ${alignClass}`}
          >
            {
              Util.linkDecorator({
                className: `${id}A mainNavLiA ${_selected}`,
                link: link,
                type: "html",
                children: getChildren()
              })
            }
            {
              (child && child.index == i) && (
                Util.component({
                  component: child.component,
                  clone: child.isClone,
                  context: `${child.component.id}.${child.component.skin}`,
                  props: {
                    showItem: child.isClone ? undefined : showItem,
                    type,
                    target,
                    "child": child.data
                  }
                })
              )
            }
          </li>
        )

        return DOM

        // return React.createElement("li", {
        //   className: `${id}Li mainNavLi hoverMenuLi  ${showIconClass}  ${alignClass}`,
        //   key: e.id
        // }, React.createElement(Util.linkDecorator, {
        //   className: `${id}A mainNavLiA ${_selected}`,
        //   link: link,
        //   type: "html"
        // }, typeData ? React.createElement("div", {
        //   className: 'twoLayerTitle'
        // }, React.createElement("div", null, React.createElement("div", {
        //   className: 'pageNameTilte'
        // }, e.name), React.createElement("div", {
        //   className: 'subNameTilte'
        // }, e.subTitle)), isIcon ? React.createElement("i", {
        //   className: `${id}i yiyingbaoicon`
        // }, arrowIcon) : null) : React.createElement("p", null, e.name), isIcon && !typeData ? React.createElement("i", {
        //   className: `${id}i yiyingbaoicon`
        // }, arrowIcon) : null), child && child.index == i ? React.createElement(Util.component, {
        //   component: child.component,
        //   clone: child.isClone,
        //   context: `${child.component.id}.${child.component.skin}`,
        //   props: {
        //     showItem: child.isClone ? undefined : showItem,
        //     type,
        //     target,
        //     "child": child.data
        //   }
        // }) : null);
      }

      if (type == "mo" || type == "amp" || type == "mip") {
        let linkType = "html"; //类型为amp或mip时，link类型为传过来的类型

        if (type == "amp" || type == "mip") {
          linkType = type;
        }
        const DOM = (
          <li
            className={`${id}Li mainNavLi`}
            key={e.id}
          >
            {
              Util.linkDecorator(
                {
                  className: `${id}A mainNavLiA ${_selected}`,
                  link: link,
                  type: linkType,
                  children: <p>{e.name}</p>
                }
              )
            }
          </li>
        )
        return DOM
        // return React.createElement("li", {
        //   className: `${id}Li mainNavLi`,
        //   key: e.id
        // }, React.createElement(Util.linkDecorator, {
        //   className: `${id}A mainNavLiA ${_selected}`,
        //   link: link,
        //   type: linkType
        // }, React.createElement("p", null, e.name)));
      }
    });
  },

  /**
   * @method menuLiVertical li竖导航基本结构
   * @return {object} li竖导航基本结构
   */
  menuLiVertical(type, state) {
    let {
      showItem,
      component: {
        id,
        components
      },
      data: {
        menu_data = {},
        theme_data: {
          skin
        },
        document_data: {
          arrowIcon,
          sort,
          displayModel,
          dropdownIcon,
          target,
          overflowPart = "textShow"
        }
      }
    } = state;
    let menuList = (menu_data || {}).menuList || [];

    if (menuList.length < 1) {
      return null;
    }

    if (sort == "inverted") {
      menuList = [...menuList].reverse();
    } //sort栏目排序  倒序时把数组反转


    const pubChild = getSubmenuData(state);
    return menuList.map((e, i) => {
      let child = getSubmenuData(state, e, i) || pubChild;
      let _selected = ""; //标注当前选中项

      if (e.isCurrent || i == 0) {
        _selected = "selected";
      } //在发布的时候拼接占位


      if (Util.source) {
        _selected = `{$navs_${e.pid || e.id}}`;
      }

      let link = Component.getLinkHref(e, target);
      var DisplayModel = displayModel == 'lineFeed' ? 'toggle' : '';
      let isIcon = false,
        showIconClass = ""; //能显示icon时，单独给li加个class sxt 2020-7-3

      if (child && e.child && dropdownIcon) {
        isIcon = true;
        showIconClass = "showArrowstyle";
      }

      let allSubMenu = false; //皮肤为这个时，并且子级控件存在时，显示所有的子级导航 sxt 2021-4-6

      if (skin == "menu.verMenu.s226.394" && child && components) {
        child = {
          component: components[0],
          data: e.child,
          index: i,
          isClone: true
        };
      } //类型为pc时


      if (type == "pc") {
        return React.createElement("li", {
          className: `${id}Li mainNavLi ${DisplayModel} ${overflowPart} ${showIconClass}`,
          key: e.id
        }, React.createElement(Util.linkDecorator, {
          className: `${id}A mainNavLiA ${_selected} `,
          link: link,
          type: "html"
        }, React.createElement("p", null, e.name), isIcon ? React.createElement("i", {
          className: `${id}i yiyingbaoicon`
        }, arrowIcon) : null), child && child.index == i ? React.createElement(Util.component, {
          component: child.component,
          key: child.component.id,
          clone: i != 0 && child.isClone ? true : false,
          props: {
            showItem: child.isClone ? undefined : showItem,
            type,
            target,
            "child": child.data
          }
        }) : null);
      }

      if (type == "mo" || type == "amp" || type == "mip") {
        let linkType = "html"; //类型为amp或mip时，link类型为传过来的类型

        if (type == "amp" || type == "mip") {
          linkType = type;
        }

        return React.createElement("li", {
          className: `${id}Li mainNavLi ${DisplayModel} ${overflowPart} ${showIconClass}`,
          key: e.id
        }, React.createElement(Util.linkDecorator, {
          className: `${id}A mainNavLiA ${_selected}`,
          link: link,
          type: linkType
        }, React.createElement("p", null, e.name)), e.child ? React.createElement("input", {
          className: "sideTrigger",
          type: "checkbox"
        }) : null, child && child.index == i ? React.createElement(Util.component, {
          component: child.component,
          key: child.component.id,
          clone: i != 0 && child.isClone ? true : false,
          props: {
            showItem: child.isClone ? undefined : showItem,
            type,
            target,
            "child": child.data
          }
        }) : null, e.child ? React.createElement("span", {
          className: "nav-icon"
        }, e.child ? React.createElement("i", {
          className: `${id}i yiyingbaoicon`
        }, arrowIcon) : null, " ") : null);
      }
    });
  },

  /**
      * @method pcIcon 获取icon结构
      * @param {object} props 参数列表
      * @param {string} props.id 控件id
      * @param {object} props.icon 图标对象
      * @return {object} icon结构
      */
  pcIcon(props) {
    if (props.icon == null) {
      return null;
    }

    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      type
    } = props; //判断是否存在图标icon

    if (iconName) {
      return (<span className={`${id}Ic  ${id}${type} btnIcon iconfont`}>{iconName}</span>)
      // return React.createElement("span", {
      //   className: `${id}Ic  ${id}${type} btnIcon yiyingbaoicon`
      // }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return (
        <div className={`${id}Ic btnIcon ${id}${type}`}>
          <img
            className="btnImg lazyload"
            data-src={iconSrc}
            src={Util.source ? 'https://img.bjyyb.net/grey.png' : iconSrc} alt="" />
        </div>
      )
      // return React.createElement("div", {
      //   className: `${id}Ic btnIcon ${id}${type}`
      // }, React.createElement("img", {
      //   className: "btnImg lazyload",
      //   "data-src": iconSrc,
      //   src: Util.source ? 'https://img.bjyyb.net/grey.png' : iconSrc
      // }));
    } //返回null


    return null;
  },

  ampIcon(props) {
    if (props.icon == null) {
      return null;
    } //iconSize


    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      style = {}
    } = props;
    let {
      iconSize = 2.4,
      iconSizeUnit = "rem",
      moiconSize,
      moiconSizeUnit
    } = style;
    let imgFixed = moiconSize || iconSize,
      imgUnit = moiconSizeUnit || iconSizeUnit;

    if (imgUnit == "rem" || imgUnit == "em") {
      imgFixed = imgFixed * 10;
    } //判断是否存在图标icon


    if (iconName) {
      return React.createElement("span", {
        className: `${id}Ic btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return React.createElement("div", {
        className: `${id}Ic btnIcon`
      }, React.createElement("amp-img", {
        width: imgFixed,
        height: imgFixed,
        "data-amp-auto-lightbox-disable": "true",
        layout: "fixed",
        class: "btnImg",
        src: iconSrc
      }));
    } //返回null


    return null;
  },

  mipIcon(props) {
    if (props.icon == null) {
      return null;
    } //iconSize


    const {
      id,
      icon: {
        iconName,
        iconSrc
      },
      style = {}
    } = props;
    let {
      iconSize = 2.4,
      iconSizeUnit = "rem",
      moiconSize,
      moiconSizeUnit
    } = style;
    let imgFixed = moiconSize || iconSize,
      imgUnit = moiconSizeUnit || iconSizeUnit;

    if (imgUnit == "rem" || imgUnit == "em") {
      imgFixed = imgFixed * 10;
    } //判断是否存在图标icon


    if (iconName) {
      return React.createElement("span", {
        className: `${id}Ic btnIcon yiyingbaoicon`
      }, iconName);
    } //判断是否存在图片路径


    if (iconSrc) {
      return React.createElement("div", {
        className: `${id}Ic btnIcon`
      }, React.createElement("mip-img", {
        width: imgFixed,
        height: imgFixed,
        layout: "fixed",
        class: "btnImg",
        src: iconSrc
      }));
    } //返回null


    return null;
  },

  /**
   * @method menuLiVerticalOpen li竖导航当前项展开基本结构
   * @date 2019-12-30  17：06
   * @author sxt
   * @return {object} li竖导航基本结构
   */
  menuLiVerticalOpen(type, state) {
    let {
      showItem,
      component: {
        id
      },
      data: {
        menu_data = {},
        theme_data: {
          style = {}
        },
        document_data: {
          arrowIcon,
          sort,
          displayModel,
          dropdownIcon,
          target,
          overflowPart = "textShow",
          pageIcon
        }
      }
    } = state; //pageIcon  用于开启页面管理icon

    let menuList = (menu_data || {}).menuList || [];

    if (menuList.length < 1) {
      return null;
    }

    if (sort == "inverted") {
      menuList = [...menuList].reverse();
    } //sort栏目排序  倒序时把数组反转


    const pubChild = getSubmenuData(state);
    return menuList.map((e, i) => {
      const child = getSubmenuData(state, e, i) || pubChild;
      let _selected = ""; //标注当前选中项

      if (e.isCurrent || i == 0) {
        _selected = "selected";
      } //在发布的时候拼接占位


      if (Util.source) {
        _selected = `{$navs_${e.pid || e.id}}`;
      }

      let link = Component.getLinkHref(e, target);
      var DisplayModel = displayModel == 'lineFeed' ? 'toggle' : '';
      let isIcon = false,
        showIconClass = ""; //能显示icon时，单独给li加个class sxt 2020-7-3

      if (child && e.child && dropdownIcon) {
        isIcon = true;
        showIconClass = "showArrowstyle";
      }

      let _icon = e.icon ? e.icon : {
        iconClass: "yiyingbaoicon",
        iconName: ""
      }; //类型为pc时


      if (type == "pc") {
        return React.createElement("li", {
          className: `${id}Li mainNavLi ${DisplayModel} ${overflowPart} ${showIconClass} ${_selected}`,
          key: e.id
        }, React.createElement(Util.linkDecorator, {
          className: `${id}A mainNavLiA  `,
          link: link,
          type: "html"
        }, pageIcon ? this[`${type}Icon`]({
          id: id,
          icon: _icon,
          style: style,
          type: type
        }) : null, React.createElement("p", null, e.name), isIcon ? React.createElement("i", {
          className: `${id}i yiyingbaoicon`
        }, arrowIcon) : null), child && child.index == i ? React.createElement(Util.component, {
          component: child.component,
          key: child.component.id,
          clone: i != 0 && child.isClone ? true : false,
          props: {
            showItem: child.isClone ? undefined : showItem,
            type,
            target,
            "child": child.data,
            open: true
          }
        }) : null);
      }

      if (type == "mo" || type == "amp" || type == "mip") {
        let linkType = "html"; //类型为amp或mip时，link类型为传过来的类型

        if (type == "amp" || type == "mip") {
          linkType = type;
        }

        return React.createElement("li", {
          className: `${id}Li mainNavLi ${DisplayModel} ${overflowPart} ${showIconClass} ${_selected}`,
          key: e.id
        }, React.createElement(Util.linkDecorator, {
          className: `${id}A mainNavLiA `,
          link: link,
          type: linkType
        }, pageIcon ? this[`${type}Icon`]({
          id: id,
          icon: _icon,
          style: style,
          type: type
        }) : null, React.createElement("p", null, e.name)), e.child ? React.createElement("input", {
          className: "sideTrigger",
          type: "checkbox"
        }) : null, child && child.index == i ? React.createElement(Util.component, {
          component: child.component,
          key: child.component.id,
          clone: i != 0 && child.isClone ? true : false,
          props: {
            showItem: child.isClone ? undefined : showItem,
            type,
            target,
            "child": child.data
          }
        }) : null, e.child ? React.createElement("span", {
          className: "nav-icon"
        }, e.child ? React.createElement("i", {
          className: `${id}i yiyingbaoicon`
        }, arrowIcon) : null, " ") : null);
      }
    });
  },

  /**
  * @method menuLi li基本结构
  * @return {object} li基本结构
  */
  menuUl(prop) {
    const {
      component: {
        id
      },
      data: {
        theme_data: {
          style: {
            column
          }
        },
        document_data
      }
    } = prop.state;
    let columnClass = column ? "menuItemEqual" : "menuItemUnequal",
      twoLevelNavOpen = document_data.clicktwoLevelNavOpen == "true" ? "mouseclick" : "mouseover";

    if (prop.type == "mo") {
      let _list = Component.menuLi("mo", prop.state);

      if (!_list) {
        return null;
      } //没结构时，不读取结构 


      let ulClass = "",
        menuLength = "";

      if (_list.length <= 3) {
        ulClass = "menuIconHidden";
        menuLength = "menuLength" + _list.length;
      }

      return React.createElement("nav", {
        className: "nav horizontalNav"
      }, React.createElement("input", {
        type: "checkbox",
        id: id + "-toggle",
        className: "menuToggle"
      }), React.createElement("ul", {
        className: `${id}Ul mainNav menuUl ${ulClass} ${menuLength}`
      }, _list.slice(0, 3)), _list.length > 3 ? React.createElement("label", {
        htmlFor: id + "-toggle",
        className: "menuIcon yiyingbaoicon"
      }, React.createElement("i", null, "")) : null, _list.length > 3 ? React.createElement("ul", {
        className: `${id}Ul mainNav menuUl1`
      }, _list.slice(3)) : null);
    } else {
      return React.createElement("nav", {
        className: "nav"
      }, React.createElement("ul", {
        id: "pcMainnav",
        "data-switch": twoLevelNavOpen,
        className: `${id}Ul mainNav pcMainnav  ${columnClass}`
      }, Component.menuLi("pc", prop.state, prop.type)));
    }
  }

};

export default Component