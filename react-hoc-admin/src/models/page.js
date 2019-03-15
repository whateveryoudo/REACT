import {getCurrentLocal} from '@/i18n'
export default {
    initialState : {
        title : '',//{local, text, icon} 支持国际化
        breadcrumbs : []
    },
    setTitle : (title) => {
        return {title}
    },
    //设置面包屑数据
    setBreadcrumbs : (breadcrumbs) => {
        //获取多语言
        const local = getCurrentLocal();
        if(breadcrumbs && breadcrumbs.length){
            breadcrumbs.forEach(item => {
                if(item.local){
                    let text = local.menu[item.local];
                    if(text){
                        item.text = text;
                    }
                }
            })
        }

        return {breadcrumbs}
    },
    //追加面包屑参数
    appendBreadcrumbs : (appendBreadcrumbs,state) => {
        let {breadcrumbs = []} = state;
        breadcrumbs = breadcrumbs.concat(appendBreadcrumbs);

        return {breadcrumbs}
    }
}