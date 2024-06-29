const WidgetLibraryConfig = {
    "tabs": [
        {
            "id": 1231,
            "name": "语种切换"
        },
        {
            "id": 123,
            "name": "文本"
        },
        {
            "id": 666, // 模拟弹框数据
            "name": "测试弹窗",
        },
        {
            "id": 119,
            "name": "按钮"
        },
        {
            "id": 117,
            "name": "图片"
        },
        {
            "id": 126,
            "name": "导航"
        },
        {
            "id": 113,
            "name": "容器"
        },
        {
            "id": 115,
            "name": "幻灯片"
        },
        {
            "id": 99,
            "name": "列表"
        },
        {
            "id": 134,
            "name": "选项卡"
        },
        {
            "id": 105,
            "name": "询盘反馈"
        },
        {
            "id": 108,
            "name": "地图"
        },
        {
            "id": 104,
            "name": "视频"
        },
        {
            "id": 102,
            "name": "搜索"
        },
        {
            "id": 95,
            "name": "侧边栏"
        },
        {
            "id": 97,
            "name": "多语言"
        },
        {
            "id": 130,
            "name": "社交"
        },
        {
            "id": 400,
            "name": "会员中心"
        },
        {
            "id": 402,
            "name": "购物车"
        },
        {
            "id": 447,
            "name": "自定义"
        },
        {
            "id": 303,
            "name": "弹出窗口"
        },
        {
            "id": 359,
            "name": "规格参数"
        },
        {
            "id": 110,
            "name": "组件"
        },
        {
            "id": 201,
            "name": "可折叠"
        },
        {
            "id": 468,
            "name": "时间轴"
        },
        {
            "id": 225,
            "name": "分割线"
        },
        {
            "id": 245,
            "name": "iframe框架"
        }
    ],
    "group": {
        // 语种切换  start
        "1231": {
            "tabs": [
                {
                    "id": 1,
                    "name": "国旗与国家名称"
                },
                {
                    "id": 2,
                    "name": "国家名称"
                },
            ],
            "group": {
                "1": [
                    {

                        //"skin": "languages(type, reactKey).flagNationName(classname).s1.1",
                        "skin": "languages.flagNationName.s1.1",
                        "skinStyle": "languages-1",
                        "id": 667,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "languages.flagNationName.s1.2",
                        "skinStyle": "languages-2",
                        "id": 668,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "2": [
                    {
                        "skin": "messagepopup.messagepopup.s1.1",
                        "skinStyle": "text-1",
                        "id": 667,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
            }
        },
        // 语种切换  end

        // 模拟弹框数据
        "666": {
            "tabs": [
                {
                    "id": 667,
                    "name": "留言弹窗"
                },
            ],
            "group": {
                "667": [
                    {
                        "skin": "messagepopup.messagepopup.s1.1",
                        "skinStyle": "text-1",
                        "id": 667,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
            }
        },
        "95": {
            "tabs": [
                {
                    "id": 96,
                    "name": "侧边栏"
                }
            ],
            "group": {
                "96": [
                    {
                        "skin": "sidebar.sideBox.s91.295",
                        "skinStyle": "basSi-1",
                        "id": 96,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "sidebar.sideBox.s467.572",
                        "skinStyle": "LeftbasSi-2",
                        "id": 96,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        },
        "97": {
            "tabs": [
                {
                    "id": 98,
                    "name": "多语言"
                }
            ],
            "group": {
                "98": [
                    {
                        "skin": "language.langBox.s77.228",
                        "skinStyle": "rowLanguage-1",
                        "id": 98,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "language.langBox.s79.226",
                        "skinStyle": "rowLanguage-3",
                        "id": 98,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "language.langBox.s80.225",
                        "skinStyle": "selectLanguage-1",
                        "id": 98,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "99": {
            "tabs": [
                {
                    "id": 100,
                    "name": "新闻"
                },
                {
                    "id": 101,
                    "name": "产品"
                },
                {
                    "id": 395,
                    "name": "图片集"
                },
                {
                    "id": 453,
                    "name": "标签列表"
                },
                {
                    "id": 212,
                    "name": "友情链接"
                },
                {
                    "id": 345,
                    "name": "下载列表"
                }
            ],
            "group": {
                "100": [
                    {
                        "skin": "list.news.s90.334",
                        "skinStyle": "basicnewsList-1",
                        "id": 100,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.news.s144.361",
                        "skinStyle": "basicnewsList-2",
                        "id": 100,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.news.s157.374",
                        "skinStyle": "basicnewsList-3",
                        "id": 100,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.news.s435.540",
                        "skinStyle": "midImg_list_1",
                        "id": 100,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "list.news.s450.555",
                        "skinStyle": "datatimeList-1",
                        "id": 100,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "list.news.s452.557",
                        "skinStyle": "videoPopupList-1",
                        "id": 100,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ],
                "101": [
                    {
                        "skin": "list.product.s89.335",
                        "skinStyle": "basicList-1",
                        "id": 101,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.product.s143.360",
                        "skinStyle": "basicList-2",
                        "id": 101,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.product.s145.362",
                        "skinStyle": "basicList-3",
                        "id": 101,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.product.s147.364",
                        "skinStyle": "basicList-4",
                        "id": 101,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.product.s150.367",
                        "skinStyle": "basicList-5",
                        "id": 101,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.product.s345.459",
                        "skinStyle": "cartproList-1",
                        "id": 101,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "212": [
                    {
                        "skin": "list.friendlink.s355.467",
                        "skinStyle": "friendlinkImg-1",
                        "id": 212,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.friendlink.s364.476",
                        "skinStyle": "friendlinkTxt-1",
                        "id": 212,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "345": [
                    {
                        "skin": "list.download.s309.431",
                        "skinStyle": "download-1",
                        "id": 345,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "395": [
                    {
                        "skin": "list.gallery.s334.446",
                        "skinStyle": "basicGallery-1",
                        "id": 395,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "list.gallery.s336.448",
                        "skinStyle": "basicGallery-2",
                        "id": 395,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "0"
                    }
                ],
                "453": [
                    {
                        "skin": "taglist.taglist.s437.542",
                        "skinStyle": "taglist1",
                        "id": 453,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        },
        "102": {
            "tabs": [
                {
                    "id": 103,
                    "name": "搜索"
                }
            ],
            "group": {
                "103": [
                    {
                        "skin": "search.search.s75.316",
                        "skinStyle": "squareSearch-1",
                        "id": 103,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "search.search.s76.317",
                        "skinStyle": "roundSearch-1",
                        "id": 103,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "search.search.s325.438",
                        "skinStyle": "search-3",
                        "id": 103,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "104": {
            "tabs": [
                {
                    "id": 107,
                    "name": "视频"
                }
            ],
            "group": {
                "107": [
                    {
                        "skin": "video.video.s74.231",
                        "skinStyle": "basVideo-1",
                        "id": 107,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "105": {
            "tabs": [
                {
                    "id": 106,
                    "name": "询盘反馈"
                }
            ],
            "group": {
                "106": [
                    {
                        "skin": "form.form.s87.314",
                        "skinStyle": "basicForm-1",
                        "id": 106,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "form.form.s88.304",
                        "skinStyle": "basicForm-2",
                        "id": 106,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "form.form.s422.527",
                        "skinStyle": "form-horizantal",
                        "id": 106,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 1
                    },
                    {
                        "skin": "form.form.s429.534",
                        "skinStyle": "basicForm-upload",
                        "id": 106,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "form.form.s438.543",
                        "skinStyle": "basicHoriForm-1",
                        "id": 106,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        },
        "108": {
            "tabs": [
                {
                    "id": 109,
                    "name": "地图"
                }
            ],
            "group": {
                "109": [
                    {
                        "skin": "map.map.s72.233",
                        "skinStyle": "basMap-1",
                        "id": 109,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "map.map.s73.232",
                        "skinStyle": "basMap-2",
                        "id": 109,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "110": {
            "tabs": [
                {
                    "id": 415,
                    "name": "一行多列"
                },
                {
                    "id": 171,
                    "name": "鼠标经过容器"
                },
                {
                    "id": 321,
                    "name": "翻屏组件"
                }
            ],
            "group": {
                "171": [
                    {
                        "skin": "hoverbox.hoverbox.s118.345",
                        "skinStyle": "",
                        "id": 171,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "321": [
                    {
                        "skin": "flipper.flipper.s288.418",
                        "skinStyle": "flipper-0",
                        "id": 321,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "flipper.flipper.s294.423",
                        "skinStyle": "flipper-1",
                        "id": 321,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "415": [
                    {
                        "skin": "component.row.s372.480",
                        "skinStyle": "rowsimpleOne-1",
                        "id": 415,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "component.row.s386.492",
                        "skinStyle": "rowsimpleOne-2",
                        "id": 415,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "component.row.s387.493",
                        "skinStyle": "rowsimpleOne-3",
                        "id": 415,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "component.row.s388.494",
                        "skinStyle": "rowsimpleOne-4",
                        "id": 415,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "component.row.s389.495",
                        "skinStyle": "rowsimpleOne-5",
                        "id": 415,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "component.row.s390.496",
                        "skinStyle": "rowsimpleOne-6",
                        "id": 415,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "113": {
            "tabs": [
                {
                    "id": 114,
                    "name": "容器"
                }
            ],
            "group": {
                "114": [
                    {
                        "skin": "box.box.s64.305",
                        "skinStyle": "basBox-1",
                        "id": 114,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "box.box.s65.306",
                        "skinStyle": "basBox-2",
                        "id": 114,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "box.box.s66.307",
                        "skinStyle": "basLBox-1",
                        "id": 114,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "box.box.s67.308",
                        "skinStyle": "basRBox-1",
                        "id": 114,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "box.box.s68.309",
                        "skinStyle": "basTBox-1",
                        "id": 114,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "box.box.s69.310",
                        "skinStyle": "basTLBox-1",
                        "id": 114,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "box.box.s70.311",
                        "skinStyle": "basBBox-1",
                        "id": 114,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "box.box.s71.312",
                        "skinStyle": "basLangleBox-1",
                        "id": 114,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "box.box.s111.337",
                        "skinStyle": "",
                        "id": 114,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "115": {
            "tabs": [
                {
                    "id": 116,
                    "name": "多图轮播"
                },
                {
                    "id": 394,
                    "name": "高级幻灯片"
                }
            ],
            "group": {
                "116": [
                    {
                        "skin": "slideShow.carousel.s81.328",
                        "skinStyle": "btnCar-1",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "slideShow.carousel.s82.329",
                        "skinStyle": "jssorSlider-1",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "slideShow.carousel.s431.536",
                        "skinStyle": "slideLeft-1",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "slideShow.carousel.s439.544",
                        "skinStyle": "slider3d-1",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "slideShow.carousel.s231.398",
                        "skinStyle": "slideCar-3",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "slideShow.carousel.s332.444",
                        "skinStyle": "sliderbtnCar-1",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "slideShow.carousel.s340.452",
                        "skinStyle": "btnCar-3",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "slideShow.carousel.s461.566",
                        "skinStyle": "onePage-many-pictures",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "slideShow.carousel.s472.577",
                        "skinStyle": "bottom-picture-navigator-slide",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "slideShow.carousel.s474.579",
                        "skinStyle": "right-rnavigation-slide",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "slideShow.carousel.s428.533",
                        "skinStyle": "slideCar-9",
                        "id": 116,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ],
                "394": [
                    {
                        "skin": "slideShow.advanced.s333.445",
                        "skinStyle": "advanced",
                        "id": 394,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "slideShow.advanced.s339.450",
                        "skinStyle": "advanced-1",
                        "id": 394,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "slideShow.advanced.s346.460",
                        "skinStyle": "advanced-2",
                        "id": 394,
                        "goods_id": 110,
                        "need_pay": true,
                        "goods_status": 1,
                        "component_type": 0
                    },
                    {
                        "skin": "slideShow.advanced.s445.550",
                        "skinStyle": "advanced-down",
                        "id": 394,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "component.row.s457.562",
                        "skinStyle": "bottom-navigation-slide",
                        "id": 394,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        },
        "117": {
            "tabs": [
                {
                    "id": 118,
                    "name": "图片"
                }
            ],
            "group": {
                "118": [
                    {
                        "skin": "image.commonImg.s55.290",
                        "skinStyle": "basicImg-1",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s56.289",
                        "skinStyle": "basicImg-2",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s57.291",
                        "skinStyle": "basicImg-3",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s58.288",
                        "skinStyle": "basicImg-4",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s59.287",
                        "skinStyle": "basicImg-5",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s60.286",
                        "skinStyle": "basicImg-6",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s61.285",
                        "skinStyle": "basicshadowImg-1",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s62.284",
                        "skinStyle": "basicLRshadowImg-1",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s63.283",
                        "skinStyle": "hoverImg-1",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s473.578",
                        "skinStyle": "hoverImgTxtUp-1",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "image.commonImg.s292.421",
                        "skinStyle": "hoverImg-2",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "image.commonImg.s465.570",
                        "skinStyle": "hoverImglarge-1",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "image.commonImg.s471.576",
                        "skinStyle": "hoverImgBottomUp-1",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "image.commonImg.s466.571",
                        "skinStyle": "hoverImgresize-1",
                        "id": 118,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        },
        "119": {
            "tabs": [
                {
                    "id": 122,
                    "name": "按钮"
                },
                {
                    "id": 121,
                    "name": "文本按钮"
                },
                {
                    "id": 120,
                    "name": "图标按钮"
                },
                {
                    "id": 367,
                    "name": "返回顶部"
                }
            ],
            "group": {
                "120": [
                    {
                        "skin": "button.iconBtn.s48.58",
                        "skinStyle": "basIcoBtn-1",
                        "id": 120,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.iconBtn.s49.57",
                        "skinStyle": "basIcoBtn-2",
                        "id": 120,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.iconBtn.s50.56",
                        "skinStyle": "basIcoBtn-3",
                        "id": 120,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.iconBtn.s51.256",
                        "skinStyle": "basIcoBtn-4",
                        "id": 120,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.iconBtn.s52.255",
                        "skinStyle": "basIcoBtn-5",
                        "id": 120,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.iconBtn.s53.254",
                        "skinStyle": "basIcoBtn-6",
                        "id": 120,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.iconBtn.s54.253",
                        "skinStyle": "basIcoOutlineBtn-1",
                        "id": 120,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "121": [
                    {
                        "skin": "button.textBtn.s44.91",
                        "skinStyle": "basisBtn-1",
                        "id": 121,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.textBtn.s45.99",
                        "skinStyle": "basisBtn-2",
                        "id": 121,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.textBtn.s46.100",
                        "skinStyle": "basisBtn-3",
                        "id": 121,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.textBtn.s47.101",
                        "skinStyle": "basisBtn-4",
                        "id": 121,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "122": [
                    {
                        "skin": "button.button.s37.262",
                        "skinStyle": "basBtn-1",
                        "id": 122,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.button.s38.263",
                        "skinStyle": "basBtn-2",
                        "id": 122,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.button.s39.261",
                        "skinStyle": "basoutlineBtn-1",
                        "id": 122,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.button.s40.260",
                        "skinStyle": "basbgBtn-1",
                        "id": 122,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.button.s41.259",
                        "skinStyle": "basAngleBtn-1",
                        "id": 122,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.button.s42.258",
                        "skinStyle": "basBtn-6",
                        "id": 122,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "button.button.s43.257",
                        "skinStyle": "basRiconBtn-1",
                        "id": 122,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "367": [
                    {
                        "skin": "backtop.backtop.s323.436",
                        "skinStyle": "back-1",
                        "id": 367,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "123": {
            "tabs": [
                {
                    "id": 124,
                    "name": "标题"
                },
                {
                    "id": 125,
                    "name": "文本"
                },
                {
                    "id": 292,
                    "name": "基本计数器"
                }
            ],
            "group": {
                "124": [
                    {
                        "skin": "text.title.s36.211",
                        "skinStyle": "text-1",
                        "id": 124,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "125": [
                    {
                        "skin": "text.tex.s35.210",
                        "skinStyle": "text-1",
                        "id": 125,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "292": [
                    {
                        "skin": "component.usualLayout.s282.412",
                        "skinStyle": "",
                        "id": 292,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "timer.timer.s242.402",
                        "skinStyle": "basicTimer",
                        "id": 292,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "126": {
            "tabs": [
                {
                    "id": 127,
                    "name": "面包屑"
                },
                {
                    "id": 128,
                    "name": "竖导航"
                },
                {
                    "id": 129,
                    "name": "水平导航"
                },
                {
                    "id": 327,
                    "name": "锚点导航"
                }
            ],
            "group": {
                "127": [
                    {
                        "skin": "crumbs.crumbs.s83.221",
                        "skinStyle": "basCrumbs-1",
                        "id": 127,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "128": [
                    {
                        "skin": "menu.verMenu.s86.294",
                        "skinStyle": "VerticalMenu-1",
                        "id": 128,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.verMenu.s162.379",
                        "skinStyle": "VerticalMenu-2",
                        "id": 128,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.verMenu.s226.394",
                        "skinStyle": "VerticalMenu-3",
                        "id": 128,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.verMenu.s418.523",
                        "skinStyle": "VerticalMenuOpen-1",
                        "id": 128,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 1
                    },
                    {
                        "skin": "menu.verMenu.s419.524",
                        "skinStyle": "VerticalarrMenu-1",
                        "id": 128,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 1
                    }
                ],
                "129": [
                    {
                        "skin": "menu.horMenu.s85.326",
                        "skinStyle": "hBasMenu-1",
                        "id": 129,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.horMenu.s146.363",
                        "skinStyle": "hBasMenu-2",
                        "id": 129,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.horMenu.s148.365",
                        "skinStyle": "hBasMenu-3",
                        "id": 129,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.horMenu.s158.375",
                        "skinStyle": "hBasMenu-4",
                        "id": 129,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.horMenu.s159.376",
                        "skinStyle": "hBasMenu-5",
                        "id": 129,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.horMenu.s160.377",
                        "skinStyle": "hBasMenu-6",
                        "id": 129,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.horMenu.s161.378",
                        "skinStyle": "hBasMenu-7",
                        "id": 129,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "menu.horMenu.s458.563",
                        "skinStyle": "hBasMenu-9",
                        "id": 129,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "menu.horMenu.s326.439",
                        "skinStyle": "hBasMenu-8",
                        "id": 129,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "327": [
                    {
                        "skin": "sidebar.sideBox.s290.420",
                        "skinStyle": "AnchorMenu-1",
                        "id": 327,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "130": {
            "tabs": [
                {
                    "id": 131,
                    "name": "分享"
                },
                {
                    "id": 132,
                    "name": "关注"
                }
            ],
            "group": {
                "131": [
                    {
                        "skin": "socials.socialsBox.s96.333",
                        "skinStyle": "rowSocials-1",
                        "id": 131,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "socials.socialsBox.s97.332",
                        "skinStyle": "rowSocials-2",
                        "id": 131,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "132": [
                    {
                        "skin": "socials.followBox.s98.331",
                        "skinStyle": "rowFollow-1",
                        "id": 132,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "socials.followBox.s99.330",
                        "skinStyle": "rowFollow-2",
                        "id": 132,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "134": {
            "tabs": [
                {
                    "id": 135,
                    "name": "选项卡"
                }
            ],
            "group": {
                "135": [
                    {
                        "skin": "tab.tab.s110.336",
                        "skinStyle": "",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "tab.tab.s163.380",
                        "skinStyle": "tabsStyle_1",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "0"
                    },
                    {
                        "skin": "tab.tab.s434.539",
                        "skinStyle": "",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "tab.tab.s464.569",
                        "skinStyle": "VerticalTab-2",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "tab.tab.s451.556",
                        "skinStyle": "VerticalTab-1",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "tab.tab.s184.383",
                        "skinStyle": "tabsStyle_2",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "tab.tab.s185.384",
                        "skinStyle": "tabsStyle_3",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "tab.tab.s322.435",
                        "skinStyle": "tabsStyle_4",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "tab.tab.s324.437",
                        "skinStyle": "tabsStyle_5",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "tab.tab.s456.561",
                        "skinStyle": "arrImgTab-1",
                        "id": 135,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        },
        "201": {
            "tabs": [
                {
                    "id": 202,
                    "name": "可折叠"
                }
            ],
            "group": {
                "202": [
                    {
                        "skin": "collapsible.collapsible.s182.382",
                        "skinStyle": "basicCollapsible-1",
                        "id": 202,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "225": {
            "tabs": [
                {
                    "id": 227,
                    "name": "分割线"
                }
            ],
            "group": {
                "227": [
                    {
                        "skin": "line.line.s206.387",
                        "skinStyle": "basicLine",
                        "id": 227,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "line.line.s209.390",
                        "skinStyle": "basicLine-1",
                        "id": 227,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "line.line.s210.391",
                        "skinStyle": "basicLine-2",
                        "id": 227,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "245": {
            "tabs": [
                {
                    "id": 246,
                    "name": "iframe框架"
                }
            ],
            "group": {
                "246": [
                    {
                        "skin": "iframe.iframe.s212.393",
                        "skinStyle": "basicIframe",
                        "id": 246,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "303": {
            "tabs": [
                {
                    "id": 304,
                    "name": "弹出窗口"
                }
            ],
            "group": {
                "304": [
                    {
                        "skin": "lightboxmodal.lightboxmodal.s278.409",
                        "skinStyle": "lightboxmodal-1",
                        "id": 304,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "lightboxmodal.lightboxmodal.s293.422",
                        "skinStyle": "lightboxmodal-2",
                        "id": 304,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "359": {
            "tabs": [
                {
                    "id": 360,
                    "name": "规格参数"
                },
                {
                    "id": 465,
                    "name": "列表筛选器"
                }
            ],
            "group": {
                "360": [
                    {
                        "skin": "specs.specs.s318.434",
                        "skinStyle": "specsBox-1",
                        "id": 360,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ],
                "465": [
                    {
                        "skin": "screen.screen.s460.565",
                        "skinStyle": "horizontalScreen-1",
                        "id": 465,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        },
        "400": {
            "tabs": [
                {
                    "id": 401,
                    "name": "登录注册"
                }
            ],
            "group": {
                "401": [
                    {
                        "skin": "member.login.s341.453",
                        "skinStyle": "login",
                        "id": 401,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ]
            }
        },
        "402": {
            "tabs": [
                {
                    "id": 403,
                    "name": "数量"
                },
                {
                    "id": 407,
                    "name": "购物车"
                }
            ],
            "group": {
                "403": [
                    {
                        "skin": "number.number.s342.454",
                        "skinStyle": "number",
                        "id": 403,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    }
                ],
                "407": [
                    {
                        "skin": "backtop.backtop.s433.538",
                        "skinStyle": "floatshopcart",
                        "id": 407,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "shopcart.shopcart.s344.458",
                        "skinStyle": "shopcart",
                        "id": 407,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": 0
                    },
                    {
                        "skin": "shopcart.shopcart.s409.514",
                        "skinStyle": "shopcart-2",
                        "id": 407,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "shopcart.shopcart.s410.515",
                        "skinStyle": "shopcart-3",
                        "id": 407,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        },
        "447": {
            "tabs": [
                {
                    "id": 448,
                    "name": "自定义"
                }
            ],
            "group": {
                "448": [
                    {
                        "skin": "custom.custom.s430.535",
                        "skinStyle": "",
                        "id": 448,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "custom.custom.s462.567",
                        "skinStyle": "",
                        "id": 448,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "custom.custom.s463.568",
                        "skinStyle": "",
                        "id": 448,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "custom.custom.s469.574",
                        "skinStyle": "Autocus_open01",
                        "id": 448,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "custom.custom.s470.575",
                        "skinStyle": "hoverAutomsroll-1",
                        "id": 448,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        },
        "468": {
            "tabs": [
                {
                    "id": 469,
                    "name": "时间轴"
                }
            ],
            "group": {
                "469": [
                    {
                        "skin": "timeline.timeline.s475.580",
                        "skinStyle": "timeline-1",
                        "id": 469,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    },
                    {
                        "skin": "timeline.timeline.s477.582",
                        "skinStyle": "timeline-vertical-1",
                        "id": 469,
                        "goods_id": null,
                        "need_pay": false,
                        "goods_status": null,
                        "component_type": "1"
                    }
                ]
            }
        }
    }
}

export default WidgetLibraryConfig;