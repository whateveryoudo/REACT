import React from 'react';
import { connect } from 'dva';
import {Button} from 'antd'
import styles from './index.less';
import BannerPrimary from '../../components/BannerPrimary'
import Content0 from '../../components/Minter/Content0'

class News extends React.Component{
    static propTypes = {

    }
    render(){

        return (
            <div className={styles.normal}>
                <BannerPrimary title="资讯"/>
                <div className={styles.content_template}>
                    <Content0/>
                </div>
            </div>
        )
    }
}
export default News;

