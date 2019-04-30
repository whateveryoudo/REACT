import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import ReactLoadable from 'react-loadable'
import PageFrame from '@/layouts/frame'
import config from '@/commons/config-hoc'
import {isAuthenticated} from '@/commons'
import PageLoading from '@/layouts/page-loading'
import routes,{noFrameRoutes,noAuthRoutes} from './routes'

//代码分割
const allRoutes = routes.map(item => {
    return {
        path : item.path,
        component : ReactLoadable({loader : item.component,loading : PageLoading})
    }
})
@config({
    query: true
})
export default class AppRouter extends React.Component {

    render() {
        const {noFrame,noAuth} = this.props.query;
       return (
           <BrowserRouter>
               <div style={{display: 'flex', flexDirection: 'column', position: 'relative', minHeight: '100vh'}}>
                   <Route path='/' render={props => {//同级框架界面
                       if(noFrameRoutes.includes(props.location.pathname)){
                           return null;
                       }
                       //未登录
                       // if(!isAuthenticated()){
                       //     return null
                       // }
                       //参数携带noFrame = true
                        if( noFrame === 'true'){
                           return null
                        }
                       return <PageFrame {...props}/>
                   }}/>
                   <Switch>
                       {allRoutes.map(item => {
                            const {path,component} = item;
                            let isNoAuthRoute = false;//默认需要授权登录
                            if(noAuthRoutes.includes(path)){
                                isNoAuthRoute = true
                            }
                            if(noAuth === 'true'){
                                isNoAuthRoute = true;
                            }
                            return (
                                <Route
                                    key={path}
                                    exact
                                    path={path}
                                    component={component}
                                />
                            )
                       })}
                   </Switch>
               </div>
           </BrowserRouter>
       )
    }
}