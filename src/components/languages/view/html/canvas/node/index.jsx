import './index.css'
import Jilian from "@/components/languages/view/html/canvas/node/jilian/index.jsx";
const FlowNode = (props)=>{

    return (
        <div className={(()=>{
            var res = 'flowNode'
            if(props.node.active){
                res += ' active'
            }
            return res
        })()} style={{
            top: props.node.top,
            left: props.node.left
        }}
             onClick={()=>{
                 props.onClick()
             }}
        >
            <div>
                {props.node.name}
            </div>
            <div>
                {props.node.data.msg}
            </div>


            <Jilian></Jilian>

        </div>
    )
}
export default FlowNode