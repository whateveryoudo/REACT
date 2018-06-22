/**
 * @fileName : index.js
 * @author : ykx
 * @createTime : 2018/2/9
 * @desc : 底部操作组件（返回顶部组件,具体看文档额）
 */
import React, { Component } from 'react';
import { BackTop } from 'antd';
import styles from './index.less';
import classnames from 'classnames'
export default class GoTop extends Component {
  render() {
    const { children, className, ...restProps } = this.props;
    const visibilityHeight = 400; //默认显示标签高度
      const iconCls = classnames(styles.ant_back_top_inner,'icon-top');
    return (
      <div className={className} {...restProps}>
        <BackTop
          title="回到顶部"
          visibilityHeight={visibilityHeight}
        >
            <div className={iconCls}/>
          {children}
        </BackTop>
      </div>
    );
  }
}
