import React from 'react'
import {Tabs,Skeleton} from 'antd'
import BreadcrumbView from './breadcrumb'
import classNames from 'classnames'
import styles from './index.less'
const {TabPane} = Tabs;
export default class PageHeader extends React.Component {
    onChange = key => {
        const {onTabChange} = this.props;
        if(onTabChange){
            onTabChange(key);
        }
    }
    render() {
        const {
            logo,
            action,
            title,
            content,
            extraContent,
            tabActiveKey,
            hiddenBreadcrumb = false,
            tabDefaultActiveKey,
            tabList,
            className,
            loading = false,
            tabBarExtraContent,
            wide = false
        } = this.props;
        const cls = classNames(styles.pageHeader,className);
        const activeKeyProps = {};
        if(tabDefaultActiveKey !== undefined){
            activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
        }
        if(tabActiveKey !== undefined){
            activeKeyProps.activeKey = tabActiveKey;
        }
        return (
            <div className={cls}>
                <div className={wide ? styles.wide : ''}>

                    <Skeleton
                        loading={loading}
                        title={false}
                        paragraph={{row : 3}}
                        avatar={{size : 'large',shape : 'circle'}}
                    >
                        {hiddenBreadcrumb ? null : <BreadcrumbView {...this.props}/>}
                        <div className={styles.detail}>
                            {logo && <div className={styles.logo}>{logo}</div>}
                            <div className={styles.main}>
                                <div className={styles.row}>
                                    {title && (<div className={styles.title}>{title}</div>)}
                                    {action && (<div className={styles.action}>{action}</div>)}
                                </div>
                                <div className={styles.row}>
                                    {content && (<div className={styles.content}>{content}</div>)}
                                    {extraContent && (<div className={styles.extraContent}>{extraContent}</div>)}
                                </div>
                            </div>
                        </div>
                        {tabList && tabList.length ? (
                            <Tabs
                                className={styles.tabs}
                                {...activeKeyProps}
                                onChange={this.onChange}
                                tabBarExtraContent={tabBarExtraContent}
                            >
                                {tabList.map(item => (
                                    <TabPane tab={item.tab} key={item.key}/>
                                ))}
                            </Tabs>
                        ) : null}
                    </Skeleton>
                </div>
            </div>
        )

    }
}