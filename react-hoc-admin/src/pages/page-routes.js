// 此文件是通过脚本生成的，直接编辑无效！！！

// 不需要导航框架的页面路径
export const noFrames = [
];

// 不需要登录就可以访问的页面路径
export const noAuths = [
];

// 需要keep alive 页面
export const keepAlives = [
    {
        path: '/iframe_page_/:src',
        keepAlive: true,
    },
];

// 页面路由配置
export default [
    {
        path: '/text',
        component: () => import('E:\\git\\REACT\\REACT\\react-hoc-admin\\src\\pages\\home\\Text.jsx'),
    },
    {
        path: '/',
        component: () => import('E:\\git\\REACT\\REACT\\react-hoc-admin\\src\\pages\\home\\index.jsx'),
    },
    {
        path: '/iframe_page_/:src',
        component: () => import('E:\\git\\REACT\\REACT\\react-hoc-admin\\src\\pages\\iframe\\index.jsx'),
    },
];
