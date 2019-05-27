import React from 'react'
import DraggableTabsBar from '@/components/draggable-tabs-bar';
import ContextMenu from '@/components/context-menu';

import config from '@/commons/config-hoc';
import {
    Icon,
    Menu
} from 'antd'
import './index.less'

const MenuItem = Menu.Item;
@config({
    router:true,
    connect: state => ({
        dataSource : state.system.tabs,
        local : state.system.i18n.tabs
    })
})
export default class PageTabs extends React.Component {
    state = {
        contextVisible : false,
        contextEvent : null,
        contextMenu : ''
    }
    handleRightClick = (e,item) => {
        e.preventDefault();

        const contextMenu = this.renderContextMenu(item);

        this.setState({
            contextEvent:{clientX : e.clientX,clientY : e.clientY},
            contextMenu,
            contextVisible : true
        })
    }
    renderContextMenu = (tab) => {
        //判断条件
        const {local,dataSource} = this.props;
        const tabIndex = dataSource.findIndex(item => item.path === tab.path);
        const disabledClose = dataSource.length === 1;
        const disabledLeftClose = tabIndex === 0;
        const disabledRightClose = tabIndex === dataSource.length - 1;

        return (
            <Menu selectable={false} onclick={({key : action}) => this.handleMenuClick(action,tab.path)}>
                <MenuItem key="refresh">
                    <Icon type="sync"/>{local.refresh}
                </MenuItem>
                <MenuItem key="refreshAll">
                    <Icon type="sync"/>{local.refreshAll}
                </MenuItem>
                <Menu.Divider/>
                <MenuItem key='close'>
                    <Icon type="close"/>{local.close}
                </MenuItem>
                <MenuItem key="closeOthers" disabled={disabledClose}>
                    <Icon type='close-circle'/>{local.closeOthers}
                </MenuItem>
                <MenuItem key="closeAll" disabled={disabledClose}>
                    <Icon type="close-square"/>{local.closeAll}
                </MenuItem>
                <MenuItem key="closeLeft" disabled={disabledLeftClose}>
                    <Icon type="vertical-left"/>{local.closeLeft}
                </MenuItem>
                <MenuItem key="closeRight" disabled={disabledRightClose}>
                    <Icon type="vertical-left"/>{local.closeRight}
                </MenuItem>
            </Menu>
        )
    }
    handleMenuClick = (action,targetPath) => {

    }
    handleSortEnd = ({oldIndex,newIndex}) => {
        const dataSource = [...this.props.dataSource];

        dataSource.splice(newIndex,0,dataSource.splice(oldIndex,1)[0]);//元素移动

        this.props.action.system.setTabs(dataSource);
    }
    handleClose = (item) => {
        const {path : targetPath} = item;
        this.props.actions.system.closeTab(targetPath);
    }
    handleClick = (item) => {
        //处理iframe地址
        const separator = '/iframe_page_/';
        let path = item.path;
        if(path.indexOf(separator) !== -1){
            const url = window.encodeURIComponent(path.split(separator)[1]);
            path = `${separator}${url}`
        }

        this.props.history.push(path);
    }
    render() {
        const {dataSource} = this.props;
        const {contextVisible,contextEvent,contextMenu} = this.state;
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
                <ContextMenu
                    visible={contextVisible}
                    content={contextMenu}
                    event={contextEvent}
                    onChange={(contextVisible) => this.setState({contextVisible})}
                />

                <DraggableTabsBar
                    onSortEnd={this.handleSortEnd}
                    dataSource={tabsBarDataSource}
                    onClose={this.handleClose}
                    onClick={this.handleClick}
                    itemWrapper={(itemJsx, item, wrapperClassName) => {
                        return (
                            <div
                                className={wrapperClassName}
                                onContextMenu={e => this.handleRightClick(e,item)}
                            >
                                {itemJsx}
                            </div>
                        )
                    }}
                />
            </div>
        )
    }
}