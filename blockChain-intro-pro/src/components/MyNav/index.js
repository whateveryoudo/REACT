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
            isOpen : false,//下拉菜单
            navData : [
                {text : '白皮书',link : '/whiteBook'},
                {text : '矿工入口',link : '/minerEnter'},
                {text : '咨询',link : '/newsList'}
            ]
        }
    }
    componentDidMount(){

        window.addEventListener('scroll',this.listenMoving)
    }
    //注意这里要清楚事件 监听
    componentWillUnmount(){
        window.removeEventListener('scroll',this.listenMoving);
    }
    /*
     * @name listenMoving
     * @param
     * @description  监听界面滚动
     */
    listenMoving = () => {
        const self = this;
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
    }
    /*
     * @name handleToggle
     * @param
     * @description  切换菜单显示隐藏
     */
    handleToggle = flag => {
        if(typeof flag === 'boolean'){
            this.setState({
                isOpen : flag
            })
        }else{
            this.setState({
                isOpen : !this.state.isOpen
            })
        }

    }

    render(){

        const {isMobile} = this.props;
        const {navData} = this.state;
        const navChildren = navData.map((item,index) => {
            return (<Item key={index}><Link to={item.link}>{item.text}</Link></Item>)
        })
        const navCls = classnames(styles.nav_wrapper,this.state.movingFlag ? styles.moving : '');
        const miniLogoWrapperCls = classnames(styles.textLogo,this.state.isOpen ? styles.open : '');
        const miniWrapperCls = classnames(styles.nav_phone_wrapper,this.state.isOpen ? styles.open : '');
        //手机端顶部显示
        const miniContent = (
            <div className={miniWrapperCls}>

                <div onClick={this.handleToggle} className={styles.nav_phone_bar}>
                    <em />
                    <em />
                    <em />
                </div>
                <TweenOne
                    animation={{opacity: 0,type : 'from',ease : 'easeOutQuad'}}
                    key="mini-menu"
                    className={styles.nav_phone_text}>
                    <Menu mode="inline" theme="dark">
                        {navChildren}
                    </Menu>
                </TweenOne>
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
                className={miniLogoWrapperCls}
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
