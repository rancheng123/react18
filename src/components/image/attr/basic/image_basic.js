__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageBasic", function() { return ImageBasic; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var basic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! basic */ "./components/page/attr/basic/basic.js");
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");



class ImageBasic extends basic__WEBPACK_IMPORTED_MODULE_1__["Basic"] {
    constructor(controler) {
        super();
        /**@property controler 边框控制器实例 */

        this.controler = controler;
    }
    /**
     * @method  selectionContentSet 内容来源
     * @author sxt
     * @return {object} 内容来源属性结构
     */


    selectionContentSet() {
        //在幻灯片中不显示该项 wh 2022-9-17
        const {
            comeFrom
        } = this.state;
        return comeFrom != 'slideShow' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
            title: "selectionContent",
            id: "",
            list: [{
                name: "custom",
                value: "custom"
            }, {
                name: "databaseData",
                value: "databaseData"
            }],
            value: this.state.selectionContent || "custom",
            change: this.controler.setContent.bind(this.controler)
        }) : null;
    }
    /**
     * @method inputText输入框   selectImage更改图片
     * @author sxt
     * @param {object} 更改按钮文本内容
     */


    selectImage() {
        const {
            comeFrom
        } = this.state;

        let _selectionContent = this.state.selectionContent || "custom";

        let parentData = this.controler.getParentType(this.props.node, "em-MoHeader"); //查找当前控件是否在MO头部中
        //当前页面是mo编辑页面，并且不在mo头部中，就不显示选择图片的面板 sxt 2021-4-6

        if (this.props.prefix == 'mo' && !parentData) {
            return null;
        } //在幻灯片中不显示该项 wh 2022-9-17


        if (comeFrom == 'slideShow') {
            return null;
        }

        if (_selectionContent == "custom") {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].SelectImage, {
                title: "selectImage",
                id: "selectImage",
                src: this.state.uri,
                click: this.controler.selectImageShow.bind(this.controler)
            });
        }

        return null;
    }
    /**
     * @method inputText输入框   imageQuality更改图片
     * @author sxt
     * @param {object} 更改按钮文本内容
     */


    imageQuality() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].ImageQuality, {
            id: "imageQuality",
            data: this.state,
            prefix: this.props.prefix,
            help: "qualityTips",
            change: this.controler.setQuality.bind(this.controler, "quality")
        });
    }
    /**
     * @method imageWebp   设置图片webp是否开启
     * @author sxt
     * @param {object} 更改按钮文本内容
     */


    imageWebp() {
        let isWebp = this.state.isWebp;

        if (isWebp === false) {
            isWebp = false;
        } else {
            isWebp = true;
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
            title: "WebP",
            id: "",
            list: [{
                name: "openTurn",
                value: "true"
            }, {
                name: "closeOff",
                value: "false"
            }],
            value: isWebp,
            change: this.controler.setImgWebp.bind(this.controler, "isWebp")
        });
    }
    /**
     * @method originalFormat   originalFormat更改图片原格式
     * @author sxt
     * @param {object} 更改按钮文本内容
     */


    originalFormat() {
        let {
            comeFrom = ""
        } = this.state; //当位于幻灯片并为mo端时不展示

        return comeFrom && this.props.prefix == 'mo' ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].OriginalFormat, {
            id: "originalFormat",
            data: this.state,
            prefix: this.props.prefix,
            change: this.controler.setOriginal.bind(this.controler, "dataRetain")
        });
    }
    /**
     * @method dataText 数据源文本
     * @author sxt
     * @param {object} 更改数据源内容
     */


    dataText() {
        const {
            dataSource = {},
            label,
            selectionContent,
            comeFrom
        } = this.state || {};
        let _value = window.public.lang["selectDataSource"];

        if (selectionContent == "databaseData" && comeFrom != 'slideShow') {
            if (dataSource.sourceType) {
                _value = dataSource.sourceText + ">" + dataSource.companyName || window.public.lang["pleaseChoose"];
            }

            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].ShowInfo, {
                title: "dataSources",
                id: "",
                value: _value,
                click: this.controler.showDataSource.bind(this.controler)
            });
        }

        return null;
    }
    /**
     * @method link 链接
     * @date 2019-12-17
     * @author wp
     * @return {object} 链接结构
     */


    link() {
        const {
            state: {
                effect = "noLink"
            }
        } = this;
        let {
            comeFrom = ""
        } = this.controler.state;
        let dataSource = this.state.dataSource || {}; //数据源类型为列表时，不需设置链接 sxt 2020-4-23

        if (dataSource.type == "list") {
            return null;
        } //当位于幻灯片并为mo端时，不展示  wh 2022-8-12


        if (comeFrom && this.props.prefix == 'mo') {
            return null;
        } //移动端在选择点击事件选项为无连接和打开链接时都展示 author lw data 2021-1-25


        if (this.props.prefix == 'mo') {
            return effect == "openLink" || effect == "noLink" ? super.link() : null;
        }

        return effect == "openLink" ? super.link() : null;
    }
    /**
     * @method  clickEvent 点击事件
     * @author sxt
     * @return {object} 点击事件属性结构
     */


    clickEvent() {
        let dataSource = this.state.dataSource || {}; //数据源类型为列表时，不需设置放大和链接 sxt 2020-4-23

        if (dataSource.type == "list") {
            return null;
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
            title: "imgClick",
            id: "",
            list: ["noLink", "openLink", "imgBig"],
            value: this.state.effect || "noLink",
            change: this.controler.imgClick.bind(this.controler)
        });
    }
    /**
     * @method dataInput 公用input链接调取数据源面板
     * @date 2020-05-19
     * @author lby
     * @param {object} prop 配置对象
     * @param {object} prop.data 当前数据
     * @param {string} prop.skin 父级class
     * @param {string} prop.title 标题
     * @param {string} prop.key  设置属性名称
     * @param {string} prop.placeholder 提示文本
     * @return {object} 公用input链接调取数据源面板组件结构
     */


    dataInput(prop, type, language) {
        let _readonly = "",
            _openClose = false;
        let dataSource = this.state[`dataSource_${type}`],
            _value = this.state[prop.key]; //设置的属性值

        if (dataSource) {
            //判断数据里面有没有dataSource_alt 有的话就变成只读  添加关闭按钮
            _value = dataSource.companyValue;
            _readonly = "readonly", _openClose = true;
        } // }


        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: prop.skin || "pcAttList"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
            className: "pcConAttTitle "
        }, window.public.lang[prop.title]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "pcConAttCon ImgSourcestyle"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
            className: "dataText",
            onClick: this.controler.showSecondDataSource.bind(this.controler, type, prop.data)
        }, window.public.lang["sourceOfData"], react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            href: "#",
            className: "dataIcon"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Input, {
            id: [language],
            readOnly: _readonly,
            placeholder: window.public.lang[language],
            value: _value ? _value : '',
            change: this.controler.changText.bind(this.controler, [type])
        }), _openClose ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "formCancelButton",
            onClick: this.controler.showTextClose.bind(this.controler, [type], prop.data)
        }, "\u2573") : null));
    }
    /**
     * @method altText描述   可选数据源调面板
     * @author lby
     * @param {object} 更改按钮文本内容
     * @date 2020-05-19
     */


    altText() {
        let dataSource = this.state.dataSource || {};
        let {
            skin
        } = this.state || {};
        let skinList = ["image.commonImg.s292.421", "image.commonImg.s63.283"]; //数据源类型为列表时，不需设置链接 sxt 2020-4-23

        if (dataSource.type == "list" && !skinList.includes(skin)) {
            return null;
        }

        let sourceData = this.state.dataSource_alt ? this.state.dataSource_alt : {};
        return this.dataInput({
            data: sourceData,
            title: "imgAlt",
            key: "alt"
        }, 'alt', 'imgAltPla');
    }
    /**
     * @method titleText提示   changText更改文本
     * @author sxt
     * @param {object} 更改按钮文本内容
     */


    titleText() {
        let dataSource = this.state.dataSource || {};
        let {
            skin
        } = this.state || {};
        let skinList = ["image.commonImg.s292.421", "image.commonImg.s63.283"]; //数据源类型为列表时，不需设置链接 sxt 2020-4-23

        if (dataSource.type == "list" && !skinList.includes(skin)) {
            return null;
        }

        let sourceData = this.state.dataSource_title ? this.state.dataSource_title : {};
        return this.dataInput({
            data: sourceData,
            title: "imgTitle",
            key: "title"
        }, 'title', 'imgTitlePla'); // return <Widget.Input title="imgTitle" id="imgTitle"
        // 	readonly={false} placeholder={window.public.lang["imgTitlePla"]}
        // 	value={this.state.title || ""}
        // 	change={this.controler.changText.bind(this.controler, "title")}
        // />
    }
    /**
     * @description: 设置图片高度，修改padding-top
     * @return: void
     * @author: Eric
     * @Date: 2020-01-07 15:17:54
     */


    sizeRatioHeight() {
        let dataSource = this.state.dataSource || {}; //图片中数据源的type为list时，证明是列表控件，显示高度设置  sxt 2020-3-30

        if (this.state.layout && dataSource.type == "list") {
            var _ref, _layout$;

            const layout = this.state.layout,
                value = (_ref = (_layout$ = layout[`${this.props.prefix}height`]) !== null && _layout$ !== void 0 ? _layout$ : layout.height) !== null && _ref !== void 0 ? _ref : 0;
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Range, {
                id: "height",
                title: "height",
                min: 0,
                max: 1000,
                value: value,
                change: this.controler.setSizeRatioHeight.bind(this.controler)
            });
        }
    }
    /**
     * @method  selectionContentSet 内容来源
     * @author sxt
     * @return {object} 内容来源属性结构
     */


    imgShowType() {
        let {
            parentType
        } = this.state; //"showType":"显示方式",cover:"裁切", fill:"拉伸", contain:"等比",

        let dataSource = this.state.dataSource || {}; //图片中数据源的type为list时，证明是列表控件，显示高度设置  sxt 2020-3-30

        if (parentType == "list") {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
                title: "showType",
                id: "",
                list: [{
                    name: "cover",
                    value: "cover"
                }, {
                    name: "fill",
                    value: "fill"
                }, {
                    name: "contain",
                    value: "contain"
                }],
                value: this.state.showType || "cover",
                change: this.controler.setShowType.bind(this.controler)
            });
        }
    }

}

//# sourceURL=webpack:///./components/image/attr/basic/image_basic.js?