import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import ReactLoadable from 'react-loadable'
import PageFrame from '@/layouts/frame'
import PageLoading from '@/layouts/page-loading'
import routes from './routes'

//代码分割
const allRoutes = routes.map(item => {
    return {
        path : item.path,
        component : ReactLoadable({loader : item.component,loading : PageLoading})
    }
})

export default class AppRouter extends React.Component {

    render() {
       return (
           <BrowserRouter>
               <div style={{display: 'flex', flexDirection: 'column', position: 'relative', minHeight: '100vh'}}>
                   <Route path='/' render={props => {//同级框架界面
                       return <PageFrame {...props}/>
                   }}/>
                   <Switch>
                       {allRoutes.map(item => {
                            const {path,component} = item;
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