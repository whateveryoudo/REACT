import React from 'react'
import {Drawer} from 'antd'
import SiderMenu from './SiderMenu'
//递归获取所有的path

// { path : aa,children : [{path : bb}]} => ['aa','bb']
export const getFlatMenuKeys = menuData => {
    let keys = [];
    menuData.forEach(item => {
        keys.push(item.path);
        if(item.children){
            keys = keys.concat(getFlatMenuKeys(item.children));
        }
    })

    return keys;
}

const SiderMenuWrapper = props  => {
    const {menuData,isMobile,collapsed,onCollapse} = props;
    return isMobile ? (
        <Drawer
            visible={!collapsed}
            placement="left"
            onClose={() =>onCollapse(true)}
            style={{padding:0,height:'100vh'}}
        >
            <SiderMenu
                {...props}
                flatMenuKeys={getFlatMenuKeys(menuData)}
                collapsed={isMobile ? false : collapsed}
            />
        </Drawer>
    ) : (
        <SiderMenu {...props} flatMenuKeys={getFlatMenuKeys(menuData)}/>
    )
}

export default SiderMenuWrapper;