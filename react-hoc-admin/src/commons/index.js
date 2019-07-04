import {convertToTree} from '@/library/utils/tree-utils';

const CURRENT_USER_KEY = 'current-user';

//复合函数方法
export function compose(funcs) {
    if(funcs.length === 0){
        return arg => arg //不传入返回默认的参数值
    }
    if(funcs.length === 1){
        return funcs[0];
    }

    return funcs.reduce((a,b) => (...args) => a(b(...args)));//右->左 依次计算结果作为下一个函数的参数
}

export function loadScript(src) {
    return new Promise((reslove,reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = reslove;
        script.onerror = reject;
        document.head.appendChild(script);
    })
}
export function getLoginUser() {
    const loginUser = sessionStorage.getItem(CURRENT_USER_KEY);
    return loginUser ? JSON.parse(loginUser) : null;
}
export function isAuthenticated(){
    return !!getLoginUser();
}
/**
 * 返回树状结构数据 ， 随菜单带过来的权限
 * @param menus 扁平化数据结构
 */
export function getMenuTreeDataAndPermissions(menus) {
    //？？
    // 用户权限code，通过菜单携带过来的 1 => 菜单 2 => 功能
    const permissions = menus.map(item => {
        if (item.type === '1') return item.key;
        if (item.type === '2') return item.code;
        return null;
    });
    //处理path 带有url 的iframe页面

    menus = menus.map(item =>{
        if(item.url){
            item.path = `/iframe_page_/${window.encodeURIComponent(item.url)}`;
        }

        return item;
    })

    //order排序
    const orderedData = [...menus].sort((a,b) => {
        const aOrder = a.order || 0;
        const bOrder = b.order || 0;
        if(!aOrder && !bOrder){//按照text排序
            return a.text > b.text ? 1 : -1;
        }
        return bOrder - aOrder
    })
    //设置顶级节点的path（取第一个子孙节点的path作为path）

    const findPath = (node) => {
        const children = orderedData.filter(item => item.parentKey === node.key);//找到当前节点下所有的子节点
        let path = '';
        for(let i = 0;i < children.length;i++){
            let child = children[i];
            if(child.path){
                path = child.path;
                break;
            }
            path = findPath(child);//递归查找
        }
        return path;
    }

    orderedData.forEach(item => {
        if(!item.path){
            item.path = findPath(item);
        }
    })

    const menuData = convertToTree(orderedData);
}
