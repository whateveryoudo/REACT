import React from 'react'
import Icon from './index'


const customCache = new Set();

export default function create(options) {
    //动态加载svg图标

    const {scriptUrl,extraCommonProps = {}} = options;

    if(typeof document !== 'undefined' && typeof window !== 'undefined'
       && typeof document.createElement === 'function'
       && typeof scriptUrl === 'string' && scriptUrl.length
        && !customCache.has(scriptUrl)
    ){
        const script = document.createElement('script');
        script.setAttribute('src',`http:${scriptUrl}`);
        script.setAttribute('data-namespace',scriptUrl);
        customCache.add(scriptUrl);
        document.body.appendChild(script);
    }


    const Iconfont = (props) => {
        const {type,children,...restProps} = props;
        let content = null;
        if(props.type){
            content = (<use xlinkHref={`#${type}`}/>);
        }
        if(children){
            content = children;
        }
        return (
            <Icon>
                {content}
            </Icon>
            )
    }

    return Iconfont;
}