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