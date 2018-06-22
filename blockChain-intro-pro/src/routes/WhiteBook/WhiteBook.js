import React from 'react';
import {Button} from 'antd'
import styles from './WhiteBook.less';
import BannerPrimary from '../../components/BannerPrimary'
import Content0 from '../../components/WhiteBook/Content0'

class WhiteBook extends React.Component{
    static propTypes = {

    }
    render(){
        return (
            <div className={styles.normal}>
                <BannerPrimary title="白皮书"/>
                <div className={styles.content_template}>
                    <Content0/>
                </div>
            </div>
        )
    }
}
export default WhiteBook;

