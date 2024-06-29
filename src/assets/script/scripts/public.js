function objectToQueryString(obj) {
  return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
}

//动画类
var Animation = (function ($) {
  /**
   * @class ChangeType 动画类
   * @date 2020-04-03
   * @author wyq
   */
  function Animation() {
    var animation_data = $('#animate').text().trim();

    this.names = null;

    if (animation_data) {
      this.data = JSON.parse(animation_data);
    }

    this.data && this.IEVersion() && this.listen();
  }

  //原型赋值
  Animation.prototype = {
    IEVersion: function () {
      // 取得浏览器的userAgent字符串
      var userAgent = navigator.userAgent;
      // 判断是否为小于IE11的浏览器
      var isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
      if (isLessIE11) {
        return false;
      }
      return true;
    },
    /**
     * @method setAnimation 设置动画
     * @date 2020-04-03
     * @author wyq
     * @param {object} element 节点对象
     * @param {string} name 动画字符串
     */
    setAnimation: function (element, name) {
      var names = name.split(' ');
      //设置动画执行时间
      element.style.animationDuration = names[1];
      //设置动画延时时间
      element.style.animationDelay = names[2];
      //给动画赋值，开始播放动画
      element.setAttribute("data-name", names[0])
    },
    /**
     * @method listen 绑定滚动监听事件
     * @date 2020-04-03
     * @author wyq
     */
    listen: function () {
      var self = this;

      ListenToScroll({
        ele: Object.keys(self.data),
        scrollBefore: function (ele) {
          if (self.data[ele.id]) {
            //设置透明度
            self.data[ele.id].indexOf('aNone') == -1
              &&
              ele.style.opacity != '0'
              &&
              (ele.style.opacity = '0');
          }

        },
        scrolled: function (ele, i, list) {
          if (self.data[ele.id]) {
            var next = list[i + 1] || {};
            //执行动画
            self.data[ele.id].indexOf('aNone') == -1
              &&
              self.setAnimation(ele, self.data[ele.id]);
            //下一个控件的id与当前控件id不同删除动画属性
            next.id != ele.id && delete self.data[ele.id];
          }

        }
      })
    },
    /**
     * @method clearAnimation 清空动画
     * @date 2020-11-13
     * @author wyq
     * @param {object} element 节点对象 
     */
    clearAnimation: function (element) {
      var animations = element.querySelectorAll('[data-name]');

      if (animations && animations.length) {
        var self = this;

        $(animations).each(function (index, item) {
          var obj = { id: item.id, name: item.getAttribute('data-name') };

          self.names ? self.names.push(obj) : self.names = [obj];
          //清除动画
          item.removeAttribute('data-name');
        })
      }
    },
    /**
     * @method reloadAnimation 重新加载动画 
     * @date 2020-11-13
     * @author wyq
     * @param {object} element 节点对象 如果执行过清空动画方法，此方法会重新加载被清空的动画（注意：参数要与清空动画方法参数一致，才可以正常运行）
     */
    reloadAnimation: function (element) {
      //names 存在循环names中的动画数据
      if (this.names) {
        this.names.forEach(function (e) {
          var item = document.querySelector('#' + e.id);

          item && item.setAttribute('data-name', e.name);
        })

        this.names = null;
      }
      else {   //调用hiddenAnimation
        Animation.hiddenAnimation(element.querySelectorAll('[data-name]'))
      }
    }
  }

  Animation.hiddenAnimation = function (list) {
    if (list && list.length) {
      for (var i = 0; i < list.length; i++) {
        (function (index) {
          var dataName = $(list).eq(index).attr("data-name");
          if (dataName) {
            var listCurrent = $(list).eq(index);
            listCurrent.removeAttr("data-name");
            var timer = setTimeout(function () {
              listCurrent.attr("data-name", dataName)
              clearTimeout(timer);
            }, 5)
          }
        })(i);
      }
    }
  }
  return Animation;
})(jQuery)

var Flipper = (function () {
  function Flipper() {
    this.element = document.querySelector('[data-mode = "flipper"]');
    //存在翻屏控件，继续执行
    if (this.element) {
      var header = document.querySelector('#SITE_HEADER');

      var top = this.element.offsetTop;

      if (header) { this.isTop = top <= header.offsetHeight ? true : false; }
      else { this.isTop = top <= 0 ? true : false; }

      this.index = 0;

      this.delta = 0;

      this.hash = '';

      this.top = 0;
      //绑定this
      this.onwheel = this.onwheel.bind(this);

      this.len = this.element.children.length;

      this.calcOne(); this.bindEvent();
    }
  }

  Flipper.prototype = {
    /**
     * @method bindEvent 事件绑定
     * @date 2020-08-06
     * @author wyq
     */
    bindEvent: function () {
      var root = document.querySelector('#document');

      var frames = this.element.querySelectorAll("iframe"), len = frames.length;
      //判断是否存在iframe
      if (len) {   //循环给iframe绑定onwheel事件
        for (var i = 0; i < len; i++) {
          var frame = frames[i];
          //判断是否是在同域下，如果在同域下执行此代码，否则不执行
          if (frame.src.indexOf(location.hostname) != -1) {
            var win = frame.contentWindow;

            if (win.document.onwheel === null) { win.document.onwheel = this.onwheel; }
            else { win.document.onmousewheel = this.onwheel; }
          }
        }
      }
      //绑定鼠标滚轮事件
      if (root.onwheel === null) { root.onwheel = this.onwheel; }
      else { root.onmousewheel = this.onwheel; }
    },
    /**
     * @method onwheel 滚轮事件处理方法
     * @date 2020-08-11
     * @author wyq
     */
    onwheel: function (event) {
      var x = event.pageX, y = event.pageY;

      var name = event.currentTarget.nodeName;

      var layout = this.element.getBoundingClientRect();

      this.scrollY = document.documentElement.scrollTop || document.body.scrollTop;

      var top = layout.top + this.scrollY, bottom = top + layout.height;

      var isRange = x >= layout.left && x <= layout.right && y >= top && y <= bottom;
      //鼠标指针在翻屏范围内允许翻屏或事件监听者是document允许翻屏
      if (isRange || name == '#document') {
        this.delta = 0;

        if (event.deltaY >= 78 || event.wheelDelta <= -120) { this.delta = 1; }

        if (event.deltaY <= -78 || event.wheelDelta >= 120) { this.delta = -1; }

        this.isroll() && this.roll();

        name != '#document' && event.preventDefault();
      }
    },
    /**
     * @method calcOne 计算第一屏高度
     * @date 2020-08-06
     * @author wyq
     */
    calcOne: function () {
      var header = document.querySelector('#SITE_HEADER');
      //头部存在并且siTop为true
      if (header && this.isTop) {
        var fixed = header.getAttribute('data-float');

        var child = header.querySelector("[data-fixed='true']");
        //存在固定定位的子节点并且子节点高度与头部相等
        var fiexdChild = child && child.offsetHeight == header.offsetHeight;  //&& fiexdChild != true
        //头部不是固定定位
        if (fixed != 'true') {
          var h = header.offsetHeight;

          var frist = this.element.children[0];

          frist.style.height = 'calc(100vh - ' + h + 'px)';
        }
      }
    },
    /**
     * @method isroll 是否允许滚动
     * @date 2020-08-06
     * @author wyq
     * @return {boolean} true 允许滚动 fasle 不允许滚动
     */
    isroll: function () {
      var doc = document.querySelector('#document');

      var pheight = doc.scrollHeight, wheight = window.innerHeight;

      var bottom = this.element.getBoundingClientRect().bottom + this.scrollY;

      var unscroll = pheight - bottom > wheight && this.scrollY > bottom;

      var start = this.isTop ? 0 : -1;

      if (ScrollAnimation.timer > 0 || this.delta == 0) { return false; }

      if (this.delta == -1 && (this.index <= start || unscroll)) { return false; }

      if (this.delta == 1 && this.index >= this.len) { return false; }

      return true;
    },
    /**
     * @method rollIndex 当前滚动第几屏处理
     * @date 2020=08-08
     * @author wyq
     */
    rollIndex: function () {
      //锚点中存在标识符时要去掉，防止找控件找不到的问题 sxt 2020-9-25
      var hash = (location.hash || '').replace("_anchor", "");
      //存在hash且与已经存储的hash不相等
      if (hash && this.hash != hash) {
        var child = document.querySelector(hash);
        //包含这个子节点
        if (this.element.contains(child)) {   //存储hash值
          this.hash = hash;
          //循环
          for (var i = 0; i < this.len; i++) {
            var item = this.element.children[i];

            if (item.id == child.id) { this.index = i; break; }
          }
        }
      }
    },
    /**
     * @method roll 滚动
     * @date 2020-08-06
     * @author wyq
     */
    roll: function () {
      var duration = Number(this.element.getAttribute('data-duration') || 0.1);

      var rect = this.element.getBoundingClientRect();

      var y = Math.round(rect.y || rect.top);

      if (this.index == 0 && !this.isTop && y > 0) {
        this.top = y + this.scrollY;

        ScrollAnimation(this.top, duration * 1000);
      }
      else {
        this.rollIndex();

        this.index = this.index + (this.delta == 1 ? 1 : -1);

        var element = document.querySelector('#SITE_HEADER>div[data-fixed="true"]'),
          top = this.top - (element ? element.offsetHeight : 0);

        ScrollAnimation(window.innerHeight * this.index + top, duration * 1000);
      }
    }
  }

  return Flipper;
})();

//记录当前页面网址，作为下单网址
(function UserSource(saveKey, paramKey) {
  if (document.referrer == '') {
    localStorage.removeItem("UTM_SOURCE_LIST")
  }

  if (saveKey == undefined || saveKey == '') { saveKey = 'UTM_SOURCE_LIST' }

  if (paramKey == undefined || paramKey == '') { paramKey = 'utm_source' }
  //设置UTM_SOURCE获取方法
  Object.defineProperty(window, saveKey, {
    get: function () {
      var source_list = localStorage.getItem(saveKey);

      return source_list ? JSON.parse(source_list) : undefined;
    }
  })
  // 统计订单归因
  function saveUTMSourceNumber() {
    var utm_source = JSON.parse(localStorage.getItem(saveKey) || '[]'), len = utm_source.length;
    //判断链接内是否包含utm_source
    if (new RegExp(paramKey).test(location.search)) {
      var referer = document.referrer, href = location.href,
        curInfo = { session: parseInt(Date.now() / 1000), referer: referer, event_source_url: href };
      //判断长度是否大于等于一。小于1不做逻辑处理，直接存储
      if (len >= 1) {
        var source_url = utm_source[0].event_source_url,
          time = (Date.now() - utm_source[0].session * 1000);
        //url相同并且时差为超过24小时或url不同且reffer中存在utm_source不重复记录
        if ((source_url == href && time <= 3600000) || (source_url != href && new RegExp(paramKey).test(referer))) { return void (0); }
        //长度大于等于15时删除老的一条
        len >= 15 && utm_source.shift();
      }
      //
      utm_source.push(curInfo);
      //
      localStorage.setItem(saveKey, JSON.stringify(utm_source));
    }
  }

  saveUTMSourceNumber(); // 订单归因
})('UTM_SOURCE_LIST', 'utm_source');

