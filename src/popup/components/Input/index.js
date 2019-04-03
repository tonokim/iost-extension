
import React, { Component } from 'react'
import cx from 'classnames'
import style from './style.less'

export default class  extends Component {
  static defaultProps = {
    onChange: () => {}
  }
  constructor(props){
    super(props)
  }

  onChange = (e) => {
    const name = e.target.name, value = e.target.value
    this.props.onChange(value, name)
  }

  render(){
    const { type = 'text', name, placeholder, autoFocus, className, boxClassName, onBlur } = this.props
    if(type == 'textarea'){
      return (
        <div className={cx('input-container', boxClassName)}>
          <textarea 
            name={name} 
            className={className}
            autoComplete="off" 
            onChange={this.onChange} 
            placeholder={placeholder}
            autoFocus={autoFocus}
            onBlur={onBlur}
          />
        </div>
      )
    }
    return(
      <div className={cx('input-container', boxClassName)}>
        <input 
          type={type} 
          name={name} 
          className={className}
          autoComplete="off" 
          onChange={this.onChange} 
          placeholder={placeholder}
          autoFocus={autoFocus}
          onBlur={onBlur}
        />
      </div>
    )
 }
}