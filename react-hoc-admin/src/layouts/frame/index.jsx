import React from 'react'
import Helmet from 'react-helmet'
import {connect} from '@/models/index'
import {PAGE_FRAME_LAYOUT} from '@/models/settings'
import PageTabs from '../page-tabs';
import Header from '../header'
import './style.less'
@connect(state => {
    const {title} = state.page;
    const {show : showSide,dragging,collapsed,collapsedWidth,width} = state.side;
    const {tabsShow} = state.settings;
    return {
        title,
        sideWidth : width,
        sideCollapsedWidth : collapsedWidth,
        sideCollapsed : collapsed,
        showSide,
        tabsShow
    }
})
export default class FrameTopSideMenu extends React.Component {
    static defaultProps = {
        layout : PAGE_FRAME_LAYOUT.SIDE_MENU,
        pageHeadFixed : true
    }
    render() {
        let {
            layout,
            showSide,
            sideWidth,
            sideCollapsedWidth,
            pageHeadFixed,
            sideCollapsed,
            tabsShow,
            title
        } = this.props;
        const titleText = title?.text || title;
        const isTopSideMenu = layout === PAGE_FRAME_LAYOUT.TOP_SIDE_MENU;
        const isSideMenu = layout === PAGE_FRAME_LAYOUT.SIDE_MENU;
        const hasSide = isTopSideMenu || isSideMenu;//是否有左侧菜单
        //判断左边宽度
        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;
        sideWidth = showSide ? sideWidth : 0;
        if(!hasSide){
            document.body.style.paddingLeft = '0px';
        }else{
            document.body.style.paddingLeft = `${sideWidth}px`
        }
        const theme = hasSide ? 'dark' : 'default';
        return (
            <div>
                <Helmet
                    title={
                        typeof titleText === 'string' ? titleText : ''
                    }
                />
                <Header
                    theme={(isTopSideMenu || isSideMenu) ? 'default' : 'dark'} //相反
                    layout={layout}/>
                {tabsShow ? <div
                    styleName="page-tabs"
                    style={{left : hasSide ? sideWidth : 0}}
                ><PageTabs/></div> : null}
            </div>
        )
    }
}