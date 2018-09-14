import React from 'react'
import Button from '../index'
export default class Basic extends React.Component{
    //带有图标得按钮
    render(){
        return (
            <div>
               <Button type="primary" shape="circle" icon="search"/>
                <Button type="primary" icon="search">Search</Button>
                <Button shape="circle" icon="search" />
                <Button icon="search">Search</Button>
                <br/>
                <Button type="dashed" shape="circle" icon="search" />
                <Button type="dashed" icon="search">Search</Button>
            </div>
        )
    }

}