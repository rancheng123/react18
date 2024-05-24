/* eslint-disable react/prop-types */
// 导入 React 库
import { useState, useMemo } from "react";
import Widget from "@/system/widgets/widget";
import { Input, Button, message, Divider } from "antd";
import Dispatcher from "@/system/tools/dispatcher";
// 引入弹框数据
import messagepopupJSON from "@/components/messagepopup/data/messagepopup_data.json";

/**
 * @Description: 链接控制器
 */
export function LinkContainer(props) {
    // 获取布局结构数据
    const linkLayout = props?.config?.group?.link?.all.layout || 'horizontal';

    // 解构取父组件传递的属性值
    const {
        node: {
            current: {
                id  // 当前正修改的控件id
            }
        }
    } = props

    // 触发获取控件数据事件
    const fnName = `${id}_get`;
    const {
        component: {
            layout,
            controlType
        },
        data: {
            document_data: {
                link
            },
            theme_data = {}
        }
    } = Dispatcher.dispatch(fnName);

    // 当前激活的链接类型
    const activeType = link ? link?.type : ''

    // 初始所有状态数据
    const [state, setState] = useState({
        url: link?.url || '',  // 链接地址
        type: link?.type || 'not',   // 链接类型
        target: link?.target || '_self',  // 是否新窗口打开"_blank"
        nofollow: link?.nofollow || 'openTurn',  // 是否添加nofollow标签
        back: link?.back || '',  // 顶部/底部数据
        ejectBoxId: link?.ejectBoxId || '',  //弹出窗口数据
    })

    // 获取链接类型列表
    const linkTypeList = useMemo(() => {
        const include = props?.config?.group?.link?.all.include || ''
        return linkList.filter(item => include.indexOf(item.value) !== -1);
    }, [props])


    // 链接改变方法类型
    const linkTypeChange = (event) => {
        // 当链接类型发生改变时，初始化数据
        const type = event.target.value;

        switch (type) {
            case 'noLink':
                setState({
                    type: type,
                })
                return
            case 'pageAnchor':
                setState({
                    type: type,
                    url: activeType === type ? link?.url || '' : '',
                    target: activeType === type ? link?.target || '_self' : '_self',
                })
                return
            case 'externalLinks':
                setState({
                    type: type,
                    url: activeType === type ? link?.url || '' : '',
                    target: activeType === type ? link?.target || '_self' : '_self',
                    nofollow: activeType === type ? link?.nofollow || 'openTurn' : 'openTurn',
                })
                return
            case 'back':
                setState({
                    type: type,
                    back: link?.back || ''
                })
                return
            case 'lightbox':
                setState({
                    type: type,
                    ejectBoxId: link?.ejectBoxId || ''
                })
                return
            default:
                setState({
                    type: type,
                })
                return
        }
    }

    // 是否新窗口打开的数据
    const targetList = [
        {
            name: 'yes',
            value: '_blank',
            title: '是'
        },
        {
            name: 'no',
            value: '_self',
            title: '否'
        },
    ]
    // 新窗口打开选框发生改变
    const openNewStatusChange = (event) => {
        setState({
            ...state,
            target: event.target.value,
        })
    }

    /**
     * @method inputHandler input设置数据方法
     * @param {key} key 设置的数据名称 
     * @param {event} event 事件对象 
     */
    const inputHandler = (key, event) => {
        let _value = event.target.value;

        if (_value.indexOf("http") == -1) {
            _value = "http://" + _value;
        }
        // 更新url数据
        setState({
            ...state,
            url: _value
        })
    }

    /**
     * @method webLinkBlur 自定义输入链接失去焦点处理逻辑 
     * @param {key} key 设置的数据名称 
     * @param {event} event 事件对象 
     */
    const webLinkBlur = (key, event) => {
        let _value = event.target.value;
        if (_value.indexOf("http") == -1) {
            _value = "http://" + _value;
            // 更新url数据
            setState({
                ...state,
                url: _value
            })
        }
    }


    /**
     * 根据链接类型获取dom
     * @param {*} props  父组件参数
     * @returns  dom
     */
    const getDom = () => {
        const type = state.type
        switch (type) {
            case 'noLink':
                return NoLink();
            case 'pageAnchor':
                return PageAnchor();
            case 'externalLinks':
                return ExternalLinks();
            case 'back':
                return back();
            case 'lightbox':
                return lightbox();
            default:
                return NoLink();
        }
    }
    /**
     * 站外连接结构
     * @returns  dom
     */
    const ExternalLinks = () => {

        // 权重数据
        const nofollowList = [
            { name: "openTurn", value: "openTurn" },
            { name: "closeOff", value: "closeOff" }
        ]
        // 是否传递权重发生改变
        const nofollowStatusChange = (event) => {
            setState({
                ...state,
                nofollow: event.target.value
            })
        }
        return (
            <>
                <li style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ width: '84px', textAlign: 'right', marginRight: '10px', flex: 'none' }}>网址</div>
                    <Widget.Input
                        value={state.url}
                        placeholder={window.public.lang["inputWebLink"]}
                        change={(event) => inputHandler("url", event)}
                        blur={(event) => webLinkBlur("url", event)}
                    />
                </li>
                <li style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ width: '84px', textAlign: 'right', marginRight: '10px', flex: 'none' }}>新窗口打开</div>
                    <Widget.Radio
                        basic={true}
                        list={targetList}
                        value={state.target}
                        change={openNewStatusChange}
                    />
                </li>
                <li style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ width: '84px', textAlign: 'right', marginRight: '10px', flex: 'none' }}>是否传递权重</div>
                    <Widget.Radio
                        basic={true}
                        list={nofollowList}
                        value={state.nofollow}
                        change={nofollowStatusChange}
                    />
                </li>
                <div style={{ fontWeight: '400', fontSize: '12px', color: ' #666666' }}>
                    注：可填写完整链接，也可只填写除域名外的部分如/products.html
                </div>
            </>
        )
    }
    /**
     * 站内链接结构
     * @returns  dom
     */
    const PageAnchor = () => {
        return (
            <>
                <li style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ width: '84px', textAlign: 'right', marginRight: '10px', flex: 'none' }}>网址</div>
                    <Widget.Input
                        value={state.url}
                        placeholder={window.public.lang["inputWebLink"]}
                        change={(event) => inputHandler("url", event)}
                        blur={(event) => webLinkBlur("url", event)}
                    />
                </li>
                <li style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ width: '84px', textAlign: 'right', marginRight: '10px', flex: 'none' }}>新窗口打开</div>
                    <Widget.Radio
                        basic={true}
                        list={targetList}
                        value={state.target}
                        change={openNewStatusChange}
                    />
                </li>
                <div style={{ fontWeight: '400', fontSize: '12px', color: ' #666666' }}>
                    注：可填写完整链接，也可只填写除域名外的部分如/products.html
                </div>
            </>
        )
    }
    /**
     * 无连接结构
     * @returns  dom
     */
    const NoLink = () => {
        return (
            null
        )
    }

    /**
     * 顶部底部结构
     * @returns  dom
     */
    const back = () => {

        const selectBack = (value) => {
            setState({
                ...state,
                back: value  // 顶部底部
            })
        }
        return (
            <div className="link_contr">
                <Widget.Select
                    id="backLink"
                    title="返回至"
                    value={state.back}
                    list={[
                        { value: "top", name: window.public.lang["top"] },
                        { value: "bottom", name: window.public.lang["footer"] },
                    ]}
                    change={selectBack}
                />
            </div >
        )
    }

    /**
     * 弹窗结构
     * @returns  dom
     */
    const lightbox = () => {
        const select = (value) => {
            setState({
                ...state,
                ejectBoxId: value   // 弹窗id
            })
        }

        return (
            <div className="link_contr">
                <Widget.Select
                    id="textTheme"
                    title="在当前页面显示"
                    value={state.ejectBoxId}
                    list={[
                        { name: "留言弹窗", value: "messagepopup.messagepopup.s1.1" },
                    ]}
                    change={select}
                />
            </div>

        )
    }

    // 弹窗id
    let popupId = ''
    // 获取生成页面的主体id    
    const {
        component: {
            id: iframeId
        }
    } = Dispatcher.dispatch("getPageData")

    // 点击确定按钮
    const ensure = async () => {
        if ((state.type == 'pageAnchor' || state.type == 'externalLinks') && !state.url) {
            message.warning('链接地址不能为空')
            return false
        }
        // 校验数据是否合法
        if (hasEmptyProperty(state)) {
            message.warning('数据不合法')
            return
        }


        // 弹框类型特异性处理
        if (state.type == 'lightbox') {
            // 获取控件数据
            const component = messagepopupJSON.items[state.ejectBoxId]

            popupId && Dispatcher.dispatch(`${iframeId}_removeComponent`, {
                args: [
                    popupId
                ]
            })

            popupId = Dispatcher.dispatch(`${iframeId}_addComponent`, {
                args: [
                    component,
                ],
            });
        }

        // 整理参数
        const data = {
            ...state,
        }
        console.log('函数式组件data数据', data);

        // 最终派发事件,触发修改链接数据
        await Dispatcher.dispatch(`${id}_set`, {
            args: [`document_data.link`, data]
        });
        message.success('操作成功')
    }

    return (
        <div style={{ padding: '20px', height: '100%', position: 'relative' }}>
            <div style={{ width: '100%', height: '100%', display: linkLayout == 'vertical' ? 'flex' : 'block' }}>
                <Widget.Radio
                    basic={true}
                    list={linkTypeList}
                    value={state.type}
                    change={linkTypeChange}
                    linkLayout={linkLayout}
                />
                {linkLayout == 'vertical' && <Divider style={{ height: '100%' }} type="vertical" />}
                <ul style={{ flex: linkLayout == 'vertical' ? '1' : undefined }}>
                    {/* 根据linkType 获取显示的dom */}
                    {getDom()}
                </ul>
            </div>
            <div style={{
                marginTop: '10px', textAlign: 'right', position: 'absolute', bottom: '20px', right: '20px'
            }}>
                <Button onClick={ensure} type="primary">{window.public.lang['ensure']}</Button>
            </div>
        </div >
    )
}

// 链接类型数据
const linkList = [
    {
        name: 'noLink',
        value: 'noLink',
    },
    {
        name: 'pageAnchor',
        value: 'pageAnchor',
    },
    {
        name: 'externalLinks',
        value: 'externalLinks',
    },
    {
        name: 'back',
        value: 'back',
    },
    {
        name: 'lightbox',
        value: 'lightbox',
    },
]

// 判读数行是否为空
function hasEmptyProperty(obj) {
    return Object.keys(obj).some(key => obj[key] === undefined || obj[key] === null || obj[key] === '' || obj[key] === 0);
}