import i18n,{defaultLang} from '../i18n'
import theme from '../theme'

const getItem = key => window.localStorage.getItem(key);

const setItem = (key,value) => window.localStorage.setItem(key,value);


const primaryColor = getItem('primaryColor') || theme['@primary-color'];

export default {
    initialState : {
        local : defaultLang.local,//默认语言
        i18n : defaultLang.i18n,//默认语言集
        primaryColor, //默认系统主题色
        //先写死
        tabs: [
            // {active : true,closable : true,path : '/',text : {local:'home',text : '首页',icon : 'home'},scrollTop : 0},
            // {
            //     closable : true,
            //     active : false,path : '/example/antd/table-editable',icon :"deployment-unit",
            //     text : {local:"tableEditable",text : '可编辑表格'},
            //     scrollTop : 0
            // },
        ],
        keepPage : true
    },
    //设置tabs
    setTabs : (tabs) => ({tabs}),
    closeTab : (targetPath,state) => {
        const tabs = [...state.tabs];
        return closeTabByPath(targetPath,tabs);
    },
    //设置主题色
    setPrimaryColor : (primaryColor) => {
        setItem('primaryColor',primaryColor);
        return {primaryColor};
    }
}

function closeTabByPath(targetPath,tabs) {
    let closeTabIndex = 0;
    const tab = tabs.find((item,index) => {
        if(item.path === targetPath){
            closeTabIndex = index;
            return true;
        }
        return false;
    })

    if(tab){
       if(tab.isActive){
            const removePath = tab.path;
            const currentIndex = tabs.findIndex(item => item.path === removePath);

            let nextActiveIndex = -1;

            //??
            if(removePath.indexOf("/_/") !== -1){
                nextActiveIndex = tabs.findIndex(item => item.path === removePath.split('/_/')[0]);
            }

            if(nextActiveIndex === -1){
                nextActiveIndex = 0;
                if(currentIndex === tabs.length - 1){//选中的为最后一个
                    nextActiveIndex = currentIndex - 1;
                }else{
                    nextActiveIndex = currentIndex + 1;//选中下一个
                }
            }

            tabs[nextActiveIndex].nextActive = true;
       }
    }

    tabs.splice(closeTabIndex,1);
    //关闭最后一个打开首页
    if(!tabs.length){
        return {tabs : [{path : '/',nextActive : true}]}
    }
    return {tabs : [...tabs]}
}