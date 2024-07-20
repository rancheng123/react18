import './index.css'
import {useContext} from 'react'
import flowCanvasContext from "@/components/languages/view/html/canvas/context.js";


const Jilian = (props)=>{

    var [flowCanvasContextValue] = useContext(flowCanvasContext)


    return (
        <div className={'jilian'}>
            <div onClick={()=>{
                flowCanvasContextValue.onDelete(props.node)

            }}>
                删除
            </div>
            <div onClick={()=>{
                flowCanvasContextValue.onEdit(props.node)

                flowCanvasContextValue.userName = 'caisu'
                flowCanvasContextValue = {
                    ...flowCanvasContextValue
                }
            }}>
                编辑
            </div>
        </div>
    )
}
export default Jilian