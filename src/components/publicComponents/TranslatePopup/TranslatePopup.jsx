import { Modal, Checkbox, Button, Spin, message, Popconfirm } from 'antd';
import styles from './TranslatePopup.module.less'
import { useEffect, useState } from 'react';
import { getlangListAPI, translateAPI, translateAllAPI, cancelTranslateAllAPI, cancelTranslateAPI } from '@/api/translate'
import { postTemplateDataAPI } from '@/api/template'
import Dispatcher from "@/system/tools/dispatcher";


// 初始化是否停止翻译
let isStop = false
let translateAllData = null

/**
 * 翻译弹窗
 * @param {*} props.close 卸载弹框方法
 * @param {*} props.opts  组件数据
 */
const TranslatePopup = ({ close, opts }) => {

    // console.log(Dispatcher.dispatch("getIframeData"));

    // 获取控件id
    const id = opts?.node?.current?.id || ''
    // 初始化默认的翻译语言列表数据
    const [dataCopy, setdataCopy] = useState([])
    // 初始化选中的要翻译语言列表的数据
    const [translateIngData, setTranslateIngData] = useState([])
    // 初始化翻译是否完成
    const [translateIsOK, setTranslateIsOK] = useState(false)
    // 保存按钮状态
    const [handSaveLoading, setHandSaveLoading] = useState(false)


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

        //组件卸载时执行的方法  
        return () => {
            // 是否停止置为真
            isStop = true
            // 翻译调用取消接口
            id ? cancelTranslateAPI() : cancelTranslateAllAPI()
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
            // 调用分组函数
            const { newArr, groupIndex = 1 } = await enableGrouping(array)
            // 翻译中页面初始化的时候更新部分数据状态
            await setTranslateIngData((data) => {
                return data.map(v => {
                    if (newArr.slice(0, groupIndex).find(z => z.id === v.id)) {
                        return { ...v, status: 1 }
                    } else {
                        return { ...v }
                    }
                })
            })


            for (let i = 0; i < newArr.length; i++) {
                if (isStop) {
                    isStop = false
                    return false
                }

                await callback(newArr[i], i).then(res => {
                    // 每次拿到结果后执行代码
                    if (res.code === 200 && res.msg === 'success') {
                        const langStatusList = res.data.data || [];

                        // 翻译成功更新状态
                        setTranslateIngData((data) => {
                            const arr = data.map(item => {
                                const langStatus = langStatusList.find(v => v.translate_lang_id === item.id)
                                if (langStatus) {
                                    return { ...item, status: langStatus.status == 1 ? 2 : 3 }
                                } else {
                                    return item
                                }
                            })
                            return arr
                        })

                        // 成功后执行回调
                        cb(res)
                    } else {
                        alert('服务异常')
                        return false
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }

        // 调用
        await asyncForEach(langList, async (langParams) => {
            return new Promise((resolve, reject) => {
                // langParams 参数有可能为数组也有可能是对象  参数归一,统一为数组
                if (Array.isArray(langParams)) {
                    // 翻译中更新状态
                    setTranslateIngData((data) => {
                        return data.map(v => {
                            if (langParams.find(item => item.id === v.id)) {
                                return { ...v, status: 1 }
                            } else {
                                return v
                            }
                        })
                    })

                    // 整理参数
                    const obj = {
                        translate_lang_ids: langParams.map(v => v.id), //要翻译的语种id数组
                        data: parameter      // 要翻译的数据
                    }
                    // 单个控件调用翻译接口
                    translateAPI(obj).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }

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
    const translateAll = async (langList, parameter) => {
        // 定义异步队列函数
        const asyncForEach = async (array, callback) => {

            // 调用分组函数
            const { newArr, groupIndex = 1 } = await enableGrouping(array)

            // 初始化更新状态
            await setTranslateIngData((data) => {
                return data.map(v => {
                    if (newArr.slice(0, groupIndex).find(z => z.id === v.id)) {
                        return { ...v, status: 1 }
                    } else {
                        return { ...v }
                    }
                })
            })

            // 开始调用循环翻译
            for (let i = 0; i < newArr.length; i++) {

                // 是否中断
                if (isStop) {
                    isStop = false
                    return false
                }

                await callback(newArr[i], i).then(res => {
                    // 每次拿到结果后执行代码
                    if (res.code === 200) {
                        const langStatusList = res.data.language || [];

                        // 翻译成功更新状态
                        setTranslateIngData((data) => {
                            const arr = data.map(item => {
                                const langStatus = langStatusList.find(v => v.id === item.id)
                                if (langStatus) {
                                    return { ...item, status: langStatus.status == 1 ? 2 : 3 }
                                } else {
                                    return item
                                }
                            })
                            return arr
                        })
                        // 获取最新数据
                        translateAllData = res.data.data

                    } else {
                        alert('服务异常')
                        return false
                    }
                }).catch(err => {
                    console.log(err);
                });

            }
        }

        // 调用
        await asyncForEach(langList, async (langParams) => {
            return new Promise((resolve, reject) => {
                // langParams 参数有可能为数组也有可能是对象  参数归一,统一为数组
                if (Array.isArray(langParams)) {
                    // 翻译中更新状态
                    setTranslateIngData((data) => {
                        return data.map(v => {
                            if (langParams.find(item => item.id === v.id)) {
                                return { ...v, status: 1 }
                            } else {
                                return { ...v }
                            }
                        })
                    })

                    // 整理参数
                    const obj = {
                        "template_id": 1, //模板id
                        translate_lang_ids: langParams.map(v => v.id), //要翻译的语种id数组
                        data: parameter,      // 要翻译的数据
                    }

                    // 整体翻译接口
                    translateAllAPI(obj).then(res => {
                        if (!res?.data) return
                        resolve(res)
                    }).catch((err) => {
                        console.log(err);
                        reject(err)
                    })
                }



            })
        });

        // 翻译完成
        setTranslateIsOK(true)
        console.log('所有异步操作完成', isStop);
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
            // 根据id判断翻译单个控件还是整体
            if (id) {
                // 获取的单个控件内容数据
                const text = Dispatcher.dispatch(`${id}_get`).data.document_data.text || ''
                // 参数赋值
                translateData.push({
                    text,
                    is_editor: isHtml(text) ? 1 : 2  //是否html格式，1 是，2 否
                })

                // 调用单个控件翻译
                translate(langList, translateData, (res) => {
                    // console.log('每次结束后执行回调方法', res, id);
                    if (res?.data?.data.length === 0) return

                    const list = res.data.data

                    // 循环派发修改数据
                    for (let index = 0; list < list.length; index++) {
                        const element = list[index];
                        const language = element.translate_lang_id
                        // 派发修改控件数据事件
                        Dispatcher.dispatch(`${id}_set`, {
                            args: [`document_data.language.${language}`, element.text]
                        })
                    }

                })

            } else {
                // 获取整体翻译参数
                const iframeData = Dispatcher.dispatch("document_get");
                const pageId = iframeData.component.children[2].pageId;
                const pageData = Dispatcher.dispatch("getPageData", {
                    value: pageId
                });
                // 参数赋值
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

    }


    // 继续按钮事件
    const handContinue = () => {
        // 清空翻译中数据
        setTranslateIngData([])
        setTranslateIsOK(false)
    }

    const handSave = async () => {
        setHandSaveLoading(true)
        if (id) {
            // 单个控件翻译派发保存翻译结果事件
            const res = await Dispatcher.dispatch("savePage");
            if (res.code === 200) {
                handContinue()
            } else {
                message.error('保存失败,请重试')
            }
        } else {
            // 整体翻译直接调用保存接口
            const obj = {
                data: translateAllData,
                template_id: 1   // 模板id TODO
            }
            await postTemplateDataAPI(obj).then(res => {
                message.success('保存成功')
                handContinue()
                translateAllData = null
            }).catch(err => {
                message.error('保存失败')
            })
        }

        setHandSaveLoading(false)
    }

    const title = () => {
        return (
            <div>
                翻译
                <span style={{ color: '#999999' }}>（剩余字符数 10000）</span>
            </div>
        )
    }

    // 弹出窗口关闭图标
    const CloseOutlined = () => {
        return (
            <Popconfirm
                title="注意:"
                description="关闭后所有内容不会保存，确定关闭吗？"
                onConfirm={close}
                okText="确定"
                cancelText="返回"
            >
                <i className="iconfont" dangerouslySetInnerHTML={{ __html: ' &#xe779;' }}></i>
            </Popconfirm>
        )
    }

    return (
        <>
            <Modal width={700} title={title()} open={true} footer={null} closeIcon={<CloseOutlined />} maskClosable={false} keyboard={false}>
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
                                            {/* <Button type="primary" onClick={handContinue}>继续</Button> */}
                                            <Button type="primary" loading={handSaveLoading} disabled={handSaveLoading} onClick={handSave}>保存</Button>
                                            <Popconfirm
                                                title="注意:"
                                                description="取消后，已翻译的内容将不会被保存，确定取消吗？"
                                                onConfirm={close}
                                                okText="确定"
                                                cancelText="返回"
                                            >
                                                <Button>取消</Button>
                                            </Popconfirm>
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



/**
 * 数组分组函数
 * @param {array} array 待分组的数组
 * @param {number} gIndex 分组大小
 * @returns {object} 分组后的数组和分组数对象 {newArr: [], groupIndex: 0}
 */
const enableGrouping = (array, gIndex) => {
    // 分组代码
    // 分组大小
    let groupIndex = 0
    // 索引
    let index = 0
    // 分组数据
    let group = []
    // 生成的新的数组
    let newArr = []

    if (gIndex) {
        groupIndex = gIndex
    } else {
        // 根据数据长度自定义分组数
        const length = array.length
        if (length > 50) {
            groupIndex = 10
        } else if (length >= 10 && length <= 50) {
            groupIndex = 5
        } else if (length < 10) {
            groupIndex = 1
        } else {
            groupIndex = 1
        }
    }


    for (let i = 0; i < array.length; i++) {
        group.push(array[i])
        if (group.length === groupIndex || i === array.length - 1) {
            newArr[index] = group
            group = []
            index++
        }
    }

    return { newArr, groupIndex }
}
export default TranslatePopup;