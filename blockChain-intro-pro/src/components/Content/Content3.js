/**
 * @fileName : index.js
 * @author : ykx
 * @createTime : 2018/6/13
 * @desc : 内容区3
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

const Content3 = () => {
    const desc = '北斗链有一支技术功力深厚而又高效的研发团队，长期专注于操作系统、网络通信、加密算法等底层开发。 北斗链平台以开源、开放的原则，欢迎全球的技术和运营人才的加盟，共同开启安全区块链平台的新时代。';
    const blockArray = [
        {  title: '黄涛', 'minTitle' : 'CEO , FOUNDER',content: '毕业于北京大学，20多年的技术研发管理经验，长期从事IT架构设计、IT Consulting。首次提出“区块链业务分析”的概念' },
        {  title: '李勇', 'minTitle' : 'CEO , FOUNDER',content: '毕业于北京大学，20多年的技术研发管理经验，长期从事IT架构设计、IT Consulting。首次提出“区块链业务分析”的概念' },
        {  title: '陈怡然', 'minTitle' : 'CEO , FOUNDER',content: '毕业于北京大学，20多年的技术研发管理经验，长期从事IT架构设计、IT Consulting。首次提出“区块链业务分析”的概念' },
        {  title: '游开兴', 'minTitle' : 'CEO , FOUNDER',content: '毕业于北京大学，20多年的技术研发管理经验，长期从事IT架构设计、IT Consulting。首次提出“区块链业务分析”的概念' },
    ];
    const children = blockArray.map((item,i) => {
        const delay = getDelay(i);//累计时间
        const liAnim = {opacity:0,type:'from',delay,ease: 'easeOutQuad'}
        const childrenAnim = {...liAnim,x:"+=10",delay : delay};//子项延时

        return (
            <TweenOne
                animation={liAnim}
                key={i}>
                <Col className={styles.list_item_wrapper} span={6}>
                    <div className={styles.info_wrapper}>
                        <TweenOne key="h1" animation={childrenAnim} component="h1">
                            {item.title}
                        </TweenOne>
                        <TweenOne key="h3" animation={{...childrenAnim,delay : delay + 200}} component="h3">
                            {item.minTitle}
                        </TweenOne>
                        {/*慢100*/}
                        <TweenOne key="p" animation={{...childrenAnim,delay : delay + 400}} component="p" >
                            {item.content}
                        </TweenOne>
                    </div>
                </Col>

            </TweenOne>
        )
    })
    return (
            <OverPack className={styles.con3_wrapper}>
                <MyParticles configParamType="star" key="banner"/>
                <QueueAnim
                    type={['bottom', 'top']}
                    key="con0-header-box">
                    <ContentHeader
                        key="title"
                        theme="white"
                        className="content"
                        title="核心团队"
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
export default Content3
