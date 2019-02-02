//公共设置modal
import {message} from 'antd'
import defaultSettings from '../defaultSettings'

let lessNodesAppended;//是否追加过动态style,script
const updateTheme = primaryColor => {
  
    // Determine if the component is remounted
    if (!primaryColor) {
      return;
    }
  
    const hideMessage = message.loading('正在编译主题！', 0);
    function buildIt() {
      if (!window.less) {
        return;
      }
      setTimeout(() => {
        window.less
          .modifyVars({
            '@primary-color': primaryColor,
          })
          .then(() => {
            hideMessage();
          })
          .catch((err) => {
              console.log(err);
            message.error('Failed to update theme');
            hideMessage();
          });
      }, 200);
    }
    if (!lessNodesAppended) {
      // insert less.js and color.less
      const lessStyleNode = document.createElement('link');
      const lessConfigNode = document.createElement('script');
      const lessScriptNode = document.createElement('script');
      lessStyleNode.setAttribute('rel', 'stylesheet/less');
      lessStyleNode.setAttribute('href', '/color.less');
      lessConfigNode.innerHTML = `
        window.less = {
          async: true,
          env: 'production',
          javascriptEnabled: true
        };
      `;
      lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
      lessScriptNode.async = true;
      lessScriptNode.onload = () => {
        buildIt();
        lessScriptNode.onload = null;
      };
      document.body.appendChild(lessStyleNode);
      document.body.appendChild(lessConfigNode);
      document.body.appendChild(lessScriptNode);
      lessNodesAppended = true;
    } else {
      buildIt();
    }
  };
const updateColorWeak = colorWeak => {
    document.body.className = colorWeak ? 'colorWeak' : '';
}

export default {
    namespace : 'setting',
    state : defaultSettings,
    reducers : {
        getSettings(state){
            //初始化配置信息
            const setting = {};

            const urlParams = new URL(window.location.href);
            //跟新设置对象
            Object.keys(state).forEach(key => {
                if(urlParams.searchParams.has(key)){
                    const value = urlParams.searchParams.get(key);
                    setting[key] = value  === 1 ? true : value;
                }
            })
            const {primaryColor,colorWeak} = setting;
            if(state.primaryColor !== primaryColor){
                updateTheme(primaryColor);//更新主题
            }

            updateColorWeak(colorWeak);//跟新色弱模式

            return {
                ...state,
                ...setting
            }
        },
        //改变全局配置
        changeSetting(state,{payload}){
            const urlParams = new URL(window.location.href);
            //将state与defaultSettings 进行对比，将不同得属性存入url中,保证刷新不会恢复默认

            Object.keys(defaultSettings).forEach(key => {
                if(urlParams.searchParams.has(key)){
                    urlParams.searchParams.delete(key);
                }
            })

            //跟新参数对象
            Object.keys(payload).forEach(key => {
                if(key === 'collapse'){
                    return;
                }
                let value = payload[key];

                if(value === true){
                    value = 1;
                }

                if(defaultSettings[key] !== value){
                    urlParams.searchParams.set(key,value);
                }

            })
            //更新颜色
            const {primaryColor,colorWeak,contentWidth} = payload;
            if(state.primaryColor !== primaryColor){
                updateTheme(primaryColor);//更新主题
            }

            if(state.contentWidth !== contentWidth && window.dispatchEvent){//??
                window.dispatchEvent(new Event('resize'));
            }

            updateColorWeak(colorWeak);//跟新色弱模式

            //替换url
            window.history.replaceState(null,'setting',urlParams.href);


            //更新state

            return {
                ...state,
                ...payload
            }
        }
    }
}