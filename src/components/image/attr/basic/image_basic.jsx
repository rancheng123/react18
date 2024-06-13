
import React from 'react';
import Basic from '@/components/page/attr/basic/basic';
import Widget from '@/system/widgets/widget';

export default class ImageBasic extends Basic {
    constructor(controler) {
        super();
        /**@property controler 边框控制器实例 */

        this.controler = controler;
    }
    /**
     * @method  selectionContentSet 内容来源
     * @return {object} 内容来源属性结构
     */


    selectionContentSet() {
        //在幻灯片中不显示该项 
        const {
            comeFrom
        } = this.state;
        return comeFrom != 'slideShow' ?
            <Widget.Radio
                title="selectionContent"
                id=""
                list={[
                    { name: "custom", value: "custom" },
                    { name: "databaseData", value: "databaseData" },
                ]}
                value={this.state.selectionContent || "custom"}
                change={this.controler.setContent.bind(this.controler)}
            />
            : null;
    }
    /**
     * @method inputText输入框   selectImage更改图片
     * @param {object} 更改按钮文本内容
     */


    selectImage() {
        const {
            comeFrom
        } = this.state;

        let _selectionContent = this.state.selectionContent || "custom";

        let parentData = this.controler.getParentType(this.props.node, "em-MoHeader"); //查找当前控件是否在MO头部中
        //当前页面是mo编辑页面，并且不在mo头部中，就不显示选择图片的面板 

        if (this.props.prefix == 'mo' && !parentData) {
            return null;
        } //在幻灯片中不显示该项


        if (comeFrom == 'slideShow') {
            return null;
        }

        if (_selectionContent == "custom") {
            // return React.createElement(Widget.SelectImage, {
            //     title: "selectImage",
            //     id: "selectImage",
            //     src: this.state.uri,
            //     click: this.controler.selectImageShow.bind(this.controler)
            // });

            return (
                <Widget.SelectImage
                    title="selectImage"
                    id="selectImage"
                    src={this.state.uri}
                    click={this.controler.selectImageShow.bind(this.controler)}
                />
            );
        }

        return null;
    }
    /**
     * @method inputText输入框   imageQuality更改图片
     * @param {object} 更改按钮文本内容
     */
    imageQuality() {
        // return React.createElement(Widget.ImageQuality, {
        //     id: "imageQuality",
        //     data: this.state,
        //     prefix: this.props.prefix,
        //     help: "qualityTips",
        //     change: this.controler.setQuality.bind(this.controler, "quality")
        // });

        return (
            <Widget.ImageQuality
                id="imageQuality"
                data={this.state}
                prefix={this.props.prefix}
                help="qualityTips"
                change={this.controler.setQuality.bind(this.controler, "quality")}
            />
        );
    }
    /**
     * @method imageWebp   设置图片webp是否开启
     * @param {object} 更改按钮文本内容
     */


    imageWebp() {
        let isWebp = this.state.isWebp;

        if (isWebp === false) {
            isWebp = false;
        } else {
            isWebp = true;
        }

        // return React.createElement(Widget.Radio, {
        //     title: "WebP",
        //     id: "",
        //     list: [{
        //         name: "openTurn",
        //         value: "true"
        //     }, {
        //         name: "closeOff",
        //         value: "false"
        //     }],
        //     value: isWebp,
        //     change: this.controler.setImgWebp.bind(this.controler, "isWebp")
        // });

        return (
            <Widget.Radio
                title="WebP"
                id=""
                list={[
                    {
                        name: "openTurn",
                        value: "true"
                    },
                    {
                        name: "closeOff",
                        value: "false"
                    }
                ]}
                value={isWebp}
                change={this.controler.setImgWebp.bind(this.controler, "isWebp")}
            />
        );
    }
    /**
     * @method originalFormat   originalFormat更改图片原格式
     * @param {object} 更改按钮文本内容
     */


