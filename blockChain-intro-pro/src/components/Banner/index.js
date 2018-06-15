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
import MyParticles from '../../components/MyParticles'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';


const Item = Menu.Item;
export default class Banner extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            navData : [
                {text : '白皮书',link : '/'},
                {text : '矿工入口',link : '/'},
                {text : '咨询',link : '/'}
            ]
        }
    }
    render(){
       const {children} = this.props;
        return (
       <OverPack
           replay
           playScale={[0.3, 0.1]}
           className={styles.banner_wrapper}>
           {/*注意这里用一层不会改变的组件包裹起来,否则会重复渲染*/}
           <MyParticles key="banner"/>
           {children}
            <QueueAnim
                type={['bottom','top']}
                key="text"
                delay={200}
                className={styles.banner_con}>
                <h2 key="title">企业级区块链科技应用平台</h2>
                <p key="desc">北斗链，作为第三代区块链的代表，定位于“企业级区块链开发和应用平台”，创造性地提出“交易引擎”的概念来解决“智能合约”的安全性和易用性的问题，满足大规模、主流商业应用对区块链的需求。</p>
            </QueueAnim>
           {/*下方箭头*/}
           <TweenOne
               key="banner-arrow"
               animation={{y:'-=25',yoyo:true,repeat:-1,duration: 1000}}
               className={styles.down_icon}>
               <Icon type="down" />
           </TweenOne>
       </OverPack>
        )
    }
}
