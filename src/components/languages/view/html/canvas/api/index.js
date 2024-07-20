export function getFlowDetail(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            var res = {
                status: 200,
                data: {
                    id: 1,
                    name: '流程1',
                    nodes: [
                        {
                            id: 1,
                            active: false,
                            name: '节点1',
                            left: 420,
                            top: 100,
                            data: {
                                type: 'weixin',
                                msg: '你好，明天来'
                            }
                        },
                        {
                            id: 2,
                            active: false,
                            name: '节点1',
                            left: 420,
                            top: 200,
                            data: {
                                type: 'weixin',
                                msg: '你好，明天来'
                            }
                        }
                    ]
                }
            }
            resolve(res)
        },100)
    })
}