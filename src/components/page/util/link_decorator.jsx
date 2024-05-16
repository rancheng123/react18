// 导入 React 库
import React from 'react';

/**
* @method LinkDecorator 链接公用拼接属性方法
*/
const LinkDecorator = {
  /**
  * @method pageAnchor 页面/锚点链接
  * @param {object} prop 属性对象
  * @return {object} 返回页面/锚点链接
  */
  pageAnchor(prop) {
    let link = prop.link || {},
      _href = "",
      linkData = {},
      _anchor = null;

    if (link.pageId) {
      if (link.itemId && (link.linkToType == "menu" || link.linkToType == "template")) {
        let _url = link.url; //类型为动画时并且是pc页面时，链接拼接方法改变 

        if (link.anchorType == "cartoon" && prop.type == "html") {
          let speed = link.speed || 0;

          if (_url && _url.substr(0, 1) != '/') {
            //如果该url第一个字符不为/时候就拼接一个斜杠 
            _url = `/${_url}`;
          }

          _href = `#/back/#${link.itemId}/${speed}${_url}`;
        } else {
          _href = _url + "#" + link.itemId;
        }

        _anchor = link.itemId;
      } else {
        _href = link.url; //+ (link.anchorId ? "#" + link.anchorId : "");
      }
    }

    return {
      href: _href || null,
      target: _href ? link.target || null : null,
      rel: link.nofollow == "openTurn" ? "nofollow" : null,
      "data-anchorid": _anchor
    };
  },

  /**
  * @method externalLinks 外部链接
  * @param {object} prop 属性对象
  * @return {object} 外部链接
  */
  externalLinks(prop) {
    let link = prop.link || {};
    let url = link.url && link.url.replace(/\s*/g, "");
    return {
      href: url || null,
      target: url ? link.target || null : null,
      rel: link.nofollow == "openTurn" ? "nofollow" : null
    };
  },

  /**
  * @method email 邮箱链接
  * @param {object} prop 属性对象
  * @return {object} 邮箱链接链接
  */
  email(prop) {
    let link = prop.link;
    let recipient = link.recipient && link.recipient.replace(/\s*/g, "");
    let mailTheme = link.mailTheme ? "?subject=" + link.mailTheme : "",
      presetContent = link.presetContent ? "?body=" + link.presetContent : ""; //丽君让加新增的预设内容

    let mailtoKey = "";

    if (mailTheme) {
      mailtoKey = mailTheme;
    }

    if (presetContent) {
      mailtoKey = presetContent;
    }

    if (mailTheme && presetContent) {
      mailtoKey = `?body=${link.presetContent}&subject=${link.mailTheme}`;
    }

    return {
      href: "mailto:" + recipient + mailtoKey
    };
  },

  /**
  * @method phone 手机链接
  * @param {object} prop 属性对象
  * @return {object} 手机链接
  */
  phone(prop) {
    let phoneNumber = prop.link.phoneNumber && prop.link.phoneNumber.replace(/\s*/g, "");
    return {
      href: phoneNumber ? "tel:" + phoneNumber : null
    };
  },

  /**
  * @method phone 返回链接
  * @param {object} prop 属性对象
  * @return {object} 返回链接
  */
  back(prop) {
    let link = prop.link || {},
      _back = null,
      speed = link.speed || 0,
      _on = null,
      tagname = null,
      role = null,
      tabIndex = null;

    if (prop.type == "html") {
      _back = "/back/" + link.back + "/" + speed; //link.back=="prev"?"javascript:history.back(-1)":
    }

    if (prop.type == "amp") {
      //amp只支持返回顶部，只在top时拼事件
      if (link.back == "top" || link.back == "bottom") {
        _on = `tap:document.scrollTo(duration=${Number(speed) * 1000},position=${link.back})`;
        tagname = "div";
        role = "back";
        tabIndex = "10";
      }

      _back = null;
    }

    if (prop.type == "mip") {
      if (link.back == "top" || link.back == "bottom") {
        _on = `tap:document.scrollTo(duration=${Number(speed) * 1000},position=${link.back})`;
        tagname = "div";
      }

      if (link.back == "prev") {
        _on = "tap:MIP.goBack";
        tagname = "div";
      }

      _back = null;
    }

    return {
      "data-functionback": _back,
      on: _on,
      role: role,
      tabIndex: tabIndex,
      tagname: tagname
    };
  },

  /**
  * @method onlineConsulting 在线咨询
  * @param {object} prop 属性对象
  * @return {object} 在线咨询链接
  */
  onlineConsulting(prop) {
    let link = prop.link || {},
      _consultName = "";
    let account = link.account && link.account.replace(/\s*/g, ""),
      presetContent = link.presetContent || "";

    if (link.consultValue == "qq") {
      _consultName = account ? "http://wpa.qq.com/msgrd?v=3&uin=" + account + "&site=qq&menu=yes" : null;
    } else if (link.consultValue == "skype") {
      //获取skpye咨询方式 ，voiceCall类型时为call  instantMessage类型时为chat
      let _skypeMode = link.skypeMode || "voiceCall",
        _skypeType = _skypeMode == "instantMessage" ? "chat" : "call";

      _consultName = account ? "skype:" + account + "?" + _skypeType : null;
    } else if (link.consultValue == "whatsApp") {
      //_consultName=account?"https://api.whatsapp.com/send?phone="+account:null;
      _consultName = account ? "whatsapp://send?phone=" + account : null;

      if (account && presetContent) {
        _consultName = `${_consultName}&text=${presetContent}`;
      } //presetContent

    } else if (link.consultValue == "whatsappPc") {
      if (account) {//链接中不能有符号，只能有数字 
        //account=account.replace(/[^0-9]/ig,"");
      }

      _consultName = account ? "https://api.whatsapp.com/send?phone=" + account : null;

      if (account && presetContent) {
        _consultName = `${_consultName}&text=${presetContent}`;
      }
    }

    return {
      href: _consultName,
      target: "_blank"
    };
  },

  /**
  * @method download 下载
  * @param {object} prop 属性对象
  * @return {object} 下载链接
  */
  download(prop) {
    let link = prop.link || {};
    return {
      href: link.downloadLink ? link.downloadLink : null,
      target: "_blank"
    };
  },

  /**
  * @method lightbox 弹出窗口
  * @param {object} prop 属性对象
  * @return {object} 弹出窗口链接
  */
  lightbox(prop) {
    let ejectBoxId = prop.link.ejectBoxId || "",
      _on = null,
      _role = null,
      _tabIndex = null,
      _dataLightbox = ejectBoxId || null;

    if (prop.type == "amp" || prop.type == "mip") {// _on=`tap:${ejectBoxId}.open`;
      // _dataLightbox="";
      // if(prop.type=="amp"){ _role = "ejectBox"; tabIndex = "1";}
    }

    return {
      "data-lightbox": _dataLightbox,
      on: _on,
      role: _role,
      tabIndex: _tabIndex
    };
  },

  /**
  * @method languageLinks 语言链接
  * @param {object} prop 属性对象
  * @return {object} 语言链接
  */
  languageLinks(prop) {
    let languageType = prop.link.languageType || null;
    return {
      "data-languagetype": languageType,
      href: languageType ? `{$mult_${languageType}}` : null,
      target: languageType ? "_self" : null
    };
  },

  /**
  * @method functionalLinks 功能链接
  * @param {object} prop 属性对象
  * @return {object} 功能链接
  */
  functionalLinks(prop) {
    // //绑定Panel的结构
    // if(mode=="amp"){
    //     //AMP原生的绑定Panel结构
    //     return (<yq-div class={className} role = "panel" tabIndex = "1"  on={`tap:SITE_PANEL.toggle`}   dangerouslySetInnerHTML = {{__html:html}}></yq-div>)
    // }else if(mode=="custom"){
    //     //通过label显示隐藏的功能
    //     return (<label   className={className}   htmlFor = "header-trigger"  dangerouslySetInnerHTML = {{__html:html}}></label>)
    // }
    let link = prop.link || {},
      functionalLinkType = link.functionalLinkType,
      successText = link.successText || null,
      shopid = link.shopid; //successText成功后的提示文本 

    let action = link.action; //类型是amp时

    if (prop.type == "amp") {
      if (functionalLinkType == "bindPanel") {
        return {
          role: "panel",
          tabIndex: "1",
          on: `tap:SITE_PANEL.toggle`
        };
      } //新增购物车


      if (functionalLinkType == "addMoreShopCart") {
        return {
          tagname: "div",
          formData: {
            method: "POST",
            target: "_top",
            "action": action,
            operation: "add",
            pageType: "amp",
            type: functionalLinkType,
            successText: successText,
            shopid: shopid
          }
        };
      } //清空购物车


      if (functionalLinkType == "emptyMoreShopCart") {
        return {
          tagname: "div",
          formData: {
            method: "POST",
            target: "_top",
            "action": action,
            operation: "clear",
            pageType: "amp",
            type: functionalLinkType,
            successText: successText
          }
        };
      } //类型为询盘时


      if (functionalLinkType == "inquiryMoreShopCart") {
        return {
          tagname: "div",
          formData: {
            method: "GET",
            target: "_top",
            "action": action,
            pageType: "amp",
            type: functionalLinkType,
            shopid: shopid
          }
        };
      } // if(successHerf)
      // {
      //   validation+= 'action = {submit_action}  method = get';
      // }else{
      //   validation += 'action-xhr =  {submit_action} method = post';
      // }
      //<yq-form custom = {validation} target = "_top">

    } else if (prop.type == "mip") {
      if (functionalLinkType == "bindPanel") {
        return {
          on: `tap:SITE_PANEL.open`
        };
      } //新增购物车


      if (functionalLinkType == "addMoreShopCart") {
        return {
          tagname: "div",
          formData: {
            method: "POST",
            target: "_top",
            "action": action,
            operation: "add",
            pageType: "mip",
            type: functionalLinkType,
            successText: successText,
            shopid: shopid
          }
        };
      } //清空购物车


      if (functionalLinkType == "emptyMoreShopCart") {
        return {
          tagname: "div",
          formData: {
            method: "POST",
            target: "_top",
            "action": action,
            operation: "clear",
            pageType: "mip",
            type: functionalLinkType,
            successText: successText
          }
        };
      } //类型为询盘时


      if (functionalLinkType == "inquiryMoreShopCart") {
        return {
          tagname: "div",
          formData: {
            method: "GET",
            target: "_top",
            "action": action,
            pageType: "mip",
            type: functionalLinkType,
            shopid: shopid
          }
        };
      }
    } //类型为加入购物车时，存储商品id


    let _shopid = null,
      _formAction = null;

    if (functionalLinkType == "addMoreShopCart" || functionalLinkType == "inquiryMoreShopCart") {
      _shopid = shopid || "<goodsid></goodsid>";
    }

    if (functionalLinkType == "inquiryMoreShopCart") {
      _formAction = action;
    }

    return {
      href: link.url ? link.url : null,
      target: "_self",
      "data-action": _formAction,
      "data-shopid": _shopid,
      "data-success": successText,
      "data-functionallink": functionalLinkType ? functionalLinkType : null
    };
  },

  /**
  * @method formButton 表单提交按钮
  * @param {object} prop 属性对象
  * @return {object} 表单提交按钮
  */
  formButton(prop) {
    let _id = prop.link.id || "";

    if (prop.type == "amp") {
      //表单的按钮结构
      //  return (<yq-button class={className}  on={`tap:AMP.setState({${id.replace("-","_")}_formState: 1})`}   
      //  role = "formButton" tabIndex = "1"   type="submit" id = "form-submit"  dangerouslySetInnerHTML = {{__html:html}}></yq-button>)
      return {
        on: _id ? `tap:AMP.setState({${_id}_formState: 1})` : null,
        role: "formButton",
        tagname: "button",
        tabIndex: "1",
        type: "submit",
        id: _id ? `form-${_id}` : null
      };
    }

    if (prop.type == "mip") {
      //表单的按钮结构
      return {
        role: "formButton",
        tagname: "button",
        type: "submit",
        id: "form-submit"
      };
    }
  },

  /**
   * @method annexDownload 下载附件
   * @param {object} prop 参数对象
   * @return {object} 链接对象 
   */
  annexDownload(prop) {
    let link = prop.link || {},
      annexType = link.annexType || "link",
      href = "{$rs.url}",
      target = "_self";

    if (annexType == "download") {
      href = "{$rs.annex_url}";
      target = "_blank";
    } else if (annexType == "preview") {
      href = "{$rs.annex_online_url}";
      target = "_blank";
    }

    return {
      href: href,
      target: target
    };
  },

  /**
   * @method sourceLink 数据源链接
   * @param {object} prop 参数对象
   * @return {object} 链接对象 
   */
  sourceLink(prop) {
    const {
      target = '_self',
      href
    } = prop.link;
    return {
      href,
      target
    };
  },

  /**
  * @method getTag 获取标签
  * @param {object} attributes 链接属性
  * @return {object} 功能链接
  */
  getTag(attributes) {
    //类型里指定标签时，直接返回标签
    if (attributes.tagname) {
      return attributes.tagname;
    } else {
      return attributes.href ? "a" : "div";
    }
  },

  /**
  * @method shopCart 返回购物车功能的表单结构
  * @param {object} prop 属性对象
  * @return {object} 页面链接结构返回
  */
  shopCart(getTag, attributes, prop) {
    let formData = attributes.formData || {},
      method = formData.method,
      //请求方式
      target = formData.target,
      //打开方式
      action = formData.action,
      //请求路径
      operation = formData.operation,
      //操作方式
      pageType = formData.pageType,
      //页面类型
      shopid = formData.shopid || "<goodsid></goodsid>",
      //商品id
      type = formData.type,
      _btnhtml = "";
    delete attributes.formData;

    if (method == "POST") {
      let _shopOn = null;

      if (pageType == "amp") {
        if (operation == "add") {
          _shopOn = "tap:AMP.setState({shopcartData:{shops:shopcartData.shops+1}})";
        }

        if (operation == "clear") {
          _shopOn = "tap:AMP.setState({shopcartData:{shops:0}})";
        }

        let _application = `<div><input type="hidden" name="number" class="tb-text" value="1" title="" [value]="goodsNumber.number||1" /><input type="hidden" name="action" value=${operation} /><input type="hidden"  name="goodsId" value=${shopid} /></div>`;
        _btnhtml = React.createElement("form", {
          className: "ampctlBtn",
          method: method,
          target: target,
          "action-xhr": action
        }, React.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: _application
          }
        }), React.createElement("button", {
          type: "submit",
          role: "formButton",
          tabIndex: "10",
          on: _shopOn
        }, prop.children));
      }

      if (pageType == "mip") {
        if (operation == "add") {
          _shopOn = "tap:MIP.setData({shopcartData:{shops:shopcartData.shops+1}})";
        }

        if (operation == "clear") {
          _shopOn = "tap:MIP.setData({shopcartData:{shops:0}})";
        }

        let _application = `<div><input type="hidden" name="number" class="tb-text" value="1" title="" m-bind:value="goodsNumber.number||1" /><input type="hidden" name="action" value=${operation} /><input type="hidden"  name="goodsId" value=${shopid} /></div>`;
        _btnhtml = React.createElement("mip-form", {
          class: "ampctlBtn",
          method: method,
          target: target,
          "fetch-url": action
        }, React.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: _application
          }
        }), React.createElement("button", {
          type: "submit",
          on: _shopOn
        }, prop.children));
      }
    } else {
      if (pageType == "amp") {
        _btnhtml = React.createElement("form", {
          className: "ampctlBtn",
          method: method,
          target: target,
          action: action
        }, React.createElement("input", {
          type: "hidden",
          name: "number",
          class: "tb-text",
          value: "1"
        }), React.createElement("input", {
          type: "hidden",
          name: "action",
          value: "add"
        }), React.createElement("input", {
          type: "hidden",
          name: "goodsId",
          value: shopid
        }), React.createElement("button", {
          type: "submit",
          role: "formButton",
          tabIndex: "1"
        }, prop.children));
      }

      if (pageType == "mip") {
        _btnhtml = React.createElement("mip-form", {
          class: "ampctlBtn",
          method: method,
          target: target,
          url: action
        }, React.createElement("input", {
          type: "hidden",
          name: "number",
          class: "tb-text",
          value: "1"
        }), React.createElement("input", {
          type: "hidden",
          name: "action",
          value: "add"
        }), React.createElement("input", {
          type: "hidden",
          name: "goodsId",
          value: shopid
        }), React.createElement("button", {
          type: "submit",
          role: "formButton",
          tabIndex: "1"
        }, prop.children));
      }
    }

    return React.createElement(getTag, attributes, _btnhtml);
  },

  /**
  * @method html 页面链接结构返回
  * @param {object} prop 属性对象
  * @return {object} 页面链接结构返回
  */
  html(prop) {
    debugger
    let attributes = {};

    if (prop.link && this[prop.link.type]) {
      attributes = this[prop.link.type](prop);
    }

    attributes.className = prop.className || null;

    if (prop.id) {
      attributes.id = prop.id || null;
    }

    let getTag = this.getTag(attributes);

    if (attributes.tagname) {
      // //标签名为 mip-gototop时，证明是mip的返回顶部 
      // if(attributes.tagname=="mip-gototop"){
      //     attributes.class = prop.className || null;//此标签要用class不能用className
      //     delete attributes.className
      // }
      delete attributes.tagname;
    } // method:"POST",
    // target:"_blank",
    // "custom":action formData:{method:"GET",target:"_blank","custom":action}
    //返回的数据中有formData时，要返回表单结构 


    if (attributes.formData) {
      return this.shopCart(getTag, attributes, prop);
    } else {
      return React.createElement(getTag, attributes, prop.children);
    }
  }

};

export default LinkDecorator;
