import {useEffect, useState} from 'react'
import {getFlowDetail} from "@/components/languages/view/html/canvas/api/index.js";
export function useFlowDetail(flowId){
    var [flowDetail, setFlowDetail] = useState({
        id: null,
        name: '',
        nodes: []
    })
    window.flowDetail = flowDetail

    useEffect(
        ()=>{
            //编辑时， 调取详情数据
            if(flowId){
                getFlowDetail().then((res)=>{
                    if(res.status === 200){
                        setFlowDetail(res.data)
                    }
                })
            }
            console.log('componentDidMount')
            return ()=>{
                console.log('componentWillUnmount')
            }
        },
        // 空数组保证仅在组件挂载时执行一次
        []
    )
    return [
        flowDetail, setFlowDetail
    ]
}