import FlowStatus from "@/components/languages/view/html/canvas/flowStatus/index.jsx";
import FlowNode from "@/components/languages/view/html/canvas/node/index.jsx";
import flowCanvasContext from "@/components/languages/view/html/canvas/context.js";
import './index.css'
import {useFlowDetail} from "@/components/languages/view/html/canvas/hooks/flow.js";

const FlowCanvas = ()=>{
    var [flowDetail, setFlowDetail] = useFlowDetail(1)


    var actions = {
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