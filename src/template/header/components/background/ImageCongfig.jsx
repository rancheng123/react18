
import { UploadOutlined } from '@ant-design/icons';
import Dispatcher from "@/system/tools/dispatcher";
import Widget from '@/system/widgets/widget';
import { Button, Upload } from 'antd';

/**
 * @description 图片配置
 * @param {object} imageConfig 图片配置
 * @param {function} setImageConfig 设置图片配置
 * @param {object} styles 样式
 * @param {string} pageId 页面id
 */
const ImageCongfig = ({ imageConfig, setImageConfig, styles, pageId }) => {

    /**
     * @method set 统一设置数据方法
     * @param {string} key 键值
     * @param {event} event 事件对象
     */
    const set = (key, event) => {
        const value = event.target.value;
        // this.setState({
        //     [key]: value
        // });
        Dispatcher.dispatch('document_set', {
            args: [`design_data.${pageId}.${key}`, value]
        });
    }


    const upload = () => {

        const props = {
            showUploadList: false,
            maxCount: 1,
            accept: ".jpg, .jpeg, .png",
            onChange(a, b, c) {

                // TODO 调用接口
                // 模拟预览
                const reader = new FileReader();
                const file = a.file.originFileObj
                if (file && file.type.match('image.*')) {
                    reader.onload = function (fileEvent) {
                        // 读取文件成功后的回调，将图片URL设置给img标签的src属性
                        setImageConfig({
                            ...imageConfig,
                            uri: fileEvent.target.result
                        })
                        Dispatcher.dispatch('document_set', {
                            args: [`design_data.${pageId}.`, {
                                uri: imageConfig.uri,
                                type: 'Image'
                            }]
                        });
                    };
                    // 读取图片文件
                    reader.readAsDataURL(file);
                } else {
                    // 数据不对,置空数据
                    setImageConfig({
                        ...imageConfig,
                        uri: ''
                    })
                }


            }
        }

        return (
            <div className={styles.imageConfigItem}>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>点击上传</Button>
                </Upload>
            </div>
        )
    }
    // 图片透明度结构
    const opacity = () => {
        const change = (event) => {
            setImageConfig({
                ...imageConfig,
                opacity: event.target.value
            })
            set('opacity', event);
        }
        return (
            <div className={styles.imageConfigItem}>
                <div style={{ marginRight: '10px' }}>
                    {window.public.lang["pictureTransparency"]}
                </div>
                <Widget.Range
                    min={0}
                    max={1}
                    step={0.1}
                    value={imageConfig?.opacity || 1}
                    change={change}
                />
                &nbsp;
                %
            </div>
        )
    }


    const size = () => {

        // 尺寸数据
        const list = [
            {
                name: "100px",
                value: "100"
            }, {
                name: "200px",
                value: "200"
            }, {
                name: "400px",
                value: "400"
            }, {
                name: "600px",
                value: "600"
            }, {
                name: "800px",
                value: "800"
            }, {
                name: "1000px",
                value: "1000"
            }, {
                name: "1200px",
                value: "1200"
            }, {
                name: "1400px",
                value: "1400"
            }, {
                name: "1600px",
                value: "1600"
            }, {
                name: "2000px",
                value: "2000"
            }, {
                name: window.public.lang["original"],
                value: "original"
            }]

        const change = (value) => {
            setImageConfig({
                ...imageConfig,
                quality: value
            })

            if (!value) {
                return
            }


            let imgQuality = ''
            const key = 'quality'
            if (value != 'original') {
                imgQuality = `@!jw${value}`;
            }
            Dispatcher.dispatch('document_set', {
                args: [`design_data.${pageId}.`, {
                    [key]: value,
                    imgQuality
                }]
            });
        }
        return (
            <div className={styles.imageConfigItem}>
                <div style={{ marginRight: '10px' }}>
                    {window.public.lang["imageQuality"]}
                </div>
                <Widget.Select
                    styles={{ flex: 1 }}
                    id="imageQuality"
                    unuseLi={true}
                    basic={true}
                    list={list}
                    value={imageConfig.quality}
                    change={change}
                />
            </div>
        )
    }

    // 展示效果
    const showMode = () => {
        const list = [
            {
                name: 'tile',
                value: "repeat"
            }, //平铺
            {
                name: 'zoomToFill',
                value: "no-repeat center center / cover"
            }, //缩放到填充
            {
                name: 'actualSize',
                value: "no-repeat"
            } //实际大小
        ];

        const change = (event) => {
            setImageConfig({
                ...imageConfig,
                positionMode: event.target.value
            })
            set('positionMode', event);

        }
        return (
            <div className={styles.imageConfigItem}>
                <div style={{ marginRight: '10px' }}>
                    展示效果
                </div>
                <Widget.Radio
                    id="selectShowlist"
                    list={list}
                    value={imageConfig.positionMode}
                    change={change}
                />
            </div>

        )
    }

    // 背景定位
    const position = () => {
        const list = [{
            name: 'fixed',
            value: "fixed"
        }, {
            name: 'nofixed',
            value: "initial"
        }];

        const change = (event) => {
            setImageConfig({
                ...imageConfig,
                attachment: event.target.value
            })

            set('attachment', event)
        }
        return (
            <div className={styles.imageConfigItem}>
                <div style={{ marginRight: '10px' }}>
                    {window.public.lang['backgroundFixed']}
                </div>
                <Widget.Radio
                    list={list}
                    value={imageConfig.attachment}
                    change={change}
                />
            </div>
        )
    }
    return (
        <>
            {upload()}
            {opacity()}
            {size()}
            {showMode()}
            {position()}
        </>
    )
}

export default ImageCongfig