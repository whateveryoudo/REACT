export default {
    namespace : 'global',
    state : {
        collapsed : false, //slide状态
        notices : [] //消息内容
    },
    reducers: {

        changeLayoutCollapsed(state,{payload}){
            return {
                ...state,
                collapsed : payload
            }
        }
    }
}