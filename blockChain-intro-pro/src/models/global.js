
import { enquireScreen } from 'enquire-js';
let isMobile;
enquireScreen((b) => {
    isMobile = b;
})
export default {
    namespace : 'global',
    state : {
        isMobile//初始化先获取
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