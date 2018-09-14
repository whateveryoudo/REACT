/**
 * Created by 13586 on 2018/9/13.
 */


let enquire : any;


if(typeof window !== 'undefined'){
    enquire = require('enquire.js');
}

import * as React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Partial<Record<Breakpoint,string>>;

export interface RowProps extends React.HTMLAttributes<HTMLDivElement>{
    gutter?:number | Partial<Record<Breakpoint,number>>;
    type?:'flex';
    align?:'top' | 'middle' | 'bottom';
    justify ?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    prefixCls?:string
}
export interface RowState{
    screens : BreakpointMap;
}

const responsiveArray:Breakpoint[] = ['xxl','xl','lg','md','sm','xs'];
//响应式对象
const responsiveMap:BreakpointMap = {
    xs : '(max-width : 575px)',
    sm : '(min-width : 576px)',
    md : '(min-width : 768px)',
    lg : '(min-width : 992px)',
    xl : '(min-width : 1200px)',
    xxl : '(min-width : 1600px)',
}
export default class Row extends React.Component<RowProps,RowState>{

    static defaultProps = {gutter : 0};

    state:RowState = {
        screens : {}
    }

    static propTypes = {
        type : PropTypes.string,
        align : PropTypes.string,
        justify : PropTypes.string,
        className : PropTypes.string,
        children : PropTypes.node,
        gutter : PropTypes.oneOfType([PropTypes.object,PropTypes.number]),
        prefixCls : PropTypes.string
    }
    componetDidMount(){
        Object.keys(responsiveMap).
            map((screen : Breakpoint) => enquire.register(responsiveMap[screen],{
            // 当媒体查询与上述匹配时 响应
                match : () => {
                    if(typeof this.props.gutter !== 'object'){return};
                    this.setState((prevState) => ({
                        screens: {
                            ...prevState.screens,
                            [screen] : true
                        }
                    }))
                },
            // 当窗口从匹配调整到不匹配以后的响应
                unmatch : () => {
                    if(typeof this.props.gutter !== 'object'){return};
                    this.setState((prevState) => ({
                        screens: {
                            ...prevState.screens,
                            [screen] : false
                        }
                    }))
                },
                destroy() {},
            })
        )
    }
    getGutter(){
        const {gutter} = this.props;
        //根据当前屏幕选择适合的gutter,设置合适样式
        if(typeof gutter === 'object'){
            for(let i = 0;i < responsiveArray.length;i++){
                const breakPoint:Breakpoint = responsiveArray[i];

                if(this.state.screens[breakPoint] && gutter[breakPoint] !== undefined){
                    return gutter[breakPoint];
                }
            }
        }
        return gutter;
    }
    render(){

        const {
            type,justify,align,className,style,children,prefixCls = 'ant-row',...others
        } = this.props;

        const gutter = this.getGutter();
        //传入prop生成对应的class
        const classes = classNames({
            [prefixCls] : !type,
            [`${prefixCls}-${type}`] : type,
            [`${prefixCls}-${type}-${justify}`] : type && justify,
            [`${prefixCls}-${type}-${align}`] : type && align
        },className)
        //设置行样式(含有值 添加样式)
        const rowStyle = (gutter as number) > 0 ?
            {
                marginLeft : (gutter as number) / -2,
                marginRight : (gutter as number) / -2,
                ...style
            } : style;

        //处理子项（追加间隔）
        const cols = React.Children.map(children,(col : React.ReactElement<HTMLDivElement>) => {
            if(!col){return null};
            if(col.props && (gutter as number) > 0){
                return React.cloneElement(col,{
                    style : {
                        paddingLeft : (gutter as number) / 2,
                        paddingRight : (gutter as number) / 2,
                        ...col.props.style
                    }
                })
            }
            return col;
        })
        const copyProps = {...others};
        delete copyProps.gutter;
        return (
            <div {...copyProps} className={classes} style={rowStyle}>{cols}</div>
        )
    }
}