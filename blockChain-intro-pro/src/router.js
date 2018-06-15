import React,{createElement} from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import IndexPage from './routes/IndexPage';

const modelNotExisted = (app,model) => {
    return !app._models.some(({namespace}) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);//处理xx/xx取最后的字符串
    })
}
// wrapper of dynamic
const dynamicWrapper = (app,models,component) => {
    return dynamic({
        app,
        models : () => models.filter(model => modelNotExisted(app.model)).map(m => import(`./models/${m}.js`)),
        component : () => {
            return component().then(raw => {
                const Component = raw.default || raw;
                return props => (
                    createElement(Component,{
                        ...props
                    })
                )
            })
        }
    })
}



function RouterConfig({ history,app }) {
    const Home = dynamicWrapper(app, [], () => import('./routes/Home/Home'))
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
