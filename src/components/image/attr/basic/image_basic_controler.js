__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageBasicControler", function() { return ImageBasicControler; });
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _image_basic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image_basic */ "./components/image/attr/basic/image_basic.js");
/* harmony import */ var basic_controler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! basic-controler */ "./components/page/attr/basic/basic_controler.js");
/* harmony import */ var _system_function_resource_resource_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../system/function/resource/resource_manager */ "./system/function/resource/resource_manager.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! util */ "./components/page/util/util.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class ImageBasicControler extends basic_controler__WEBPACK_IMPORTED_MODULE_2__["BasicControler"] {
    constructor(props) {
        super(props);
        /**@property {Link} view 初始化 view 实例*/

        this.view = new _image_basic__WEBPACK_IMPORTED_MODULE_1__["ImageBasic"](this); //给view 入口方法绑定this

        this.view.render = this.view.render.bind(this.view);
    }

    init() {
        super.init();
        let parentData = this.getParentType(this.props.node, "em-List"); //查找当前控件是否在列表中

        if (parentData) {
            this.state.parentType = "list";
        }

        ;
    }
    /**
     * @method  setContent 设置数据源类型
     * @date 2019-11-9
     * @author sxt
     * @param {event} e 事件对象
     */


    setContent(e) {
        const _value = e.target.value;
        let {
                props: {
                    id,
                    config,
                    node: {
                        current: {
                            skin
                        }
                    }
                }
            } = this,
            hidden = true;
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
            args: [`document_data.selectionContent`, _value]
        });

        if (_value == "custom") {
            dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_remove`, {
                value: 'document_data.dataSource'
            });
            this.setState({
                "dataSource": "",
                "selectionContent": _value
            });
            hidden = false;
        } else {
            this.setState({
                "dataSource": {},
                "selectionContent": _value
            });
        } //设置属性按钮值


        const btns = dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch('select_button', {
            args: [config, skin, 0, 'hidden', hidden]
        }); //重新加载属性按钮

        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch('select_loadButtons', {
            value: btns
        });
    }
    /**
     * @method  setShowType 设置图片显示方式
     * @date 2020-10-14
     * @author sxt
     * @param {event} e 事件对象
     */


    setShowType(e) {
        let value = e.target.value;
        this.setState({
            "showType": value
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.showType`, value]
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: ['theme_data.style.showType', value]
        });
    }
    /**
     * @method setImg 设置图片方法
     * @date 2019-11-7
     * @author sxt
     * @param {Object} datas 返回数据
     * @param {event} event 事件对象
     */


    setImg(datas) {
        const {
            ima_path,
            w,
            h,
            name
        } = datas || {};
        this.setState({
            "uri": ima_path
        });
        const {
            parent
        } = this.props.node || {};
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.`, {
                uri: ima_path,
                alt: name
            }]
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: ['component.layout.', {
                width: Number(w),
                height: Number(h)
            }]
        });
        this.setState({
            alt: name
        });
        this.setDataSize({
            uri: ima_path
        });
    }
    /**
     * @method SelectImage 图片设置面板显示方法
     * @date 2019-11-7
     * @author sxt
     * @param {event} event 事件对象
     */


    selectImageShow() {
        Object(_system_function_resource_resource_manager__WEBPACK_IMPORTED_MODULE_3__["resourceManager"])("image").then(module => {
            module.resource({
                selected: this.setImg.bind(this)
            });
        });
    }
    /**
     * @method showDataSource 显示数据源面板-文本-按钮
     * @author sxt
     */


    showDataSource() {
        const promise = Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("data_source_controler")]).then(__webpack_require__.bind(null, /*! ../../../../system/function/data_source/data_source_controler */ "./system/function/data_source/data_source_controler.js"));
        let parentData = this.getParentType(this.props.node, "em-List"); //查找当前控件是否在列表中

        promise.then(({
                          DataSourceControler
                      }) => {
            DataSourceControler && DataSourceControler.dataSource({
                initialData: this.state.dataSource,
                data_source_type: "Image",
                identifier_item: "goods",
                ensure: data => {
                    data.sourceName = "uri";

                    if (parentData) {
                        data.type = "list";
                    }

                    ; //控件在列表中，添加type=list 用于后台替换列表数据

                    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
                        args: [`document_data.`, {
                            dataSource: data,
                            uri: data.companyValue || "https://img.bjyyb.net/notImage.jpg"
                        }]
                    });
                    this.setState({
                        "dataSource": data,
                        uri: data.companyValue || "https://img.bjyyb.net/notImage.jpg"
                    });
                }
            });
        });
    }
    /**
     * @method  changText 设置按钮文本
     * @date 2019-11-9
     * @author sxt
     * @param {string} key 数据名称
     * @param {event} e 事件对象
     */


    changText(key, e) {
        const _value = e.target.value;
        this.setState({
            [key]: _value
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.${key}`, _value]
        });
    }
    /**
     * @method  imgClick 点击事件
     * @date 2019-11-9
     * @author sxt
     * @param {event} e 事件对象
     */


    imgClick(e) {
        const _value = e.target.value;
        this.setState({
            "effect": _value
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.effect`, _value]
        }); //如果加载ling结构时为无连接时，将link对象清空 author lw data 2021-1-25

        if (_value == 'noLink') {
            this.setState({
                link: undefined
            });
            dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_remove`, {
                value: 'document_data.link'
            });
        }
    }
    /**
     * @method change 单选、下拉值修改时执行方法
     * @date 2019-11-7
     * @author wyq
     * @param {string} key 键值
     * @param {event} event 事件对象
     */


    change(key, event) {
        this.set(key, event.target.value);
    }
    /**
     * @method setDataSize 设置图片大小的方法
     * @date 2019-11-7
     * @author sxt
     * @param {string} key 键值
     * @param {event} event 事件对象
     */


    setDataSize(prop) {
        let {
                uri,
                dataRetain,
                quality
            } = this.state || {},
            _data = {
                uri: uri,
                dataRetain: dataRetain,
                quality: quality
            },
            _newData = { ..._data,
                ...prop
            };

        let _uri = util__WEBPACK_IMPORTED_MODULE_4__["Util"].imagePath(_newData);

        this.getDataSize(_uri).then(data => {
            if (data) {
                this.setState({
                    dataSize: data
                });
                dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
                    args: [`document_data.dataSize`, data]
                });
            }
        });
    }
    /**
     * @method setQuality 设置原格式
     * @date 2019-11-7
     * @author sxt
     * @param {string} key 键值
     * @param {event} event 事件对象
     */


    setOriginal(key, event) {
        let value = event.target.value; //拼后拽

        key = this.props.prefix + key;
        this.setState({
            [key]: value
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.${key}`, value]
        });
        this.setDataSize({
            [key]: value
        });
    }
    /**
     * @method setOriginal 设置质量方法
     * @date 2019-11-7
     * @author sxt
     * @param {string} key 键值
     * @param {event} event 事件对象
     */


    setQuality(key, event) {
        let value = event.target.value; //拼后拽

        key = this.props.prefix + key;
        this.setState({
            [key]: value
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.${key}`, value]
        });
        this.setDataSize({
            [key]: value
        });
    }
    /**
     * @method setImgWebp 设置图片webp开关
     * @date 2022-4-19
     * @author sxt
     * @param {string} key 键值
     * @param {event} event 事件对象
     */


    setImgWebp(key, event) {
        let value = event.target.value == "true" ? true : false;
        this.setState({
            [key]: value
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.${key}`, value]
        });
        this.setDataSize({
            [key]: value
        });
    }
    /**
     * @description: 设置图片高度，修改padding-top
     * @param {event}
     * @return: void
     * @author: Eric
     * @Date: 2020-01-07 14:19:22
     */


    setSizeRatioHeight(event) {
        const {
                target: {
                    value
                }
            } = event,
            {
                props: {
                    id,
                    prefix
                }
            } = this,
            currentEle = window.public.dom.querySelector('#' + id),
            //当前控件
            width = currentEle.parentNode.offsetWidth,
            scale = this.getScale(value, width);
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
            args: [`theme_data.style.${prefix}paddingHeight`, scale]
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
            args: [`component.layout.${prefix}height`, value]
        });
        this.setState({
            layout: { ...this.state.layout,
                [`${prefix}height`]: value
            }
        });
    }
    /**
     * 获取控件css属性值
     *
     * @param {win}
     * @param {ele}
     * @param {attr}
     * @return: int
     * @author: Eric
     * @Date: 2019-12-28 15:59:42
     */


    getCssValue(win, ele, attr) {
        return parseFloat(win.getComputedStyle(ele)[attr].replace('px', '')); //当前控件marginRight值
    }
    /**
     * 获取比例
     *
     * @param {type}
     * @return: void
     * @author: Eric
     * @Date: 2019-12-28 16:10:27
     */


    getScale(value, baseWidth) {
        return value / baseWidth * 100;
    } // /**
    // * @method showTextClose 清除数据源数据
    // * @author lby
    // * @date 2020-05-19
    // */
    // showTextClose() {
    //     //清除存入的数据
    //     Dispatcher.dispatch(`${this.props.id}_set`, {
    //         args: [`document_data.`, { dataSource_alt: '', alt: '' }]
    //     })
    //     //清除面板的数据
    //     this.setState({ dataSource_alt: '', alt: '' })
    // }
    //     /**
    //  * @method showDataSource 显示数据源面板
    //  * @author LBY
    //  * @date 2020-05-19
    //  */
    //     showSecondDataSource() {
    //         const promise = import("../../../../system/function/data_source/data_source_controler")
    //         promise.then(module => {
    //             module.DataSourceControler
    //                 &&
    //                 module.DataSourceControler.dataSource({
    //                     data_source_type: "Text",
    //                     identifier_item: "company",
    //                     ensure: data => {
    //                         console.log(data)
    //                         data.sourceName = 'alt';
    //                         Dispatcher.dispatch(`${this.props.id}_set`, {
    //                             args: [`document_data.`, { dataSource_alt: data, alt: data.companyValue || "" }]
    //                         })
    //                         this.setState({ "dataSource_alt": data, alt: data.companyValue || "" })
    //                     }
    //                 })
    //         })
    //     }

    /**
     * @method showDataSource 显示数据源面板
     * @author LBY
     * @date 2020-05-19
     */


    showSecondDataSource(type, defDataSource) {
        console.log(type);
        const promise = Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("data_source_controler")]).then(__webpack_require__.bind(null, /*! ../../../../system/function/data_source/data_source_controler */ "./system/function/data_source/data_source_controler.js"));
        let parentData = this.getParentType(this.props.node, "em-List"); //查找当前控件是否在列表中

        promise.then(module => {
            module.DataSourceControler && module.DataSourceControler.dataSource({
                data_source_type: "Text",
                identifier_item: "goods",
                initialData: defDataSource,
                ensure: data => {
                    data.sourceName = type;

                    if (parentData) {
                        if (data.selectContent == "specify") {
                            data.selectContent = "autoBinding";
                        }

                        data.type = "list";
                    }

                    ; //控件在列表中，添加type=list 用于后台替换列表数据

                    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
                        args: [`document_data.`, {
                            [`dataSource_${type}`]: data,
                            [type]: data.companyValue || ""
                        }]
                    });
                    this.setState({
                        [`dataSource_${type}`]: data,
                        [type]: data.companyValue || ""
                    });
                }
            });
        });
    }
    /**
     * @method showTextClose 清除数据源数据
     * @author lby
     * @date 2020-05-19
     */


    showTextClose(type) {
        //清除存入的数据
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.`, {
                [`dataSource_${type}`]: '',
                [type]: ''
            }]
        }); //清除面板的数据

        this.setState({
            [`dataSource_${type}`]: '',
            [type]: ''
        });
    }

} //     /**
// * @method showDataSource 显示数据源面板
// * @author LBY
// * @date 2020-05-19
// */
// showSecondDataSource(type) {
//     console.log(type)
//     const promise = import("../../../../system/function/data_source/data_source_controler")
//     promise.then(module => {
//         module.DataSourceControler
//             &&
//             module.DataSourceControler.dataSource({
//                 data_source_type: "Text",
//                 identifier_item: "company",
//                 ensure: data => {
//                     console.log(data)
//                     data.sourceName = 'uri';
//                     Dispatcher.dispatch(`${this.props.id}_set`, {
//                         args: [`document_data.`, { [`dataSource_${type}`]: data, uri: data.companyValue || "" }]
//                     })
//                     this.setState({ [`dataSource_${type}`]: data, uri: data.companyValue || "" })
//                 }
//             })
//     })
// }
// /**
// * @method showTextClose 清除数据源数据
// * @author lby
// * @date 2020-05-19
// */
// showTextClose(type) {
//     //清除存入的数据
//     Dispatcher.dispatch(`${this.props.id}_set`, {
//         args: [`document_data.`, { [`dataSource_${type}`]: '', uri: '' }]
//     })
//     //清除面板的数据
//     this.setState({ [`dataSource_${type}`]: '', uri: '' })
// }
// }

_defineProperty(ImageBasicControler, "LIST", ["selectionContentSet", "selectImage", "dataText", "imageQuality", "originalFormat", "imageWebp", "clickEvent", "link", "altText", "titleText", "sizeRatioHeight"]);

//# sourceURL=webpack:///./components/image/attr/basic/image_basic_controler.js?