/**
* @function ScrollAnimation 滚动条滚动动画
* @date 2020-08-04
* @author wyq
* @param {number} opts.speed 滚动速度
* @param {number} opts.scrollEnd 结束值 
*/
function ScrollAnimation(scrollend, time) {
  var delement = document.documentElement, body = document.body;

  var scrollTop = delement.scrollTop || body.scrollTop;

  var scrollValue = body.scrollHeight - window.innerHeight;

  (scrollend < 0 || scrollend > scrollValue)
    &&
    (scrollend = scrollend < 0 ? 0 : scrollValue)

  var speed = Math.ceil((scrollend - scrollTop) / time);
  //滚动函数
  function scroll() {
    var scrollTop = Math.ceil(delement.scrollTop || body.scrollTop), end = scrollTop + speed;

    if (speed > 0 && end > scrollend || speed < 0 && end < scrollend) { speed = Math.ceil(scrollend - scrollTop); }

    //如果滚动条小于滚动结束值，执行滚动条滚动
    if (speed > 0 && scrollTop < scrollend || speed < 0 && scrollTop > scrollend) {
      window.scrollBy(0, speed);
    }
    else {
      var timer = setTimeout(function () {
        clearInterval(ScrollAnimation.timer);

        clearTimeout(timer);

        ScrollAnimation.timer = -1;
      }, 10)

    }
  }
  //绑定定时器
  ScrollAnimation.timer = setInterval(scroll, 0);
}
/**
* @function ListenToScroll 监听指定元素是否滚动到可视区域，并执行程序处理
* @date 2020-07-09
* @author wyq
* @param {object} opts 参数对象
* @param {array|object} opts.ele 需要被监听的元素列表
* @param {function} opts.scrollBefore 滚动到指定区域之前触发方法
* @param {function} opts.scrolled 滚动到指定区域后触发方法
* @param {function} opts.scrollEnd 滚动结束后触发方法
*/
function ListenToScroll(opts) {
  var clientHeight = document.documentElement.clientHeight,
    list = [];
  /**
   * @function elements 元素节点处理方法
   * @date 2020-07-09
   * @author wyq
   */
  function elements(eles) {
    var len = eles.length;
    //判断元素列表长度
    if (len) {   //循环元素列表
      for (var i = 0; i < len; i++) {
        var ele = eles[i];
        //判断元素是否是字符串
        typeof ele == 'string'
          ?
          elements(document.querySelectorAll('#' + ele))
          :
          list.push(ele)
      }
    }
  }

  /**
   * @function scroll 滚动触发事件
   * @date 2020-07-09
   * @author wyq
   */
  function scroll() {
    var i = 0;
    //循环
    while (list.length && i < list.length) {
      var element = list[i];
      //获取节点布局数据
      var top = element.getBoundingClientRect().top;
      //参数为undefined，表示不是第一屏，则加上100 2020-09-01 by wyq
      if (arguments[0] == undefined) { top = top + 100; }

      opts.scrollBefore && opts.scrollBefore(element, i, list);
      //判断动画元素是否在可视区域内
      if (top <= clientHeight) {
        opts.scrolled(element, i, list);

        list.splice(i, 1);
      }
      //如果当前元素与数组中取出的当前元素相等，执行+1
      if (element == list[i]) { i = i + 1; }
    }
    //长度小于等于零时
    if (list.length <= 0) {
      opts.scrollEnd && opts.scrollEnd();

      window.removeEventListener('scroll', scroll);
    }
  }

  /**@function main 入口函数 */
  !function main() {
    elements(opts.ele);
    scroll(1);

    window.addEventListener('scroll', scroll);
  }()
}

//获取浏览器版本
function ieVersion() {
  var UA = navigator.userAgent;

  if (/msie/i.test(UA)) {

    return UA.match(/msie (\d+\.\d+)/i)[1];
  }
  else if (UA.toLowerCase().indexOf('trident') != -1 && UA.indexOf('rv') != -1) {

    return UA.match(/rv:(\d+\.\d+)/)[1];
  }

  return false;
}

/**
* @class ButtonCode 按钮执行代码类
* @date 2020-12-2
* @author wyq
*/
var ButtonCode = (function () {
  /**
   * @constructor ButtonCode 按钮执行代码构造函数
   * @date 2020-12-2
   * @author wyq
   * @param {object} button 按钮节点对象 
   */
  function ButtonCode(button) {
    /**@property button 按钮节点对象 */
    this.button = button;
    /**@property script script节点对象 */
    this.script = null;
    //初始化
    this.init();
  }
  //原型对象
  ButtonCode.prototype = {
    structure: ButtonCode,
    /**
     * @method init 初始化方法
     * @date 2020-12-2
     * @author wyq
     */
    init: function () {
      var scripts = document.querySelectorAll('.button-code');
      //循环标签对象
      for (var i = 0, len = scripts.length; i < len; i++) {
        this.script = scripts[i];

        var data = this.getCode();
        //存在点击要执行的代码则执行点击处理
        data.clickcode && this.click(data.clickcode);
        //存在双击要执行的代码则执行双击处理
        data.doublecode && this.double(data.doublecode);
      }
    },
    /**
     * @method getCode 获取要执行的代码
     * @date 2020-12-2
     * @author wyq
     */
    getCode: function () {
      //脚本对象是否为undefined
      if (this.script == undefined) {
        this.script = this.button.querySelector('button-code');
      }
      //脚本对象存在执行逻辑
      if (this.script) {
        var data = JSON.parse(this.script.textContent);

        if (data.clickcode) { data.clickcode = this.format(data.clickcode); }

        if (data.doublecode) { data.doublecode = this.format(data.doublecode) }

        if (data.submitcode) { data.submitcode = this.format(data.submitcode); }

        return data;
      }

      return null;
    },
    /**
     * @method format 格式化代码
     * @date 2020-12-2
     * @author wyq
     * @param {string} code 要格式化的代码 
     */
    format: function (code) {
      var codes = code.split(";"), codeStr = "";

      for (var i = 0, len = codes.length; i < len; i++) {   //检查代码是否符合规范，不符合则不添加到待执行字符串中
        if (/^[\w$]+\((.*)\)$/.test(codes[i])) {
          codeStr = codeStr + (codes[i] || '') + ';';
        }
      }

      return codeStr;
    },
    /**
     * @method click 点击执行代码
     * @date 2020-12-2
     * @author wyq
     * @param {string} code 要执行的代码 
     */
    click: function (code) {
      if (code) {
        var button = this.script.parentNode;

        button.onclick = function () { eval(code); }
      }
    },
    /**
     * @method double 双击执行代码
     * @date 2020-12-2
     * @author wyq
     * @param {string} code 要执行的代码 
     */
    double: function (code) {
      if (code) {
        var button = this.script.parentNode;

        button.ondblclick = function () { eval(code); }
      }
    }
  }

  return ButtonCode;
})();

