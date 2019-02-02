import {fakeChartData} from '@/services/api'

export default {
    namespace: 'chart',
    state : {
        visitData : []
    },

    effects : {
        *fetch(_,{call,put}){
            const res = yield  call(fakeChartData);//获取mock charts数据
            yield put({
                type : 'save',
                payload : res
            })
        }
    },
    reducers : {
        save(state,{payload}){
            return {
                ...state,
                ...payload
            }
        }
    }
}