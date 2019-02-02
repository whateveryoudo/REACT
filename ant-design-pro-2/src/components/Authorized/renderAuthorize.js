
let CURRENT = 'NULL';//当前路由权限
const renderAuthorize = Authorized => currentAuthority => {
    if(currentAuthority){
        //判断传入类型,设置当前权限
        if(typeof currentAuthority === 'function'){
            CURRENT = currentAuthority();
        }

        //权限为数组 || 字符串
        //Object.prototype.toString.call(currentAuthority) 能够判断类型（不能判断自定义类型,用instance） toString  Object.prototype.toString区别 toString不同类型会被重写
        if(
            Object.prototype.toString.call(currentAuthority) === '[Object String]' ||
                Array.isArray(currentAuthority)
        ){
            CURRENT = currentAuthority;
        }
    }else{
        CURRENT = 'NULL'
    }
    return Authorized;
}



export {CURRENT}
export default Authorized => renderAuthorize(Authorized);