import {queryTags} from '@/services/api'


export default {
    namespace : 'monitor',
    state : {
        tags : []
    },
    effects : {
        *fetchTags(_,{call,put}){
            const res = yield call(queryTags);
            yield put({
                type:'saveTags',
                payload : res.list
            })
        }
    },
    reducers : {
        saveTags(state,action){
            return {
                ...state,
                tags : action.payload
            }
        }
    }
}