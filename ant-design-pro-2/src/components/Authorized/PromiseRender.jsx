import React from 'react'

import {Spin} from 'antd'

export default class PromiseRender extends React.PureComponent {
    state = {
        component : null
    }
    componentDidMount(){
        this.setRenderComponent(this.props);
    }

    setRenderComponent(props){
        const ok = this.checkIsInstantiation(props.ok);
        const error = this.checkIsInstantiation(props.error);

        props.promise
            .then(() =>{
                this.setState({
                    component : ok
                })
            })
            .catch(() =>{
                this.setState({
                    component : error
                })
            })

    }
    //确认是否实例化??
    checkIsInstantiation = target => {
        if (!React.isValidElement(target)) {
            return target;
        }
        return () => target;
    };
    render() {
        const {component : Component} = this.state;
        const {ok,error,promise,...rest} = this.props;
        return Component ? (
            <Component {...rest}/>
        ) : (
            <div style={{width : '100%',height:'100%',paddingTop:50,textAlign:'center'}}>
                <Spin size="large"/>
            </div>
        )
    }
}