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
                    const keepPage = configKeepAlive === void 0 ? keepPageSystem : configKeepAlive;
                    //权限先不写
                    let  component = noAuth ? <Component {...props}/> : <Error401 {...props}/>



                    return component;
                }}
            />
        )
    }
}