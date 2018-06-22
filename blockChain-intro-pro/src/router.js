import React,{createElement} from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import BasicLayout from './layouts/Basiclayout'





function RouterConfig({ history,app,restProps }) {

  return (
    <Router history={history}>
      <Switch>
          <BasicLayout app={app} history={history} {...restProps}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
