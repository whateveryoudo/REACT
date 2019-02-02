/**
 * Created by 13586 on 2018/11/22.
 */
import React from 'react'
import moment from 'moment'
import { parse, stringify } from 'qs';
export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}
//不足10的前面补0
export function fixedZero(val) {
    return val < 10 ? `0${val}` : val;
}
//返回指定类型 默认日期值
export function getTimeDistance(type){
    const now = new Date();
    const oneDay = 60 * 60 * 24 * 1000;//一天的毫秒数
    //当天
    if(type === 'today'){
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        return [moment(now),moment(now.getTime() + (oneDay - 1000))];
    }
    //本周
    if(type === 'week'){
        //getDay  返回0-6的数(分别代表周天-周6)
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        day === 0 ? (day = 6) : (day -= 1);
        const beginTime = now.getTime() - oneDay * day;
        return [moment(beginTime),moment(beginTime + 7 * oneDay - 1000)];
    }
    //本月
    if(type === 'month'){
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate = moment(now).add(1,'month');
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),//下个月01  - 1s(不用判断30/29/31 天,)
        ]
    }
    //默认返回全年
    const year = now.getFullYear();
    return [moment(`${year}-01-01 00:00:00`),moment(`${year}-12-31 23:59:59`)];

}