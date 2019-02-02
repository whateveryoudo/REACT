import React from 'react'
import classNames from 'classnames'
import styles from './index.less'

const GlobalFooter = ({className,links,copyright}) => {
    const clsString = classNames(styles.globalFooter,className);
    return (
        <div className={clsString}>
            {links && (
                    <div className={styles.links}>
                        {links.map(link => {
                            const {href,key,title} = link;
                            return (
                                <a target={link.blankTarget ? '_black' : '_self'} href={href} title={title} key={key}>
                                    {title}
                                </a>
                            )
                        })}
                    </div>
            )}
            {copyright && (<div className={styles.copyright}>{copyright}</div>)}
        </div>
    )
}

export default GlobalFooter