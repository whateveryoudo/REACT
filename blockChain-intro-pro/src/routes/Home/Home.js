import React from 'react';
import { connect } from 'dva';
import {Button} from 'antd'
import styles from './Home.less';
import MyNav from '../../components/MyNav'
import Banner from '../../components/Banner'
import Content0 from '../../components/Content/Content0'
import Content1 from '../../components/Content/Content1'
/*通用左右布局类型*/
import Content3 from '../../components/Content/Content3'

class Home extends React.Component{
    static propTypes = {

    }
    state = {
        //左右内容区
        mainConData : [
            {
                imgData : 'http://www.beidouchain.com/wp-content/uploads/2018/03/交易逻辑定位图.png',
                infoData : {
                    title : '交易引擎的逻辑定位',
                    desc : "从逻辑上分析，我们在区块链的逻辑层和数据层之间，增加了一个规则层，交易引擎就在规则层。它的目的就是对众多的交易模型进行抽象，向合约层提供接口，避免合约对数据结构的直接操作，从而增加安全性。"
                }
            }
        ]
    };
    render(){
        return (
            <div className={styles.normal}>
                <Banner>
                    <MyNav key="mynay"/>
                </Banner>
                <div className={styles.content_template}>
                    <Content0/>
                </div>
                <div style={{ background: "url('http://www.beidouchain.com/wp-content/uploads/2018/03/bg-2-1.jpg')"}}>
                    <Content1/>
                </div>
                {
                    this.state.mainConData.map((item,i) => (<Content3 key={i} {...item}/>))
                }
                {/*<Button type="primary">测试按钮</Button>*/}
            </div>
        )
    }
}


export default connect()(Home);
