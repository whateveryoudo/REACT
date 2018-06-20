export default {
    namespace : 'global',
    state : {
        isMobile : false
    },
    reducers:{
        updateIsMobile(state,{payload}){
            return {
                ...state,
                isMobile:payload
            }
        }
    }

}