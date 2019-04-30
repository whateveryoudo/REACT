import React from 'react'
import DraggableTabsBar from '@/components/draggable-tabs-bar';
import './index.less'
export default class PageTabs extends React.Component {

    render() {
        return (
            <div styleName="root">
                <DraggableTabsBar/>
            </div>
        )
    }
}