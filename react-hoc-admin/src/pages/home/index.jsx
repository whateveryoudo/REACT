import React from 'react'
import config from '@/commons/config-hoc'
import {Button} from 'antd'
//注意这里path :前面不要空格
@config({
    path: '/',
    title: {local: 'home', text: '首页', icon: 'home'},
    breadcrumbs : [{key : 'home',text : '首页',local : 'home',icon : 'home'}]
})
export default class Home extends React.Component {

    render() {
        return (
            <div style={{marginTop:100}}>

                我是首页

                <Button type="primary">普通按钮</Button>
            </div>
        )
    }
}