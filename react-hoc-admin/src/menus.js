/**
 * Created by 13586 on 2019/6/12.
 */



export default function getMenus(userId){
    return Promise.resolve([
        {key : 'antDesign',local:'antDesign',text : 'Ant Design官网',icon: 'ant-design', url: 'https://ant-design.gitee.io', order: 2000},
        {key : 'component',local:'component',text : '组件',icon : 'ant-design',order : 700},
        {key : '/example/antd/async-select',parentKey : 'component',  icon: 'deployment-unit', local: 'asyncSelect', text: 'AsyncSelect # 异步下拉', path: '/example/antd/async-select'},
    ])
}