//字段集合对象
import React from 'react'
import {Icon} from 'antd'
import styles from './index.less'

export default {
    UserName : {
        props : {
            size : 'large',
            prefix : (<Icon type="user" className={styles.prefixIcon}/>),
            placeholder : 'admin'
        },
        rules : [
            {required : true,message : '请输入用户名'}
        ],
    },
    Password : {
        props : {
            size : 'large',
            prefix : (<Icon type="lock" className={styles.prefixIcon}/>),
            type: 'password',
            placeholder : '请输入密码'
        },
        rules : [
            {required : true,message : '请输入密码'}
        ],
    },
    Mobile : {
        props : {
            size : 'large',
            prefix : (<Icon type="mobile" className={styles.prefixIcon} />),
            placeholder: '请输入手机号'
        },
        rules : [
            {required : true,message : '请输入手机号'},
            {pattern : /^1\d{10}$/,message : '格式错误'}
        ]
    },
    Captcha : {
        props : {
            size : 'large',
            prefix : (<Icon type="mail" className={styles.prefixIcon} />),
            placeholder: '请输入'
        },
        rules : [
            {required : true,message : '请输入验证码'}
        ]
    }
}