import * as React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'


const stringOrNumber = PropTypes.oneOfType([PropTypes.string,PropTypes.number]);
const objectOrNumber = PropTypes.oneOfType([PropTypes.object,PropTypes.number]);

export interface Colsize{
    span?:number;
    order?:number;
    offset?:number;
    pull?:number;
    push?:number;
}
export  interface ColProps extends React.HTMLAttributes<HTMLDivElement>{
   span?:number;
    order?:number;
    push?:number;
   pull?:number;
   offset?:number;
   xs?:number | Colsize;
   sm?:number | Colsize;
   md?:number | Colsize;
   lg?:number | Colsize;
   xl?:number | Colsize;
   xxl?:number | Colsize;
   prefixCls ?: string;
}
export default class Col extends React.Component<ColProps,{}>{
    static propTypes = {
        span:stringOrNumber,
        className : PropTypes.string,
        children : PropTypes.node,
        order:stringOrNumber,
        push:stringOrNumber,
        pull:stringOrNumber,
        offset:stringOrNumber,
        xs:objectOrNumber,
        sm:objectOrNumber,
        md:objectOrNumber,
        xl:objectOrNumber,
        xxl:objectOrNumber
    }
    render(){
        const props:any = this.props;
        const {
            span,offset,order,push,pull,className,children,prefixCls = 'ant-col',...other
        } = props;
        let sizeClassObj = {};
        ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
            let sizeProps : ColProps = {};
            if(typeof props[size] === 'number'){
                sizeProps.span = props[size];
            }else if(typeof props[size] === 'object'){
                sizeProps = props[size] || {};
            }
            delete other[size];
            sizeClassObj = {
                ...sizeClassObj,
                [`${prefixCls}-${size}-${sizeProps.span}`] : sizeProps.span !== undefined,
                [`${prefixCls}-${size}-order-${sizeProps.order}`] : sizeProps.order || sizeProps.order === 0,
                [`${prefixCls}-${size}-offset-${sizeProps.offset}`] : sizeProps.offset || sizeProps.offset === 0,
                [`${prefixCls}-${size}-push-${sizeProps.push}`] : sizeProps.push || sizeProps.push === 0,
                [`${prefixCls}-${size}-pull-${sizeProps.pull}`] : sizeProps.pull || sizeProps.pull === 0

            }
        })


        const classes = classNames({
            [`${prefixCls}-${span}`] :span !== undefined,
            [`${prefixCls}-order-${order}`] : order,
            [`${prefixCls}-offset-${offset}`] : offset,
            [`${prefixCls}-push-${push}`] : push,
            [`${prefixCls}-pull-${pull}`] : pull
        },className,sizeClassObj);
        return (
            <div {...other} className={classes}>{children}</div>
        )
    }
}


