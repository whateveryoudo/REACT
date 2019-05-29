/**
 * Created by 13586 on 2019/5/28.
 */
export default function getMenus(userId){
    return Promise.resolve([
        {key : 'antDesign',local:'antDesign',text: 'Ant Design 官网', icon: 'ant-design', url: 'https://ant-design.gitee.io', order: 2000}
    ])
}
