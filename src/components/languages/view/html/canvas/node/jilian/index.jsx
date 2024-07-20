import './index.css'
import {useContext} from 'react'
import flowCanvasContext from "@/components/languages/view/html/canvas/context.js";


const Jilian = (props)=>{

    var actions = useContext(flowCanvasContext)


    return (
        <div className={'jilian'}>
            <div onClick={()=>{
                actions.onDelete(props.node)

            }}>
                删除
            </div>
            <div>
                编辑
            </div>
        </div>
    )
}
export default Jilian