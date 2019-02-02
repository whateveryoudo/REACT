import request from '@/utils/request'
//async？？
export async function queryCurrent() {
    return request('/api/currentUser')
}