import React from 'react';
import Widget from '@/system/widgets/widget';

/**
 * @class {Radius} 圆角视图类
 */

class Radius extends React.Component {
  constructor(props) {
    /**@property controler 边框控制器实例 */
    super(props);
  }

  /**
   * @method render 组件渲染方法
   * @return {object} 待渲染的组件对象
   */

  render() {
    const { list, state: {
      values,
      isLocking
    } } = this.props;
    return (
      <div className='desgin-border-radius'>
        {
          list.map((e, i) => {
            return (
              <div className={`borderRadius${e}`} key={i}>
                <Widget.Range
                  id={`borderRadius${e}`}
                  max={100}
                  value={values[i]}
                  unit='px'
                  change={(event) => this.props.value(i,event)} // 这里可能有bug 需要执行看一下
                />
              </div>
            )
          })
        }
        <div className="borderRa">
          {
            list.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`bRa${e}`}
                  style={{
                    [`border${e}Radius`]: `${values[i]}px`
                  }}
                ></div>
              )
            })
          }
          <p className={`radiusLink${isLocking ? ' on' : ''}`}>
            <label className='iconfont'>
              <input 
                type="checkbox" 
                value="locking" 
                checked={isLocking ? 'checked' : ''} 
                onChange={() => this.props.locking()}
              />
              {isLocking? '' : ''}
            </label>
          </p>
        </div>
      </div>
    )
  }
}

export { Radius }
