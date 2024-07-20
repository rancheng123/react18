const FlowStatus = ({
                        status
                    })=>{


    var map = {
        1: {
            text: '进行中',
            color: 'green'
        },
        2: {
            text: '已完成',
            color: 'gray'
        }
    }

    return (
        <div style={{background:map[status]?.color }}>
            {map[status]?.text}
        </div>
    )
}
export default FlowStatus