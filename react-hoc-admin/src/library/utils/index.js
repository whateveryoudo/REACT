//兼容写法
export function addEventListener(element,type,handler){
    if(!element){return}
    if(element.addEventListener){
        element.addEventListener(type,handler,false)
    }else if(element.attachEvent){
        element.attachEvent(`on${type}`,handler);
    }else{
        element[`on${type}`] = handler;
    }
}

export function removeEventListener(element,type,handler){
    if(!element){return}
    if(element.removeEventListener){
        element.removeEventListener(type,handler,false)
    }else if(element.detachEvent){
        element.detachEvent(`on${type}`,handler);
    }else{
        element[`on${type}`] = null;
    }
}