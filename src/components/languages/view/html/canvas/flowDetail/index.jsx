import FlowStatus from "@/components/languages/view/html/canvas/flowStatus/index.jsx";
import {useFlowDetail} from "@/components/languages/view/html/canvas/hooks/flow.js";

const FlowDetail = ()=>{
    var [flowDetail] = useFlowDetail(1)
    return (
        <div>
            flowDetail

            <FlowStatus
                status={flowDetail.status}
            ></FlowStatus>
        </div>
    )
}
export default FlowDetail