//链接方法类
var LinkFn = function () {
  /**
  * @method setCookie 设置cookie
  * @author sxt
  * @date 2020-12-21
  * @param {String} name 设置cookie的键值 
  * @param {Object} value 设置cookie的内容
  * @param {String} n    数字防止合并冲突
  */
  this.setCookie = function (name, value, n) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + n);
    document.cookie = name + "=" + value + ";expires=" + oDate + ";path=/";
  }
  /**
  * @method getCookie 获取cookie
  * @author sxt
  * @date 2020-12-21
  * @param {String} name 获取cookie的键值
  */
  this.getCookie = function (name) {
    var str = document.cookie;
    var arr = str.split("; "), cookie = "";
    for (var i = 0; i < arr.length; i++) {
      //console.log(arr[i]);
      var newArr = arr[i].split("=");
      if (newArr[0] == name) {

        if (newArr[1] != "undefined") { cookie = newArr[1]; }
      }
    }
    return cookie;
  }
  /**
   * @method removeCookie 删除cookie
   * @author sxt
   * @date 2020-12-21
   * @param {String} name 删除cookie的键值
   */
  this.removeCookie = function (name) {
    this.setCookie(name, "", -1);
  }
  /**
   * @method updateShopCart 更新购物车方法
   * @author sxt
   * @date 2020-12-21
   */
  this.updateShopCart = function () {
    var data = this.getCookie("configureRes");
    if (data) {
      data = JSON.parse(data);
      var _number = 0;
      Object.keys(data).forEach(function (key) {
        //var number=parseInt(data[key].number)
        _number += 1;
      });
      $(".moreShopCartNumber").find(".totalNumber").text(_number);
    }
  }
  /**
  * @method retrunData 返回设置cookie的数据
  * @param {Object} configureRes cookie数据
  * @param {String} shopid 商品id
  * @param {String} value 商品数量
  * @param {String} type 操作类型
  * @author sxt
  * @date 2020-12-21
  */
  this.retrunData = function (configureRes, shopid, value, type) {

    var _data = { number: value };
    if (shopid) {
      //类型为新增时
      if (type == "add") {
        if (configureRes) { configureRes[shopid] = _data; return configureRes; }
        var newData = {};
        newData[shopid] = _data;
        return newData;
        //{"[shopid]":_data}; 这种写法在IE上不兼容，不能这么写 sxt 2021-3-29
      } else {
        //为删除时
        if (configureRes[shopid]) {
          delete configureRes[shopid]
          return configureRes
        } else {
          //cookie没有此id时，把原有cookie返回出去 sxt 2020-12-31
          return configureRes
        }
      }
    }
    else { return configureRes; }
  }
  /**
    * @method getSpecsList 返回规格参数的id
    * @author sxt
    * @date 2020-12-21
    * @param {String} goodsId 商品id
    */
  this.getSpecsList = function (goodsId) {
    var specsBox = $(".specsBox");
    //存在规格参数控件时，才进行操作
    if (specsBox.length >= 1) {
      var specsEdit = new SpecsEdit();//规格参数方法类
      if (specsEdit && goodsId && goodsId != "0") {
        var defSpec = specsEdit.defSpec || {};
        var specsList = specsEdit.newList || [],
          newSpecs = specsList.sort(function (a, b) { return a - b }),
          specsArr = newSpecs.join("_");
        //规格参数存在，并且在规格数据中有此数据，进行带规格的id拼接 sxt 2020-12-18
        if (specsArr && defSpec[specsArr]) {
          return goodsId + "_" + specsArr;
        }
      }
    }
    return goodsId
  }
  /**
  * @method functionTips 成功提示方法
  * @author sxt
  * @date 2020-12-21
  * @param {String} title 提示名称 
  */
  this.functionTips = function (title) {
    var doc = $("#document"),
      shoppingOverlay = $(".shoppingOverlay");
    if (!shoppingOverlay.length) {
      if (title == undefined) { title = ""; }
      $("#document").append('<div class="shoppingOverlay"> <span class="swal2-close">×</span><div class="cartlightIcon lightIcon-success"><div class="cartlightIconmask"></div> </div><div class="hideSweetAlert">' + title + '</div></div>')
      $(".shoppingOverlay").fadeIn(600);
      var timer = "";
      $(".swal2-close").on("click", function () {
        $(".shoppingOverlay").remove();
        clearTimeout(timer);
      })
      timer = setTimeout(function () {
        $(".shoppingOverlay").remove()
        clearTimeout(timer);
      }, 1800)
    }

  }
  /**
    * @method shoppingFormData 返回表单提交时添加的购物车数据
    * @author sxt
    * @date 2020-12-21
    * @param {Object} data 表单提交的数据 
    */
  this.shoppingFormData = function (data) {
    var cartList = $("div[data-list-type='cart']");
    if (cartList.length) {
      var configureRes = this.getCookie("configureRes");

      if (configureRes) {
        configureRes = JSON.parse(configureRes);
        var keys = Object.keys(configureRes) || [], array = [], len = keys.length;
        var listTableCon = $(".listTableCon");
        //循环处理数据
        for (var i = 0; i < len; i++) {
          var id = keys[i];
          var carId = id.split("_")[0];

          var specArr = id.split("_");
          specArr.shift();
          specId = specArr.join("_");
          var price = 0;
          //存在规格的数据，直接用规格dom去取价格
          if (specId) {
            price = listTableCon.find("li[data-specid=" + specId + "]").attr("data-price") || 0;
          } else {
            price = listTableCon.find("li[data-carid=" + carId + "]").attr("data-price") || 0;
          }

          array.push({ product_id: id, quantity: configureRes[id].number || 1, price: price })
        }
        if (array.length >= 1) {
          data.goods = array;
          return data;
        }
      }
    }
    return data;
  }
  /**
   * @method shoppingFormSuccess 表单提交成功时的回调方法
   * @author sxt
   * @date 2020-12-21
   */
  this.shoppingFormSuccess = function () {
    var cartList = $("div[data-list-type='cart']");
    if (cartList.length) {
      cartList.remove();//删除控件 
      this.removeCookie("configureRes");//清空cookie
      $(".moreShopCartNumber").find(".totalNumber").text(0);//把购物车的数量变为0
    }
  }
  /**
    * @method addMoreShopCart 加入购物车功能
    * @author sxt
    * @date 2020-12-21
    * @param {object} current 当前点击的按钮元素 
    */
  this.addMoreShopCart = function (current) {
    //获取商品id
    var _shopid = $(current).attr("data-shopid"),
      _success = $(current).attr("data-success");
    if (_shopid && _shopid != "0") {
      //获取加入购物车的数量
      var _cartNumberInput = $(".cartNumber").find(".tb-text"),
        _value = parseInt(_cartNumberInput.val()) || 1;
      if (_value <= 0) { _value = 1 }
      var configureRes = this.getCookie("configureRes");
      _shopid = this.getSpecsList(_shopid);//调用规格参数id获取方法
      if (configureRes) {
        configureRes = JSON.parse(configureRes);
        var shopValue = configureRes[_shopid] && parseInt(configureRes[_shopid].number) || 0;//已经加入购物车的，需把之前加入的数量取出来，与现有数量相加 
        _value += shopValue;
      }
      var data = this.retrunData(configureRes, _shopid, _value, "add");//获取要设置cookie的数据
      if (data) { this.setCookie("configureRes", JSON.stringify(data), 5) }
      this.updateShopCart();//更新购物车方法
      this.functionTips(_success);//成功后的提示
    }
  }
  /**
    * @method inquiryMoreShopCart 点击询盘功能方法
    * @author lw
    * @date 2020/12/14 
    * @param {object} current 当前点击的按钮元素 
    */
  this.inquiryMoreShopCart = function (current) {
    var _cartNumberInput = $(".cartNumber").find(".tb-text"),
      _value = parseInt(_cartNumberInput.val()) || 1;
    var shopid = $(current).attr("data-shopid");//获取传参所需id
    var shopurl = $(current).attr("data-action");//获取url
    if (shopurl != "" && shopid != 0) {
      shopid = this.getSpecsList(shopid);//有规格参数时，获取规格参数的id，拼接成商品id
      $.ajax({
        type: "GET",
        url: shopurl,
        async: false,
        dataType: 'json',
        data: { goodsId: shopid, number: _value, type: "link", action: "add" },
        success: function (data) {
          if (data.suc == 0 && data.data.link) {
            window.location.href = data.data.link;
          }
        }
      });
    }
  }
  /**
   * @method delShopListBtn 点击按钮删除购物车列表当前项的功能
   * @author sxt 
   * @date 2020/12/21
   * @param {object} current 当前点击的按钮元素 
   */
  this.delShopListBtn = function (current) {
    var carPar = $(current).parents("li[data-carid]"),
      carId = carPar.attr("data-carid");
    if (carId) {
      //当前产品存在规格id时，把规格id和产品id拼接在一起 sxt 2020-12-22
      var specid = carPar.attr("data-specid");
      if (specid) { carId = carId + "_" + specid }
      var configureRes = this.getCookie("configureRes");
      if (configureRes) {
        configureRes = JSON.parse(configureRes);
        var data = this.retrunData(configureRes, carId, "", "clear");//获取要设置cookie的数据

        this.setCookie("configureRes", JSON.stringify(data), 5)
      }
      carPar.remove();//删除掉当前项
      this.updateShopCart();//更新购物车数量方法
    }
    return false;//防上跳转a
  }
  /**
   * @method shopFunctionLink 购物车相功能逻辑处理
   * @author sxt
   * @date 2020-12-21 
   */
  this.shopFunctionLink = function () {
    var _this = this;
    //加入购物车功能
    $("div[data-functionallink='addMoreShopCart']").on("touchend click", function (event) {
      _this.addMoreShopCart(this);
      event.stopPropagation();
      event.preventDefault();
    });
    //清空购物车功能
    $("div[data-functionallink='emptyMoreShopCart']").on("touchend click", function (event) {
      _this.removeCookie("configureRes");//清空cookie
      $(".moreShopCartNumber").find(".totalNumber").text(0);//购物车数字改为0
      $("div[data-list-type='cart']").remove();//删除购物车列表
      var _success = $(this).attr("data-success");
      _this.functionTips(_success);//成功后的提示
      event.stopPropagation();
      event.preventDefault();
    });
    //点击询盘按钮功能方法
    $("div[data-functionallink='inquiryMoreShopCart']").on("touchend click", function (event) {
      _this.inquiryMoreShopCart(this);
      event.stopPropagation();
      event.preventDefault();
    });
    //点击删除购物车列表的某一项功能 
    $(".cartList").find("li[data-carid] .btnbox").on("click", function (event) {
      _this.delShopListBtn(this);
      event.preventDefault && event.preventDefault();
      return false;//防上跳转a
    });
  }
  /**
    * @method moClickIconFn 移动端头部icon切换功能
    * @author sxt
    * @date 2021-4-13
    * @param 移动端头部icon切换功能
    */
  this.moClickIconFn = function (show) {
    var moHeaderItemPar = $(".mo_header_itempar");
    if (moHeaderItemPar.length) {
      moHeaderItemPar.removeClass("multilingualNewClass searchNewClass");
      var clickIcon = moHeaderItemPar.find(".clickIcon")
      if (clickIcon.length) {
        if (show == true) {
          moHeaderItemPar.addClass("buttonNewClass")
        } else {
          moHeaderItemPar.removeClass("buttonNewClass")
        }
      }
    }
  }
  /**
   * @method functionallink 功能链接方法
   * @author sxt
   * @date 2020-12-21
   * @param 包含显示panel和关闭弹出容器方法
   */
  this.functionallink = function () {
    window.panelListState = false;
    //点击显示panel的方法
    $("div[data-functionallink='bindPanel']").on("touchend click", function (event) {

      var PanelLeftShow = $("#SITE_PANEL"); //获取dom节点 然后进行判断如果条件符合则执行 lw 2021-3-2
      var PanelRightShow = $(".panelRightshow"),
        PanelTopShow = $(".panelTopshow"),
        PanelDropShow = $(".mo_drop_slider");
      var header = $("#MO_SITE_HEADER")
      if (header.attr("data-float")) {
        PanelTopShow.css('position', 'fixed');
      } else { PanelTopShow.css('position', 'absolute'); }
      if (PanelRightShow.length == 1) {
        PanelRightShow.css('left', '0%')
        $(".opc").show();
      } else if (PanelTopShow.length == 1) {
        var moHeader = $("#MO_SITE_HEADER").height(),
          pcHeader = $("#SITE_HEADER").height(),
          moPcHeader = (moHeader ? Number(moHeader) : 0) + (pcHeader ? Number(pcHeader) : 0);
        if (window.panelListState == false) {
          PanelTopShow.css('top', moPcHeader);
          window.panelListState = true;
        } else {
          var PanelHeight = PanelTopShow.outerHeight(true)
          var PanelTopShowHeight1 = (-PanelHeight) + "px"
          PanelTopShow.css('top', PanelTopShowHeight1);
          window.panelListState = false;
        }

      } else if (PanelDropShow.length == 1) {
        if (window.panelListState == false) {
          PanelDropShow.css({ height: "85px", top: "0px", opacity: '1' });
          window.panelListState = true;
        } else {
          PanelDropShow.css({ height: "0px", top: "-100px", opacity: '0' });
          window.panelListState = false;
        }

      } else {
        PanelLeftShow.show();
      }
      event.stopPropagation();
      event.preventDefault();
    });
    //关闭弹出容器方法 sxt 2020-7-25
    $("div[data-functionallink='lightboxClose']").on("click", function (event) {
      $(event.target).parents(".lightboxModal").hide();

      //修复弹窗关闭且带有视频组件时，视频播放时不会停止的bug。 2020/12/2 lw
      var nodes = $(event.target).parents(".lightboxModal").find('video');//获取videoDOM节点 
      //判断如果关闭弹窗时该弹窗并没有使用video则不会执行下面语句
      if (nodes.length !== 0) {
        var items = '';
        for (var i = 0; i < nodes.length; i++) {
          items = $(nodes[i]);
          var item = items[0];
          //如果video是播放状态时关闭弹窗则暂停播放
          if (item.paused == false) {
            item.pause()
          }
        }
      }
    });
  }
  /**
   * @method functionBack 返回顶部功能方法
   * @author sxt
   * @date 2020-12-21
   */
  this.functionBack = function () {
    $("div[data-functionback]").on("click", function (event) {
      var value = $(this).attr("data-functionback");
      if (value) {
        var _path = value.split("/"),
          _dir = _path[2], _speed = _path[3] || 0,
          _body = $("body,html");
        //头部、底部时
        if (/top|bottom/.test(_dir)) {
          _body.animate({ scrollTop: _dir == "top" ? 0 : _body.height() }, _speed * 1000);
        }
        //返回上一页面时
        if (/prev/.test(_dir)) {
          window.history.back();
        }
        event.preventDefault();
      }

    });
  }
  /**
   * @method linkAnchorInit 链接初始化
   * @author sxt
   */
  this.linkAnchorInit = function () {
    var hash = location.hash;
    //网址中是否存在hash
    if (hash) {
      hash = hash.replace("_anchor", "");//hash中存在标识符时去掉标识符 sxt 2020-9-25
      var newHash = hash,
        speed = 0.5;
      if (hash.indexOf("_") != -1) {
        var splitHash = hash.split("_") || [];
        newHash = splitHash[0];
        speed = splitHash[1] || 0.5;
      }
      var _parent = $("a[href*='" + newHash + "']").parents("[data-fixed='true']"),
        fixedHeight = parseInt(_parent.height()) || 0;//获取是锚点链接控件父级是浮动的组件高度，计算位置时要减去这块高度 sxt 2022-3-30
      this.jumpToAnchor(newHash, "", speed, fixedHeight)

    }
    //绑定点击事件
    this.bindLink(document.querySelectorAll("a[href^='#/back/']"), "click", this.clickHandler);
  }
  /**
   * @method bind 事件绑定
   * @author sxt
   * @param {object} elementList 需要绑定事件的节点元素 
   * @param {string} type 事件类型 
   * @param {function} fun 事件处理函数 
   */
  this.bindLink = function (elementList, type, fun) {
    var len = elementList.length;
    //如果事件处理函数不存在或类型不是function，抛出异常
    if (!fun || typeof fun != "function") { console.error("event handler function is undefined") }
    //是否存在length属性。存在表示是一个节点集合，不存在表示是单个节点
    if (len != undefined) {	//长度是否大于。大于1，需要循环绑定。不大于1，则执行给第零个元素绑定
      if (len > 1) {	//循环绑定
        for (var i = 0; i < len; i++) {
          elementList[i].addEventListener(type, fun.bind(this));
        }
      }
      else {
        elementList[0] && elementList[0].addEventListener(type, fun.bind(this));
      }
    }
    else { elementList.addEventListener(type, fun.bind(this)); }
  }
  /**
   * @method clickHandler 锚点点击事件处理方法
   * @author sxt
   * @param {event} event 事件对象 
   */
  this.clickHandler = function (event) {
    var hash = event.currentTarget.hash,//{currentTarget:{hash}} = event,
      _path = hash.split("/"),
      _dir = _path[2], _speed = _path[3] || 0;
    var parent = $(event.target).parents("#SITE_PANEL"),
      _parent = $(event.target).parents("[data-fixed=true]"),
      fixedHeight = parseInt(_parent.height()) || 0;//点击时父级是浮动组件时，把高度取出来，用于跳转时减去高度，防止遮档 sxt 
    //如果父级为panel控件时，隐藏panel,sxt 2020-9-25
    if (parent.attr("id") == "SITE_PANEL") {
      parent.hide();
    }
    //组件是否已经真正浮动，没有真正浮动的话不传过去高度 wh 2022-8-25
    var parentPosition = $(_parent).css("position")
    if (parentPosition != "fixed") { fixedHeight = null }
    this.jumpToAnchor(_dir, hash, _speed, fixedHeight)

    event.preventDefault();
  }
  /**
   * @method jumpToAnchor 跳转到锚点位置
   * @author sxt
   * @param {string} id 锚点id 
   * @param {string} hash 网址中的hash值 
   * @param {number} speed 跳转动画的速度
   *  @param {number} fixedHeight 锚点父级浮动的高度
   */
  this.jumpToAnchor = function (id, hash, speed, fixedHeight) {
    //时间不存在时，默认0.5 sxt 2020-10-13
    if (!speed) {
      speed = 0.5;
    }
    var scrollTop = parseInt(document.body.scrollTop || document.documentElement.scrollTop);
    var domAnchor = document.querySelector(id);
    if (domAnchor) {
      var header = document.querySelector("#SITE_HEADER");

      var top = $(domAnchor).offset().top,// - 50去掉，会导致老王的翻屏控件定位不准 sxt 2020-8-7
        offsetHeight = 0;
      var dataMask = $(domAnchor).attr("data-ismask");//获取翻屏控件属性值 lw 2021-5-13
      //header 是固定定位的，top减去header的高度
      if (header) {
        if (header.style.position == "fixed") {
          if (dataMask == "true") {
            top = top;
          } else {
            top = top - header.offsetHeight;
            offsetHeight = header.offsetHeight;
          }
        } else { //头部不浮动时获取头部内浮动元素 wh 2022-10-8
          var headerDivs = header.querySelectorAll("[data-fixed='true']");
          if (headerDivs.length != 0) {
            var headerDivH = headerDivs[headerDivs.length - 1].offsetHeight;
            top = top - headerDivH;
          }

        }

      } else {  //mo时的头部存在且开启浮动时减去相对应的高度 lw 2021-5-13
        var moheaderHei = document.querySelector("#MO_SITE_HEADER");
        if (moheaderHei && moheaderHei.style.position == "fixed") {
          if (dataMask == "true") {
            top = top;
          } else {
            top = top - moheaderHei.offsetHeight;
            offsetHeight = moheaderHei.offsetHeight;
          }

        }
      }
      if (fixedHeight) {
        top = top - fixedHeight;
      }
      //top 小于零，让top等于零
      if (top < 0) {
        top = 0
      }
      $("body,html").animate({ scrollTop: top }, speed * 1000, "", function () {
        location.hash = id + "_anchor";//拼接个有单独标识的锚点，防止用动画跳转完后，控件会被浮动的头部遮档的bug sxt 2020-9-25
        //var href=loaction.pathname;
        //location.href=location.pathname+""+id
      });
    }
    else {
      //第一位是#号时，去掉多余的参数，(解析seo的链接不是合法链接的bug，在每个锚点链接前都拼了#) sxt 2020-6-4
      if (hash[0] == "#") {
        hash = hash.replace("#/back/", "");
      }
      //var newHash=hash.replace(/([#\d-\w]+)\/[\d.]+\/([\d\w//.]+)/,"$2$1");
      var newHash = hash.replace(/([#\d-\w]+)\/[\d.]+\/([\d\w//.]+)/, "$2");

      var splitHash = hash.split("/") || [],
        hash0 = splitHash[0];
      if (hash0.indexOf("#") != -1) {
        if (!splitHash[2]) {
          newHash = "";
        }
        var href1 = "/" + newHash + "" + hash0 + "_" + speed;
        if (!newHash) {
          href1 = "/" + hash0 + "_" + speed;
        }
        location.href = href1;//href跳转必须要根目录跳转，在ie上会出现链接错误的问题 sxt 2021-4-1
      }
      // //var newHash=hash.replace(/([#\d-\w]+)\/[\d.]+\/([\d\w//.]+)/,"$2$1");
      // var newHash=hash.replace(/([#\d-\w]+)\/[\d.]+\/([\d(\-?)\w//.]+)/,"$2$1");
      // if(newHash){
      //     location.href =  "/"+newHash+"_"+speed;//href跳转必须要根目录跳转，在ie上会出现链接错误的问题 sxt 2021-4-1
      // }
      return false;
    }
  }
  /**
   * @method menuScrollAnchor 滚动时选中当前的导航锚点
   * @author sxt
   * @date 2020-12-21
   */
  this.menuScrollAnchor = function () {
    var _anchors = $(".nav,.scrollAnchorAuto").find("[data-anchorid]");

    if (_anchors.length) {
      //存在翻屏组件时，把标识的data-ismask的属性去掉，不需要加标识了(翻屏当做普通锚点来看) sxt 2021-4-2
      if ($(".scrollAnchorAuto").length) {
        $(".scrollAnchorAuto").find("[data-ismask]").removeAttr("data-ismask");
      }
      var offsets = [], idArr = [];
      //循环页内所有锚点记录锚点当前位置
      for (var i = 0; i < _anchors.length; i++) {
        var id = $(_anchors[i]).attr("data-anchorid"), top = 0;
        //元素存在时，证明是当前页面锚点
        if ($("#" + id).length) {
          top = parseInt($("#" + id).offset().top);
          //数组中没有时才插入
          if (idArr.indexOf(id) == -1) {
            idArr.push(id);
            offsets.push({ id: id, top: top })
          }
        }
      }
      this.bindScroll(offsets);
    }
  }
  /**
   * @function bindScroll 绑定滚动事件
   * @author sxt
   * @param {object} elements 元素节点数组
   * @param {array} offsets 存放锚点位置的数组
   */
  this.bindScroll = function (offsets) {
    if (offsets.length) {
      var _this = this;
      var headerH = 0;
      var header = document.querySelector("#SITE_HEADER");

      if (header && header.style.position == "fixed") {
        headerH = parseInt(header.offsetHeight);
      }
      window.addEventListener("scroll", function () {
        var scrollTop = parseInt(document.body.scrollTop || document.documentElement.scrollTop);
        for (var i = 0; i < offsets.length; i++) {
          var dataMask = $("#" + offsets[i].id).attr("data-ismask");
          var newTop = $("#" + offsets[i].id) && $("#" + offsets[i].id).offset().top || 0;
          //var _top=Math.abs(scrollTop+headerH);
          var callTop = Math.abs(newTop - headerH) - scrollTop;

          //dataMask存在，证明是元素顶到头了，就不计算头部的高度了 sxt 2020-8-8
          if (dataMask == "true") {
            callTop = Math.abs(newTop) - scrollTop;
          }
          //获取最后一个浮动元素，当它在对应锚点上方的时候，选中范围为浮动元素的高度，否则默认50  wh  2022-8-25
          var fixedEle = document.querySelectorAll('div[data-fixed="true"]')
          var topH = 50;
          if (fixedEle.length >= 1 && fixedEle[fixedEle.length - 1].offsetTop < offsets[i].top) {
            topH = fixedEle[fixedEle.length - 1].offsetHeight
          }
          if (callTop >= 0 && callTop <= topH) {
            _this.selectCurrent(offsets[i].id);
          }
          // if((offsets[i].top-_top) <= 60){
          //     _this.selectCurrent(offsets[i].id);
          // }
        }

      })
    }
  }
  /**
   * @function selectCurrent 点击选中当前项
   * @author sxt
   * @param {string} id 当前项id
   */
  this.selectCurrent = function (id) {
    if (id) {
      var _singleMenu = document.querySelectorAll("[data-anchorid='" + id + "']"),
        _mlen = _singleMenu.length;

      if (_mlen) {
        //循环增加所有应该处于选中的元素
        for (var i = 0; i < _mlen; i++) {
          var _ele = _singleMenu[i],
            _selecteds = $(_ele).parent().siblings().find(".selected");

          //如果页内存在处于选中的元素
          //循环清楚所有处于选中的元素的选中效果
          if (_selecteds.length) { _selecteds.removeClass("selected"); }

          $(_ele).addClass("selected")
          //_ele.setAttribute("data-state","selected"); 
        }
      }
    }
  }
  /**
   * @method linkAnchor 页面锚点跳转功能
   * @author sxt
   * @date 2020-12-21
   */
  this.linkAnchor = function () {
    var hash = location.hash;
    //网址中是否存在hash
    if (hash) {
      var header = document.querySelector("#SITE_HEADER"),
        domAnchor = $(hash);
      if (domAnchor) {

        var top = domAnchor.offset().top - 50;
        //header 是固定定位的，top减去header的高度
        if (header && header.style.position == "fixed") {
          top = top - header.offsetHeight;
        }
        //top 小于零，让top等于零
        if (top < 0) {
          top = 0
        }
        $("body,html").animate({ scrollTop: top }, 0.4 * 1000);
      }

    }
  }
  /**
   * @method gotTopScroll 返回顶部滚动逻辑处理方法
   * @author sxt
   * @date 2020-12-21
   */
  this.gotTopScroll = function () {
    $(window).scroll(function () {
      var scrollTop = parseInt(document.body.scrollTop || document.documentElement.scrollTop);
      if (scrollTop <= 1) {
        $(".backTopBtn").fadeOut();
      } else {
        $(".backTopBtn").fadeIn();
      }
    })
  }
  /**
   * @method hidenPanel 隐藏panel方法
   * @author sxt
   * @date 2020-12-21
   */
  this.hidenPanel = function () {
    $(".navbar-trigger").on("touchend click", function (event) {
      var PanelLeftShow = $("#SITE_PANEL"); //获取dom节点 然后进行判断如果条件符合则执行 lw 2021-3-2
      var PanelRightShow = $(".panelRightshow");
      if (PanelRightShow.length == 1) {
        PanelRightShow.css('left', '100%')
        $(".opc").hide();
      } else {
        PanelLeftShow.hide();
      }
      event.stopPropagation();
      event.preventDefault();
    });
    $(".opc").on("touchend click", function (event) {
      var PanelLeftShow = $("#SITE_PANEL"); //获取dom节点 然后进行判断如果条件符合则执行 lw 2021-3-2
      var PanelRightShow = $(".panelRightshow");
      if (PanelRightShow.length == 1) {
        PanelRightShow.css('left', '100%')
        $(".opc").hide();
      } else {
        PanelLeftShow.hide();
      }
      event.stopPropagation();
      event.preventDefault();
    });
  }
  /**
   * @method hidenHover 侧边栏无文本内容时不触发hover
   * @author wh
   * @date 2022-6-28
   */
  this.hidenHover = function () {
    var sLists = $(".sidecustombarBox .sList")
    if (sLists && sLists.length > 0) {
      for (var i = 0; i < sLists.length; i++) {
        var sList = $(sLists[i]).find(".sidetext")
        if (sList && sList.length > 0) {
          var sListText = $(sList).text().trim()
          if (!sListText || sListText == "") {
            $(sLists[i]).children(".sCoBtn").css("display", "none")
            $(sLists[i]).children(".sBtn").removeClass("sBtHover")
          }
        }
      }
    }

  }
  /**
  * @method init 链接初始化方法
  * @author sxt
  * @date 2020-12-21
  */
  this.init = function () {
    this.functionallink();//链接功能链接功能
    this.hidenPanel();//隐藏panel
    this.functionBack();//链接返回功能
    this.hidenHover();//侧边栏hover隐藏
    //this.linkAnchor();
    this.linkAnchorInit();//链接锚点初始方法
    this.menuScrollAnchor();//滚动时选中当前的导航锚点
    this.gotTopScroll();//返回顶部滚动逻辑处理方法 sxt 2020-10-9
    this.shopFunctionLink();//购物车相功能逻辑处理 sxt 2020-12-21
    this.setCookie("cook", "yyb", 5)
  }
}
//时间戳转时间的格式
function dateFormat(pattern, time, lang, opts) {
  pattern = pattern || "y-M-d";
  var _date = time ? new Date(Number(time) * 1000) : new Date(),//获取日期对象
    param = { hour24: true };
  if (opts) {
    var name = { y: "year", M: "month", d: "day", h: "hour", m: "minute", s: "second" };

    if (opts.param) { param = opts.param; }
    //e=>{ param[name[e]] = opts[e] || "numeric"; }
    pattern.split(/[\s-:/.]?/g).forEach(function (e) {
      param[name[e]] = opts[e] || "numeric";
    })
  }
  var _dateTime = _date.toLocaleString("en-US", param);
  console.log(lang, 'lang');
  if (lang != "en-US") {
    _dateTime = _dateTime.split(", "); //分隔本地化的日期字符串
    //分隔时间部分和分隔年月日部分 
    var _d = _dateTime[0].split(/\/|-/),
      _t = _dateTime[1] ? _dateTime[1].split(":") : [],
      _s = _t[2] ? _t[2].split(" ") : [];
    //把年月日时间通过指定的键存储起来
    var _data = { y: _d[2], M: _d[0], d: _d[1], h: _t[0], m: _t[1], s: _s[0] }
    //如果使用的是12小时，则在小时前边加上时段
    if (param.hour12) { _data.h = (_s[1] == "AM" ? "上午" : "下午") + _data.h; }
    //通过替换日期表达式返回指定格式的日期字符串
    return pattern.replace(/[yMdhms]?/g, function (r) {
      if (!_data[r]) { return ""; }
      return _data[r].length == 1 ? "0" + _data[r] : _data[r];
    });
  }

  return _dateTime;
}
/**
* @module Cookie Cookie模块,操作cookie
* @date 2021-03-23
* @author wyq
*/
var Cookie = {
  /**
   * @method addItem 新增cookie项
   * @date 2021-02-23
   * @author wyq
   * @param {string} key 键名 
   * @param {string} value 值  
   * @param {object} opts 参数对象
   * @param {boolean} opts.secure 是否只允许http传输
   * @param {string} opts.path 目录
   * @param {string} opts.domain 网址
   * @param {number} opts.endTime 过期时间 单位秒 
   */
  addItem: function (key, value, opts) {
    var paramstr = '';

    if (opts) {
      var secure = opts.secure,
        path = opts.path,
        domain = opts.domain,
        endTime = opts.endTime;

      paramstr = (domain ? ";domain=" + domain : '') + (path ? ";path=" + path : '');

      if (typeof secure == 'boolean') { paramstr += ";secure = " + secure }

      if (typeof endTime == 'number') { paramstr += ";max-age=" + endTime }
      // {secure,path,domain,endTime} = opts;

      //    paramstr = (domain ? `;domain=${domain}` : '') + (path ? `;path=${path}` : '');

      //    if(typeof secure == 'boolean'){ paramstr += `;secure = ${secure}`; }

      //    if(typeof endTime == 'number'){ paramstr += `;max-age=${endTime}`; }
    }

    //document.cookie = `${key}=${value} ${paramstr}`
    var resultValue = (key === 'cur' || key === 'symbol' || key === 'curData') ? encodeURIComponent(value) : value;
    document.cookie = key + '=' + resultValue + ' ' + paramstr;
  },
  /**
   * @method getItem 获取指定cookie项的值
   * @date 2021-03-23
   * @author wyq
   * @param {string} key 键名
   * @return {string} cookie值 
   */
  getItem: function (key) {
    // var regexp = new RegExp(`${encodeURIComponent(key)}\\s*=([^;]+)`),
    //     values = document.cookie.match(regexp);
    var regexp = new RegExp(encodeURIComponent(key) + "\\s*=([^;]+)"),
      values = document.cookie.match(regexp);
    return values ? decodeURIComponent(values[1]) : '';
  },
  /**
   * @method removeItem 删除指定cookie项值
   * @date 2021-03-23
   * @author wyq
   * @param {string} key 键名 
   * @param {string} domain 网址 
   * @param {string} path 目录 
   */
  removeItem: function (key, domain, path) {
    if (this.hasItem(key)) {
      var domainVal = domain ? ";domain=" + domain : '',
        pathVal = path ? ";path=" + path : '',
        codeKey = encodeURIComponent(key) + "=;max-age=-1";

      document.cookie = codeKey + domainVal + pathVal;
    }
  },
  /**
   * @method hasItem cookie中是否存在此cookie项
   * @date 2021-03-23
   * @author wyq
   * @param {string} key 键名 
   * @returns {boolean} 布尔值
   */
  hasItem: function (key) {
    var regexp = new RegExp(encodeURIComponent(key) + "\\s*=");

    return regexp.test(document.cookie);
  }
}
/**
* @module Public 公共工具模块
* @author wyq
* @date 2021-6-22
*/
var Public = {
  cookie: Cookie,
  time: { dateFormat: dateFormat },
  fetch: function (url, options) {
    var http = new XMLHttpRequest();

    http.open(options.method, url, options.async == undefined ? true : options.async);

    http.setRequestHeader("Accept", "application/json");

    http.setRequestHeader("Content-Type", "application/json");
    //是否使用权限验证。使用设置头信息，不使用则不设置
    options.useVerifyPermissions != false && http.setRequestHeader("x-request-client", "buyer");

    options.body.jsonrpc = '2.0';

    options.body.id = new Date().getTime();

    http.onload = function () {
      var value = this.responseText;

      if (this.status == 200) {
        value = this.getAllResponseHeaders('Content-Type').indexOf('application/json') != -1 ? JSON.parse(value) : { result: value };

        value.result != undefined
          ?
          options.success && options.success({ data: value.result, status: 200 })
          :
          options.error && options.error({ message: value.error.message, data: value.error.data, status: value.error.code })
      }
      else { options.error && options.error({ message: value, status: this.status }); }
    }

    http.onerror = function () { options.error && options.error(); }

    http.send(JSON.stringify(options.body));
  },
  request(path, params, cb, method = 'POST') {
    //console.log(method,'method')
    var baseUrl = document.querySelector('[name="previewUrl"]').content;
    var queryString = '?' + objectToQueryString(params);
    var url = baseUrl + path;
    if (method == 'GET') url += queryString;
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(xhr.response)
      } else if (xhr.readyState === 4 && xhr.status !== 200) {

      }
    };
    if (method == 'POST') {
      xhr.send(JSON.stringify(params));
    } else {
      xhr.send();
    }

  },

  animate: function (element, property, initValue, value, delay, duration, timing, func) {
    var timer, i = 0, cssText = element.style.cssText;

    function animationFrame() {
      if (i >= 1) {
        element.style.cssText = cssText + 'transition:' + property + ' ' + duration + 's ' + delay + 's ' + timing + ';' + property + ':' + value + ';';

        element.ontransitionend = function (event) {
          // 
          if (event.propertyName == property && event.target == this) {
            element.style.cssText = cssText + property + ':' + value + ';';

            element.ontransitionend = null;

            func && func(event);
          }
        }

        cancelAnimationFrame(timer); i = undefined;
      }
      else { i++; timer = requestAnimationFrame(animationFrame); }
    }

    element.style[property] = initValue;

    timer = requestAnimationFrame(animationFrame);
  }
};
/**
* @function Statistics 统计
* @returns 
*/
function Statistics() {
  return {
    /**
     * @method statistics
     * @author wyq
     * @date 2022-2-11
     */
    statistics: function () {
      var element = document.querySelector('[data-source="total_click"]');
      //是否存在点击数量
      element && this.getClickNumber();
    },
    /**
     * @method getClickNumber 获取点击数量 
     * @author wyq
     * @date 2022-02-11
     */
    getClickNumber: function () {
      var element = document.querySelector('#Statistics'),
        content = JSON.parse(element.textContent);
      //id存在并且类型存在，发送请求
      if (content.dataContentId && content.sourceType) {
        var http = new XMLHttpRequest(), self = this;

        http.open('post', apiPost);

        http.setRequestHeader('Content-Type', 'application/json');

        http.onload = function () {
          //请求成功执行逻辑
          if (this.status == 200) {
            var value = JSON.parse(this.responseText);

            self.setClickNumber(value.pv);
          }
        }

        http.send(JSON.stringify({ ids: content.dataContentId, type: content.sourceType }));
      }
    },
    /**
     * @method setClickNumber 设置点击数量
     * @author wyq
     * @date 2022-02-11
     */
    setClickNumber: function (value) {
      var elements = document.querySelectorAll('[data-source="total_click"]');

      for (var i = 0, len = elements.length; i < len; i++) {
        var element = elements[i],
          label = element.getAttribute("data-companylabeltext");

        element.textContent = label + value;
      }
    }
  }.statistics();
}

