
import Layer from "@/system/widgets/layer";
import Pagecontainer from "./pagination/containers/Pagecontainer";


/**
 * @class {Resource} 资源库面板视图类
 */
export default class Resource {
  /**@property controler 资源库控制器实例 */
  constructor(controler) {
    this.controler = controler;
    this.title = this.controler.title || "资源库";
    this.area = this.controler.area || ["1000px", "auto"];
    this.cancel = this.controler.cancel || false;
    this.ensure = this.controler.ensure || false;
    this.draggable = this.controler.draggable || false;
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
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  //click={this.controler.getResourceList}
  render(child) {
    let _state = this.state || {};

    // return React.createElement(Layer.open, {
    //   titles: [this.title],
    //   area: this.area,
    //   close: true,
    //   draggable: this.draggable,
    //   skin: "em-function-resource",
    //   cancel: this.cancel,
    //   ensure: this.ensure
    // }, child, React.createElement("div", {
    //   id: "message_page_box"
    // }, React.createElement("div", {
    //   className: "message_page"
    // }, _state.totalPages ? React.createElement(Pagecontainer, {
    //   controler: this.controler,
    //   data: _state
    // }) : null), React.createElement("div", {
    //   className: "sysBot"
    // }, React.createElement("p", null, window.public.lang["instructionsForUse"]))));

    return (
      <Layer.open
        titles={[this.title]}
        area={this.area}
        // close={true}
        close={this.controler.close}
        draggable={this.draggable}
        skin="em-function-resource"
        cancel={this.cancel}
        ensure={this.ensure}
      >
        {child}
        <div id="message_page_box">
          <div className="message_page">
            {_state.totalPages ? <Pagecontainer controler={this.controler} data={_state} /> : null}
          </div>
          <div className="sysBot">
            <p>{window.public.lang["instructionsForUse"]}</p>
          </div>
        </div>
      </Layer.open>
    )
  }

}
