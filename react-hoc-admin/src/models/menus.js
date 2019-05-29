/**
 * Created by 13586 on 2019/5/28.
 */
import getMenus from '@/menus'
import {getCurrentLocal} from '@/i18n';
import {getMenuTreeDataAndPermissions} from '../commons'
export default {
    initialState : {

    },
    syncStorage : {

    },

    getMenus : {
        payload : ({params} = {}) => getMenus(params.userId),
        reducer : {
            resolve:(state,{payload : menus}) => {
                //国际化处理
                const i18n = getCurrentLocal();
                const localedMenus = menus.map(item => {
                    const {local} = item;
                    const text = i18n.menu[local]
                    if(text){
                        return {...item,text}
                    }
                    return {...item}
                })

                const {menuTreeData} = getMenuTreeDataAndPermissions(localedMenus);
            }
        }
    }
}