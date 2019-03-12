import React from 'react'
import styles from './index.less'
import Link from 'umi/link'
import {Icon} from 'antd'
import RightContent from './RightContent';


export default class GlobalHeader extends React.Component {
    toggle = () => {
        const { collapsed, onCollapse } = this.props;

        onCollapse(!collapsed);//更新折叠状态


    }
    render() {
        const {collapsed,isMobile,logo} = this.props;
        return (
            <div className={styles.header}>
                {isMobile && (
                    <Link to='/' className={styles.logo} key="logo">
                        <img src={logo} alt="" width="32"/>
                    </Link>
                )}
                <Icon
                    onClick={this.toggle}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    className={styles.trigger}/>

                {/*<RightContent {...this.props}/>*/}
            </div>
        )
    }
}