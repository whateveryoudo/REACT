import React from 'react'
import {Tooltip} from 'antd'
import styles from './index.less'
const MiniProgress = ({target,strokeWidth,percent,color = 'rgb(19, 194, 194)',...rest}) => {
    return (
        <div className={styles.miniProgress}>
            <Tooltip title={`目标值:${target}%`}>
                <div className={styles.target} style={{left : target ? `${target}%` : null}}>
                    <span style={{backgroundColor : color || null}}/>
                    <span style={{backgroundColor : color || null}}/>
                </div>
            </Tooltip>
            <div {...rest} className={styles.progressWrap}>
                <div
                    className={styles.progress}
                    style={{
                        width : percent ? `${percent}%` : '',
                        height : strokeWidth ? strokeWidth : null,
                        backgroundColor : color || null
                    }}

                />
            </div>
        </div>
    )
}


export default MiniProgress;