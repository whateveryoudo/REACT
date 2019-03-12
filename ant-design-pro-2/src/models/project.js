import {queryProjectNotice} from '@/services/api'
export default {
    name : 'project',
    state : {
        notice : []
    },
    effects : {
        *fetchNotice(_,{put,call}){
            const res = yield call(queryProjectNotice);
            yield  put({
                type : 'saveNotice',
                payload : Array.isArray(res) ? res : []
            })
        }
    },
    reducers : {
        saveNotice(state,action){
            return {
                ...state,
                notice : action.payload
            }
        }
    }
}