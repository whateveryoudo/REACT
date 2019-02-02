import React from 'react'
import {Icon} from 'antd'
import classNames from 'classnames'
import styles from './index.less'
const NumberInfo = ({title,subTitle,total,theme,suffix,status,subTotal,gap,...rest}) => {
    return (
        <div className={classNames(styles.numberInfo,{
            [styles[`numberInfo${theme}`]] : theme //添加选中样式
        })} {...rest}>
            {title && (
                <div
                    className={styles.numberInfoTitle}
                    title={typeof title === 'string' ? title : ''}
                >
                    {title}
                </div>
            )}

            {subTitle && (
                <div
                    className={styles.numberInfoSubTitle}
                    title={typeof subTitle === 'string' ? subTitle : ''}
                >
                    {subTitle}
                </div>
            )}

            <div
                className={styles.numberInfoValue}
                style={gap ? {marginTop : gap} : null}
            >
                <span>
                    {total}
                    {suffix && (<em className={styles.suffix}>{suffix}</em>)}
                </span>
                {(status || subTotal) && (
                    <span className={styles.subTotal}>
                        {subTotal}
                        {status && (<Icon type={`caret-${status}`}/>)}
                    </span>
                )}

            </div>
        </div>
    )
}

export default NumberInfo
