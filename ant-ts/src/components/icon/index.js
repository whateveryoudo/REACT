/**
 * Created by 13586 on 2018/9/11.
 */
import React from 'react'
import * as allIcons from '@ant-design/icons/lib/dist'
import ReactIcon from '@ant-design/icons-react';
import classNames from 'classnames'
import createFromIconfontCN from './IconFont'
import {svgBaseProps,withThemeSuffix,removeTypeTheme} from './utils'
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';

import '../style/core/index.less'
let dangerousTheme,defaultTheme = 'outlined';
ReactIcon.add(...Object.keys(allIcons).map((key) => allIcons[key]));
//设置多色得默认颜色

setTwoToneColor('#1890ff')


const Icon = (props) => {
    const {
        className,
        type,
        children,
        component : Component,
        theme,
        spin,
        viewBox,
        twoToneColor,
        ...restProps
    } = props;
    let innerNode;
    //外层容器class
    const classStr = classNames({
        [`anticon`] : true,
        [`anticon-${type}`] : Boolean(type)
    },className);
    //svg  class (是否添加旋转动画)
    const svgClassStr = classNames({
        [`anticon-spin`] : !!spin || type === 'loading'
    })
    if(Component){
        const innerSvgProps = {
            ...svgBaseProps,
            className : svgClassStr,
            viewBox
        }
        if(!viewBox){delete innerSvgProps.viewBox}

        innerNode = (
            <Component {...innerSvgProps}>{children}</Component>
        )
    }

    if(children){
        const innerSvgProps = {
            ...svgBaseProps,
            className : svgClassStr
        }
        innerNode = (
            <svg {...innerSvgProps} viewBox={viewBox}>
                {children}
            </svg>
        )
    }
    if(typeof type === 'string'){
        let computedType = type;
        computedType = withThemeSuffix(
            removeTypeTheme(type),
            dangerousTheme || theme || defaultTheme,
        );

        innerNode = (
            <ReactIcon className={svgClassStr}
                        primaryColor={twoToneColor}
                       type={computedType}/>
        )
    }

    return (<i {...restProps} className={classStr}>
        {innerNode}
    </i>)
}
Icon.createFromIconfontCN = createFromIconfontCN;
Icon.setTwoToneColor = setTwoToneColor;
Icon.getTwoToneColor = getTwoToneColor;
export default Icon