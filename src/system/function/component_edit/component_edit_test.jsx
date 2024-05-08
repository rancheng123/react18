import ConfigBtn from './single/ConfigBtn'

/**
 * @class {ComponentEdit} 控件编辑类
 */
export default class ComponentEdit {
  constructor(controler) {
    /**@property controler 控件编辑控制器实例 */
    this.controler = controler; //hover绑定this

    this.hover = this.hover.bind(this);
    this.hoverBtn = this.hoverBtn.bind(this);
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
  //onMouseDown = {this.state.hover ?null:this.controler.mousedown.bind(this.controler)}
  render() {
    // return React.createElement("div", {
    //   id: "selected-mask",
    //   style: {
    //     height: this.props.height
    //   },
    //   onMouseMove: this.state.ismove ? this.controler.hover.bind(this.controler) : null,
    //   onMouseDown: this.controler.mousedown.bind(this.controler)
    // }, this.state.hidden == false ? React.createElement("div", null, React.createElement(this.hover, null), React.createElement("div", {
    //   className: "component-selected"
    // }, React.createElement("div", {
    //   onMouseMove: e => e.stopPropagation(),
    //   onMouseDown: e => e.stopPropagation()
    // }, React.createElement("div", {
    //   id: "property-parent-buttons",
    //   className: "editControl"
    // }), React.createElement("div", {
    //   id: "property-buttons",
    //   className: "editControl"
    // })), React.createElement("div", {
    //   id: "select-parent-box"
    // }), React.createElement("div", {
    //   id: "select-box"
    // })), React.createElement("div", {
    //   className: "component-menu"
    // }, React.createElement(this.controler.menu, {
    //   node: (this.controler.selected || {}).node,
    //   removeBefore: node => this.controler.selected.proxy.removeBefore(node)
    // }))) : null);

    return (
      <div
        id="selected-mask"
        style={{ height: this.props.height }}
        onMouseMove={this.state.ismove ? this.controler.hover.bind(this.controler) : null}
        onMouseDown={this.controler.mousedown.bind(this.controler)}
      >
        {this.state.hidden == false ? (
          <div>
            <div>
              <this.hover />
              <div className="component-selected">
                <div onMouseMove={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
                  <div id="property-parent-buttons" className="editControl" />
                  <div id="property-buttons" className="editControl" />
                </div>
                <div id="select-parent-box" />
                <div id="select-box" />
              </div>
            </div>
            <div className="component-menu">
              <this.controler.menu
                node={(this.controler.selected || {}).node}
                removeBefore={(node) => this.controler.selected.proxy.removeBefore(node)}
              />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
  /**
   * @method hoverBox 鼠标滑过提示框结构
   * @param {object} props 参数对象 
   */
  hoverBox({
    data,
    index
  }) {
    if (data) {
      const {
        layout
      } = data; //layout.top-=1;

      const cls = index === 0 ? 'contHovBox' : 'contHovBox cellHoverbox';
      // return React.createElement("div", {
      //   className: cls,
      //   style: layout
      // });
      return (
        <div className={cls} style={layout}></div>
      )
    }


    return null;
  }
  /**
   * @method hoverBtn 鼠标滑过菜单结构
   * @param {object} props 参数对象 
   */
  hoverBtn({
    data,
    index
  }) {
    if (data) {
      if (data.absolute) {
        const {
          absolute: {
            left,
            top,
            name,
            fixedWidth,
            itemWidth,
            items
          },
          current: {
            hidden
          }
        } = data;
        return items.length && hidden != 1 ?
          //  React.createElement(ConfigBtn["ConfigBtnWaper"], {
          //   style: {
          //     left,
          //     top
          //   },
          //   name: name,
          //   index: index,
          //   fixedWidth: fixedWidth
          // }, React.createElement("ul", {
          //   className: "functionUL",
          //   style: {
          //     width: itemWidth
          //   }
          // }, items.map(({
          //   name,
          //   type,
          //   hidden,
          //   current,
          //   selected,
          //   show,
          //   className = type
          // }, i) => {
          //   if (hidden != true) {
          //     //判断控件是否在指定条件下显示
          //     if (show && !this.controler.isShow(data, show)) {
          //       return null;
          //     }

          //     return React.createElement(ConfigBtn["ConfigButton"], {
          //       select: selected,
          //       key: i,
          //       current: current,
          //       name: name,
          //       type: type,
          //       className: className,
          //       mousedown: this.controler.hoverDown.bind(this.controler, type)
          //     });
          //   }

          //   return null;
          // }))) 

          <ConfigBtn.ConfigBtnWaper
            style={{ left, top }}
            name={name}
            index={index}
            fixedWidth={fixedWidth}
          >
            {/* style={{ width: itemWidth }} */}
            <ul className="functionUL" style={{ width: itemWidth }} >
              {items.map(({ name, type, hidden, current, selected, show, className = type, iconName }, i) => {
                if (hidden !== true) {
                  //判断控件是否在指定条件下显示
                  if (show && !this.controler.isShow(data, show)) {
                    return null;
                  }

                  return (
                    <ConfigBtn.ConfigButton
                      select={selected}
                      key={i}
                      current={current}
                      name={name}
                      type={type}
                      className={className}
                      iconName={iconName}
                      mousedown={this.controler.hoverDown.bind(this.controler, type)}
                    />
                  );
                }

                return null;
              })}
            </ul>
          </ConfigBtn.ConfigBtnWaper>



          : null;
      }

      return null;
    }

    return null;
  }

  /**
   * @method hover 鼠标滑过结构
   * @return {object} 滑过结构
   */
  hover() {
    if (this.state.hover) {
      // return React.createElement("div", {
      //   className: "component-hover"
      // }, this.state.hover.map((data, i) => {
      //   return React.createElement(this.hoverBox, {
      //     key: i,
      //     index: i,
      //     data: data
      //   });
      // }), this.state.hover.map((data, i) => {

      //   // 鼠标移入的结构
      //   return React.createElement(this.hoverBtn, {
      //     key: i,
      //     index: i,
      //     data: data
      //   });
      // }));

      return (
        <div className="component-hover">
          {/* 重复渲染注释一个 */}
          {/* {this.state.hover.map((data, i) => {
            return <this.hoverBox key={i} index={i} data={data} />;
          })} */}
          {this.state.hover.map((data, i) => {
            // 鼠标移入的结构
            return <this.hoverBtn key={i} index={i} data={data} />;
          })}
        </div>
      );

    }

    return null;
  }

}
