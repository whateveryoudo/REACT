import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App'
import Home from './Home'

const renderDom = (Component1,Component2) => {
    render(
        <AppContainer>
            <div>
                <Component1 />
                <Component2/>
            </div>

        </AppContainer>
        ,
        document.getElementById('app')
    );
}

renderDom(App,Home);
if(module.hot){
    module.hot.accept('./App',() => {
        const App = require('./App').default; //这里为啥动态组件
        const Home = require('./Home').default;
        renderDom(App,Home);
    })
}