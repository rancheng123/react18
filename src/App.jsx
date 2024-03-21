import { useState, useEffect, useReducer } from 'react'
import Router from './routes'
import logo from './assets/image/logo.png'
import './App.css'
import Header from './template/header/header_controler'
import Content from './template/content/content_controler'

import lineData from './assets/data'

function App(props) {
  const [count, setCount] = useState(0);

  const topNber = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
  const leftNber = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
  const initState = {
    showHidden: true,
  }
  const reducers = (state, action) => {
    console.log(state, action)
    switch (action.type) {
      case 'showHidden':
        return {
          ...state,
          showHidden: action.showHidden
        }
      default:
        return {...state, ...action}
    }
  }
  const [state, dispatch] = useReducer(reducers, initState);

  const setData = (data) => {
    console.log(data)
    dispatch({
      ...state,
      ...data,
    })
  }

  const hanlderIcon = (type) => {
    console.log(type)
    switch (type) {
      case "showHidden":
        setData({
          showHidden: !state.showHidden
        })
      default:
    }
  }

  return (
    <div className='editorCon'>
      <Header />
      <Content />
      {/* <main id="ediMain" className="pc-content">
        <div id="edit-container">
          <iframe src="/test" id='iframe' frameBorder="0" scrolling="no"></iframe>
        </div>
        <div className="property-modal">
          <div className="auxiliary" style={{ height: "6383.41px" }}>
            <div>
              <div className="topNumber">
              <i className="rulertop"></i>
                <div className="rultopNum">
                  <ul className="topNber">
                    {
                      topNber.map((item) => <li key={item}>{item}</li>)
                    }
                  </ul>
                </div>
              </div>
              <div className="rightNumber"><i className="rulerright"></i>
                <div className="rulrightNum">
                  <ul className="rightNber">
                    {
                      leftNber.map(item => <li key={item}>{item}</li>)
                    }
                  </ul>
                </div>
              </div>
              <div id="horizontal">
                {
                  lineData.guidHor.map((item, index) => {
                    return (
                      <div className="ediCusLin" id={item.id} key={index} data-index={index} style={{ left: item.value + 'px' }}>
                        <div className="cusLines"></div>
                        <div className="cusLinCon"><i className="iconfont" data-draggable="true"></i>
                          <p className="cusLinNum"><input type="text" className="coordinte" placeholder={item.value} /><span>px</span><i
                            className="iconfont" data-emname="del-guid"></i></p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div id="vertical">
                {
                  lineData.guidVer.map((item, index) => {
                    return (
                      <div className="ediCuscol" id={item.id} key={index} data-index={index} style={{ top: item.value + 'px' }}>
                        <div className="cusLines"></div>
                        <div className="cusLinCon"><i className="iconfont" data-draggable="true"></i>
                          <p className="cusLinNum"><input type="text" className="coordinte" placeholder={item.value} /><span>px</span><i
                            className="iconfont" data-emname="del-guid"></i></p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div id="selected-mask" style={{ height: "6383.41px" }}>
            <div>
              <div className="component-selected">
                <div>
                  <div id="property-parent-buttons" className="editControl">
                    <div className="functionBox" style={{ left: "318px", top: "241px", position: "fixed" }}><span className="controlName"
                      style={{ "padding": "0px 15px" }}>行</span>
                      <ul className="functionUL">
                        <li className="basicIco tipbpx" id="cduKvkj-basic" data-title="组件属性"><i></i><em></em></li>
                        <li className="designIco tipbpx" id="cduKvkj-design" data-title="设计"><i></i><em></em></li>
                        <li className="manageIco tipbpx" id="cduKvkj-manage" data-title="项管理"><i></i><em></em></li>
                        <li className="animationIco tipbpx" id="cduKvkj-animation" data-title="出场动画"><i></i><em></em></li>
                        <li className="collectionIco tipbpx" id="cduKvkj-collection" data-title="收藏"><i></i><em></em></li>
                        <li className="hidingIco tipbpx" id="cduKvkj-hiding" data-title="隐藏"><i></i><em></em></li>
                      </ul>
                    </div>
                  </div>
                  <div id="property-buttons" className="editControl">
                    <div className="functionBox" style={{ "left": "376px", top: "241px", position: "fixed" }}><span className="controlName"
                      style={{ "padding": "0px 15px" }}>自定义</span>
                      <ul className="functionUL">
                        <li className="htmlIco tipbpx" id="cp3amKB-html" data-title="html"><i></i><em></em></li>
                        <li className="cssIco tipbpx" id="cp3amKB-css" data-title="css"><i></i><em></em></li>
                        <li className="collectionIco tipbpx" id="cp3amKB-collection" data-title="收藏"><i></i><em></em></li>
                        <li className="hidingIco tipbpx" id="cp3amKB-hiding" data-title="隐藏"><i></i><em></em></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div id="select-parent-box">
                  <div className="ediBox" style={{ "left": "0px", top: "-1px", width: "1903px", height: "1182px" }}>
                    <div className="componentAddStyle">
                      <div className="componentAddTop"><span className="info">上部添加组件</span></div>
                      <div className="componentAddBottom"><span className="info">下部添加组件</span></div>
                    </div>
                  </div>
                </div>
                <div id="select-box">
                  <div className="ediBox" style={{ "left": "1px", top: "0px", width: "1901px", height: "1180px" }}>
                    <div className="adjustingButton"><em className="occupa-top" data-position="top"><i className="iconfont"
                      data-position="top"></i></em><em className="occupa-left" data-position="left"><i className="iconfont"
                        data-position="left"></i></em><span data-position="right" className="cursor-right"></span></div>
                  </div>
                </div>
              </div>
              <div className="component-menu">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </main > */}
      {/* <Router /> */}
    </div>
  )
}

export default App
