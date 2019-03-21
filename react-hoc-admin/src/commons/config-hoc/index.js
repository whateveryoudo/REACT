import React from 'react'
//整合多个高阶组件
import {Component} from 'react'
import {compose} from '@/commons'
import eventHoc from '@/library/utils/dom-event-hoc'
import {connect as reduxConnect} from '@/models'
export default (options) => {
    return WrappedComponent => {
        const {
            title = false, //true:当前界面通过menus生成title ;  false: 界面不现实title;string : 自定义title(不会参与国际化);object:{local,text} local对应国际化menu的配置，text为失败后默认的显示，function(props) 返回值作为title
            connect = true,  //是否与redux进行连接 true : 只注入了this.props.action相关方法;false:不进行连接；(state) => ({title : state.page.title}) 函数返回数据注入this.props中
            breadcrumbs = true, //true: 当前界面通过菜单自动生成面包屑; false:界面不显示面包屑,object: [{local,text,...}] local为国际化配置,text为国际化失败后的默认显示，function:返回值作为面包屑
            appendBreadcrumbs = [], //在面包屑得基础上增加;function(props) 返回值作为添加
            event = false, //是否添加了event高阶组件，true:可以使用this.props.addEventListener添加dom事件，在组件销毁的时候自动清理
        } = options;
        const hocFuncs = [];
        if(event){
            hocFuncs.push(eventHoc());
        }
        if(connect === true){hocFuncs.push(reduxConnect())};
        if(typeof connect === 'function'){
            hocFuncs.push(reduxConnect(connect))
        }
        const hocs = compose(hocFuncs);
        @hocs
        class WithConfig extends  Component{
            constructor(props){
                super(props);
                //初始化框架
                this.initFrame();
            }
            initFrame = () => {
                const {page} = this.props.action;
                if(title === false){
                    page.setTitle('')
                }
                if(title && title !== true){
                    let nextTitle = title;
                    if(typeof nextTitle === 'function'){
                        nextTitle = nextTitle(this.props);
                    }
                    page.setTitle(nextTitle);
                }

                //设置breadcrumbs

                if(breadcrumbs === false){
                    page.setBreadcrumbs([]);
                }
                if(breadcrumbs && breadcrumbs !== true){
                    let nextBreadcrumbs = breadcrumbs;
                    if(typeof breadcrumbs === 'function'){
                        nextBreadcrumbs = breadcrumbs(this.props);
                    }

                    page.setBreadcrumbs(nextBreadcrumbs);
                }

                if(Array.isArray(appendBreadcrumbs) && appendBreadcrumbs.length){
                    page.appendBreadcrumbs(appendBreadcrumbs);
                }
                if(typeof appendBreadcrumbs === 'function'){
                    page.appendBreadcrumbs(appendBreadcrumbs(this.props));
                }
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