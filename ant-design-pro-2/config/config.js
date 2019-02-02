
const path = require('path');
import defaultSettings from '../src/defaultSettings';
import webpackPlugin from './plugin.config';
const routes  = [
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: './User/Login' },
        ],
    },
    {
        path : '/',
        component : '../layouts/BasicLayout',
        authority : ['admin','user'],
        routes : [
            {path : '/',redirect:'/dashboard/analysis'},
            {
                path : '/dashboard',
                name : 'dashboard',
                icon : 'dashboard',
                routes : [
                    {
                        path : '/dashboard/analysis',
                        name : 'analysis',
                        component : '../pages/Dashboard/Analysis'
                    },
                    {
                        path : '/dashboard/monitor',
                        name : 'monitor',
                        component : '../pages/Dashboard/Monitor'
                    },
                    {
                        path : '/dashboard/workplace',
                        name : 'workplace',
                        component : '../pages/Dashboard/Workplace'
                    },
                ]
            },
            {
                path : '/form',
                name : 'form',
                icon : 'form',
                routes : [
                    {
                        path : '/form/basic-form',
                        name : 'basicForm',
                        component : '../pages/Forms/BasicForm'
                    }
                ]
            },
        ]
    },
    {
        path : '/context',component : './context/Context'
    }
]




export default {
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: {
                loadingComponent: './components/PageLoading/index',
            },
            title: 'ant-design-pro-2',
            dll: true,
            hardSource: true,
            //配置多语言(https://www.npmjs.com/package/umi-plugin-locale)
            locale:{
                enable : true,
                default: 'zh-CN',
                baseNavigator : true  //用navigator.language的值作为默认语言
            }
        }]
    ],
    theme: {
        'primary-color': defaultSettings.primaryColor,
      },
    routes,//配置路由
    alias : {
        '@' : path.resolve(__dirname, 'src/'),
    },
    chainWebpack: webpackPlugin
}