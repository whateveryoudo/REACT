import React from 'react'
import {connect} from 'dva'
import styles from './GridContent.less'
import classNames from 'classnames'
@connect(({setting}) => ({contentWidth : setting.contentWidth}))
export default class GridContent extends React.PureComponent {

    render() {
        const {contentWidth,children} = this.props;
        const cls = classNames(styles.main,{
            [styles.wide] : contentWidth === 'Fixed'
        });
        return (<div className={{cls}}>{children}</div>)
    }
}