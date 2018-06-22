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

import ContentHeader from '../ContentHeader'
import {Icon,Row,Col} from 'antd'

const getDelay = e => e % 3 * 100 + Math.floor(e / 3) * 100 + 300;//4个一组

const Content0 = ({isMobile}) => {
    const desc = '基础交易引擎是北斗链交易引擎发挥作用的基础构件，它们植入在北斗链的核心层，应用系统只需通过API方式调用即可。'
    const blockArray = [
        { icon: 'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png', title: '智能资产引擎', content: '北斗链将本地化货币和Token合二为一，升级为智能资产。智能资产在网络层面上安全性更强。' },
        { icon: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png', title: '权限控制引擎', content: '北斗链中的权限控制引擎，可以实现对单一地址的独立授权，在复杂的交易中或者在突发安全事故时，保护用户的资产不受损失。' },
        { icon: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png', title: '地理信息引擎', content: '北斗链中的地理信息引擎，将交易的实时地理信息植入到区块链交易的核心结构中。这种结构既可以在交易之后，针对恶意交易的排查和追踪提供有效的技术手段，也可以在交易之前或交易过程中，作为交易的约束条件，防止某些恶意交易的发生。' },
        { icon: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png', title: '流媒体引擎', content: '针对存证、溯源等需要存储外部信息的区块链应用，北斗链的流媒体引擎提供“key-value”存储结构，增加了对图片、音频、视频的存储，通过“subscribe” 模式适应企业的不同需求。' },
        { icon: 'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png', title: '实名认证引擎', content: '针对国家监管政策，适应国际通行的KYC和AML规则，北斗链实现了实名认证的引擎接口，可以实现“前台匿名、后台实名”的功能。' },
        { icon: 'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png', title: '国密算法引擎', content: '针对我国的信息化安全需求，北斗链集成了SM2/SM3/SM4等国密算法的实现。' },
    ];
    const children = blockArray.map((item,i) => {
        const delay = getDelay(i);//累计时间
        const liAnim = {opacity:0,type:'from',delay,ease: 'easeOutQuad'}
        const childrenAnim = {...liAnim,x:"+=10",delay : delay + 100};//子项延时
        const layout = {xs : 24,sm : 24,md : 12,lg : 8}
        return (
            <TweenOne
                animation={liAnim}
                key={i}>
                <Col {...layout} className={styles.list_item_wrapper}>
                    <TweenOne
                        animation={{x:'-=10',opacity:0,type:'from',ease:'easeOutQuad'}}
                        className={styles.img_wrapper}
                        key="img">
                        <img src={item.icon} alt=""/>
                    </TweenOne>
                    <div className={styles.info_wrapper}>
                        <TweenOne key="h1" animation={childrenAnim} component="h1">
                            {item.title}
                        </TweenOne>
                        {/*慢100*/}
                        <TweenOne key="p" animation={{...childrenAnim,delay : delay + 200}} component="p" >
                            {item.content}
                        </TweenOne>
                    </div>
                </Col>

            </TweenOne>
        )
    })
    return (
            <OverPack playScale={[0.3, 0.1]} className={styles.con0_wrapper}>
                <QueueAnim
                    type={['bottom', 'top']}
                    key="con0-header-box">
                    <ContentHeader isMobile={isMobile} key="title0" className="content0" title="基本交易引擎" desc={desc}/>
                </QueueAnim>
                <QueueAnim
                        key="ul"
                        className={styles.cons_lists}
                        type="bottom">
                        <Row key="ul">
                            {children}
                        </Row>
                    </QueueAnim>
                </OverPack>
        )
    }
export default Content0
