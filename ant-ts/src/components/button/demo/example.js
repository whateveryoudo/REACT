/**
 * Created by 13586 on 2018/9/12.
 */
import React from 'react'
import Button from '../index'

export default class Example extends React.Component{
    //不可用状态
    render(){
        return (
            <div>
                <div style={{ padding: '8px 8px 0 8px', background: 'rgb(190, 200, 200)' }}>
                    <Button ghost>Ghost</Button>
                    <Button ghost disabled>Ghost(disabled)</Button>
                </div>
            </div>
        )
    }

}