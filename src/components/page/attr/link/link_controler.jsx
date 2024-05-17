/* eslint-disable react/prop-types */
// 导入 React 库
import { useState, } from "react";
import Widget from "@/system/widgets/widget";
import { Input, Button } from "antd";
import Dispatcher from "@/system/tools/dispatcher";

/**
 * @Description: 链接控制器
 */
export function LinkContainer(props) {
    // 解构取值
    const {
        node: {
            current: {
                id  // 当前正修改的控件id
            }
        }
    } = props

    // 初始状态数据
    const [state, setState] = useState({
        url: props.url || '',  // 链接地址
        type: props.type || 'not',   // 链接类型
        target: props.target || '_self',  // 是否新窗口打开"_blank"
    })

    // 链接类型数据
    const linkTypeList = [
        {
            name: 'noLink',
            value: 'noLink',
            title: '无'
        },
        {
            name: 'pageAnchor',
            value: 'pageAnchor',
            title: '站内页面'
        },
        {
            name: 'externalLinks',
            value: 'externalLinks',
            title: '站外链接'
        },
    ]
    // 链接改变方法类型
    const linkTypeChange = (event) => {
        // 更新数据
        setState({
            type: event.target.value,
            url: "",
            target: "_self",
        })
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

    // 是否传递权重的数据
    const [weightStatus, setWeightStatus] = useState('yes')
    // 权重数据
    const weightList = [
        {
            name: 'yes',
            value: 'yes',
            title: '是'
        },
        {
            name: 'no',
            value: 'no',
            title: '否'
        },
    ]
    // 是否传递权重发生改变
    const weightStatusChange = (event) => {
        setWeightStatus(event.target.value)
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
        // 更新数据
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
            // 更新数据
            setState({
                ...state,
                url: _value
            })
        }
    }

    // 点击确定按钮
    const ensure = () => {
        // 模拟数据
        // const data = {
        //     "type": "externalLinks",
        //     "url": "http://23213",
        //     "value": "外部链接 http://23213"
        // }
        const data = {
            ...state,
        }
        console.log('函数式组件data数据', data);

        // 派发事件,触发修改链接数据
        // Dispatcher.dispatch(`${id}_set`, {
        //     args: [`document_data.link`, data]
        // });
    }




    /**
     * 根据链接类型获取dom
     * @param {*} props  父组件参数
     * @returns  dom
     */
    const getDom = () => {
        switch (state.type) {
            case 'noLink':
                return NoLink();
            case 'pageAnchor':
                return PageAnchor();
            case 'externalLinks':
                return ExternalLinks();
            default:
                break;
        }
    }
    /**
     * 站外连接结构
     * @returns  dom
     */
    const ExternalLinks = () => {
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
                        list={weightList}
                        value={weightStatus}
                        change={weightStatusChange}
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

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ width: '100%' }}>
                <Widget.Radio
                    basic={true}
                    list={linkTypeList}
                    value={state.type}
                    change={linkTypeChange}
                />
                <ul>
                    {/* 根据linkType 获取显示的dom */}
                    {getDom()}
                </ul>
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                    <Button onClick={ensure} type="primary">{window.public.lang['ensure']}</Button>
                </div>
            </div>
        </div>
    )
}

