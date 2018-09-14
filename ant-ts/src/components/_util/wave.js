//点击得波浪效果
import * as React from 'react'
import {findDOMNode} from 'react-dom';
import TransitionEvents from 'css-animation/lib/Event'

let styleForPesudo = null;//动态style元素
export default class Wave extends React.Component{
    constructor(props){
        super(props);
        this.instance = null;
        this.extraNode = null;
        this.clickWaveTimeoutId = undefined;
    }
    getAttributeName (){
        return this.props.insertExtraNode ? 'ant-click-animating' : 'ant-click-animating-without-extra-node'
    }
    isNotGrey(color){//???
        const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
        if (match && match[1] && match[2] && match[3]) {
            return !(match[1] === match[2] && match[2] === match[3]);
        }
        return true;
    }
    onClick = (node,waveColor) => {
        if (node.className.indexOf('-leave') >= 0) {
            return;
        }
        const {insertExtraNode} = this.props;//是否追加额外元素??
        this.extraNode = document.createElement('div');
        const extraNode = this.extraNode;
        const attributeName = this.getAttributeName();//判断添加的属性名
        node.removeAttribute(attributeName);

        node.setAttribute(attributeName,'true');
        styleForPesudo = styleForPesudo || document.createElement('style');

        //设置style内容(正则匹配不清楚)
        if(waveColor &&
            waveColor !== '#ffffff' &&
            waveColor !== 'rgb(255, 255, 255)' &&
            this.isNotGrey(waveColor) &&
            !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) &&
                waveColor !== 'transparent'){
            extraNode.style.borderColor = waveColor;
            styleForPesudo.innerHTML =
                `[ant-click-animating-without-extra-node]:after { border-color: ${waveColor}; }`;

            if(!document.body.contains(styleForPesudo)){
                document.body.appendChild(styleForPesudo);
            }
        }

        if(insertExtraNode){node.appendChild(insertExtraNode)}

        TransitionEvents.addEndEventListener(node,this.onTransitionEnd)

    }
    //重置
    resetEffect(node){
        if(!node || node === this.extraNode){
            return;
        }

        const {insertExtraNode} = this.props;

        const attributeName = this.getAttributeName();
        node.removeAttribute(attributeName);
        if(styleForPesudo){styleForPesudo.innerHTML = ''};//清空style
        if(insertExtraNode && this.extraNode && node.contains(this.extraNode)){
            node.removeChild(this.extraNode);//移除添加的额外元素
        }
        TransitionEvents.removeEndEventListener(node,this.onTransitionEnd);
    }
    onTransitionEnd = (e) => {
        if(!e || e.animationName !== 'fadeEffect'){return}
        this.resetEffect(e.target);
    }
    bindAnimationEvent = node => {
        if(!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0){
            return;
        }
        this.resetEffect(node);
        const onClick = (e) => {
            if(e.target.targetName === 'INPUT'){return};
            const waveColor =
                getComputedStyle(node).getPropertyValue('border-top-color') ||
                getComputedStyle(node).getPropertyValue('border-color') ||
                getComputedStyle(node).getPropertyValue('background-color');
            this.clickWaveTimeoutId = window.setTimeout(this.onClick(node,waveColor),0)

        }


        node.addEventListener('click',onClick,true);
        return {
            cancel: () => {
                node.removeEventListener('click', onClick, true);
            }
        }
    }

    componentDidMount(){
        this.instance = this.bindAnimationEvent(findDOMNode(this))
    }
    componentWillUnmount(){
        if(this.instance){
            this.instance.cancel();
        }
        if(this.clickWaveTimeoutId){
            clearTimeout(this.clickWaveTimeoutId)
        }
    }
    render(){
        return this.props.children;
    }
}
