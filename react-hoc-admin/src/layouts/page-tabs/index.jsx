import React from 'react'
import DraggableTabsBar from '@/components/draggable-tabs-bar';
import config from '@/commons/config-hoc';
import {
    Icon
} from 'antd'
import './index.less'


@config({
    router:true,
    connect: state => ({
        dataSource : state.system.tabs
    })
})
export default class PageTabs extends React.Component {

    render() {
        const {dataSource} = this.props;
        //处理tabs源(处理title显示)
        const tabsBarDataSource = dataSource.map(item => {
            let {text : tabTitle,path,icon} = item;
            let title = tabTitle;


            if(typeof tabTitle === 'object' && tabTitle.text){
                title = tabTitle.text;
            }

            if(tabTitle?.icon){
                icon = tabTitle.icon
            }

            if(icon){
                title = (<span><Icon type={icon} style={{marginRight:4}}/>{title}</span>)
            }

            return {
                key : path,
                title,
                closeable : true,
                ...item
            }

        })
        return (
            <div styleName="root">
                <DraggableTabsBar
                    dataSource={tabsBarDataSource}
                />
            </div>
        )
    }
}