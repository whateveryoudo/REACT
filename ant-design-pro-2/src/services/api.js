//请求合集
import request from '@/utils/request'
export async function getFakeCaptcha(mobile) {
    return request(`/api/captcha?mobile=${mobile}`);
}

export async function fakeAccountLogin(params) {
    return request('/api/login/account',{
        method : 'POST',
        body : params
    });
}

export async function fakeChartData(){
    return request('/api/fake_chart_data');
}

export async function queryTags() {
    return request('/api/tags')
}

export async function queryProjectNotice() {
    return request('/api/project/notice')
}