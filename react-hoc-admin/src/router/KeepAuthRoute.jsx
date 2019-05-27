import React from 'react'
import config from '@/commons/config-hoc';
import {Route} from 'react-router-dom';
import {keepAliveRoutes} from './routes'
import Error401 from '@/pages/error/Error401'
@config({
    connect(state){
        return {
            tabs : state.system.tabs,
            keepPageSystem: state.system.keepPage,
            tabsShow : state.settings.tabsShow
        }
    }
})
export default class KeepAuthRoute extends React.Component {

    render() {
        const {
            component : Component,
            noAuth,
            tabs,
            keepPageSystem,
            tabsShow,
            ...rest
        } = this.props
        return (
            <Route {...rest}
                render = {props => {
                    const configKeepAlive = keepAliveRoutes.find(item => item.path === rest.path)?.keepAlive;
                    const keepPage = configKeepAlive === void 0 ? keepPageSystem : configKeepAlive;//是否保存界面
                    //权限先不写
                    let  component = noAuth ? <Component {...props}/> : <Error401 {...props}/>

                    if(tabsShow || keepPage || keepAliveRoutes.length){
                        const {pathname,search} = props.location;
                        const currentPath = window.encodeURIComponent(`${pathname}${search}`);

                        let currentTab = tabs.find(item => item.path === currentPath);
                        let nextActiveTab = tabs.find(item => item.nextActive);
                        let prevActiveTab = tabs.find(item => item.active);//上个路由对应tab

                        if(nextActiveTab){

                        }

                        const TabComponent = keepPage ? component : null;

                        //tab切换
                        if(currentTab && !currentTab.active){
                            if(prevActiveTab){
                                prevActiveTab.scrollTop = document.body.scrollTop = document.documentElement.scrollTop;
                            }

                            if(prevActiveTab){
                                prevActiveTab.active = false;
                                this.props.publish('tab-hide',prevActiveTab.path);
                            }
                            currentTab.active = true;

                            this.props.publish('tab-show',currentTab.path);
                            //在componentWillUpdate中执行 执行更新tabs 否则有警告(这里如何触发的willupdate??)

                            this.tabsChange = true;

                            this.tabs = [...tabs];

                        }


                    }


                    return component;
                }}
            />
        )
    }
}