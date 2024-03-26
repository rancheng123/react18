import Dispatcher from "../tools/dispatcher";
import Layer from '../widgets/layer'

/**
 * @class {Save} 编辑页头部视图类
 * @author wyq
 * @version 1.0
 * @date 2019-11-29
 */

class Save {
  constructor(selector) {
    /** */
    this.url = `${window.pageData.base}/Edit/Response/save.html`;
    this.status = 0;
    this.saveStatus = "";
    this.selector = selector;
  }

  send() {
    const siteId = window.pageData.siteId;
    const iframeData = Dispatcher.dispatch("document_get");
    const pageId = iframeData.component.children[2].pageId;
    const pageData = Dispatcher.dispatch("getPageData", {
      value: pageId
    });
    const pageUpdateTime = pageData.data.document_data[pageId].page_update_time;
    return `sid=${siteId}&page_update_time=${pageUpdateTime != undefined ? pageUpdateTime : 0 //页面更新时间为undefined，则默认为零	
    }&masterPage=${encodeURIComponent(JSON.stringify({
      structure: iframeData.component,
      data: iframeData.data
    }))}&${pageId}=${encodeURIComponent(JSON.stringify({
      structure: pageData.component,
      data: pageData.data
    }))}${this.status == 1050 ? '&lock=1' : ''}`;
  }

  save() {
    //页面编辑过再执行保存
    if (window.public.editState == 'edit') {
      const data = this.send(); //数据存在向后台发送数据

      if (data) {
        let promise = this.saving(data);
        promise = promise.then(response => response.json());
        promise = promise.then(data => this.saved(data));
        return promise.catch(error => this.fail(error));
      }
    }
  }

  saving(data) {
    return fetch(this.url, {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: data
    });
  }

  saved(data) {
    if (data) {
      const {
        suc,
        msg
      } = data;
      this.status = suc;

      switch (suc) {
        case 0:
          this.success(data);
          break;

        case 1050:
          this.cover(msg);
          break;

        default:
          this.fail({
            message: msg
          });
          break;
      }
    }
  }

  success(msg) {
    this.updateTime(msg);
    window.public.editState = '';
  }

  fail(error) {
    Layer.alert({
      content: error.message,
      area: ["350px", "230xp"],
      ensure: true
    });
  }

  cover(msg) {
    //提示用户是否覆盖站点数据 确认 覆盖 ，取消 不覆盖
    Layer.confirm({
      area: ["350px", "230px"],
      content: msg,
      title: window.public.lang.prompt,
      close: true,
      cancel: () => window.location.reload(),
      ensure: () => this.save()
    });
  }

  updateTime(data) {
    const iframeData = Dispatcher.dispatch("document_get");
    const pageId = iframeData.component.children[2].pageId;
    Dispatcher.dispatch(`${pageId}_set`, {
      args: ['document_data.page_update_time', data.page_updata_time]
    });
  }

}

export default Save;

//# sourceURL=webpack:///./system/function/save.js?