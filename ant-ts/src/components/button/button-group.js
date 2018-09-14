/**
 * Created by 13586 on 2018/9/11.
 */
import React from 'react'
import Icon from '../icon'
import classNames from 'classnames'

const ButtonGroup = (props) => {
    const { prefixCls = 'ant-btn-group',size,className,...others} = props;

    let sizeCls = '';

    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
        default:
            break;
    }

    const classes = classNames(prefixCls,{
        [`${prefixCls}-${sizeCls}`] : sizeCls
    },className);
    // return <div {...others} className={classes}>{children}</div>
    return <div {...others} className={classes}/>
}

export default ButtonGroup;