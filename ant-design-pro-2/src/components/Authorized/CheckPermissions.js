import React from 'react'
import {CURRENT} from './renderAuthorize'
import PromiseRender from './PromiseRender'

function isPromise(obj){
    return (!!obj &&
    (typeof obj === 'object' || typeof obj === 'function')
        && (typeof obj.then === 'function')
    )
}



/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {

    if(!authority){//路由未拦截的
        return target;
    }
    //权限判断为数组, 包含本地权限
    if(Array.isArray(authority)){
        if(authority.indexOf(currentAuthority) >= 0){
            return target;
        }
        if(Array.isArray(currentAuthority)){//存入权限为数组
            for(let i = 0;i < currentAuthority.length;i++){
                const element = currentAuthority[i];
                if(authority.indexOf(element) >= 0){
                    return target;
                }
            }
        }

        return Exception;
    }
    //路由判断为字符串
    if(typeof authority === 'string'){
        if(authority === currentAuthority){
            return target;
        }


        if(Array.isArray(currentAuthority)){
            for (let i = 0;i < currentAuthority.length;i++){
                const element = currentAuthority[i];
                if(authority === element){
                    return target;
                }
            }
        }

        return Exception;
    }

    //权限判断为Promise
    if(isPromise(authority)){
        return (<PromiseRender ok={target} error={Exception} promise={authority}/>)
    }

    //权限传入function
    if(typeof authority === 'function'){
        try{
            const bool = authority(currentAuthority);
            if(isPromise(bool)){
                return (<PromiseRender ok={target} error={Exception} promise={authority}/>)
            }

            if(bool){
                return target;
            }
            return Exception;

        }catch (error){
            throw error;
        }

    }

    throw new Error('不支持的权限类型');
}

const check = (authority, target, Exception) => {
    return checkPermissions(authority,CURRENT,target,Exception);

}


export default check;