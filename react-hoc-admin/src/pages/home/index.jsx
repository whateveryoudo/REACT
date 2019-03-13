import React from 'react'
import config from '@/commons/config-hoc'
//注意这里path :前面不要空格
@config({
    path: '/',
    title: {local: 'home', text: '首页', icon: 'home'},
})
export default class Home extends React.Component {

    render() {
        return (
            <div>
                我是首页
            </div>
        )
    }
}