    originalFormat() {
        let {
            comeFrom = ""
        } = this.state; //当位于幻灯片并为mo端时不展示

        // return comeFrom && this.props.prefix == 'mo' ? null : React.createElement(Widget.OriginalFormat, {
        //     id: "originalFormat",
        //     data: this.state,
        //     prefix: this.props.prefix,
        //     change: this.controler.setOriginal.bind(this.controler, "dataRetain")
        // });
        return comeFrom && this.props.prefix == 'mo' ? null : (
            <Widget.OriginalFormat
                id="originalFormat"
                data={this.state}
                prefix={this.props.prefix}
                change={this.controler.setOriginal.bind(this.controler, "dataRetain")}
            />
        );
    }
    /**
     * @method dataText 数据源文本
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

            // return React.createElement(Widget.ShowInfo, {
            //     title: "dataSources",
            //     id: "",
            //     value: _value,
            //     click: this.controler.showDataSource.bind(this.controler)
            // });

            return (
                <Widget.ShowInfo
                    title="dataSources"
                    id=""
                    value={_value}
                    click={this.controler.showDataSource.bind(this.controler)}
                />
            );
        }

        return null;
    }
    /**
     * @method link 链接
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
        let dataSource = this.state.dataSource || {}; //数据源类型为列表时，不需设置链接

        if (dataSource.type == "list") {
            return null;
        } //当位于幻灯片并为mo端时，不展示 


        if (comeFrom && this.props.prefix == 'mo') {
            return null;
        } //移动端在选择点击事件选项为无连接和打开链接时都展示 


        if (this.props.prefix == 'mo') {
            return effect == "openLink" || effect == "noLink" ? super.link() : null;
        }

        return effect == "openLink" ? super.link() : null;
    }
    /**
     * @method  clickEvent 点击事件
     * @return {object} 点击事件属性结构
     */
    clickEvent() {
        let dataSource = this.state.dataSource || {}; //数据源类型为列表时，不需设置放大和链接

        if (dataSource.type == "list") {
            return null;
        }

        // return React.createElement(Widget.Radio, {
        //     title: "imgClick",
        //     id: "",
        //     list: ["noLink", "openLink", "imgBig"],
        //     value: this.state.effect || "noLink",
        //     change: this.controler.imgClick.bind(this.controler)
        // });

        return (
            <Widget.Radio
                title="imgClick"
                id=""
                list={['noLink', 'openLink', 'imgBig']}
                value={this.state.effect || 'noLink'}
                change={this.controler.imgClick.bind(this.controler)}
            />
        );
    }
    /**
     * @method dataInput 公用input链接调取数据源面板
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


        // return React.createElement("div", {
        //     className: prop.skin || "pcAttList"
        // }, React.createElement("h5", {
        //     className: "pcConAttTitle "
        // }, window.public.lang[prop.title]), React.createElement("div", {
        //     className: "pcConAttCon ImgSourcestyle"
        // }, React.createElement("p", {
        //     className: "dataText",
        //     onClick: this.controler.showSecondDataSource.bind(this.controler, type, prop.data)
        // }, window.public.lang["sourceOfData"], React.createElement("a", {
        //     href: "#",
        //     className: "dataIcon"
        // })), React.createElement(Widget.Input, {
        //     id: [language],
        //     readOnly: _readonly,
        //     placeholder: window.public.lang[language],
        //     value: _value ? _value : '',
        //     change: this.controler.changText.bind(this.controler, [type])
        // }), _openClose ? React.createElement("span", {
        //     className: "formCancelButton",
        //     onClick: this.controler.showTextClose.bind(this.controler, [type], prop.data)
        // }, "\u2573") : null));

        return (
            <div className={prop.skin || "pcAttList"}>
                <h5 className="pcConAttTitle">
                    {window.public.lang[prop.title]}
                </h5>
                <div className="pcConAttCon ImgSourcestyle">
                    <p
                        className="dataText"
                        onClick={() => this.controler.showSecondDataSource(type, prop.data)}
                    >
                        {window.public.lang["sourceOfData"]}
                        <a href="#" className="dataIcon" />
                    </p>
                    <Widget.Input
                        id={[language]}
                        readOnly={_readonly}
                        placeholder={window.public.lang[language]}
                        value={_value || ''}
                        change={(e) => this.controler.changText([type], e)}
                    />
                    {_openClose && (
                        <span
                            className="formCancelButton"
                            onClick={() => this.controler.showTextClose([type], prop.data)}
                        >
                            &#x2573;
                        </span>
                    )}
                </div>
            </div>
        );
    }
    /**
     * @method altText描述   可选数据源调面板
     * @param {object} 更改按钮文本内容
     */
    altText() {
        let dataSource = this.state.dataSource || {};
        let {
            skin
        } = this.state || {};
        let skinList = ["image.commonImg.s292.421", "image.commonImg.s63.283"]; //数据源类型为列表时，不需设置链接 

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
     * @param {object} 更改按钮文本内容
     */
    titleText() {
        let dataSource = this.state.dataSource || {};
        let {
            skin
        } = this.state || {};
        let skinList = ["image.commonImg.s292.421", "image.commonImg.s63.283"]; //数据源类型为列表时，不需设置链接

        if (dataSource.type == "list" && !skinList.includes(skin)) {
            return null;
        }

        let sourceData = this.state.dataSource_title ? this.state.dataSource_title : {};
        return this.dataInput({
            data: sourceData,
            title: "imgTitle",
            key: "title"
        }, 'title', 'imgTitlePla');
        // return <Widget.Input title="imgTitle" id="imgTitle"
        // 	readonly={false} placeholder={window.public.lang["imgTitlePla"]}
        // 	value={this.state.title || ""}
        // 	change={this.controler.changText.bind(this.controler, "title")}
        // />
    }
    /**
     * @description: 设置图片高度，修改padding-top
     * @return: void
     */
    sizeRatioHeight() {
        let dataSource = this.state.dataSource || {}; //图片中数据源的type为list时，证明是列表控件，显示高度设置 

        if (this.state.layout && dataSource.type == "list") {
            var _ref, _layout$;

            const layout = this.state.layout,
                value = (_ref = (_layout$ = layout[`${this.props.prefix}height`]) !== null && _layout$ !== void 0 ? _layout$ : layout.height) !== null && _ref !== void 0 ? _ref : 0;
            // return React.createElement(Widget.Range, {
            //     id: "height",
            //     title: "height",
            //     min: 0,
            //     max: 1000,
            //     value: value,
            //     change: this.controler.setSizeRatioHeight.bind(this.controler)
            // });

            return (
                <Widget.Range
                    id="height"
                    title="height"
                    min={0}
                    max={1000}
                    value={value}
                    change={this.controler.setSizeRatioHeight.bind(this.controler)}
                />
            );
        }
    }
    /**
     * @method  selectionContentSet 内容来源
     * @return {object} 内容来源属性结构
     */


    imgShowType() {
        let {
            parentType
        } = this.state; //"showType":"显示方式",cover:"裁切", fill:"拉伸", contain:"等比",

        let dataSource = this.state.dataSource || {}; //图片中数据源的type为list时，证明是列表控件，显示高度设置

        if (parentType == "list") {
            // return React.createElement(Widget.Radio, {
            //     title: "showType",
            //     id: "",
            //     list: [{
            //         name: "cover",
            //         value: "cover"
            //     }, {
            //         name: "fill",
            //         value: "fill"
            //     }, {
            //         name: "contain",
            //         value: "contain"
            //     }],
            //     value: this.state.showType || "cover",
            //     change: this.controler.setShowType.bind(this.controler)
            // });

            return (
                <Widget.Radio
                    title="showType"
                    id=""
                    list={[
                        { name: "cover", value: "cover" },
                        { name: "fill", value: "fill" },
                        { name: "contain", value: "contain" },
                    ]}
                    value={this.state.showType || "cover"}
                    change={this.controler.setShowType.bind(this.controler)}
                />
            );
        }
    }

}
