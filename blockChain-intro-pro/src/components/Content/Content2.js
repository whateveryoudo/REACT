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
import classnames from 'classnames'

import {Icon,Row,Col} from 'antd'

const getDelay = e => e % 3 * 100 + Math.floor(e / 3) * 100 + 300;//4个一组

const Content2 = ({isMobile,type,imgData,infoData,overClassName,...restProp}) => {
    //还没加移动端
    const {title = '无',desc = '无'} = infoData;

    const animType = {
        queue : isMobile ? 'bottom' : 'right',

        one : isMobile ?{y : '+=30',opacity:0,type : 'from'} : {x : '-=30',opacity:0,type : 'from'}
    }
    const animTypeLeft = {
        queue : isMobile ? 'bottom' : 'left',
        one : isMobile ?{y : '+=30',opacity:0,type : 'from'} : {x : '+=30',opacity:0,type : 'from'}
    }
    const cls = classnames(styles.con2_wrapper,styles[overClassName],type == 'toRight' ? '' : styles['opposite']);
    const targetAnim = type == 'toRight' ? animType : animTypeLeft;
    return (
            <OverPack {...restProp} className={cls}>
                <TweenOne
                    className={styles.con2_img_wrapper}
                    animation={targetAnim.one}
                    key="img">
                    <span>
                        <img src={imgData} alt="内容图片1"/>
                    </span>
                </TweenOne>
                <QueueAnim
                        key="info"
                        className={styles.con2_info_wrapper}
                        type={targetAnim.queue}>
                        <h1 key="h1">{title}</h1>
                        <p key="p">{desc}</p>
                    </QueueAnim>
                </OverPack>
        )
    }
export default Content2
