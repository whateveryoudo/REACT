import React from 'react'
import config from '@/commons/config-hoc'

//chokidar 监听 变化 写入 page-routes.js中
@config({
    path: '/iframe_page_/:src',
    keepAlive: true,
})
export default class IFrame extends React.Component {

    render() {
        return (
            <div>
                iframe界面
            </div>
        )
    }
}