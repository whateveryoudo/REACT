/**
 * @fileName : Basiclayout.js
 * @author : ykx
 * @createTime : 2018/6/21
 * @desc : 基础承载容器
 */
import React,{Component,createElement} from 'react'
import { Layout } from 'antd';
import { connect } from 'dva';
import dynamic from 'dva/dynamic';
import { Router, Route, Switch,Redirect } from 'dva/router';
import { enquireScreen } from 'enquire-js';
import GoTop from '../components/GoTop';
import MyNav from '../components/MyNav'
import Footer from '../components/Footer'

const {Content} = Layout;
const modelNotExisted = (app,model) => {
    return !app._models.some(({namespace}) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);//处理xx/xx取最后的字符串
    })
}
// wrapper of dynamic
const dynamicWrapper = (app,models,component) => {
    return dynamic({
        app,
        models : () => models.filter(model => modelNotExisted(app.model)).map(m => import(`../models/${m}.js`)),
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


class Basiclayout extends Component{
    constructor(props){
        super(props);
        this.state = {
            boundary : 100
        }
    }
    componentDidMount(){
        const self = this;
        enquireScreen(b => {
            self.props.dispatch({
                type : 'global/updateIsMobile',
                payload : b
            })
        })
    }
    render(){
        const {app,isMobile} = this.props;
        const Home = dynamicWrapper(app, [], () => import('../routes/Home/Home'));
        const WhiteBook = dynamicWrapper(app, [], () => import('../routes/WhiteBook/WhiteBook'));
        const MinerEnter = dynamicWrapper(app, [], () => import('../routes/Miner/MinerEnter'));
        const NewsList = dynamicWrapper(app, [], () => import('../routes/News/NewsList'));
        //这里window在scroll
        return (
            <Layout id="overflow_layout">
                <MyNav isMobile={isMobile} key="mynav"/>

                <Content>
                    <Switch>
                        <Route path="/home" exact component={Home} />
                        <Route path="/whiteBook" exact component={WhiteBook} />
                        <Route path="/minerEnter" exact component={MinerEnter} />
                        <Route path="/newsList" exact component={NewsList} />
                        <Redirect from="/" to="/home"/>
                    </Switch>
                </Content>
                <Footer isMobile={isMobile}/>
                {/*这里统一加返回顶部按钮*/}
                <GoTop/>
            </Layout>
        )
    }
}
export default connect(state => {
    return {
        isMobile : state.global.isMobile
    }
})(Basiclayout);
