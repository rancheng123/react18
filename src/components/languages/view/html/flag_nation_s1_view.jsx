
import React, {useState, useEffect} from 'react';
import Util from "@/components/page/util/util.jsx";
import Component from "@/components/text/view/components/component.jsx";

import News from './languages'
import useLanguageList from "@/components/languages/view/html/hooks/list.js";

function s1() {

    let [ languages, isDone ] = useLanguageList()
    let [currentLanguage, setCurrentLanguage] = useState('')
    // 检测isDone 的变化
    useEffect(()=>{
        if(languages && languages.length){
            setCurrentLanguage(languages[0].name)
        }
    }, [isDone])

    const {
            state: {
                component: {
                    id,
                    components
                },
                data: {
                    document_data = {},
                    theme_data = {}
                }
            },
            props: {
                context,
                clone
            }
        } = this


    let {
        link,
        text = "",
        hidden,
        dataSource,
        overflowPart = "automatic",
        fontLabel,
        language
    } = document_data;

    let _daSource = dataSource && dataSource.companyField; //数据源存在时，给控件data-source的自定义属性，用于查找数据源
    let detailIClassenlarge = Component.getDetailClass(_daSource);

    let hiddenClass = ""; //hidden存在,证明控件要隐藏

    if (hidden) {
        //预览时不返回结构,编辑页用class控件隐藏
        if (Util.source) {
            return null;
        } else {
            hiddenClass = "hidden";
        }
    }

    return (
        <Util.linkDecorator
            link={Util.setLinkUrl(context.link, link)}
            type="html"
            id={id}
            className={`listTxt ${id}A ${overflowPart} ${hiddenClass} ${detailIClassenlarge}`}
        >
            <div>
                <News
                    isHasFlag={true}
                    isHasName={false}
                    languages={languages}
                    value={currentLanguage}
                    onChange={(newValue)=>{
                        setCurrentLanguage(newValue)
                    }}
                ></News>
            </div>
        </Util.linkDecorator>

    )
}

export {s1}