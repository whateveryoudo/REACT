/**
 * @fileName : index.js
 * @author : ykx
 * @createTime : 2018/6/13
 * @desc : 内容区1
 */
import React from 'react'
import styles from './index.less'
import TweenOne from 'rc-tween-one'
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import {Icon,Row,Col} from 'antd'


const Content0 = () => {
    const themes = ['概述比特币和区块链的技术发展方向。','概述比特币和区块链的技术发展方向。','概述比特币和区块链的技术发展方向。'];
    return (
           <div className={styles.con0_wrapper}>
                <QueueAnim
                        key="content0"
                        className={styles.cons_lists}
                        component={Row}>
                       <div key="top_intro">
                           <a href="http://www.beidouchain.com/wp-content/uploads/2018/01/BeidouChain-White-Paper-V1.1.pdf">北斗链白皮书</a> (PDF) 提出了一种区块链智能合约的替代方案-交易引擎，既满足区块链上合约的可编程化的需求，又避免了“程序员作恶”的系统风险。同时在性能上，达到安全性、稳定性，以及对企业应用的友好性，满足未来企业级区块链开发和应用的需要。
                       </div>
                        <p className={styles.minTitle} key="p">白皮书内容包括以下主题：</p>
                </QueueAnim>
               <OverPack>
                   <QueueAnim key="ul" className={styles.theme_list} component="ul">
                       {
                           themes.map((item,index) => <li key={index}>{item}</li>)
                       }
                   </QueueAnim>
                    <QueueAnim
                        type={['bottom','top']}
                        key="text"
                        delay={200}>
                        <div key='pad_icon' className={styles.pdf_icon}>
                            <img src="http://www.beidouchain.com/wp-content/uploads/2017/07/pdf-logo-256x256.png" alt=""/>
                        </div>
                        <p key="downLoad" className={styles.downLoad}>
                            <a href="http://www.beidouchain.com/wp-content/uploads/2018/01/BeidouChain-White-Paper-V1.1.pdf">点击下载“白皮书”</a>
                        </p>
                     </QueueAnim>
                </OverPack>
            </div>
        )
    }
export default Content0
