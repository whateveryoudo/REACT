/**
 * @fileName : index.js
 * @author : ykx
 * @createTime : 2018/6/13
 * @desc : 内容区2
 */
import React from 'react'
import styles from './index.less'
import TweenOne from 'rc-tween-one'
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import MyParticles from '../../components/MyParticles'

import ContentHeader from '../ContentHeader'
import {Icon,Row,Col} from 'antd'

const getDelay = e => e % 3 * 100 + Math.floor(e / 3) * 100 + 300;//4个一组

const Content1 = () => {
    const desc = '北斗链是企业级区块链开发和应用平台';
    const blockArray = [
        {  title: '智能资产引擎', content: '北斗链是一个区块链底层框架，它继承比特币和以太坊的优秀特点，为适应未来大规模主流商业应用的需求，提出了交易引擎的核心概念，在交易安全性、稳定性和易用性方面，走在了第三代区块链平台的前列。' },
        {  title: '权限控制引擎', content: '北斗链希望成为继Bitcoin和Ethereum之后，另一个被世界广泛认可和接受的区块链框架，在某些特定行业，比如金融科技、供应链管理、共享经济等领域，成为主流的基础开发平台。' },
    ];
    const children = blockArray.map((item,i) => {
        const delay = getDelay(i);//累计时间
        const liAnim = {opacity:0,type:'from',delay,ease: 'easeOutQuad'}
        const childrenAnim = {...liAnim,x:"+=10",delay : delay};//子项延时

        return (
            <TweenOne
                animation={liAnim}
                key={i}>
                <Col className={styles.list_item_wrapper} span={12}>
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
            <OverPack className={styles.con1_wrapper}>
                <MyParticles configParamType="star" key="banner"/>
                <QueueAnim
                    type={['bottom', 'top']}
                    key="con0-header-box">
                    <ContentHeader
                        key="title"
                        theme="white"
                        className="content"
                        title="关于"
                        desc={desc}/>
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
export default Content1
