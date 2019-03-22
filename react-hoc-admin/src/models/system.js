import i18n,{defaultLang} from '../i18n'
import theme from '../theme'

const getItem = key => window.localStorage.getItem(key);

const setItem = (key,value) => window.localStorage.setItem(key,value);


const primaryColor = getItem('primaryColor') || theme['@primary-color'];

export default {
    initialState : {
        local : defaultLang.local,//默认语言
        i18n : defaultLang.i18n,//默认语言集
        primaryColor //默认系统主题色
    },
    //设置主题色
    setPrimaryColor : (primaryColor) => {
        setItem('primaryColor',primaryColor);
        return {primaryColor};
    }
}