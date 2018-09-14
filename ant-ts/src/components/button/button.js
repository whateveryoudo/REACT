/**
 * Created by 13586 on 2018/9/11.
 */
import React from 'react'
import Icon from '../icon'
import classNames from 'classnames'
import Wave from '../_util/wave'

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;//两个汉字
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}
function insertSpace(child,needInserted) {
    if(child === null){return}

    const SPACE = needInserted ? ' ' : '';
    if(typeof child !== 'string' && typeof child !== 'number' &&
    isString(child.type) && isTwoCNChar(child.props.children)){
        return React.cloneElement(child,{},

        child.props.children.split('').join(SPACE));
    }


    if(typeof child === 'string'){
        if(isTwoCNChar(child)){
            child = child.split('').join(SPACE);
        }
        return (<span>{child}</span>)
    }


    return child;
}

export default class Button extends React.Component{
    static defaultProps = {
        prefixCls : 'ant-btn'
    }
    //当子元素个数为1 且 icon不存在时
    isNeedInserted(){
        const {icon,children} = this.props;
        return React.Children.count(children) === 1 && !icon;
    }

    render(){
        const {type,size,children,className,prefixCls,ghost,shape,loading,icon,...rest} = this.props;
        const iconType = loading ? 'loading' : icon;
        //规格大小
        let sizeCls = size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'small';
        //class生成

        const classes = classNames(prefixCls,className,{
            [`${prefixCls}-${type}`] : type,
            [`${prefixCls}-${shape}`] : shape,
            [`${prefixCls}-${sizeCls}`] : sizeCls,
            [`${prefixCls}-background-ghost`]: ghost,
        })

        const iconNode = iconType ? <Icon type={iconType}/> : null;
        const kids = (children || children === 0) ?
            React.Children.map(children,child => insertSpace(child,this.isNeedInserted())) : null;
        //点击波浪效果
        return (
            <Wave >
                <button
                    {...rest}
                    className={classes}>
                    {iconNode}{kids}
                </button>
            </Wave>
        )
    }
}