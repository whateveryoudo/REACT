

const CURRENT_USER_KEY = 'current-user';

//复合函数方法
export function compose(funcs) {
    if(funcs.length === 0){
        return arg => arg //不传入返回默认的参数值
    }
    if(funcs.length === 1){
        return funcs[0];
    }

    return funcs.reduce((a,b) => (...args) => a(b(...args)));//右->左 依次计算结果作为下一个函数的参数
}

export function loadScript(src) {
    return new Promise((reslove,reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = reslove;
        script.onerror = reject;
        document.head.appendChild(script);
    })
}
export function getLoginUser() {
    const loginUser = sessionStorage.getItem(CURRENT_USER_KEY);
    return loginUser ? JSON.parse(loginUser) : null;
}
export function isAuthenticated(){
    return !!getLoginUser();
}