import React from 'react'
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
    const {menuData} = props;
    return (
        <SiderMenu {...props} flatMenuKeys={getFlatMenuKeys(menuData)}/>
    )
}

export default SiderMenuWrapper;