/**
 * Created by 13586 on 2018/11/22.
 */

function getFakeCaptcha(req,res) {
    return res.json('1234');//随便返个
}
export default {
    'GET /api/captcha' : getFakeCaptcha
}