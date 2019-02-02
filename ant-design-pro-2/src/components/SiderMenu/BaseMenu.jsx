import React from 'react'
import {Menu,Icon} from 'antd'
import Link from 'umi/link'
import styles from './index.less'
import pathToRegexp from 'path-to-regexp';
import {urlToList} from '../_utils/pathTools'
const {SubMenu} = Menu;

//获取	子菜单项值

const getIcon = icon => {
    if(typeof icon === 'string' && icon.indexOf('http') === 0){//图片
        return <img src={icon}  alt="icon" className={styles.icon}/>
    }

    if(typeof icon === 'string'){//icon组件
        return <Icon type={icon}/>
    }

    return icon;
}


export const getMenuMatches = (flatMenuKeys,path) => {
   return flatMenuKeys.filter(item => {
       if(item){
           return pathToRegexp(item).test(path);
       }
       return false;
   })
}
export default class BaseMenu extends React.Component {



    //获取子节点（递归获取子节点）
    getNavMenuItems = (menuData) => {
        if(!menuData){return []}
        return menuData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => {
                const ItemDom = this.getSubMenuOrItem(item);
                return this.checkPermissionItem(item.authority,ItemDom);//菜单权限拦截
            })
            .filter(item => item);
    }
    checkPermissionItem = (authority,ItemDom) => {
        const {Authorized} = this.props;
        if(Authorized && Authorized.check){
            const {check} = Authorized;

            return check(authority,ItemDom);
        }

        return ItemDom;
    }
    //子节点判断
    getSubMenuOrItem = item => {
        if(item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)){//含有子项 并且 hideChildrenInMenu 不为true
            const {name} = item;
            return (
                <SubMenu
                    key = {item.path}
                    title={item.icon ? (
                        <span>
                            {getIcon(item.icon)}
                            <span>{name}</span>
                        </span>
                    ) : (name)}
                >
                    {this.getNavMenuItems(item.children)}
                </SubMenu>
            )
        }

        //无下级

        return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    }
    //路径转化
    conversionPath = path => {
        if(path && path.indexOf('http') === 0){
            return path;
        }
        return `/${path || ''}`.replace(/\/+/g,'/');//??
    }
    //判断返回的是  a / link
    getMenuItemPath = item => {
        const {name} = item;
        const itemPath = this.conversionPath(item.path);

        const icon = getIcon(item.icon);

        const {target} = item;
        if(/^https?:\/\//.test(itemPath)){//http 链接
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            )
        }

        return (
            <Link to={itemPath}>
                {icon}
                <span>{name}</span>
            </Link>
        )

    }
    //
    getSelectedMenuKeys = pathname => {
        const {flatMenuKeys} = this.props;
        return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys,itemPath).pop())
    }
    render() {
        const {
            handleOpenChange,menuData,openKeys,
            mode,theme,location : {pathname}
        } = this.props;
        let selectedKeys = this.getSelectedMenuKeys(pathname);
        if(!selectedKeys.length && openKeys){
            selectedKeys = [openKeys[openKeys.length - 1]]
        }
        let props = {};
        if(openKeys){
            props = {openKeys}
        }

        return (
            <Menu
                onOpenChange={handleOpenChange}
                selectedKeys={selectedKeys}
                mode={mode} theme={theme} {...props}>
                {this.getNavMenuItems(menuData)}
            </Menu>
        )
    }
}