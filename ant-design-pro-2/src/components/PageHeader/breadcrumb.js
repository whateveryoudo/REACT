import React,{createElement} from 'react'
import {Breadcrumb} from 'antd'
import {urlToList} from '../_utils/pathTools'
import styles from './index.less'
//https://www.jianshu.com/p/7d2dbfdd1b0f
import pathToRegexp from 'path-to-regexp'

export const getBreadcrumb = (breadcrumbNameMap,url) => {
    let breadcrumb = breadcrumbNameMap[url];

    if(!breadcrumb){
        Object.keys(breadcrumbNameMap).forEach(item => {
            if(pathToRegexp(item).test(url)){
                breadcrumb = breadcrumbNameMap[item];
            }
        })
    }

    return breadcrumb || {};
}
export default class BreadcrumbView extends React.PureComponent{
    state = {
        breadcrumb : null
    }
    componentDidMount(){
        this.getBreadcrumbDom();//获取面包屑映射DOM
    }
    getBreadcrumbDom = () => {
        const breadcrumb = this.conversionBreadcrumbList();
        this.setState({
            breadcrumb
        })
    }
    getBreadcrumbProps = () => {
        const {routes,params,location,breadcrumbNameMap} = this.props;
        return {
            routes,
            params,
            routerLocation : location,
            breadcrumbNameMap
        }
    }
    //传入breadcrumbList
    conversionFromProps = () => {

    }
    conversionBreadcrumbList = () => {
        const {breadcrumbList,breadcrumbSeparator} = this.props;
        const {routes,params,routerLocation,breadcrumbNameMap} = this.getBreadcrumbProps();
        if(breadcrumbList && breadcrumbList.length){
            this.conversionFromProps();
        }
        //传入routes 和 params
        if(routes && params){

        }
        //location生成
        if(routerLocation && routerLocation.pathname){
            return this.conversionFromLocation(routerLocation,breadcrumbNameMap);
        }

        return null;
    }

    conversionFromLocation = (routerLocation,breadcrumbNameMap) => {
        const {breadcrumbSeparator,home,linkElement = 'a',itemRender} = this.props;
        //将url转化为数组
        const pathSpinnets = urlToList(routerLocation.pathname);
        const extraBreadcrumdItems = pathSpinnets.map((url,index) => {
            const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap,url);//当前对应路由参数对象
            if(currentBreadcrumb.inherited){
                return null;
            }
            const isLinkable = index !== pathSpinnets.length - 1 && currentBreadcrumb.component;//最后一级 无法跳转
            const name = itemRender ? itemRender(currentBreadcrumb) : currentBreadcrumb.name;//是否需要处理name(format)
            return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
                <Breadcrumb.Item key={url}>
                    {createElement(
                        isLinkable ? linkElement : 'span',
                        {[linkElement === 'a' ? 'href' : 'to'] : url},
                        name
                    )}
                </Breadcrumb.Item>
            ) : null
        })
        //添加首页
        extraBreadcrumdItems.unshift(
            <Breadcrumb.Item key='home'>
                {createElement(
                    linkElement,
                    {[linkElement === 'a' ? 'href' : 'to'] : '/'},
                    home || 'Home'
                )}
            </Breadcrumb.Item>
        )
        return (
            <Breadcrumb className={styles.breadcrumb} separator={breadcrumbSeparator}>
                {extraBreadcrumdItems}
            </Breadcrumb>
        )
    }
    render(){
        const {breadcrumb} = this.state;
        return breadcrumb;
    }

}