const INIT_WIDTH = 256;

export default {
    initialState : {
        width : INIT_WIDTH,//默认左侧slide宽度
        collapsedWidth : 80,//收起来的宽度
        collapsed : false,
        dragging : false,
        show : true
    },
    syncStorage : {
        width : true,
        collapsed: true
    }
}