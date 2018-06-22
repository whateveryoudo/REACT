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
import NewsList from '../../components/NewsList'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import {Icon,Row,Col} from 'antd'

class Content0 extends React.Component{
    state = {
        testData : [
            {title : '北斗链参加中原区块链峰会',}
        ]
    }
    render(){
        return (
            <OverPack
                replay
                playScale={[0.3, 0.1]}
                className={styles.banner_wrapper}>
                {
                    <NewsList/>
                }
            </OverPack>
        )
    }
}


export default Content0
