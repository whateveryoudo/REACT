/**
 * Created by 13586 on 2018/9/14.
 */

export default function getScroll(target:any,top:boolean) {
    if(typeof window === 'undefined'){return 0};
    //pageXOffset 和 pageYOffset 属性返回文档在窗口左上角水平和垂直方向滚动的像素。
    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';//相对父级元素

    const isWindow = target === window;

    let ret = isWindow ? target[prop] : target[method];//当滚动容器不是window 使用scrollTop
    //IE 8 及 更早 IE 版本不支持该属性,但可以使用 document.documentElement.scrollLeft 和 document.documentElement.scrollTop 属性 。
    if(isWindow && typeof ret !== 'number'){
        ret = document.documentElement[method];
    }

    return ret;
}