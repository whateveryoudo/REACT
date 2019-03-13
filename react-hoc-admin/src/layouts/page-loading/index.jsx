import React from 'react'
import NProgress from 'nprogress'
import {Spin} from "antd";
export default class Index extends React.Component {

    constructor(props){
        super(props);
        NProgress.start();
    }
    componentWillUnmount(){
        NProgress.done();
    }
    render() {
        const style = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }
        return (
            <div style={style}>
                <Spin spinning size="large"/>
            </div>
        )
    }
}