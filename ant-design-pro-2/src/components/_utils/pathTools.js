/**
 * Created by 13586 on 2018/12/11.
 */
export function urlToList(url) {
    const urllist = url.split('/').filter(i => i);//分割/
    return urllist.map((urlItem,index) => `/${urllist.slice(0,index + 1).join('/')}`);
}