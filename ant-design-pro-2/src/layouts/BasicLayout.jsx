import React from 'react'
import DocumentTitle from 'react-document-title';
import {Layout} from 'antd'
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';//当屏幕的宽度在不同的范围内时，都会执行一次。当屏幕宽度在400和599之间时，params的值(暂时不加)


//https://segmentfault.com/a/1190000015301672(参考)
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';



import {formatMessage} from 'umi/locale'
import {enquireScreen,unenquireScreen} from 'enquire-js'
import logo from '../assets/logo.svg';
import Context from './MenuContext'
import Header from './Header';
import Footer from './Footer';
import SettingDrawer from "@/components/SettingDrawer";
import SiderMenu from '@/components/SiderMenu'
import Authorized from '@/components/Authorized'

const Content = Layout.Content;
const memoizedMapRoutesToMenu = memoizeOne(mapRoutesToMenu, isEqual);
//递归遍历处理数据
function mapRoutesToMenu(routes,parentAuthority,parentName) {
    return routes.map(item => {
        if(!item.name || !item.path){
            return null;
        }
        //添加 语言 id
        let locale = 'menu';
        if(parentName){
            locale = `${parentName}.${item.name}`;
        }else{
            locale = `menu.${item.name}`;
        }

        const result = {
            ...item,
            name : formatMessage({id : locale,defaultMessage: item.name}),
            locale,
            authority : item.authority || parentAuthority
        }

        if(item.routes){
            const children = mapRoutesToMenu(item.routes,item.authority,locale);

            result.children = children;
        }

        delete result.routes;

        return result;
    }).filter(item => item);//去掉数组中的空项
}

@connect(({global,setting}) => {
    return {
        collapsed : global.collapsed,
        layout : setting.layout,
        ...setting
    }
})
export default class BasicLayout extends React.Component {
    constructor(props){
        super(props);
        this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap,isEqual);
        this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    }
    state = {
        rendering : false,
        isMobile : false,
        menuData : this.getMenuData()
    }
    componentDidMount(){
        const {dispatch} = this.props;
        //获取当前登录的用户信息
        dispatch({
            type : 'user/fetchCurrent'
        })

        //根据url参数更新界面配置

        dispatch({
            type : 'setting/getSettings'
        });
        //判断是否是手机端
        this.enquireHandler = enquireScreen(mobile => {
            const {isMobile} = this.state;
            if(isMobile !== mobile){
                this.setState({
                    isMobile : mobile
                })
            }
        })
    }
    componentWillUnmount(){
        unenquireScreen(this.enquireHandler);
    }
    getMenuData(){
        const {
            route : {routes,authority}
        } = this.props;
        return memoizedMapRoutesToMenu(routes,authority);

    }
    //获取面包屑配置(数组=> path为key的对象)

    getBreadcrumbNameMap(){
        const routerMap = {};
        const flattenMenuData = data => {
            data.forEach(menuItem => {
                if(menuItem.children){
                    flattenMenuData(menuItem.children);
                }

                routerMap[menuItem.path] = menuItem
            })
        }

        flattenMenuData(this.getMenuData());
        return routerMap;
    }
    getContext = () => {
        const {location} = this.props;
        return {
            location,//当前地址
            breadcrumbNameMap : this.breadcrumbNameMap //面包屑
        }
    }
    matchParamsPath = pathname => {
        const pathKey = Object.keys(this.breadcrumbNameMap).find(key => {
            return pathToRegexp(key).test(pathname);
        })

        return this.breadcrumbNameMap[pathKey];
    }
    //获取当前界面对应的title
    getPageTitle = (pathname) => {
        const currentRouterData = this.matchParamsPath(pathname);

        if(!currentRouterData){
            return 'Ant Design Pro 2'
        }
        console.log(currentRouterData.locale);
        const pageName = formatMessage({
            id : currentRouterData.locale || currentRouterData.name,
            defaultMessage : currentRouterData.name
        })

        return `${pageName} - Ant Design Pro2`;
    }
    //获取右边区域样式
    getLayoutStyle = () => {
        const {isMobile} = this.state;
        const {collapsed,fixSiderbar,layout} = this.props;

        if(fixSiderbar && layout !== 'topMenu' && !isMobile){
            return {
                paddingLeft : collapsed ? '80px' : '256px'
            }
        }

        return null;
    }
    //右边区域内容区域样式
    getContentStyle = () => {
        const {fixedHeader} = this.props;
        return {
            margin : '24px 24px 0',
            paddingTop : fixedHeader ? 64 : 0
        }
    }
    //左侧菜单收起/展开
    handleMenuCollapse = collapsed => {
        const {dispatch} = this.props;
        dispatch({
            type : 'global/changeLayoutCollapsed',
            payload : collapsed
        })
    }
    //渲染右侧设置slider
    renderSettingsDrawer(){
        const {rendering} = this.state;
        //未加环境变量判断
        return <SettingDrawer/>;
    }
    render() {
        const {
            layout : PropsLayout,
            children,
            navTheme,
            location : {pathname}
        } = this.props;
        const {menuData,isMobile} = this.state;
        const isTop = PropsLayout === 'topmenu';
        console.log(menuData);
        const layout = (
            <Layout>
                {isTop && !isMobile ? null : (
                    <SiderMenu
                    logo={logo}
                    theme={navTheme}
                    Authorized={Authorized}
                    menuData={menuData}
                    {...this.props}/>
                )}
                {/*右侧内容区*/}
                <Layout style={{
                    ...this.getLayoutStyle(),
                    minHeight : '100vh'
                }}>
                    <Header
                        handleMenuCollapse={this.handleMenuCollapse}
                        logo={logo}
                        isMobile={isMobile}
                        menuData={menuData}
                        {...this.props}/>
                    <Content style={{
                        ...this.getContentStyle()
                    }}>
                        {children}
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
        )
        return (
            <React.Fragment>
                <DocumentTitle title={this.getPageTitle(pathname)}>
                        <Context.Provider value={this.getContext()}>
                            <div>{layout}</div>
                        </Context.Provider>
                </DocumentTitle>
                {this.renderSettingsDrawer()}
            </React.Fragment>
        )
    }
}