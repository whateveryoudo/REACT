import React from 'react'
import {Icon} from 'antd'
import classNames from 'classnames'
import styles from './index.less'

const Trend = ({colorful = true,children,className,reverseColor = false,flag,...rest}) => {
    const cls = classNames(styles.trendItem,
        {
            [styles.trendItemGray] : !colorful,
            [styles.reverseColor] : reverseColor && colorful
        },
        className)
    return (
        <div {...rest} className={cls} title={typeof children === 'string' ? children : ''}>

            <span>{children}</span>
            {flag && (
                <span className={styles[flag]}>
                    <Icon type={`caret-${flag}`}/>
                </span>
            )}
        </div>
    )
}


export default Trend