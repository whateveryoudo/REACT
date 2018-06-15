/**
 * @fileName : index.js
 * @author : ykx 
 * @createTime : 2018/6/13
 * @desc : 顶部header
 */
import React,{PureComponent} from 'react'
import styles from './index.less'
import TweenOne from 'rc-tween-one'
import {Menu} from 'antd'

const Item = Menu.Item;
export default class MyNav extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            navData : [
                {text : '白皮书',link : '/'},
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
        <TweenOne
            key='nav-wrapper'
            animation={{ opacity:0,type : 'from'}}
            className={styles.nav_wrapper}>
            {/*文字logo*/}
            <TweenOne
                key='nav-logo'
                className={styles.textLogo}
                animation={{x : -30,type : 'from',ease : 'easeOutQuad'}}>
                <a  href="/" >
                    北斗链
                    <sup>TM</sup>
                </a>
            </TweenOne>
            {/*菜单项*/}
            <TweenOne
                key='nav-menu'
                animation={{x : 30,type : 'from',ease : 'easeOutQuad'}}
                className={styles.nav_menu_wrapper}>
                <Menu mode="horizontal">
                    {navChildren}
                </Menu>
            </TweenOne>
        </TweenOne>
        )
    }
}
