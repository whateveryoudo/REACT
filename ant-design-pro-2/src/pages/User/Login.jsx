import React from 'react'
import { connect } from 'dva';
import styles from './Login.less'
import {Checkbox,Alert} from 'antd'


import {FormattedMessage,formatMessage } from 'umi/locale'

import Login from '@/components/Login'

const {Tab,UserName,Password,Mobile,Captcha,Submit} = Login;

@connect(({login,loading}) => {
    return {
        login,
        submitting : loading.effects['login/login']
    }
})

export default class LoginPage extends React.Component {
    state = {
        type : 'account',
        autoLogin : true
    }
    onGetCaptcha = () => {
        return new Promise((resolve,reject) => {
            this.loginForm.validateFields(['mobile'],{},(err,values) => {
                if(err){
                    reject(err);
                }else{
                    const {dispatch} = this.props;

                    dispatch({
                        type : 'login/getCaptcha',
                        payload : values.mobile
                    }).then(resolve).catch(reject);
                }
            })
        })
    }
    onTabChange = type => {
        this.setState({
            type
        })
    }
    handleSubmit = (err,values) => {
        const {type} = this.state;
        //登录操作
        if(!err){
            this.props.dispatch({
                type : 'login/login',
                payload : {
                    ...values,
                    type
                }
            })
        }
    }
    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked
        })
    }
    //错误提示信息
    renderMessage = content => {
        return (<Alert message={content} type="error" showIcon style={{marginBottom:24}}/>)
    }
    render() {
        const {type,autoLogin} = this.state;
        const {submitting,login} = this.props;
        return (
            <div className={styles.main}>
                {/*高阶组件获取form实例*/}
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {this.loginForm = form}}>
                    <Tab key="account" tab="账号密码登录">
                        {/*顶部信息提示*/}
                        {login.status === 'error' &&
                            login.type === 'account' &&
                            !submitting &&
                            this.renderMessage(formatMessage({id : 'app.login.message-invalid-credentials'}))
                        }

                        <UserName name="userName" placeholder="admin/user"/>
                        <Password name="password" placeholder="ant.design"/>
                    </Tab>
                    <Tab key="mobile" tab="手机号登录">
                        {login.status === 'error' &&
                        login.type === 'mobile' &&
                        !submitting &&
                        this.renderMessage(formatMessage({id : 'app.login.message-invalid-verification-code'}))
                        }
                        <Mobile name="mobile"/>
                        <Captcha name="captcha" countDown={120} onGetCaptcha={this.onGetCaptcha}/>
                    </Tab>
                    {/*无功能*/}
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                            <FormattedMessage id="app.login.remember-me"/>
                        </Checkbox>
                        <a style={{float : 'right'}} href="">
                            <FormattedMessage id="app.login.forgot-password"/>
                        </a>
                    </div>
                    <Submit loading={submitting}>
                        <FormattedMessage id="app.login.login"/>
                    </Submit>
                </Login>
            </div>
        )
    }
}