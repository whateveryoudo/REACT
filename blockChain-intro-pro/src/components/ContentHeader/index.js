/**
 * @fileName : index.js
 * @author : ykx
 * @createTime : 2018/6/13
 * @desc : 内容区通用头部
 */
import React from 'react'
import TweenOne from 'rc-tween-one'
import QueueAnim from 'rc-queue-anim';
import styles from './index.less'
import classnames from 'classnames'
import {Icon} from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';



const ContentHeader = ({isMobile,title,desc,className,theme,...props}) => {
    const cls = classnames(styles.con_header,className,theme == 'white' ? styles['white'] : '');
    return (
        <QueueAnim
            type={['bottom', 'top']}
            key="con0-text"
               className={cls}>
            <h1 key={`con${className}-title`}>{title || '无'}</h1>
            <div className={styles.title_line_wrapper} key={`con${className}-title-wrapper`}>
                <div key={`con${className}-line`} className={styles.title_line}></div>
            </div>
            <p key={`con${className}-desc`}>{desc || '无'}</p>
        </QueueAnim>
    )
}
export default ContentHeader
