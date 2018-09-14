import React from 'react'
import Button from '../index'
export default class Basic extends React.Component{
    //两个汉字添加空格
    render(){
        return (
            <div>
                <Button type="primary"><a href="#">测试</a></Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
            </div>
        )
    }

}