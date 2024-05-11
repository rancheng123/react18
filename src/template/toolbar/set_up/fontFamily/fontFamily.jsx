// 导入 React 库
import React, { useState, useEffect } from 'react';
// 导入 dispatcher 工具
import Dispatcher from '@/system/tools/dispatcher';
// 导入样式表
import './style.css';
// 导入字体 JSON 数据
import fonts from './fonts.json';
// 导入自定义 UI 库或工具
import Layer from '@/system/widgets/layer';



export default function FontFamily() {
  const [familyShow, setfamilyShow] = useState(false);
  const [familyTab, setfamilyTab] = useState("system");
  const [familyData, setFamilyData] = useState("Arial");
  const [familyName, setFamilyName] = useState("Arial");
  const [pageNmae, setPageName] = useState([]);
  const [familList, setFamilyList] = useState([]);
  const [uschek, setUserCheck] = useState(false);
  useEffect(() => {
    let src = `${pageData.apiServiceUrl}index.php/fonts?list_rows=1000&page=1`;
    fetch(src, {
      method: 'GET',
      headers: {
        "webToken": pageData.webToken,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response => response.json()).then(data => {
      if (data.data) {
        var _item$data$theme_data, _item$data$theme_data2, _item$data$theme_data3, _item$data$theme_data4, _item$data$theme_data5, _item$data$theme_data6;

        let item = Dispatcher.dispatch("getIframeData");
        let name = ((_item$data$theme_data = item.data.theme_data) === null || _item$data$theme_data === void 0 ? void 0 : (_item$data$theme_data2 = _item$data$theme_data.SITE_HEADER) === null || _item$data$theme_data2 === void 0 ? void 0 : (_item$data$theme_data3 = _item$data$theme_data2.style) === null || _item$data$theme_data3 === void 0 ? void 0 : _item$data$theme_data3.fontPageFamily) ? (_item$data$theme_data4 = item.data.theme_data) === null || _item$data$theme_data4 === void 0 ? void 0 : (_item$data$theme_data5 = _item$data$theme_data4.SITE_HEADER) === null || _item$data$theme_data5 === void 0 ? void 0 : (_item$data$theme_data6 = _item$data$theme_data5.style) === null || _item$data$theme_data6 === void 0 ? void 0 : _item$data$theme_data6.fontPageFamily : "";

        if (name.indexOf('font_') == -1) {
          setFamilyName(name ? name : "Arial");
        } else {
          data.data.data.forEach(s => {
            let ids = name.split('_');

            if (ids[1] == s.id) {
              setFamilyName(s.name ? s.name : "Arial");
            }
          });
        }

        setFamilyData(name ? name : "Arial");
        setFamilyList(data.data.data);
      }
    }).catch(err => console.log("Oh, error", err));
  }, []); // 获取整个文档的根元素

  let rootElement = document.documentElement; // 添加点击事件监听器

  rootElement.addEventListener('click', function (event) {
    let buttonElement = document.getElementsByClassName('settingButton');
    let settingOption = document.getElementsByClassName('settingOption');

    if (!buttonElement[0].contains(event.target) && (settingOption.length == 0 || !settingOption[0].contains(event.target))) {
      setfamilyShow(false);
    }
  });
  let tabList = [{
    name: "systemFont",
    value: "system"
  }, {
    name: "customFont",
    value: "custom"
  }];

  const familyList = (list = [], value) => {
    let empower = ["楷体", "宋体", "黑体", "仿宋", "Arial", "思源黑体", "思源柔黑", "思源宋体", "BreeSerif", "Comfortaa", "Crimson", "KumbhSans", "Lato", "LeagueGothic", "LibreBaskerville", "Lora", "Manrope", "Merriweather", "NotoSans", "Poly", "SourceSansPro", "Ubuntu"];
    return list.map(e => {
      let name = e.name,
        size = e.size,
        hoveName = window.public.lang["fontFree"];

      if (!empower.includes(name)) {
        hoveName = window.public.lang["fontEmpower"];
      }

      // return React.createElement("li", {
      //   key: e.value,
      //   className: e.value == value ? 'on' : null,
      //   onClick: () => {
      //     setFamilyData(e.value);
      //     setFamilyName(e.name);
      //     setfamilyShow(false);
      //   }
      // }, React.createElement("p", {
      //   className: "textNameP"
      // }, name, size ? React.createElement("span", {
      //   className: "textNameSize"
      // }, " (", size, ")") : null), React.createElement("span", {
      //   className: "textHoverSpan"
      // }, hoveName));

      return (
        <li
          key={e.value}
          className={e.value === value ? 'on' : null}
          onClick={() => {
            setFamilyData(e.value);
            setFamilyName(e.name);
            setfamilyShow(false);
          }}
        >
          <p className="textNameP">
            {name}
            {size ? <span className="textNameSize"> ({size})</span> : null}
          </p>
          <span className="textHoverSpan">{hoveName}</span>
        </li>
      )
    });
  }; //自定义字体列表


  const familyCustomList = (list = [], value) => {
    if (list.length >= 1) {
      return list.map(e => {
        let keyFont = `font_${e.id}`;
        // return React.createElement("li", {
        //   key: e.id,
        //   className: keyFont == value ? 'on' : null,
        //   onClick: () => {
        //     setFamilyData('font_' + e.id);
        //     setFamilyName(e.name);
        //     setfamilyShow(false);
        //   }
        // }, e.name);
        return (
          <li
            key={e.id}
            className={keyFont == value ? 'on' : null}
            onClick={() => {
              setFamilyData(`font_${e.id}`);
              setFamilyName(e.name);
              setfamilyShow(false);
            }}
          >
            {e.name}
          </li>
        )
      });
    } else {
      return null;
    }
  };

  const onOk = () => {
    (async () => {
      try {
        if (pageNmae.length == 0) {
          Dispatcher.dispatch(`document_set`, {
            args: [`theme_data.SITE_HEADER.style.fontPageFamily`, familyData]
          });
          let savePage = Dispatcher.dispatch("savePage");
          await savePage.then(() => {
            let data = Dispatcher.dispatch("getIframeData"),
              dataItems = data.data.document_data.MAIN_MENU.items || [],
              tempitems = data.data.document_data.MAIN_MENU.tempitems || [];
            let pids = [];
            dataItems.forEach(element => {
              pids.push({
                id: element.pid,
                label: element.label
              });

              if (element.child) {
                element.child.forEach(s => {
                  pids.push({
                    id: s.pid,
                    label: s.label
                  });

                  if (s.child) {
                    s.child.forEach(d => {
                      pids.push({
                        id: d.pid,
                        label: d.label
                      });
                    });
                  }
                });
              }
            });
            tempitems.forEach(element => {
              pids.push({
                id: element.pid,
                label: element.label
              });
            });
            pids.push({
              id: 'kuangjiaye_888',
              label: '框架'
            });
            let pageList = [];
            pids.forEach((s, i) => {
              empty(s, i, pageList, pids);
            });
          });
        } else {
          setUserCheck(false);
          setPageName([]);
        }
      } catch (error) { }
    })();
  };

  const empty = (s, i, pageList, pids) => {
    setTimeout(() => {
      let ajaxData = {
        "sid": pageData.siteId,
        "tabType": "menu",
        "type": "replaceFont",
        "id": s.id
      };
      fetch("/desktop/index.php/Edit/Pages/pagesEditOperat", {
        method: 'POST',
        headers: {},
        body: JSON.stringify(ajaxData)
      }).then(response => response.json()).then(data => {
        pageList.push(s.label); // 每次加载完成后，向 loadingMsgs 数组中添加一条提示信息

        setPageName([...pageNmae, ...pageList]);

        if (pageList.length == pids.length) {
          window.location.reload();
        }
      });
    }, 500 * i);
    return true;
  };

  return React.createElement("div", {
    className: "settingFontPadding"
  }, React.createElement("div", {
    className: "settingFontTop"
  }, "\u5168\u5C40\u5B57\u4F53\uFF1A"), React.createElement("div", null, React.createElement("div", {
    style: {
      marginBottom: "5px"
    }
  }, "\u9ED8\u8BA4\uFF1A"), " ", React.createElement("div", {
    className: "settingSetDataP"
  }, React.createElement("div", {
    className: "rowMaxFont"
  }, familyName), React.createElement("div", null, React.createElement("button", {
    className: "settingButton",
    onClick: () => {
      setfamilyShow(true);
    }
  }, "\u66F4\u6362"))), familyShow ? React.createElement("div", {
    className: "setting-fontStyle-box settingOption"
  }, React.createElement("div", {
    className: "tabs-header"
  }, tabList.map(e => {
    return React.createElement("div", {
      key: e.value,
      onClick: () => {
        setfamilyTab(e.value);
      },
      className: e.value == familyTab ? 'tab-item tab_active' : "tab-item"
    }, window.public.lang[e.name]);
  })), familyTab == 'system' ? React.createElement("div", {
    className: "tabs-content"
  }, React.createElement("div", {
    className: "font-family-type-wrap type-wrap01"
  }, React.createElement("ul", null, familyList(fonts, familyData)))) : React.createElement("div", {
    className: "font-family-type-wrap type-wrap02"
  }, familList.length < 1 ? React.createElement("p", {
    className: "noFont"
  }, window.public.lang["uploadFontHelp"]) : null, React.createElement("div", {
    className: "type-wrapCon"
  }, React.createElement("ul", null, familyCustomList(familList, familyData))))) : null), React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, React.createElement("div", {
    className: "buttonFontAPP",
    onClick: () => {
      setUserCheck(true);
    }
  }, "\u6574\u7AD9\u5B57\u4F53\u66FF\u6362")), uschek ? React.createElement(Layer.open, {
    titles: ["提示："],
    area: ["466px", "250px"],
    close: () => {
      setPageName([]);
      setUserCheck(false);
    },
    ensure: () => onOk()
  }, pageNmae && pageNmae.length > 0 ? React.createElement("div", {
    className: "pressCss"
  }, pageNmae.map((e, i) => {
    return i >= pageNmae.length - 3 ? React.createElement("div", {
      className: "cssend"
    }, React.createElement("div", {
      className: "circle-with-checkbox"
    }), e, " \u9875\u9762\u66FF\u6362\u5B8C\u6BD5") : "";
  })) : React.createElement("div", {
    className: "cssMargin"
  }, React.createElement("div", {
    className: "csstitleFont"
  }, "1.\u6574\u7AD9\u5B57\u4F53\u66FF\u6362\u540E\u4E0D\u53EF\u8FD8\u539F\uFF0C\u8BF7\u8C28\u614E\u4F7F\u7528\uFF01"), React.createElement("div", {
    className: "csstitleFont"
  }, "2.\u5B57\u4F53\u66FF\u6362\u4F1A\u5237\u65B0\u7F16\u8F91\u754C\u9762\uFF0C\u8BF7\u786E\u4FDD\u7F51\u7AD9\u5DF2\u7ECF\u4FDD\u5B58\u6700\u65B0\u72B6\u6001 !"), React.createElement("div", {
    className: "csstitleFont1"
  }, "\u70B9\u51FB\u786E\u8BA4\u6309\u94AE\uFF0C\u9ED8\u8BA4\u60A8\u5DF2\u77E5\u6653\u4EE5\u4E0A\u63D0\u793A\u4FE1\u606F\u3002"))) : "");
}
