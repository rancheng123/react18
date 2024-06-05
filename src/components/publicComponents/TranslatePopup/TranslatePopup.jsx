import { Modal, Checkbox, Button, Spin, message } from 'antd';
import styles from './TranslatePopup.module.less'
import { useEffect, useState } from 'react';
import { getlangListAPI, translateAPI, translateAllAPI, cancelTranslateAllAPI } from '@/api/translate'
import Dispatcher from "@/system/tools/dispatcher";

// 初始化是否停止翻译
let isStop = false

/**
 * 翻译弹窗
 * @param {*} props.close 卸载弹框方法
 * @param {*} props.opts  组件数据
 */
const TranslatePopup = ({ close, opts }) => {

    // console.log(Dispatcher.dispatch("getIframeData"));

    // 获取控件id
    const id = opts?.node?.current?.id || ''

    // if (id) {
    // } else {
    //     /**
    //      * 参数有哪些
    //      * document_data : {
    //      *      em-text: text,
    //      *      em-button: label
    //      * }     
    //      * menu_data    name
    //      * 
    //      */
    //     // for (const key in document_data) {
    //     //     if (Object.hasOwnProperty.call(document_data, key)) {
    //     //         const element = document_data[key];
    //     //         if (element.text) {
    //     //             translateData.push({
    //     //                 text: element.text,
    //     //                 is_editor: isHtml(element.text) ? 1 : 2  //是否html格式，1 是，2 否
    //     //             })
    //     //         }
    //     //     }
    //     // }
    // }

    // 初始化默认的翻译语言列表数据
    const [dataCopy, setdataCopy] = useState([])
    // 初始化选中的要翻译语言列表的数据
    const [translateIngData, setTranslateIngData] = useState([])
    // 初始化翻译是否完成
    const [translateIsOK, setTranslateIsOK] = useState(false)


    useEffect(() => {
        const getTranslateList = async () => {
            await getlangListAPI().then(res => {
                let dataCopy = res.data.list;
                // 处理数据
                // 布局为每行多少个数据
                const base = 5
                const pop = base - (dataCopy.length % base === 0 ? base : dataCopy.length % base)
                for (let i = 0; i < pop; i++) {
                    dataCopy.push({ id: Date.now() + i, name: '' })
                }
                dataCopy.map(item => item.checked = false)
                setdataCopy(dataCopy)
            })
        }

        // 获取翻译的语言列表
        getTranslateList()

        return () => {
            if (id) {
                isStop = true
            } else {
                cancelTranslateAllAPI()
            }
        }
    }, [])




    // 单独选择语言
    const handCheckboxChange = (event, id) => {
        setdataCopy(() => {
            return dataCopy.map(item => {
                if (item.id == id) {
                    return { ...item, checked: event.target.checked }
                } else {
                    return item
                }
            })
        })
    }

    // 全选
    const handCheckboxAll = (event) => {
        setdataCopy(() => {
            return dataCopy.map(item => {
                return { ...item, checked: event.target.checked }
            })
        })

    }
    const [istranslate, setistranslate] = useState(false)

    /**
     * 单个控件翻译
     * @param {*} langList 翻译的语言列表
     * @param {*} parameter 翻译的参数
     * @param {*} cb 翻译成功后的回调
     */
    const translate = async (langList, parameter = [], cb) => {

        // 定义异步队列函数
        const asyncForEach = async (array, callback) => {
            for (let i = 0; i < array.length; i++) {
                if (isStop) {
                    isStop = false
                    return false
                }
                const res = await callback(array[i], i);
                // 每次拿到结果后执行代码
                if (res.code === 200) {
                    // 翻译成功更新状态
                    setTranslateIngData((data) => {
                        const arr = data.map(item => {
                            if (item.id == Number(res.data.translate_lang_id)) {
                                return { ...item, status: 2 }
                            } else {
                                return item
                            }
                        })
                        return arr
                    })
                } else {
                    // 翻译失败更新状态
                    setTranslateIngData((data) => {
                        const arr = data.map(item => {
                            if (item.id == array[i].id) {
                                return { ...item, status: 3 }
                            } else {
                                return item
                            }
                        })
                        return arr
                    })
                }

                // 执行回调
                cb(res)
            }
        }

        // 调用
        await asyncForEach(langList, async (item) => {
            return new Promise((resolve, reject) => {

                // 翻译中更新状态
                setTranslateIngData((data) => {
                    return data.map(v => {
                        if (v.id == item.id) {
                            return { ...v, status: 1 }
                        } else {
                            return v
                        }
                    })
                })

                // 整理参数
                const obj = {
                    translate_lang_id: item.id, //要翻译的语种id
                    data: parameter      // 要翻译的数据
                }
                // 单个控件调用翻译接口
                translateAPI(obj).then(res => {
                    resolve(res)
                })
            })
        });

        // 翻译完成
        setTranslateIsOK(true)
        console.log('所有异步操作完成');
    }


    /**
     * 整体翻译
     * @param {Array} langList 翻译的语言列表
     * @param {Array} parameter 翻译的数据
     */
    const translateAll = (langList, parameter) => {

        // 翻译中更新状态
        setTranslateIngData((data) => {
            return data.map(v => {
                return { ...v, status: 1 }
            })
        })
        // 整理参数
        const obj = {
            "template_id": 1, //模板id
            translate_lang_ids: langList.map(v => v.id), //要翻译的语种id数组
            data: parameter,      // 要翻译的数据
        }

        // 整体翻译接口
        translateAllAPI(obj).then(res => {
            if (!res?.data) return
            const lanList = res.data.language

            // 修改翻译状态
            setTranslateIngData((data) => {
                return data.map(v => {
                    const lan = lanList.find(item => item.id === v.id)
                    return { ...v, status: lan.status == 1 ? 2 : 3 }
                })
            })

            // 翻译完成
            setTranslateIsOK(true)
        }).catch(() => { })
    }


    // 点击翻译按钮事件
    const handTranslate = () => {
        // 获取勾选的语言列表
        const arr = dataCopy.filter(item => {
            if (item.name && item.checked) {
                return item
            }
        })
        if (!arr || arr.length == 0) {
            return message.info('请选择要翻译的语言')
        }
        // 设置要翻译的数据
        setTranslateIngData(() => {
            const langList = arr.map(item => ({ ...item, status: 0 }))

            // 翻译参数
            let translateData = []
            if (id) {
                // 获取的单个控件内容数据
                const text = Dispatcher.dispatch(`${id}_get`).data.document_data.text || ''

                translateData.push({
                    text,
                    is_editor: isHtml(text) ? 1 : 2  //是否html格式，1 是，2 否
                })

                // 调用单个控件翻译
                translate(langList, translateData, (res) => {
                    // console.log('每次结束后执行回调方法', res, id);
                    if (!res.data.translate_lang_id) return

                    // 语种id
                    const language = res.data.translate_lang_id
                    // 翻译后的内容
                    const text = res.data.data[0].text
                    // 派发修改控件数据事件
                    Dispatcher.dispatch(`${id}_set`, {
                        args: [`document_data.language.${language}`, text]
                    })
                })

            } else {
                // 获取整体翻译参数
                const iframeData = Dispatcher.dispatch("document_get");
                const pageId = iframeData.component.children[2].pageId;
                const pageData = Dispatcher.dispatch("getPageData", {
                    value: pageId
                });

                translateData = {
                    masterPage: {
                        structure: iframeData.component,
                        data: iframeData.data
                    },
                    pages: {
                        [pageId]: {
                            structure: pageData.component,
                            data: pageData.data
                        }
                    }
                }

                // 调用整体翻译
                translateAll(langList, translateData)
            }

            return langList
        })

        setistranslate(true)
        console.log(translateIngData, arr);

        const pop = async () => {
            for (let index = 0; index < 10; index++) {

                const res = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve(index)
                    }, 3000)
                })
                console.log(res);

            }
            console.log('执行完成');
            // const response = await fetch(url);
            // const result = await response.json();
            // // 将获取的数据追加到data数组中
            // setData(prevData => [...prevData, result]);
        }
        pop()
        // async function asyncForEach(array, callback) {
        //     for (let i = 0; i < array.length; i++) {
        //         const res = await callback(array[i], i);
        //         // 每次拿到结果后执行代码
        //         // 翻译成功更新状态
        //         setTranslateIngData(() => {
        //             return translateIngData.map(item => {
        //                 if (item.id == res.data.translate_lang_id) {
        //                     return { ...item, status: 2 }
        //                 } else {
        //                     return item
        //                 }
        //             })
        //         })
        //     }
        // }
        // async function main() {
        //     await asyncForEach(arr, async (item) => {
        //         return new Promise((resolve, reject) => {
        //             // 整理参数
        //             const obj = {
        //                 translate_lang_id: item.id, //要翻译的语种id
        //                 data: [singleData]        // 要翻译的数据
        //             }

        //             // 翻译中更新状态
        //             setTranslateIngData(() => {
        //                 return translateIngData.map(v => {
        //                     if (v.id == item.id) {
        //                         return { ...v, status: 1 }
        //                     } else {
        //                         return v
        //                     }
        //                 })
        //             })
        //             // 调用翻译接口
        //             translateAPI(obj).then(res => {
        //                 console.log(res);
        //                 resolve(res)
        //             })

        //         })
        //     });

        //     console.log('所有异步操作完成');
        // }

        // main();

        if (id) {
            // 单个控件翻译
        } else {
            // 整体翻译
        }

        // 模拟翻译完成
        // setTimeout(() => {
        //     setTranslateIsOK(true)
        // }, 3000);
    }


    // 继续按钮事件
    const handContinue = () => {
        // 清空翻译中数据
        setTranslateIngData([])
        setTranslateIsOK(false)
    }

    const title = () => {
        return (
            <div>
                翻译
                <span style={{ color: '#999999' }}>（剩余字符数 10000）</span>
            </div>
        )
    }

    return (
        <>
            <Modal width={700} title={title()} open={true} footer={null} onCancel={close} maskClosable={false}>
                <div id={styles.translate_popup}>
                    <div className={styles.translate_popup_content}>

                        {/* 翻译弹框初始化页面 */}
                        {
                            translateIngData.length === 0 &&
                            <div>
                                <p className={styles.title}>翻译语言</p>
                                <div className={styles.selectAll}>
                                    <Checkbox onChange={handCheckboxAll} checked={dataCopy.length !== 0 && dataCopy.every(v => v.checked)}>
                                        全选
                                    </Checkbox>
                                </div>
                                <div className={styles.language} >
                                    {
                                        dataCopy.map(item => {
                                            return (
                                                <div className={styles.language_item} key={item.id} title={item.name}>
                                                    {
                                                        item.name && <Checkbox checked={item.checked} onChange={(event) => handCheckboxChange(event, item.id)}>
                                                            {item.name}
                                                        </Checkbox>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={styles.prompt}>
                                    <i className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe77a;' }}></i>
                                    提示：已翻译完成的，再次翻译会再次耗费您的字符数，请谨慎选择
                                </div>
                                <div className={styles.footer}>
                                    <Button type="primary" onClick={handTranslate}>翻译</Button>
                                    <Button onClick={close}>取消</Button>
                                </div>
                            </div>
                        }



                        {/* 翻译中结构 */}
                        {
                            translateIngData && translateIngData.length !== 0 && (
                                < div >
                                    <div className={styles.translateIng}>
                                        <div>
                                            {
                                                translateIsOK ? (
                                                    <>
                                                        <i style={{ color: '#52C41A' }} className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe781;' }}></i>
                                                        <p>翻译完成</p>
                                                    </>

                                                ) : (
                                                    <>
                                                        <Spin size="large" />
                                                        <p>翻译中...</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className={styles.translateIngList} >
                                        {
                                            translateIngData.map(item => {
                                                return <div key={item.name} className={styles.translateIngListItem} >
                                                    <div>
                                                        <i style={item.status === 2 ? { color: '#52C41A' } : (item.status === 3 ? { color: '#F5222D' } : null)} className="iconfont" dangerouslySetInnerHTML={{ __html: translateIconEnum[item.status] }}></i>
                                                        {item.name}
                                                    </div>
                                                    <div className={styles.translateIngListItemStatus} style={item.status === 2 ? { color: '#52C41A' } : (item.status === 3 ? { color: '#F5222D' } : null)} >
                                                        {translateStatusEnum[item.status]}
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>

                                    {
                                        translateIsOK && <div className={styles.translateIngFooter} >
                                            <Button type="primary" onClick={handContinue}>继续</Button>
                                            <Button onClick={close}>取消</Button>
                                        </div>
                                    }

                                </div>
                            )
                        }

                    </div>
                </div>
            </Modal >
        </>
    )
}

// 翻译状态文字枚举数据
const translateStatusEnum = {
    0: '待翻译',
    1: '翻译中',
    2: '翻译成功',
    3: '翻译失败'
}

// 翻译图标枚举数据
const translateIconEnum = {
    0: '&#xe77c;',
    1: '&#xe789;',
    2: '&#xe778;',
    3: '&#xe79f;'
}

// 判断是否为html结构
const isHtml = (str) => {
    // return /<[^>]+>/g.test(str)
    return /(?:<[^>]*>)|(?:&lt;[^>]*&gt;)/g.test(str)
}

export default TranslatePopup;