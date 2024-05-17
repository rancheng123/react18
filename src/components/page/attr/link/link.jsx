
// 配置链接结构
export default function Link(props) {
    console.log(props);

    return (
        {/* {linkType !== "not" && (
                    <ul>
                        <li style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ width: '84px', textAlign: 'right', marginRight: '10px', flex: 'none' }}>网址</div>
                            <Widget.Input
                                value={props.url}
                                placeholder={window.public.lang["inputWebLink"]}
                                change={(event) => inputHandler("url", event)}
                            />
                        </li>

                        <li style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ width: '84px', textAlign: 'right', marginRight: '10px', flex: 'none' }}>新窗口打开</div>
                            <Widget.Radio
                                basic={true}
                                list={statusList}
                                value={openNewStatus}
                                change={openNewStatusChange}
                            />
                        </li>
                        {
                            linkType === "outside" && (
                                <li style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                    <div style={{ width: '84px', textAlign: 'right', marginRight: '10px', flex: 'none' }}>是否传递权重</div>
                                    <Widget.Radio
                                        basic={true}
                                        list={statusList}
                                        value={weightStatus}
                                        change={weightStatusChange}
                                    />
                                </li>
                            )
                        }
                        <div style={{ fontWeight: '400', fontSize: '12px', color: ' #666666' }}>
                            注：可填写完整链接，也可只填写除域名外的部分如/products.html
                        </div>
                    </ul>

                )} */}
    )
}

