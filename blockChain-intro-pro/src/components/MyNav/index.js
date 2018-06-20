/**
 * @fileName : index.js
 * @author : ykx 
 * @createTime : 2018/6/13
 * @desc : 顶部header
 */
import React,{PureComponent} from 'react'
import styles from './index.less'
import {Link} from 'dva/router'
import TweenOne from 'rc-tween-one'
import classnames from 'classnames'
import {Menu} from 'antd'

const Item = Menu.Item;
export default class MyNav extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            boundary : 100,
            movingFlag : false,
            navData : [
                {text : '白皮书',link : '/whiteBook'},
                {text : '矿工入口',link : '/'},
                {text : '咨询',link : '/'}
            ]
        }
    }
    componentDidMount(){
        const self = this;
        window.addEventListener('scroll',function () {
            const _top = document.documentElement.scrollTop||document.body.scrollTop;
            if(_top > self.state.boundary){
                self.setState({
                    movingFlag : true
                })
            }else{
                self.setState({
                    movingFlag : false
                })
            }
        })
    }
    render(){
        const {isMobile} = this.props;
        const {navData} = this.state;
        const navChildren = navData.map((item,index) => {
            return (<Item key={index}><Link to={item.link}>{item.text}</Link></Item>)
        })
        const navCls = classnames(styles.nav_wrapper,this.state.movingFlag ? styles.moving : '');
        //手机端顶部显示
        const miniContent = (
            <div className={styles.nav_phone_wrapper}>
                <div className={styles.nav_phone_bar}>
                    <em />
                    <em />
                    <em />
                </div>
            </div>
        )
        //PC显示
        const middleContent = (
            <TweenOne
                key='nav-menu'
                animation={{x : 30,type : 'from',ease : 'easeOutQuad'}}
                className={styles.nav_menu_wrapper}>
                <Menu mode="horizontal">
                    {navChildren}
                </Menu>
            </TweenOne>
        )
        return (
        <TweenOne
            key='nav-wrapper'
            animation={{ opacity:0,type : 'from'}}
            className={navCls}>
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
            {isMobile ? miniContent : middleContent}
        </TweenOne>
        )
    }
}
