/**
 * @fileName : index.js
 * @author : ykx 
 * @createTime : 2018/6/13
 * @desc : 顶部第一块内容
 */
import React,{PureComponent} from 'react'
import styles from './index.less'
import TweenOne from 'rc-tween-one'
import QueueAnim from 'rc-queue-anim';
import {Menu,Icon} from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';


const Item = Menu.Item;
export default class BannerPrimary extends PureComponent{
    constructor(props){
        super(props);
    }
    render(){
       const {children} = this.props;
        return (
       <OverPack
           replay
           playScale={[0.3, 0.1]}
           className={styles.banner_pri_wrapper}>
           {children}
           <div key="overlay" className={styles.overlay}></div>
            <QueueAnim
                type={['bottom','top']}
                key="text"
                delay={200}
                className={styles.banner_pri_con}>
                <h2 key="title">白皮书</h2>
            </QueueAnim>
       </OverPack>
        )
    }
}
