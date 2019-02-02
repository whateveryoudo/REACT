import React from 'react'
import {yuan} from '@/components/Charts'

export default class Yuan  extends React.PureComponent{
    componentDidMount(){
        this.renderToHtml();
    }
    componentDidUpdate(){
        this.renderToHtml();
    }
    renderToHtml = () => {
        const {children} = this.props;

        this.main.innerHTML = yuan(children);
    }
    render(){
        return (
            <span ref={node => this.main = node}/>
        )
    }
}


