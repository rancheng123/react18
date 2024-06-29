import React from "react";

const WidgetList = ({tabs, group, video, onMouseDown})=>{
    return (
        <div className="widgetListWrap content_2 content" style={{position: "relative"}}>
            {tabs.map((e, i) => {
                return (
                    <div key={i}>
                        <a name={e.id}/>
                        <div
                            className="toolSmalltit"
                            style={{position: "relative"}}
                            id={e.id}
                        >
                            <h4>{e.name}</h4>
                        </div>
                        <div className="imgTopic">
                            <div className="imgThemeStyle">
                                <ul id={`em-${e.id}`}>
                                    {group[e.id].map((t) => {
                                        const {skin, videoPath, skinStyle} = t;
                                        return (
                                            <li
                                                key={skin}
                                                data-key={skin}
                                                className={
                                                    skinStyle || skin.split(".").slice(2, 4).join("-")
                                                }
                                                onMouseDown={(event) => {
                                                    onMouseDown && onMouseDown(skin, event)
                                                }}
                                            >
                                                {video && video({path: videoPath})}
                                                {t.need_pay ? (
                                                    <div className="component_pay">
                                                        <p></p>
                                                    </div>
                                                ) : null}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default WidgetList