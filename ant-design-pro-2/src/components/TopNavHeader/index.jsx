import React, { PureComponent } from 'react'
import Link from 'umi/link';
import styles from './index.less'
import classNames from "classnames";
import BaseMenu from '../SiderMenu/BaseMenu';
import {getFlatMenuKeys} from '../SiderMenu/index.jsx';

export default class TopNavHeader extends PureComponent {
    state = { maxWidth: undefined };
    static getDerivedStateFromProps(nextProps, prevState) {
      return {
          maxWidth : (nextProps.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40
      }
    }
    render() {
        const {theme,contentWidth,logo,menuData} = this.props;
        const {maxWidth} = this.state;
        const headCls = classNames(styles.header,{
            [styles.light] : theme === 'light'
        })
        const contentWCls = classNames(styles.main,{
            [styles.wide] : contentWidth === 'Fixed'
        })
        return (
            <div className={headCls}>
                <div className={contentWCls}>
                    <div className={styles.left}>
                        <div className={styles.logo}>
                            <Link to='/'>
                                <img src={logo} alt="logo"/>
                                <h1>Ant Design Pro 2</h1>
                            </Link>
                        </div>
                        <div style={{maxWidth}}>
                            <BaseMenu flatMenuKeys={getFlatMenuKeys(menuData)}  {...this.props} style={{border : 'none',height:64}}/>
                        </div>
                    </div>
                </div>
               
            </div>
        );
    }
}