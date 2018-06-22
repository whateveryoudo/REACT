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
import {Link} from 'dva/router'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import {Icon,Row,Col,Divider} from 'antd'


const Content0 = () => {
    const themes = ['2核CPU、2G内存、100G硬盘空间；','Ubuntu 14.04 操作系统 64位；','一个静态IPV4地址。'];
    const minterDoc = [
        {text : '矿工手册1：矿机的购买',link : "/"},
        {text : '矿工手册1：矿机的购买',link : "/"},
        {text : '矿工手册1：矿机的购买',link : "/"},
    ]
    return (
           <div className={styles.con0_wrapper}>
                <QueueAnim
                        key="content0"
                        className={styles.cons_lists}
                        component={Row}>
                       <div key="top_intro">
                           在北斗链体系中，矿工的作用只有交易验证和数据存储，并不会获得铸币的权利。矿工的激励来自于“北斗链基金会（下设的矿工工会）”支付的工资
                       </div>
                        <div key="top_intro1">
                            北斗链的挖矿算法采取的是 “工作时间证明” （Power of Work Time，简称POWT），取代比特币的“工作量证明”（Power of Work）。当矿工连入北斗币网络后，根据在线时间获得相应的工资报酬。POWT的算法会尽可能保证每个矿工相对平均的工作任务分配。POWT的算法可以采用最基础的CPU挖矿模式，避免矿工通过提高矿机性能而展开的“军备竞赛”，从而节省大量的电力资源，是一种节能环保性的挖矿模式。
                        </div>
                        <p className={styles.minTitle} key="p">北斗链矿工的基本要求是：</p>
                </QueueAnim>
               <OverPack>
                   <QueueAnim key="ul" className={styles.theme_list} component="ul">
                       {
                           themes.map((item,index) => <li key={index}>{`${index + 1}) ${item}`}</li>)
                       }
                   </QueueAnim>
                   <QueueAnim key="doc" className={styles.doc_wrapper}>
                       <h1 key="h1">矿工操作手册</h1>
                       <Divider/>
                       <QueueAnim key="ul" component="ul" className={styles.theme_list}>
                           {
                               minterDoc.map((item,index) => <li key={index}>{index + 1}、 <Link to={item.link}>{item.text}</Link></li>)
                           }
                           <li>如果你在操作过程中有任何问题，你可以：</li>
                           <li>1）北斗链矿工QQ群：579578162，有客服解答；</li>
                       </QueueAnim>

                   </QueueAnim>
                </OverPack>
            </div>
        )
    }
export default Content0
