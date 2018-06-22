import { stringify } from 'qs';
import request from '../utils/request';

//请求提前还清数据

export async function queryRepayForwardList(params) {
  return request('/qfcompany/orderqueryalls', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

