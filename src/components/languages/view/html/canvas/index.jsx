import {useEffect, useState} from "react";
import {getFlowDetail} from "@/components/languages/view/html/canvas/api/index.js";
import './index.css'
import FlowNode from "@/components/languages/view/html/canvas/node/index.jsx";
import flowCanvasContext from "@/components/languages/view/html/canvas/context.js";
import FlowStatus from "@/components/languages/view/html/canvas/flowStatus/index.jsx";
import flowCanvas from "@/components/languages/view/html/canvas/flowCanvas/index.jsx";
var FlowCanvas = ()=>{

    var [flowDetail, setFlowDetail] = useState({
        id: null,
        name: '',
        nodes: []
    })

    window.flowDetail = flowDetail

    useEffect(
        ()=>{


            //编辑时， 调取详情数据
            if(1){
                getFlowDetail().then((res)=>{
                    if(res.status === 200){
                        setFlowDetail(res.data)
                    }

                })

            }
            // 新建时，创建首个节点
            else{

            }


            console.log('componentDidMount')

            return ()=>{
                console.log('componentWillUnmount')
            }
         },
        // 空数组保证仅在组件挂载时执行一次
        []
    )

    var actions = {
        flowDetail:flowDetail,
        onDelete: (deleteNode)=>{

            flowDetail.nodes.forEach((node, index)=>{
                if (node.id === deleteNode.id) {
                    flowDetail.nodes.splice(index, 1)
                }
            })

            setFlowDetail({
                ...flowDetail
            })

        }
    }
    return (
        <flowCanvasContext.Provider value={actions}>
            FlowCanvas

            <div className={'flowWrap'}>
                <div className={'topBar'}>
                    <div>
                        {flowDetail.name}
                    </div>
                    <FlowStatus
                        status={flowDetail.status}
                    ></FlowStatus>


                </div>

                <div>
                    {flowDetail.nodes.map((node, index) => {
                        return (
                            <FlowNode
                                key={index}
                                node={node}
                                onClick={() => {

                                    flowDetail.nodes.forEach((node) => {
                                        node.active = false
                                    })
                                    node.active = true


                                    /*
                                    错误的写法
                                        setFlowDetail(flowDetail)
                                    原因
                                        浅比较 检测不到属性值的变化， 所以不会触发更新
                                    */

                                    // 正确的写法， 使用新的对象来替代旧的对象
                                    setFlowDetail(
                                        {
                                            ...flowDetail
                                        }
                                    )
                                }}
                            ></FlowNode>

                        )
                    })}
                </div>
            </div>
        </flowCanvasContext.Provider>

    )
}
export default FlowCanvas