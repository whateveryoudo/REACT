//获取计算高度高阶组件
import React from 'react'

function computeHeight(node) {
    const totalHeight = parseInt(getComputedStyle(node).height,10);

    const padding =
        parseInt(getComputedStyle(node).paddingTop,10) +
        parseInt(getComputedStyle(node).paddingBottom,10);


    return totalHeight - padding;
}

function getAutoHeight(n) {
    if(!n){return 0}
    let node = n;

    let height = computeHeight(node);
    //递归第一个父级元素（含有高度）
    while(!height){
        node = node.parentNode;
        if(node){
            height = computeHeight(node);
        }else{
            break;
        }

    }
    return height;
}

const autoHeight = () => WrappedComponent => {

    return class extends React.Component{
        state = {
            computedHeight : 0
        }

        componentDidMount(){
            const {height} = this.props;
            if(!height){
                this.setState({
                    computedHeight : getAutoHeight(this.root)
                })
            }
           
        }
        render(){
            const {height} = this.props;
            const h = height || this.state.computedHeight;
            return (<div ref={node => {this.root = node}}>
                {h > 0 && (<WrappedComponent {...this.props} height={h}/>)}
            </div>)
        }
    }
}


export default autoHeight