$(function () {
  //实例化动画
  new Animation();
  //实例化翻屏
  new Flipper();
  //按钮执行代码
  new ButtonCode();
  //统计
  Statistics();
  //固定定位处理类
  var FixedClass = function () {
    /**
     * @function setParFixed 设置头部、底部为绝对定位
     * @author sxt
     */
    this.setParFixed = function () {
      var _header = $("#SITE_HEADER"),
        _moHeader = $("#MO_SITE_HEADER"),
        _moFooter = $("#MO_SITE_FOOTER"),
        _footer = $("#SITE_FOOTER"),
        _content = $(".container").eq(0);
      if (_header.attr("data-float")) {
        var headerHeight = _header.height();

        var first = _content.children()[0];

        _header.css({ "position": "fixed", "top": 0 });
        //没有翻屏容器，头部固定定位更改内容区域padding。有，则不修改 2020-08-26 wyq
        if (first && first.getAttribute('data-mode') != 'flipper') {
          _content.css({ "padding-top": headerHeight })
        }
      }
      if (_footer.attr("data-float")) {
        var footerHeight = _footer.height();
        _footer.css({ "position": "fixed", "bottom": 0 });
        _content.css({ "margin-bottom": footerHeight })
      }
      if (_moHeader.attr("data-float")) {
        var headerHeight = _moHeader.height();
        _moHeader.css({ "position": "fixed", "top": 0 });
        if (_header.length >= 1) {
          _header.css({ "padding-top": headerHeight })
        } else {
          _content.css({ "padding-top": headerHeight })
        }
        //pc头部存在，并且pc的头部开启了浮动，并且mo头部也开启了浮动，这时content的top为mo的头部高度和pc头部的高度
        if (_header.length >= 1 && _header.attr("data-float")) {
          headerHeight = parseInt(headerHeight) + parseInt(_header.height());
          _content.css({ "padding-top": headerHeight })
        }

      }
      if (_moFooter.attr("data-float")) {
        var footerHeight = _moFooter.height();
        _moFooter.css({ "position": "fixed", "bottom": 0 });
        if (_footer.length >= 1) {
          _footer.css({ "margin-bottom": footerHeight })
        } else {
          _content.css({ "margin-bottom": footerHeight })
        }
        //lby 添加
      }
    }
    this.fixed = function (elements, height, offset) {
      var docHeight = $(document).height(),
        winHeight = $(window).height(),
        bottomHeight = docHeight - winHeight;
      return function listenFixed() {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        for (var i = 0; i < elements.length; i++) {
          if (!offset) {
            offset = {}
          }
          var element = elements[i], id = element.id;
          var top = $(element).offset().top;//,
          var offsetTop = offset[id].top;
          offWidth = offset[id].width,
            offHeight = offset[id].height;
          var parentsFloat = $(element).parents("[data-float='true']");
          var containerPar = $(element).parents(".container");
          var footerDom = $("#SITE_FOOTER");
          //滚动的top值大于等于控件top值时，先清空所有的，再给当前项赋值绝对定位
          //并且屏幕高度足够，并且父级元素没有开启浮动
          if (scrollTop >= top && element.style.position != 'fixed' && bottomHeight > offHeight && !parentsFloat.length) {
            //获取element的x坐标
            function getElementLeft(element) {
              var actualLeft = element.offsetLeft;
              var current = element.offsetParent;
              while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
              }
              return actualLeft;
            }
            var eleLeft = getElementLeft(element)
            var eleWidth = document.body.clientWidth - element.clientWidth

            $(elements).removeAttr("style");
            $(".fixedFloatDiv").remove();
            //每次浮动的控件，都居中显示，sxt 2020-4-11
            $(element).css({ opacity: 0 });
            var newHeight = $(element).outerHeight(true),//获取真实高度，用于占位处理 sxt 2022-3-30
              newWidth = $(element).outerWidth();
            var winWidth = $(window).width();
            if ((newWidth + 200) > winWidth) {
              offWidth = "100%";
            }
            //如果屏幕宽-浮动组件宽小于200就默认居中  wh  2022-8-25
            if (eleWidth < 200) {
              $(element).css({
                opacity: 1,
                position: "fixed",
                top: height,
                zIndex: 2500,
                left: "0px",
                right: "0px",
                "margin": "auto",
                width: offWidth
              });
            } else {  //大于200的话按left定位
              $(element).css({
                opacity: 1,
                position: "fixed",
                top: height,
                zIndex: 2500,
                left: eleLeft,
                right: "0px",
                width: offWidth
              });
            }

            if (!$(element).parent().find(".fixedFloatDiv").length) {
              $(element).before('<div class="fixedFloatDiv" style="position: relative;opacity:0;top:0px;height:' + newHeight + 'px"></div>')
            }

            // 由99改为2500，因为开启响应后，导航控件层级超出了他的层级，sxt 2019-9-20  transition:"all .4s linear"
          }
          //滚动的top值小于等于控件top值时，清掉当前项固定定位
          if (scrollTop <= offsetTop && element.style.position == 'fixed' && bottomHeight > offHeight && !parentsFloat.length) {
            //先去掉，头部内的组件开启浮动了，就不执行了
            //var headerContent = $("#SITE_HEADER").find("div[data-fixed='true']");
            //头部内存在固定控件时，清除掉头部的class
            // if (headerContent.length >= 1) {
            //     $("#SITE_HEADER").removeAttr("style");
            //     //头部是固定定位时，清掉内容的padding-top
            //     if ($("#SITE_HEADER").attr("data-float")) {
            //         $(".container").eq(0).css({"padding-top": 0})
            //     }
            // }
            $(element).removeAttr("style");
            $(".fixedFloatDiv").remove();

          }
          if (element.style.position == 'fixed' && containerPar.length && footerDom.length) {
            let footerTop = $("#SITE_FOOTER").offset().top,
              elementH = $(element).outerHeight(true);
            //如果底部和浮动组件的底部碰上了，就要把浮动组件向上显示，防止被底部挡住
            if (footerTop <= elementH + scrollTop + height) {
              let newTop = footerTop - scrollTop - elementH;
              $(element).css({ top: newTop });
            } else {
              let _posTop = parseInt($(element).css("top"));
              if (_posTop != height) {
                $(element).css({ top: height });
              }

            }
          }
        }
      }
    }
    /**
     * @function positionInit 初始化方法
     * @author wyq
     * @param {object} eles 元素节点列表
     */
    this.postionInit = function (eles) {
      var header = document.querySelector("header[style*='fixed']"); //获取开启固定定位的header节点

      var height = 0;
      //header节点不为空，则存储header的高度
      if (header) {
        height = header.offsetHeight;
      }
      var offset = {};
      for (var i = 0; i < eles.length; i++) {
        var element = eles[i], id = element.id;
        //如果没有此控件绝对定位数据，则进行获取

        if (!offset[id]) {
          var _width = $(element).innerWidth(),//$(element).outerWidth(true),
            _height = $(element).height();//$(element).outerHeight(true);
          var newOffset = $(element).offset();

          offset[id] = { top: newOffset.top, left: newOffset.left, width: _width, height: _height };
        }
      }
      window.addEventListener("scroll", this.fixed(eles, height, offset));
    }
    // 计时器
    this.listTimer = function (data) {
      var start = Number($(data).attr("start") || 1),//起始值
        end = Number($(data).attr("end") || 1),//结束值
        stride = Number($(data).attr("stride") || 1),//步幅
        speed = Number($(data).attr("execution-speed") || 1) * 1000,//执行速度
        text = Number($(data).attr("text") || 1);

      if (start < end) {
        var dlay = Math.round((end - start) / stride);
        timerfor();
        function timerfor() {
          setTimeout(function () {
            start = start + stride;
            if (start < end) {
              $(data).text(start);
              timerfor();
            } else {
              $(data).text(end);
            }
          }, speed / dlay);
        }
      } else if (start > end) {
        var item = Math.round((start - end) / stride);
        timermin();
        function timermin() {
          setTimeout(function () {
            start = start - stride;
            if (start > end) {
              $(data).text(start);
              timermin();
            } else {
              $(data).text(end);
            }
          }, speed / item);
        }
      }
    }

    this.init = function () {
      var opts = { ele: document.querySelectorAll(".listTimer"), scrolled: this.listTimer };
      this.setParFixed();//头部底部定位方法
      ListenToScroll(opts);
      var _floats = document.querySelectorAll("[data-fixed='true']");//组件固定定位方法
      this.postionInit(_floats);
      //判断是不是移动端
      if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        var _this = this;

        $(window).resize(function () { _this.postionInit(_floats); });
      }

    }
  }
  var fixedClass = new FixedClass();
  fixedClass.init();

  //获取链接对象，并初始化链接方法
  var linkFn = new LinkFn();
  linkFn.init();

  /**
     * @function NumBeNrFn 数量控件点击处理
     * @date 2020-12-7
     * @author lw 
     * @param {object} items 节点对象
     */

  var NumBeNrFn = function () {
    /**
     * @function encapsulationFn 数量控件循环方法
     * @date 2020-12-22
     * @author lw 
     * @param {object} 
     */
    this.encapsulationFn = function () {
      // 获取最外层的div的class
      var dome = document.getElementsByClassName("cartNumber");
      for (var i = 0; i < dome.length; i++) {
        // for循环
        var items = $(dome[i]);
        // 循环出来的内容付给这个变量
        this.numberOnClick(items);
        this.numberOnChange(items);
        this.numberBlur(items);
      }
    }

    /**
 * @function numberOnClick 数量控件点击事件
 * @author lw
 * @date 2020-12-22
 * @param {object} items 元素节点列表
 */
    this.numberOnClick = function (items) {
      var _this = this;
      // 在items中向下查找叫这个名字的类并且绑定点击事件
      $(items).find('.tb-reduce').bind("click", function () {
        var numbers = items.find('.tb-text');
        // 获取input的类名
        var number = items.find('.tb-text').val();
        // 获取input中的值
        if (number > 1) {
          // 判断是否大于一，如果等于或者小于一将不执行
          num = -1 + parseInt(number);
          // 将number转化为数字类型
          if (num == 1) {
            $(items).find('.tb-reduce').addClass('tb-disable-reduce')
          }
          numbers.val(num);
          // 重新付给输入框中的value
          _this.calculation(items, num);
        }
      });
      // 在items中向下查找叫这个名字的类并且绑定点击事件
      $(items).find('.tb-increase').bind("click", function () {
        // 获取input的类名
        var numbers = items.find('.tb-text');
        // 获取input中的值
        var number = items.find('.tb-text').val();
        num = parseInt(number) + 1;
        // 将number转化为数字类型
        numbers.val(num);
        // 重新付给输入框中的value
        _this.calculation(items, num);
        if (num > 1) {
          $(items).find('.tb-reduce').removeClass("tb-disable-reduce");
        }
      });
    }

    /**
* @function numberOnChange 数量控件监听事件
* @author lw
* @date 2020-12-22
* @param {object} items 元素节点列表
*/

    this.numberOnChange = function (items) {
      var _this = this;
      //在items中向下查找叫这个名字的类并且绑定监听事件
      $(items).find('.tb-text').bind("input propertychange", function () {
        var number = items.find('.tb-text').val();
        // 获取input中的值
        var numbers = items.find('.tb-text');
        // 获取input的类名
        var reg = /^[1-9]\d*$/;
        // 判断是否为正整数
        if (reg.test(number) == false) {
          // 如果输入的不为正整数就会等于false
          var num = '';
          numbers.val(num);
          // 重新付给输入框中的value
          _this.calculation(items, num);
        }
        _this.calculation(items, number);
      });
    }

    /**
* @function numberBlur 数量控件失去焦点时执行的方法
* @author lw
* @date 2020-12-22
* @param {object} items 元素节点列表
*/
    this.numberBlur = function (items) {
      var _this = this;
      //在items中向下查找叫这个名字的类并且绑定失去焦点事件
      $(items).find('.tb-text').blur(function () {
        // 获取input中的值
        var number = items.find('.tb-text').val();
        // 获取input的类名
        var numbers = items.find('.tb-text');
        // 如果输入框为空的时候失去焦点，就让value的值变为1
        if (number == '') {
          var num = 1;
          // 重新付给输入框中的value
          numbers.val(num);
          _this.calculation(items, num);

        }
        _this.calculation(items, number);
      });
    }

    /**
* @function calculation 点击数量控件后的算价方法
* @author lw
* @date 2020-12-22
* @param {object} items 元素节点列表 num value
*/
    this.calculation = function (items, num) {
      var Price = $(items).parents("li[data-carid]"),//获取产品列表的父级li
        numberid = Price.attr("data-carid");//获取产品id
      if (numberid) {  //如果存在id的话执行下面的语句
        //当前产品存在规格id时，把规格id和产品id拼接在一起 sxt 2020-12-22
        var specid = Price.attr("data-specid");
        if (specid) { numberid = numberid + "_" + specid }
        var numberPrice = Price.attr("data-price"),//产品单价
          totalPrice = (numberPrice * num).toFixed(2); //单价跟数量相乘 并截取小数点后两位
        var accounting = Price.find("p[data-source='subtotal']");//获取展示文本内容的标签
        if (Number.isFinite(totalPrice) == true) {
          if (totalprice == 0.00) { //改变该文本内容
            accounting.html(numberPrice);
          } else {
            accounting.html(totalprice);
          }
        } else {
          accounting.html(totalPrice);
        }
        var configureRes = linkFn.getCookie("configureRes");//查找cookie
        if (configureRes) {
          configureRes = JSON.parse(configureRes); //转化为JSON对象
          var data = linkFn.retrunData(configureRes, numberid, num, "add");//获取要设置cookie的数据
          if (data) { linkFn.setCookie("configureRes", JSON.stringify(data), 5) }
        }
      }
    }

    this.init = function () {
      this.encapsulationFn();
    }
  }

  var numBeNrFn = new NumBeNrFn();
  numBeNrFn.init();

  //导航方法类
  var MenuFn = function () {
    /**
     * @function menuShowHandler 导航显示处理
     * @date 2020-09-14
     * @author wyq
     * @param {object} ele 节点对象 
     * @param {object} opts 参数对象
     * @param {number} opts.width 次级导航项宽度
     * @param {number} opts.pwidth 次级导航父级项宽度
     * @param {number} opts.px 次级导航父级项左坐标
     */
    function menuShowHandler(ele, opts) {
      //是否是全屏
      if (ele.attr('data-fullwidth') == 'true') {
        var width = (window.innerWidth / opts.pwidth) * 100;

        ele.css({ width: width + '%', left: - opts.px + 'px' });
      }
      else {
        var position = ele.attr('data-position');
        //是否存在定位
        if (position) {
          var x = 0;

          var bodyW = document.body.clientWidth,
            eleWidth = opts.width,
            pwidth = opts.pwidth,
            eleParLeft = opts.px;
          //控件宽度
          if (eleWidth > bodyW) {
            eleWidth = bodyW;
            ele.css('width', eleWidth + 'px');
          }
          //是否是居右或者居中
          if (/right|center/.test(position)) {
            x = position == 'right'
              ?
              pwidth - eleWidth
              :
              (pwidth - eleWidth) / 2;
          }
          if (position == "left") {
            if ((eleWidth + eleParLeft) > bodyW) {
              x = bodyW - eleWidth - eleParLeft;
            }
          }
          if (position == "center") {
            let leftW = Math.abs((pwidth - eleWidth) / 2);
            let pwidth2 = pwidth / 2;
            let allLeftWidth = eleParLeft + pwidth2
            let blankLeft = allLeftWidth - leftW;
            if (allLeftWidth < (eleWidth / 2) || (blankLeft + eleWidth) > bodyW) {
              let defx = Math.abs(allLeftWidth - eleWidth / 2);//左侧空白的left值
              let newx = bodyW - defx - eleWidth;//剩余空白的宽度
              let x1 = -(leftW + Math.abs(newx) / 2);//li左侧的宽度加上空白的宽度
              console.log("计算1", x1)
              x = x1;
              //左侧宽度+容器宽度>页面宽度
              if ((Math.abs(x1) + eleWidth) > bodyW) {
                x = -leftW + newx;
                console.log(x, "计算3");
              }
              //左侧宽度>li左侧的宽度
              if (Math.abs(x1) > eleParLeft) {
                x = -eleParLeft;
                console.log(x, "计算2");
              }

            }
          }
          if (position == "right") {
            if (eleWidth > (eleParLeft + pwidth)) {
              x = -eleParLeft
            }
          }
          //设置坐标样式
          ele.css('left', x + 'px');
        }
      }
    }
    /**
    * @function slideDown 下拉动画
    * @author wyq
    * @date 2020-10-14
    * @param {Object} ele 节点对象 
    * @param {number|string} speed 速度
    * @param {string} easy 动画形式 
    * @param {string} [display] 元素显示方式 
    */
    function slideDown(ele, speed, easy, display) {
      //设置元素显示
      ele.css({ display: display || 'block', opacity: 0 });
      //获取元素高度
      var endValue = ele.height(), ptop = ele.css('paddingTop'), pbottom = ele.css('paddingBottom');
      //设置元素高度为零
      ele.css({ height: 0, paddingTop: 0, paddingBottom: 0, opacity: '', overflow: 'hidden' });
      //定时器
      var timer = setTimeout(function () {
        //动画结束执行动画
        function end() { ele.css({ height: '', paddingTop: '', paddingBottom: '', overflow: '' }); }
        //执行动画
        ele.animate({ height: endValue, paddingTop: ptop, paddingBottom: pbottom }, speed, easy, end);
        //次级结构中含有滚动列表时，要调用滚动列表初始化方法
        if (ele.find(".listBxSlider").length && !ele.find(".bx-viewport").length) {
          let _slideDom = ele[0].querySelectorAll(".listBxSlider");
          if (window.Public.listSliderInit) {
            window.Public.listSliderInit(_slideDom);
          }

        }

        //关闭定时器
        clearTimeout(timer);
      }, 0)
    }
    //分类导航点击下拉功能
    this.basicClassifyMenuFn = function () {
      var classifyMenu = document.querySelectorAll(".basicClassifyMenu");
      for (var i = 0; i < classifyMenu.length; i++) {
        // for循环
        var listDownIcon = $(classifyMenu[i]).find(".listDownIcon");
        listDownIcon.on("click", function () {
          let listDownBox = $(this).parents(".basicClassifyMenu").find(".listDownBox"),
            _class = listDownBox.attr("class");
          if (_class.indexOf("listDownUlBlock") != -1) {
            listDownBox.removeClass("listDownUlBlock");
          } else {
            listDownBox.addClass("listDownUlBlock");

          }
        })
      }
    }
    /**
     * @method clickMenuShowfn 水平导航鼠标点击展示次级导航循环方法
     * @author lw
     * @date 2021-3-30
     */
    this.clickMenuShowfn = function () {
      // 获取最外层的div的class
      var domeUl = document.getElementsByClassName("pcMainnav");
      for (var i = 0; i < domeUl.length; i++) {
        // for循环
        var items = domeUl[i], mode = items.getAttribute('data-switch');
        // 循环出来的内容付给这个变量
        mode == 'mouseclick' && this.clickMenuShow(items);

        mode == 'mouseover' && this.hoverMenuShow(items);
      }
    }
    //hover显示二级导航方法
    this.hoverMenuShow = function (items) {
      var hoverMenuLi = $(items).children(".mainNavLi"), _itemer = null;

      hoverMenuLi.mouseenter(function (e) {
        var _current = e.currentTarget,
          submenuNav = $(_current).children(".submenu-nav,.columnSubMenu");

        var liWidth = $(_current).width(), display = 'block', _twoUlWidth;
        //多列和次级容器存在执行计算位置 2020-09-25 wyq changed
        if (submenuNav.length) {
          var px = $(_current).offset().left;

          _twoUlWidth = submenuNav.outerWidth();

          if (submenuNav.attr('class').indexOf('columnSubMenu') != -1) { display = 'flex'; }
          //次级导航显示处理
          menuShowHandler(submenuNav, { width: _twoUlWidth, pwidth: liWidth, px: px });
        }
        else {
          submenuNav = $(_current).children("ul"); _twoUlWidth = submenuNav.width();
          //当前ul宽度小于一级宽度时，二级宽度等于ul宽度 sxt 2020-4-30
          if (_twoUlWidth < liWidth) { submenuNav.css("width", liWidth); }
        }
        _itemer = setTimeout(function () { slideDown(submenuNav, 'fast', '', display); }, 120);
        //如果次级不是次级容器，则绑定三级  2021-02-24 by wyq
        submenuNav.hasClass('submenu-nav') != true
          &&
          submenuNav.find('.mainNavLi').bind('mouseenter', threeMenuShow)

        $(_current).bind('mouseleave', leave);
      })

      function leave(event) {
        var target = $(event.currentTarget);

        var ul = target.children(".submenu-nav,.columnSubMenu")
        //获取不到次级容器和多列则获取正常次级节点 2020-09-25 wyq changed
        if (ul.length == 0) { ul = target.children("ul"); }
        //解绑事件
        target.unbind('mouseleave', leave);

        clearTimeout(_itemer), ul.slideUp('fast');
      }

      function threeMenuShow(event) {
        var target = $(event.currentTarget);

        target.children('ul').slideDown('fast');

        target.bind('mouseleave', leave);
      }
    }
    /**
     * @method clickMenuShow 水平导航鼠标点击展示次级导航方法
     * @author lw
     * @date 2021-3-22
     */

    this.clickMenuShow = function (items) {
      var _this = this, clickMenuLi = $(items).children(".mainNavLi");//获取状态

      clickMenuLi.on("click", function (e) {
        //容器次级导航展开方法 start
        var secondaryLi = e.currentTarget,//当前项
          submenuNav = $(secondaryLi).children(".submenu-nav,.columnSubMenu"),
          beforeSubmenuNav = submenuNav, liWidth = $(secondaryLi).width(),
          display = 'block', _itemer = null;
        //当前点击项的父级不存在data-switch时，证明是不是一级li，直接不进方法 sxt 2021-4-2
        if (!$(secondaryLi).parent().attr("data-switch")) { return; }

        _this.mouseModetion(secondaryLi);
        //.submenu-box,ul[data-index='2'],.subMenuLine.columnSubMenu" by wyq 2021-09-13 注释//当前项内存在的次级
        if (submenuNav.length == 0) { submenuNav = $(secondaryLi).children("ul"), beforeSubmenuNav = submenuNav; }
        //次级容器隐藏，执行显示
        if (submenuNav.attr('data-show-mode') != 'show') {
          if (submenuNav.length) {
            if (submenuNav.attr('class').indexOf('columnSubMenu') != -1) { display = 'flex'; }
            //次级导航显示处理
            menuShowHandler(submenuNav, { width: submenuNav.outerWidth(), pwidth: liWidth, px: $(secondaryLi).offset().left });
          }

          beforeSubmenuNav = $(secondaryLi.parentNode.querySelector('[data-show-mode="show"]'));

          submenuNav.attr('data-show-mode', "show");

          _itemer = setTimeout(function () { slideDown(submenuNav, 'fast', '', display), clearTimeout(_itemer); }, 120);
        }

        beforeSubmenuNav && beforeSubmenuNav.attr('data-show-mode', "hide").slideUp('fast');
        //阻止默认事件
        if (submenuNav.length > 0) { e.preventDefault(); }

        submenuNav.hasClass('submenu-nav') != true && _this.mouseModeleave(secondaryNav);
        //基础一行多列次级导航展开方法 end
        e.stopPropagation();//阻止事件冒泡 sxt 
      })
    }
    /**
     * @method mouseModetion 一行一列跳转执行方法
     * @author lw
     * @date 2021-3-24
     */
    this.mouseModetion = function (items) {
      var submenu_box = $(items).find('.submenu-box');
      if (submenu_box.length > 0) {//如果是次级容器的话 则阻止次级容器内所有a的冒泡
        $(items).find('a').click(function (e) {
          e.stopPropagation();
        });
      } else {
        $(items).find('li a').click(function (e) {
          e.stopPropagation();
        });
      }

    }
    /**
     * @method mouseModetion 一行多列展开三级方法
     * @author lw
     * @date 2021-3-24
     */
    this.mouseModeleave = function (items) {
      var _this = this;
      $(items).find('.textShowMenu.mainNavLi.showArrowstyle').on('mouseenter', function (e) {
        var mouseenterLi = e.currentTarget,//当前项
          mouseenterNav = $(mouseenterLi).children("ul.nav-submenu");
        mouseenterNav.slideDown(200);
        _this.mouseModetion(mouseenterNav);
      })
      $(items).find('.textShowMenu.mainNavLi.showArrowstyle').on('mouseleave', function (e) {
        var mouseleaveLi = e.currentTarget,//当前项
          mouseleaveNav = $(mouseleaveLi).children("ul.nav-submenu");//当前项内存在的次级
        mouseleaveNav.slideUp(200);
      })
    }
    /**
     * @function panelUlFn 侧导航ul显隐逻辑处理
     * @date 2021-09-16
     * @author sxt
     * @param {object} ul 节点对象 
     * @param {object} current 当前点击事件对象
     */
    this.panelUlFn = function (ul, current) {
      var currentPar = $(current).parent();
      var mainNavLi = $(current).parents(".mainNavLi"),//获取当前元素的父级元素，
        siblingsLi = mainNavLi.siblings(),//获取父级li的其他同级li
        allUl = siblingsLi.find("ul");//获取父级li内的所有ul;
      var isHidden = ul.is(':hidden');
      allUl.hide();//隐藏同级li内的ul
      siblingsLi.removeAttr("data-selected");//去掉同级li下的选中属性
      var parUl = currentPar.parents(".nav-submenu");
      if (parUl.length) {
        parUl.find("ul").hide();//隐藏当前子级的ul元素
        parUl.find("li").removeAttr("data-selected");//删除子级选中效果
      }
      if (isHidden) {
        currentPar.attr("data-selected", true)
        ul.show();
      } else {
        currentPar.removeAttr("data-selected")
        ul.hide();
      }
    }
    /**
     * @function panelLiClickFn 侧导航点击效果处理
     * @date 2021-09-16
     * @author sxt
     */
    this.panelLiClickFn = function () {
      var _mainNavLiA = $("#SITE_PANEL").find(".mainNavLiA"),
        _sideTrigger = $("#SITE_PANEL").find(".sideTrigger");
      var _this = this;
      //var sitetype=$("meta[name='sitetype']").attr("content")||"pc"
      var isEvent = /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone)/i.test(navigator.userAgent) ? 'touchend' : 'click';
      _mainNavLiA.on(isEvent, function (event) {
        var _href = $(this).attr("href"),
          _parent = $(this).parent(),
          _ul = _parent.children("ul")

        if (!_href && _ul) {
          _this.panelUlFn(_ul, this);
        }
        //event.preventDefault();
        event.stopPropagation();//阻止冒泡 sxt 2021-3-18
      })
      _sideTrigger.on(isEvent, function (event) {
        var _parent = $(this).parent(),
          _ul = _parent.children("ul")

        if (_ul) {
          _this.panelUlFn(_ul, this);
        }
        //event.preventDefault();
        event.stopPropagation();//阻止冒泡 sxt 2021-3-18
      })

    }
    this.init = function () {
      //鼠标点击水平导航展示次级导航循环方法 lw 2021-3-30
      this.clickMenuShowfn();
      //this.panelLiClickFn();//侧导航用js控制下级的显示，现在用css实现的  js控制的先隐藏掉 sxt 2022-2-11
      this.basicClassifyMenuFn();//分类导航功能js

    }
  }
  var menuFn = new MenuFn();
  menuFn.init();

  // LBY  2020-04-26


  // 二级导航在右侧下拉还是直接下拉  鼠标点击/移入111
  $('.verticalNav').each(function (i, element) {

    var _li = $(element).children('li');
    var change = $(element).attr('data-mouse') == "onclick" ? 'click' : /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'click' : 'mouseenter';
    if (change == "click") {
      _li = $(element).find('li');//在类型为click时，要获取所有的li，用于子级的显示隐藏
    }
    // 给li下面的i标签添加一个点击事件 默认不让他跳转
    $(_li.find('i')).on('click', function (e) {
      e.preventDefault();
      // e.stopPropagation();
    })
    $(_li).on(change, function (event) {
      var left = $(this).parents(".verticalNav").outerWidth(true) + 'px';
      var thatul = $(this).children('ul').is(':hidden')
      // ---------------------分割线----------------------
      var topOfDocument = $(this).offset().top     //元素到文档顶部的距离
      var scrollBarAway = $(document).scrollTop()   //滚动条卷去的距离
      var ulHeight = $(this).height()  //元素高度$(this).children('ul').height()
      // ---------------------分割线---------------------
      var mainNavigation = $(this).width(); //主导航的宽度
      var SecondaryNavigation = $(this).children('ul').width();  //二级导航的宽度
      var bottomOfDocument = $(document).height() - topOfDocument   //元素到文档底部的距离


      var boxHeight = $(this).children('ul').height();                             //元素的高度                           C
      var visibleArea = $(window).height()    //当前可视区域的高度
      var finalHeight = visibleArea - topOfDocument + scrollBarAway - ulHeight     //元素距离屏幕当前可视区域的底部的距离   B
      var _liHeight = _li.height()
      //if(change=="mouseenter"){_li.children('ul').hide();}//之前
      // console.log('向下', $(this).children('ul').is(':hidden'))
      // console.log('元素的高度', ulHeight, '获取从当前展开到浏览器顶部的距离', nowTop, '获取当前展开位置到浏览器底部的距离', ulTop, '向上走的距离', lateTop, '滚动条的高度', $(window).scrollTop(), '元素距边的距离', $(this).offset().top, '浏览器的高度', $(document).height())
      if (change == "click") {
        var localName = event.target.localName,
          _href = $(this).children().attr("href");
        //当前的a存在链接，并且点击的是p标签，就不执行回收操作，直接跳转页面 sxt 2021-3-18
        if (_href && localName == "p") {
          event.stopPropagation();//阻止冒泡 sxt 2021-3-18
          return;
        }
      }
      if (thatul) {
        //显示时隐藏其他项中的ul展开结构 sxt 2021-3-18
        if (change == "click") { $(this).siblings().find("ul").slideUp(0); }
        $(this).children('ul').slideDown(300);
      } else {
        //关闭当前项时把子级的ul也掉
        if (change == "click") { $(this).children('ul').find("ul").slideUp(0); }
        $(this).children('ul').slideUp(0);
        //     _li.children('ul').stop(true).slideUp(0)  //之前 
      }
      // $(this).children('ul').show();
      if ($(element).attr('data-position') == 'rightWard') {
        $(this).children('ul').css('top', '').css('bottom', '')
        var fromAbove = $(this).children('ul').offset().top - $(window).scrollTop()  //元素距离屏幕当前可视区域的顶部的距离   A
        if (mainNavigation > SecondaryNavigation) {
          $(this).children('ul').css({
            'position': 'absolute',
            "left": left,
            'width': mainNavigation + 'px',
            'zIndex': '2000'
          })
        } else {
          $(this).children('ul').css({ 'position': 'absolute', "left": left, 'zIndex': '2000' })
        }

        if (finalHeight - boxHeight > 0) {
          $(this).children('ul').css({ "top": '0px' })
        } else {
          $(this).children('ul').css({ "top": finalHeight - boxHeight + _liHeight })
        }

        if (boxHeight > visibleArea) {
          $(this).children('ul').css({ "top": -fromAbove + _liHeight + 8 })
        }
      }
      event.stopPropagation();//阻止冒泡 sxt 2021-3-18
      //if(change=="click"){event.stopPropagation(); }
    })
    if (change == 'mouseenter') {
      $(_li).on('mouseleave', function (e) {
        $(this).children('ul').slideUp(200);//.stop(true, false)
        // console.log(111)
        // _li.children('ul').hide();
      })
    }
  })

  var Multilingual = function () {
    this.clickMultilingual = function () {
      var domelist = document.getElementsByClassName("dropdown");
      for (var i = 0; i < domelist.length; i++) {
        // for循环
        var itemslist = $(domelist[i]);
        // 循环出来的内容付给这个变量
        this.lingualOnClick(itemslist);
      }
    }
    this.lingualOnClick = function (itemslist) {
      // 在itemslist中向下查找叫这个名字的类并且绑定点击事件
      $(itemslist).find('.dropbtn').bind("click", function () {
        var dropdownshow = itemslist.find('.dropdown-content');
        dropdownshow.slideToggle(300);
      });
    }
    this.init = function () {
      //点击显示多语言和货币方法
      this.clickMultilingual();
    }
  }
  var multilingual = new Multilingual();
  multilingual.init();



  /**
       * @function moHeadSearchGual 移动端搜索多语言展开以及切换方法
       * @author lw
       * @date 2021-4-7
       */
  var moHeadSearchGual = function () {

    this.encaFn = function () {
      $('.mo_header_itempar').each(function (index, item) {
        var searchicon = $(item).find('.search-input .closeBox i'), //搜索展示内容内关闭icon
          buttonActive = $(item).find('.search-wrap .btnIcon'), //搜索icon
          languageBox = $(item).find('.languageBox .btnIcon'); //多语言icon
        buttonActive.on("click", function (e) {
          //绑定事件
          //panel开启时，点击切换按钮把panel关闭掉 sxt 2021-4-14
          $(".buttonNewClass").find("div[data-functionallink='bindPanel']").trigger("click");
          $(item).toggleClass("searchNewClass");
          //给父节点追加class 使用父级class用来控制icon的展示或者隐藏
          $(item).removeClass("multilingualNewClass buttonNewClass");

        })

        languageBox.on("click", function (e) {
          //绑定事件
          //panel开启时，点击切换按钮把panel关闭掉 sxt 2021-4-14
          $(".buttonNewClass").find("div[data-functionallink='bindPanel']").trigger("click");
          $(item).toggleClass("multilingualNewClass");
          //给父节点追加class 使用父级class用来控制icon的展示或者隐藏
          $(item).removeClass("searchNewClass buttonNewClass");

        })

        searchicon.on("click", function (e) {
          //关闭icon绑定事件
          $(item).removeClass("searchNewClass");
        })

      })
    }
    this.init = function () {
      this.encaFn();
    }
  }

  var moHeadFn = new moHeadSearchGual();
  moHeadFn.init();
  /**
  * @function getEmail 获取表单email的value值
  * @author wh
  * @date 2022-8-11
  */
  var getGaEmail = function () {
    var form = $(".form");
    var emails = form.find(("[data-form-type='email']"));
    if (emails.length > 1) {
      var emailValue = []
      for (var i = 0; i < emails.length; i++) {
        var email = $(emails[i]).find("input").val()
        if (email) { emailValue.push(email) }
      }
    } else {
      var emailValue = ""
      if (emails) {
        emailValue = $(emails).find("input").val()
      }
    }
    return emailValue
  }
  /**
     * @function getGaTel 获取表单电话的value值
     * @author wh
     * @date 2022-8-11
     */
  function getGaTel() {
    var form = $(".form");
    var tels = form.find(("[data-form-type='tel']"));
    if (tels.length > 1) {
      var telValue = []
      for (var i = 0; i < tels.length; i++) {
        var tel = $(tels[i]).find("input").val()
        if (tel) { telValue.push(tel) }
      }
    } else {
      var telValue = ""
      if (tels) {
        telValue = $(tels).find("input").val()
      }
    }
    return telValue
  }
  window.getGaEmail = getGaEmail;
  window.getGaTel = getGaTel;
  /**
  * @function setProductContent 设置产品内页内容
  * @author wh
  * @date 2022-9-14
  */
  function setProductContent() {
    var aa = $('.textLineP[data-source^="detailed_info"]')
    var keyArr = [],
      domArr = [];
    for (var i = 0; i < aa.length; i++) {
      var dataDom = aa[i]
      var dataSource_ = $(dataDom).attr('data-source')
      var rule = /11|12|13|14|15|16|17|18|19|20/
      if (rule.test(dataSource_)) {
        keyArr.push(dataSource_) //满足条件的数据源属性
        domArr.push(dataDom)  //满足条件的数据源文本结构
      }
    }
    var sidDom = $('meta[name="md5SiteId"]'),
      sid = '',
      goodsIdDom = $('meta[name="ids"]'),
      goodsId = '';
    //获取sid
    if (sidDom) {
      sid = $(sidDom[0]).attr('content')
    }//获取goods_id    
    if (goodsIdDom) {
      goodsId = $(goodsIdDom[0]).attr('content');
      if (keyArr.length && goodsId) {
        getProductContent(keyArr, sid, goodsId, domArr)
      }

    }

  }
  /**
  * @function getProductContent 请求产品内页详情
  * @author wh
  * @date 2022-9-14
  */
  function getProductContent(keyArr, sid, goodsId, domArr) {
    var url = window.origin + "" + goodsdetailedUrl;
    Public.fetch(url,
      {
        method: 'post', async: true,
        body: {
          goods_id: goodsId,
          sid: sid,
          keyArr: keyArr || []

        },
        success: function (data) {
          if (data.status == 200) {
            var res = data.data
            res = JSON.parse(res)
            var keyArr = res.data
            for (var i = 0; i < domArr.length; i++) {
              var source = $(domArr[i]).attr('data-source') //遍历数据源结构，返回的数据源数据有对应的话赋值  wh  2022-9-14
              if (keyArr[source]) {
                $(domArr[i]).html(keyArr[source])
              }

            }
          }

        }
      })
  }
  /**
  * @function menuIconBind 导航icon绑定点击事件
  * @author wh
  * @date 2022-9-14
  */
  function menuIconBind() {
    var menus = $('.horizontalNav')
    for (var i = 0; i < menus.length; i++) {
      var iconLabels = $(menus[i]).find('label')
      var icon = iconLabels[0]
      $(icon).bind('click', menuLabelClick)

    }
  }
  menuIconBind()
  /**
  * @function menuLabelClick 导航icon点击事件
  * @author wh
  * @date 2022-9-14
  */
  function menuLabelClick() {  //根据input选中状态判断次级导航是否展开，展开加层级，否则清掉  wh 2022-9-14
    var toggle = $(this).siblings('.menuToggle'),
      checked = $(toggle[0]).prop('checked'),
      menubox = $(this).parents('.menubox');
    if (!checked) {
      $(menubox[0]).css('z-index', 10)
    } else {
      $(menubox[0]).css('z-index', '')
    }

  }
  setProductContent()
  $('.memberQuit').each(function (i, e) {
    $(e).on("click", function () {
      sessionStorage.removeItem('userInfo');
    });
  });
  function wxConst() {
    if (typeof wx != 'undefined') {


      var sidDom = $('meta[name="md5SiteId"]');
      var sid = sidDom ? $(sidDom[0]).attr('content') : '';

      if (!sid) {
        console.error('Site ID is missing!');
        return;
      }

      let url = ''
      if (location.host.includes('dev.qdetong.com')) {
        url = 'https://platform.bjyyb.net/basics_data_center/wechat_share/getPackage'
      } else {
        url = 'https://platform.eyingbao.net/basics_data_center/wechat_share/getPackage'
      }

      // 发起AJAX请求以获取微信配置数据
      $.ajax({
        url: url,
        method: "post",
        dataType: "json",
        data: {
          "site_id": sid,
          "url": location.href.split('#')[0]
        },
        success: function (data) {
          var items = data.data;
          var title, desc, image;

          // 获取分享内容相关的meta标签
          var tagTitle = document.querySelector('meta[name="wx:title"]');
          var tagDescription = document.querySelector('meta[name="wx:description"]');
          var tagImage = document.querySelector('meta[name="wx:image"]');

          // 提取分享内容
          if (tagTitle) {
            title = tagTitle.getAttribute('content');
          }
          if (tagDescription) {
            desc = tagDescription.getAttribute('content');
          }
          if (tagImage) {
            image = tagImage.getAttribute('content');
          }

          // 配置微信JS-SDK
          wx.config({
            // 调试模式建议通过配置或环境变量控制，而不是硬编码
            debug: false, // 根据环境设置为true或false
            appId: items.appId,
            timestamp: items.timestamp,
            nonceStr: items.nonceStr,
            signature: items.signature,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
          });

          // 准备分享数据
          wx.ready(function () {
            wx.updateAppMessageShareData({
              title: title,
              desc: desc,
              link: window.location.href,
              imgUrl: image,
              success: function (e) {
                console.log('App Message Share Data updated successfully', e);
              }
            });

            wx.updateTimelineShareData({
              title: title,
              imgUrl: image,
              link: window.location.href,
              success: function (e) {
                console.log('Timeline Share Data updated successfully', e);
              }
            });
          });

          wx.error(function (res) {
            console.log('Error occurred while initializing WeChat JS-SDK', res);
          });
        },
        error: function (xhr, status, error) {
          console.log('AJAX Error:', error);
        }
      });
    }
  }
  wxConst()
})

window.onbeforeunload = function () {  //产品加密清除cookie
  var a = document.querySelector('[name="ids"]').getAttribute('content');
  document.cookie = 'goodsMd5Password_' + a + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/'
}