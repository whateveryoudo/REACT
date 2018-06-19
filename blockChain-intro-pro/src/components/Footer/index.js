/**
 * @fileName : index.js
 * @author : ykx 
 * @createTime : 2018/6/13
 * @desc : 底部footer
 */
import React,{PureComponent} from 'react'
import styles from './index.less'
import TweenOne from 'rc-tween-one'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import {Menu} from 'antd'

const Item = Menu.Item;
export default class Footer extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            navData : [
                {text : '白皮书',link : '/whiteBook'},
                {text : '矿工入口',link : '/'},
                {text : '咨询',link : '/'}
            ]
        }
    }
    render(){
        const {navData} = this.state;
        const navChildren = navData.map((item,index) => {
            return (<Item key={index}>{item.text}</Item>)
        })
        return (
        <OverPack playScale={0.05} className={styles.footer_wrapper}>

                {/*文字logo*/}
                <TweenOne
                    key='nav-logo'
                    className={styles.textLogo}
                    animation={{x : '-=30',type : 'from',ease : 'easeOutQuad'}}>
                    <a  href="/" >
                        北斗链
                        <sup>TM</sup>
                    </a>
                    <div className={styles.nav_menu_wrapper} >
                        <Menu mode="horizontal">
                            {navChildren}
                        </Menu>
                    </div>
                </TweenOne>
                {/*菜单项*/}
                <TweenOne
                    key='nav-menu'
                    className={styles.right_wrapper}
                    animation={{x : '+=30',type : 'from',ease : 'easeOutQuad'}}>
                    © 2017 <a href="http://www.miitbeian.gov.cn/" target="_blank">豫ICP备12021065号</a>
                </TweenOne>
        </OverPack>

        )
    }
}
