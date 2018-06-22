import React from 'react';
import { connect } from 'dva';
import {Button} from 'antd'
import styles from './MinerEnter.less';
import BannerPrimary from '../../components/BannerPrimary'
import Content0 from '../../components/Minter/Content0'

class WhiteBook extends React.Component{
    static propTypes = {

    }
    render(){

        return (
            <div className={styles.normal}>
                <BannerPrimary title="矿工招募"/>
                <div className={styles.content_template}>
                    <Content0/>
                </div>
            </div>
        )
    }
}
export default WhiteBook;

