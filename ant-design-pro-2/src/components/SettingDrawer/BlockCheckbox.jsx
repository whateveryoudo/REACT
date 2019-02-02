import React from 'react'
import {Tooltip,Icon} from 'antd'
import styles from './index.less'

const BlockCheckbox = ({list,value,onChange}) => {
    return (
        <div className={styles.blockChecbox}>
            {list.map(item => {
                return (
                        <Tooltip key={item.key} title={item.title}>
                            <div className={styles.item} onClick={() => onChange(item.key)}>
                                <img src={item.url} alt={item.key}/>
                                <div className={styles.selectIcon}
                                     style={{
                                         display : value === item.key ? 'block' : 'none'
                                     }}>
                                    <Icon type="check"/>
                                </div>
                            </div>
                        </Tooltip>
                    )
            })}
        </div>
    )
}
export default  BlockCheckbox;