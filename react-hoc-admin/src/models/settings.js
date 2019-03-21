
export const PAGE_FRAME_LAYOUT = {
    TOP_SIDE_MENU: 'top-side-menu',//顶部+左侧导航
    TOP_MENU: 'top-menu',//顶部导航
    SIDE_MENU: 'side-menu',//左侧导航（默认）
}

export default {
    initialState : {
        pageFrameLayout : PAGE_FRAME_LAYOUT.SIDE_MENU,
        pageHeadFixed : true,//头部固定
        tabsShow : true,//是否开启tabs
        pageHeadShow : true, //显示头部
    },
    syncStorage : true,
    //操作全局配置

}

