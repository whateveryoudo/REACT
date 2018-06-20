import React from 'react';
import { connect } from 'dva';
import {Button} from 'antd'
import styles from './Home.less';
import MyNav from '../../components/MyNav'
import Banner from '../../components/Banner'

import { enquireScreen } from 'enquire-js';
import Content0 from '../../components/Content/Content0'
import Content1 from '../../components/Content/Content1'
/*通用左右布局类型*/
import Content2 from '../../components/Content/Content2'


import Content3 from '../../components/Content/Content3'

import Footer from '../../components/Footer'

class Home extends React.Component{
    static propTypes = {

    }
    componentDidMount(){
        enquireScreen(b => {
            this.props.dispatch({
                type : 'global/updateIsMobile',
                payload : b
            })
        })
    }
    state = {
        //左右内容区
        mainConData : [
            {
                type : 'toRight',//排列位置 左到右(图片,信息)
                imgData : 'http://www.beidouchain.com/wp-content/uploads/2018/03/交易逻辑定位图.png',
                infoData : {
                    title : '交易引擎的逻辑定位',
                    desc : "从逻辑上分析，我们在区块链的逻辑层和数据层之间，增加了一个规则层，交易引擎就在规则层。它的目的就是对众多的交易模型进行抽象，向合约层提供接口，避免合约对数据结构的直接操作，从而增加安全性。"
                }
            },
            {
                background : '#f8f8f8',
                overClassName : 'content_bg',
                type : 'toLeft',//排列位置 左到右(图片,信息)
                imgData : 'http://www.beidouchain.com/wp-content/uploads/2018/03/未标题-6-1.jpg',
                infoData : {
                    title : '交易引擎的物理定位',
                    desc : '交易引擎的物理分布是分为两个部分，“交易的执行”是在区块链上，“交易的定义”是在企业应用系统上（ERP或CRM系统等）。这种模式下，交易的定义和交易的执行是分开的，可以从根本上避免“程序员作恶”的问题。'
                }
            },
            {

                type : 'toRight',//排列位置 左到右(图片,信息)
                imgData : 'http://www.beidouchain.com/wp-content/uploads/2018/03/3.png',
                infoData : {
                    title : '智能合约与交易引擎的差异',
                    desc : '事实上，我们在日常生活中遇到的资产交易类合同大部分都是格式合同，比如购房、买车、购买保险或理财产品等。这些合同往往是由政府主管部门或者行业组织负责编写，对交易双方的安全都是一种保护。'
                }
            }
        ]
    };
    render(){
        const {
            isMobile
        } = this.props;
        return (
            <div className={styles.normal}>
                <Banner isMobile={isMobile}>
                    <MyNav isMobile={isMobile} key="mynav"/>
                </Banner>
                <div className={styles.content_template}>
                    <Content0/>
                </div>
                <div style={{ background: "url('http://www.beidouchain.com/wp-content/uploads/2018/03/bg-2-1.jpg')"}}>
                    <Content1/>
                </div>
                {
                    this.state.mainConData.map((item,i) => {
                        if(item.background){
                            return (
                                <div key={i} style={{background : item.background}}>
                                    <Content2  {...item}/>
                                </div>
                                )
                        }
                        return (<Content2 key={i} {...item}/>);
                    })
                }
                <div style={{ background: "url('http://www.beidouchain.com/wp-content/uploads/2018/03/bg-3.jpg')"}}>
                    <Content3/>
                </div>

                <Footer/>
            </div>
        )
    }
}


export default connect(state => {
    return {
        isMobile : state.global.isMobile
    }
})(Home);
