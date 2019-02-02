import React from 'react'
import Link from 'umi/link'
import {Icon} from 'antd'
import GlobalFooter from '@/components/GlobalFooter'


import styles from './UserLayout.less';
import logo from '../assets/logo.svg'
const links = [
    {
        key: 'help',
        title: '帮助',
        href: '',
    },
    {
        key: 'privacy',
        title: '隐私',
        href: '',
    },
    {
        key: 'terms',
        title: '条款',
        href: '',
    },
];
const copyright = (
    <React.Fragment>
        CopyRight <Icon type="copyright"/> 2018-dhb
    </React.Fragment>
)
export default class UserLayout extends React.Component {

    render() {

        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img src={logo} className={styles.logo} alt="log"/>
                                <span className={styles.title}>Ant Design 2</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>Ant Design By Umi</div>
                    </div>
                    {this.props.children}
                </div>
                <GlobalFooter copyright={copyright} links={links}/>
            </div>
        )

    }
}