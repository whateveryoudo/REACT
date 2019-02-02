//登录 model

import {getFakeCaptcha,fakeAccountLogin} from '@/services/api'
import { routerRedux } from 'dva/router';
import {setAuthority} from '@/utils/authority'
import {getPageQuery} from '@/utils/utils'
export default {
    namespace : 'login',
    state : {

        status : undefined //登录状态
    },
    effects : {
        *getCaptcha({payload},{call}){
            yield call(getFakeCaptcha,payload);//没实际发送
        },
        *login({payload},{call,put}){
           const result =  yield call(fakeAccountLogin,payload);
           //保存登录结果
            yield put({
                type : 'changeLoginStatus',
                payload : result
            })
            //登录成功
            if(result.status === 'ok'){
                //先不更新权限

                const urlParams = new URL(window.location.href);//转成对象
                const params = getPageQuery();//获取redirect地址
                let {redirect} = params;

                if(redirect){
                    let redirectUrlParamas = new URL(redirect);
                    if(redirectUrlParamas.origin === urlParams.origin){//源相同
                        redirect = redirect.substr(redirectUrlParamas.origin.length);//截取路由部分
                        if(redirect.match(/^\/.*#/)){//匹配hash模式 形如/#/xx/xxx  ||  /adsa#/asdsa
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                   }else{
                        window.location.href = redirect;
                        return;
                    }
                }
                yield put(routerRedux.replace(redirect || '/'));

            }

        }
    },
    reducers : {
        changeLoginStatus(state,{payload}){
            //保存权限
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                status : payload.status,
                type : payload.type
            }
        }
    }
}