import React from 'react'
import Icon from '../index'
export default class Basic extends React.Component{
    render(){
        return (
            <div className="icons-list">
                <Icon type="home" />
                <Icon type="setting" theme="filled" />
                <Icon type="smile" theme="outlined" />
                <Icon type="sync" spin />
                <Icon type="loading" />
            </div>
        )
    }

}