/**
 * Created by 13586 on 2018/11/22.
 */
//保存用户权限

export function setAuthority(authority) {
    const proAuthority = typeof authority === 'string' ? [authority] : authority;

    return localStorage.setItem('antd-pro-authority',JSON.stringify(proAuthority));
}