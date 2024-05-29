
import Layer from '@/system/widgets/layer';
/**
 * @class {Page} 页面视图类
 */

class Page {
  constructor(controler) {
    /**@property controler 边框控制器实例 */
    this.controler = controler;
    this.pageItem = this.pageItem.bind(this);
    this.all = this.all.bind(this);
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
  render() {
    // return React.createElement(Layer.open, {
    //   titles: [window.public.lang.applyAllPage],
    //   area: ['288px', '773px'],
    //   close: true,
    //   offset: ['calc(100% - 840px)', '98px']
    // }, React.createElement(this.all, null), React.createElement("div", {
    //   className: 'applyOther' + (this.props.isBackground ? '' : ' lightBoxapply')
    // }, React.createElement("div", {
    //   className: "pageMenu",
    //   id: "page-menu-list"
    // }, React.createElement("ul", null, React.createElement(this.controler.each, null)))), this.props.isEnsure ? React.createElement("button", {
    //   className: "contorlBtn lightboxSurebtn",
    //   onClick: this.controler.ensure.bind(this.controler)
    // }, "\u786E\u5B9A") : null);

    return (
      <Layer.open
        titles={[window.public.lang.applyAllPage]}
        area={['288px', '773px']}
        close={true}
        offset={['calc(100% - 840px)', '98px']}
      >
        {this.all}
        <div className={'applyOther' + (this.props.isBackground ? '' : ' lightBoxapply')}>
          <div className="pageMenu" id="page-menu-list">
            <ul>{this.controler.each()}</ul>
          </div>
        </div>
        {this.props.isEnsure && (
          <button className="contorlBtn lightboxSurebtn" onClick={this.controler.ensure.bind(this.controler)}>
            确定
          </button>
        )}
      </Layer.open>
    )
  }
  /**
   * @method pageItem 页面单项复选框结构
   * @param {object} props 参数对象
   * @param {string} props.id 页面id
   * @param {string} props.color 颜色
   * @param {string} props.src 背景图路径
   * @param {string} props.name 页面名称
   * @return {object} 页面单项复选框结构
   */
  pageItem(props) {
    // return React.createElement("li", null, React.createElement("div", {
    //   className: ` pageMenuItem ${this.props.isBackground ? 'pageMenuItemB' : ''}${props.disabled == false ? '' : ' selected'} ${props.checkedLink ? 'linkDisabledCss' : ''}`
    // }, React.createElement("label", null, React.createElement("input", {
    //   type: "checkbox",
    //   value: props.id,
    //   disabled: props.disabled,
    //   id: `page-${props.id}`,
    //   name: `page-${props.id}`,
    //   checked: (this.state.all || this.state.pages.indexOf(props.id) != -1 || props.disabled) && !props.checkedLink,
    //   onChange: this.controler.selected.bind(this.controler, props.name, props.id),
    //   className: "0selectCheckCon appCheckCon"
    // }), React.createElement("p", null, "\u2714"), this.props.isBackground ? React.createElement("i", {
    //   style: {
    //     backgroundColor: props.data.bgColor || null,
    //     backgroundImage: props.data.uri ? `url(${props.data.uri})` : null
    //   }
    // }) : null), React.createElement("span", null, props.name)), props.children ? React.createElement("ul", null, props.children) : null);

    return (
      <li>
        <div className={`pageMenuItem ${this.props.isBackground ? 'pageMenuItemB' : ''}${props.disabled == false ? '' : ' selected'} ${props.checkedLink ? 'linkDisabledCss' : ''}`}>
          <label>
            <input
              type="checkbox"
              value={props.id}
              disabled={props.disabled}
              id={`page-${props.id}`}
              name={`page-${props.id}`}
              checked={(this.state.all || this.state.pages.indexOf(props.id) != -1 || props.disabled) && !props.checkedLink}
              onChange={this.controler.selected.bind(this.controler, props.name, props.id)}
              className="0selectCheckCon appCheckCon"
            />
            <p>✓</p>
            {this.props.isBackground && (
              <i
                style={{
                  backgroundColor: props.data.bgColor || null,
                  backgroundImage: props.data.uri ? `url(${props.data.uri})` : null,
                }}
              />
            )}
            <span>{props.name}</span>
          </label>
          {props.children && <ul>{props.children}</ul>}
        </div>
      </li>
    )

  }
  /**
   * @method all 全部傅选框结构
   * @return 复选框结构
   */
  all() {
    // return React.createElement("div", {
    //   className: "allMenuItem"
    // }, React.createElement("label", {
    //   className: "selectCheckCon appCheckCon"
    // }, React.createElement("input", {
    //   type: "checkbox",
    //   id: "page-all",
    //   className: "input input-checkbox",
    //   name: "page-all",
    //   checked: this.state.all,
    //   onChange: this.controler.selectedAll.bind(this.controler)
    // }), React.createElement("p", null, "\u2714")), React.createElement("span", {
    //   className: "pageMenuTitle"
    // }, window.public.lang.allPage));
    return (
      <div className="allMenuItem">
        <label className="selectCheckCon appCheckCon">
          <input
            type="checkbox"
            id="page-all"
            className="input input-checkbox"
            name="page-all"
            checked={this.state.all}
            onChange={this.controler.selectedAll.bind(this.controler)}
          />
          <p>✓</p>
        </label>
        <span className="pageMenuTitle">{window.public.lang.allPage}</span>
      </div>
    )
  }

}


export default Page
