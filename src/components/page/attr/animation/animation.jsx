// 导入 widget 模块
import Widget from "@/system/widgets/widget";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


export default class Animation {
  constructor(controler) {
    _defineProperty(this, "list", () => {
      return [{
        name: "noAnimation",
        value: "无动画",
      }, {
        name: "rebound",
        value: "左侧滑入",
      }, {
        name: "slide",
        value: "右侧滑入",
      }, {
        name: "fadeIn",
        value: "淡入",
      }, {
        name: "open",
        value: "中心放大",
      }, {
        name: "screwing",
        value: "旋转进入",
      }, {
        name: "flyInto",
        value: "右侧飞入",
      }, {
        name: "toChangeInto",
        value: "转入",
      }, {
        name: "arcSpinIn",
        value: "电弧旋入",
        iconName:"&#xe658;"
      }, {
        name: "inhalation",
        value: "吸入",
      }, {
        name: "foldBack",
        value: "折叠打开",
      }, {
        name: "flip",
        value: "翻转",
      }, {
        name: "reveal",
        value: "揭示 ",
      }, {
        name: "topslide",
        value: "上部滑入",
      }, {
        name: "bottomslide",
        value: "底部滑入",
      }];
    });

    /**@property controler 动画控制器实例 */
    this.controler = controler;
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} state 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }

  /**
   * @method render 组件渲染方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    const {
      setting,
      on,
      className,
      duration,
      delay,
      angle,
      offsetDistance,
      name,
      value
    } = this.state;
    return (
        setting ? (
          <div>
            <button className="contorlBtn returnBtn" onClick={() => this.controler.setting(false)}>
              <i>{'<'}</i>
              <font id="animationClose">返回</font>
            </button>
            <hr className="hr-short" />
            <div className="aniSty">
              <span>
                <i data-name={name}></i>
              </span>
              <span>{value}</span>
              <label className="stopBtn" onClick={this.controler.animationPlay}>
                <p className="aa"></p>
              </label>
            </div>
            <hr className="hr-short" />
            <ul className="pcConAttDesign">
              <li className="pcAttList">
                <Widget.Range title="持续时间" max={10} value={duration} change={e => this.controler.setRange("duration", e)} />
              </li>
              <li className="pcAttList">
                <Widget.Range title="延迟" max={10} value={delay} change={e => this.controler.setRange("delay", e)} />
              </li>
            </ul>
          </div>
        ) : (
          <div className="aniStyles conMain aniCon">
            <div className="scrollContent">
              <div>
                <ul>
                  {this.list().map((v, i) => (
                    <li className={on == i ? 'on' : ''} key={`ani_${i}`} onClick={() => this.controler.toggleClass(v, i)}>
                      <p>
                        <i data-name={v.name} data-value={v.value}></i>
                        {/* <i className="iconfont" dangerouslySetInnerHTML={{ __html: v.iconName }}></i> */}
                      </p>
                      <h5>{v.value}</h5>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div id="scrollbar">
              <div data-scrolltop="0"></div>
            </div>
            <div className="panlBottom">
              <button className={`contorlBtn ${on > 0 ? '' : 'noSelection'}`} onClick={() => this.controler.setting(true)}>
                <font>设置</font>
              </button>
            </div>
          </div>
        )
    )
  }

}
