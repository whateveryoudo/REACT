import React from 'react'
import {addEventListener,removeEventListener} from './index'
export default function domEvent({addPropName = 'addEventListener',removePropName = 'removeEventListener'} = {}) {
    return function (WrapperComponent) {
        class WithSubscription extends React.Component{
            constructor(props){
                super(props);
                //声明事件绑定 移除方法
                this[addPropName] = (element,type,handler) => {
                    this._addEvents.push({
                        element,
                        type,
                        handler
                    });
                    addEventListener(element,type,handler);
                }
                this[removePropName] = (element,type,handler) => {
                    removeEventListener(element,type,handler);
                }
            }
            //定义调用组件时的name
            static displayName = `WithSubscription(${WrapperComponent.displayName || WrapperComponent.name || 'Component'})`;
            _addEvents = []
            componentWillUnmount(){
                this._addEvents.forEach(item => {
                    const {element,type,handler} = item;
                    removeEventListener(element,type,handler);
                })
            }
            render(){

                console.log(this.props)
                //方法注入
                const injectProps = {
                    [addPropName] : this[addPropName],
                    [removePropName] : this[removePropName],
                }
                return (
                    <WrapperComponent {...injectProps}  {...this.props}/>
                )
            }
        }


        return WithSubscription
    }
}