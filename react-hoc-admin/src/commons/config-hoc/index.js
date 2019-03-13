import React from 'react'
//整合多个高阶组件
import {Component} from 'react'

export default (options) => {
    return WrappedComponent => {
        const {
            title = false //true:当前界面通过menus生成title ;  false: 界面不现实title;string : 自定义title(不会参与国际化);object:{local,text} local对应国际化menu的配置，text为失败后默认的显示，function(props) 返回值作为title
        } = options;
        class WithConfig extends  Component{
            constructor(props){
                super(props);
                //初始化框架
                this.initFrame();
            }
            initFrame = () => {
                debugger;
               console.log(this.props);
            }
            render(){
                return (
                    <WrappedComponent
                        {...this.props}
                    />
                )
            }
        }

        return WithConfig
    }
}