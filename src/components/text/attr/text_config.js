const obj = {
    "dots": {
        "btns": [
            "top",
            "top-left",
            "left"
        ],
        "list": [
            "right",
            "bottom-right"
        ]
    },
    "pc": {
        "tabs": [
            {
                "name": "design",
                "type": "design"
            },
            {
                "name": "setUp",
                "type": "setting"
            },
            {
                "name": "animation",
                "type": "animation"
            },
            {
                "name": "link",
                "type": "link"
            },
            {
                "name": "picture",
                "type": "picture",
                "hidden": false
            }
        ],
        "btns": [
            {
                "name": "changeText",
                "type": "ckeditor",
                "className": "edit",
                "iconName": "&#xe7a6;"
            },
            {
                "name": "textProperty",
                "type": "basic",
                "iconName": "&#xe7a0;",
                "hidden": false
            },
            {
                "name": "design",
                "type": "design",
                "iconName": "&#xe79d;"
            },
            {
                "name": "setUp",
                "type": "setting",
                "iconName": "&#xe7a2;"
            },
            {
                "name": "animation",
                "type": "animation",
                "iconName": "&#xe796;"
            },
            {
                "name": "link",
                "type": "link",
                "iconName": "&#xe79a;"
            },
            {
                "name": "translate",
                "type": "translate",
                "iconName": "&#xe7a4;"
            },
            {
                "name": "quote",
                "type": "quote",
                "show": "Hoverbox 2",
                "iconName": "&#xe7a6;"
            }
        ]
    },
    "mo": {
        "tabs": [
            {
                "name": "design",
                "type": "design",
                "hidden": true
            },
            {
                "name": "picture",
                "type": "picture",
                "hidden": false
            }
        ],
        "btns": [
            {
                "name": "design",
                "type": "design"
            }
        ]
    },
    "group": {
        "basic": {
            "all": {
                "include": "controlsName|selectionContentSet|dataText|link|overflowPart|minHeight|accordingNumber|anchorSet"
            },
            "text.tex.s444": {
                "include": "controlsName|anchorSet"
            }
        },
        // 设计模块配置参数
        "design": {
            "all": {
                "include": "text|background|position",  // 包含那些字模块
                // 子模块分组
                "group": {
                    "text": {
                        "include": "size|family|color|style|align|lineHeight|headLine|letterSpace"
                    },
                    "allShow": true   // 是否为直接展示全部不分组
                }
            }
        },
        // 划过配置参数
        "setting": {
            "all": {
                // 划过子tab有哪些
                "tabs": [
                    "hover"
                ],
                "group": {
                    "hover": {
                        "include": "text|background|border|radius|shadow",
                        "group": {
                            "text": {
                                "include": "background|color|style"
                            }
                        }
                    }
                }
            }
        },
        "picture": {
            "all": {
                "include": "imgBig|imageQuality|originalFormat"
            }
        },
        "link": {
            "all": {
                "include": "noLink|pageAnchor|externalLinks",
                "layout": "horizontal"
            }
        }
    }
}