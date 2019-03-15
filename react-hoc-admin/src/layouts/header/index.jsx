import React from 'react'
import './styles.less'
import {
    Icon
} from 'antd'
import {Link} from 'react-router-dom'
import {connect} from '../../models/index'
import {PAGE_FRAME_LAYOUT} from '@/models/settings'
import Logo from '../logo'
import Breadcrumb from '../breadcrumb'


@connect(state => {
    const {show : showSide,collapsed,width,dragging,collapsedWidth} = state.side;
    const {breadcrumbs} = state.page;
    return {
        sideCollapsedWidth : collapsedWidth,
        sideWidth : width,
        sideCollapsed: collapsed,
        breadcrumbs
    }
})
export default class Header extends React.Component {
    static defaultProps = {
        layout: PAGE_FRAME_LAYOUT.SIDE_MENU
    }
    render() {

        let {
            layout,
            sideCollapsedWidth,
            sideWidth,
            sideCollapsed,
            breadcrumbs
        } = this.props;

        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;

        const isTopSideMenu = layout === PAGE_FRAME_LAYOUT.TOP_SIDE_MENU;
        const isSideMenu = layout === PAGE_FRAME_LAYOUT.SIDE_MENU;
        const isTopMenu = layout === PAGE_FRAME_LAYOUT.TOP_MENU;

        const showToggle = isTopSideMenu || isSideMenu;//是否有侧边菜单
        return (
            <div styleName="header">
                <div styleName="logo" style={{flex : `0 0 ${sideWidth}px`}}>
                    <Link to="/" >
                        <Logo
                            min={sideCollapsed}
                            title={'test demo'}
                        />
                    </Link>
                </div>
                {showToggle ? (
                    <Icon
                        className="header-trigger"
                        styleName="trigger"
                        type={sideCollapsed ? 'menu-unfold' : 'menu-fold'}
                    />
                ) : null}
                {isSideMenu ? (
                    <div style={{marginLeft:16}}>
                        <Breadcrumb dataSource={breadcrumbs}/>
                    </div>
                ) : null}
            </div>
        )
    }
}