import React from 'react'
import GridContent from './GridContent'
import PageHeader from '../PageHeader'
import {FormattedMessage} from 'umi/locale'
import Link from 'umi/link'
import MenuContext from '@/layouts/MenuContext'
import styles from './index.less'

const PageHeaderWrapper = ({children,contentWidth,wrapperClassName,top,...restProps}) => (
    <div style={{margin:'-24px -24px 0'}} className={wrapperClassName}>
        {top}
        <MenuContext.Consumer>
            {value => (
                <PageHeader
                    wide={contentWidth === 'fixed'}
                    home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
                    {...value}
                    key="pageheader"
                    {...restProps}
                    linkElement={Link}
                    itemRender={item => {
                        if(item.locale){
                            return (<FormattedMessage id={item.locale} defaultMessage={item.name}/>)
                        }
                        return item.name;
                    }}
                />
            )}
        </MenuContext.Consumer>
        {children ? (
            <div className={styles.content}>
                <GridContent>{children}</GridContent>
            </div>
        ) : null}
    </div>
)


export default PageHeaderWrapper