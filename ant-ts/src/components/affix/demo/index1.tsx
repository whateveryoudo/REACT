import * as React from 'react'
import addEventListener from 'rc-util/lib/Dom/addEventListener'
import getScroll from '../_util/getScroll'
function getDefaultTarget(){
    return typeof window !== 'undefined' ? window : null;
}

function getTargetRect(target:HTMLElement | Window | null):ClientRect{
    return target !== window ?
        (target as HTMLElement).getBoundingClientRect() :
        {top : 0,left : 0,bottom : 0} as ClientRect;
}

function getOffset(element:HTMLElement,target : HTMLElement | Window | null){
    const elemRect = element.getBoundingClientRect();
    const targetRect = getTargetRect(target);

    const scrollTop = getScroll(target,true);
    const scrollLeft = getScroll(target,false);

    const docElem = window.document.body;
    //body的边框宽度

    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
        top : elemRect.top - targetRect.top + scrollTop - clientTop,
        left : elemRect.left - targetRect.left + scrollLeft - clientLeft,
        width : elemRect.width,
        height : elemRect.height
    }

}
//props
export interface AffixProps{
    //距离窗口顶部偏移量多少是触发
    offsetTop?:number;
    offset?:number;
    //距离窗口底部偏移量多少是触发
    offsetBottom?:number;
    style?:React.CSSProperties;
    //固定状态改变的回掉
    onChange?:(Affix?:Boolean) => void;

    target?:Window | HTMLDivElement | null
    prefixCls ?: string
}

export interface AffixState{
    affixStyle : React.CSSProperties | undefined,
    placeholderStyle : React.CSSProperties | undefined
}
export default class Affix extends React.Component<AffixProps,AffixState>{
    timeout:any;

    //事件类型
    events = [
        'resize',
        'scroll',
        'touchstart',
        'touchmove',
        'touchend',
        'pageshow',
        'load'
    ]
    eventHandlers : {
        [key : string] : any
    } = {};
    state:AffixState = {
        affixStyle : undefined,
        placeholderStyle : undefined
    }
    componentDidMount(){
        const target = this.props.target || getDefaultTarget;
        this.timeout = setTimeout(() => {
            this.setTargetEventListeners(target);
        })
    }
    updatePosition(e:any){
        let {offsetTop,offsetBottom,offset,target = getDefaultTarget} = this.props;

        const targetNode = target();

        offsetTop = typeof offsetTop === 'undefined' ? offsetTop : offset;

        const scrollTop = getScroll(targetNode,true);
        const affixNode = React.findDOMNode(this) as HTMLElement;
        const elemOffset = getOffset(affixNode,targetNode);//获取触发元素距离目标元素的 top  left 触发元素的width  height



    }
    setTargetEventListeners(getTarget:() => HTMLElement | Window | null){
        const target = getTarget();
        if(!target){return}

        this.clearEventListeners();

        this.events.forEach(eventName => {
            this.eventHandlers[eventName] = addEventListener(target,eventName,this.updatePosition)
        })
    }
    clearEventListeners(){
        this.events.foeEach(eventName => {
            const handler = this.eventHandlers[eventName];
            if(handler && handler.remove){
                handler.remove();
            }
        })
    }
    render(){
        return (<div>测试affix</div>)
    }
}