import en_GB from './en_GB'
import zh_CN from './zh_CN'

const _defaultLang = {
    name : '语言',
    label : '简体中文',
    local : 'zh_CN',
    i18n : zh_CN
}

let _currentLocal = _defaultLang.i18n;

export function setCuurrentLocal(current) {
    _currentLocal = current
}
export function getCurrentLocal() {
    return _currentLocal
}


export const defaultLang = _defaultLang;//系统默认语言对象


export default [
    {name: 'lang', label: 'English', local: 'en_GB', i18n: en_GB},
    {..._defaultLang}
]