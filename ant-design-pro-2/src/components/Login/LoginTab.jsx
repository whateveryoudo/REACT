//操作表单
import React from 'react'
import {Tabs} from 'antd'
import LoginContext from './loginContext'

const TabPane = Tabs.TabPane;
const generateId = (() => {
    let i = 0;
    return (prefix = '') => {
        i += 1;
        return `${prefix}${i}`;
    }
})();

class LoginTab extends React.Component {
    constructor(props){
        super(props);
        this.uniqueId = generateId('login-tab-');//初始化唯一标识
    }
    componentDidMount(){
        const {tabUtil} = this.props;
        tabUtil.addTab(this.uniqueId);//调用provider  context中的方法 添加tab
    }
    render() {
        const {children} = this.props;
        return (
            <TabPane {...this.props}>{children}</TabPane>
        )
    }
}

const wrapContext = props => {
    return (
        <LoginContext.Consumer>
            {value => (<LoginTab tabUtil={value.tabUtil} {...props}/>)}
        </LoginContext.Consumer>
    )
}

//添加类型标识

wrapContext.typeName = 'LoginTab';

export default wrapContext;
