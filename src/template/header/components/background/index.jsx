import { useState, useMemo } from "react";
import { Button, Image } from 'antd';
import Layer from "@/system/widgets/layer";
import Widget from '@/system/widgets/widget';
import Dispatcher from "@/system/tools/dispatcher";
import styles from './background.module.less'
import ImageCongfig from "./ImageCongfig.jsx";
import SelectPage from "./SelectPage.jsx";
/***
 * 背景修改结构
 * @param props.close 关闭弹窗的方法
 * 
 */
const Background = ({ close }) => {
    let _childrenPageId, pageId
    // 获取页面数据
    const documentData = Dispatcher.dispatch('document_get')
    const {
        component: {
            children
        },
        data: {
            design_data = {}
        }
    } = documentData;
    pageId = ((_childrenPageId = children[2].pageId) !== null && _childrenPageId !== void 0 ? _childrenPageId : children[1].pageId)


    const distanceToScreenLeft = useMemo(() => {
        const rect = document.getElementById('background').getBoundingClientRect()
        return rect.left - 300;
    }, [])


    /**
     * 获取属性值
     * @param {string} key       属性key
     * @param {*} defaultvalue   默认值
     */
    const getAttributeValue = (key, defaultvalue) => {
        return design_data && pageId ? (design_data[pageId] ? design_data[pageId][key] : defaultvalue) : defaultvalue
    }

    // 初始化状态数据
    const [usePageStatus, setUsePageStatus] = useState(false)  // 应用替他页面弹窗是否打开状态
    const [type, setType] = useState(getAttributeValue('type', ''))   // 背景类型
    const [bgColor, setBgColor] = useState(getAttributeValue('bgColor', ''))   // 背景颜色
    // 图片配置数据
    const [imageConfig, setImageConfig] = useState({
        uri: getAttributeValue('uri', ''),   //   图片地址
        opacity: getAttributeValue('opacity', 1),  //   透明度
        quality: getAttributeValue('quality', ''),  //   图片质量
        positionMode: getAttributeValue('positionMode', ''), //   图片展示效果
        attachment: getAttributeValue('attachment', ''),
    })


    // 重置数据
    const reset = () => {
        setBgColor('')
        setUsePageStatus(false)
        setImageConfig({
            uri: "",
            opacity: 1,
        })
        Dispatcher.dispatch('document_set', {
            args: [`design_data.${pageId}`, {
                uri: "",
                bgColor: "",
                type: 'BackgroundColor'
            }]
        });
    }

    // 背景类型点击事件
    const handBGTypeClick = (value) => {
        reset()
        if (value === 'BackgroundColor') {
            // 展示颜色选择器 
            document.querySelector('#backgroundColor>.backgroundColor>.fcolorpicker-curbox').click()
        } else if (value === 'Image') {

        }

        // 设置类型
        setType(value)
    }

    // 删除背景
    const handDeleteBackground = () => {
        reset()
    }


    // 颜色选择器改变事件
    const colorPickerChange = (bgColor) => {
        Dispatcher.dispatch('document_set', {
            args: [`design_data.${pageId}`, {
                bgColor,
                type: 'BackgroundColor'
            }]
        });
        setBgColor(bgColor)
    }

    // 获取预览背景
    const getBGPreview = () => {
        switch (type) {
            case 'BackgroundColor':
                return (
                    bgColor && <div style={{ height: '100%', backgroundColor: bgColor }}></div>
                )
            case 'Image':
                return (
                    imageConfig.uri &&
                    <Image
                        width='100%'
                        height='100%'
                        src={imageConfig.uri}
                        preview={imageConfig.uri ? true : false}
                    />
                )
            default:
                break;
        }
    }

    // 应用至其他页面按钮事件
    const usePage = () => {
        setUsePageStatus(true)
    }
    return (
        <>
            <Layer.open
                titles={['页面背景']}
                area={[380]}
                offset={[distanceToScreenLeft, 60]}
                draggable
                close={close}
            >
                <div id={styles.globalBackground}>

                    <div className={styles.globalBackgroundTop}>
                        {getBGPreview() ? getBGPreview() : '点击下方按钮进行设置'}
                        {/* TODO */}
                        {/* <div onClick={handDeleteBackground} className={styles.deleteBackground}>
                            删除
                        </div> */}
                    </div>

                    <div className={styles.globalBackgroundMiddle}>
                        {/* 颜色选择器 */}
                        <Widget.ColorPicker
                            id="backgroundColor"
                            title="bgColor"
                            basic={true}
                            color={bgColor}
                            change={colorPickerChange}
                        />

                        {
                            typeList.map(item => {
                                return (
                                    <div key={item.type} className={styles.globalBackgroundMiddle_button} onClick={() => handBGTypeClick(item.type)}>
                                        <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.iconName }}></i>
                                        {item.name}
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={styles.globalBackgroundBottom}>
                        {
                            type === 'Image' &&
                            <div className={styles.imageConfig}>
                                {/* 图片配置结构 */}
                                <ImageCongfig imageConfig={imageConfig} setImageConfig={setImageConfig} styles={styles} pageId={pageId} />
                            </div>
                        }

                    </div>

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <Button type="primary" onClick={usePage}>应用至其他页面</Button>
                    </div>
                </div>


            </Layer.open>

            {/* 页面选择框 */}
            {
                usePageStatus && <SelectPage distanceToScreenLeft={distanceToScreenLeft} pageId={pageId} close={() => setUsePageStatus(false)} />
            }

        </>


    )
}


const typeList = [
    {
        name: "图片",
        type: "Image",
        iconName: "&#xe788;"
    },
    {
        name: "颜色",
        type: "BackgroundColor",
        iconName: "&#xe786;"
    }
]


export default Background