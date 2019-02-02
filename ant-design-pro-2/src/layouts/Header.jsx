import React from 'react'
import { connect } from 'dva';
import { Layout } from "antd";
import GlobalHeader from '@/components/GlobalHeader'
import TopNavHeader from '@/components/TopNavHeader/index.jsx'
import Animate from 'rc-animate';
import Authorized from '@/components/Authorized'
import styles from './Header.less'
const {Header} = Layout;
@connect(({setting,global}) => ({
    setting,
    collapsed : global.collapsed
}))
export default class HeaderView extends React.PureComponent {
    state = {
        visible : true
    }

    componentDidMount(){
        //监听界面滚动
        document.addEventListener('scroll',this.handleScroll);
    }
    componentWillUnmount(){
        //移除监听事件
        document.removeEventListener('scroll',this.handleScroll);
    }
    handleScroll = () => {
        const {autoHideHeader} = this.props;
        const {visible} = this.state;
        if(!autoHideHeader){
            return;
        }
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        if(!this.ticking){
            //执行显示隐藏header动画
            this.ticking = true;

            requestAnimationFrame(() => {
                if(this.oldScrollTop > scrollTop){//向上滚动了
                    this.setState({visible : true})
                };
                if(scrollTop > 300 && visible){
                    this.setState({visible : false})
                }

                if(scrollTop < 300 && !visible){
                    this.setState({visible : true})
                }

                this.oldScrollTop = scrollTop;//保留此次滚动高度
                this.ticking = false;
            })
        }

    }
    handleNotiveClear = type => {

    }
    handleMenuClick = ({key}) => {

    }
    handleNoticeVisibleChange = visible => {

    }
    //获取内容头部宽度
    getHeadWidth = () => {
        const {isMobile,collapsed,setting} = this.props;
        const {fixedHeader,layout} = setting;

        //3种状态情况下   1.手机形式 2.非固定头  3.顶部menu形式

        if(isMobile || !fixedHeader || layout === 'topmenu'){
            return '100%'
        }

        //左边显示菜单非固定左边
        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
    }
    render() {
        const {handleMenuCollapse,setting,isMobile} = this.props;
        const {layout,navTheme,fixedHeader} = setting;
        const isTop = layout === 'topmenu';
        const {visible} = this.state;
        const width = this.getHeadWidth();
        const HeaderDom = visible ?(
            <Header style={{padding:0,width}} className={fixedHeader ? styles.fixedHeader : ''}>
                {isTop && !isMobile ? (
                    <TopNavHeader
                    theme={navTheme}
                    mode="horizontal"
                    Authorized={Authorized}
                    onCollapse={handleMenuCollapse}
                    {...this.props}/>
                ) : (
                    <GlobalHeader
                    onNoticeClear={this.handleNotiveClear}
                    onMenuClick={this.handleMenuClick}

                    onNoticeVisibleChange={this.handleNoticeVisibleChange}
                    onCollapse={handleMenuCollapse}
                    {...this.props}/>
                )}
            </Header>
           
        ) : null;
        return (
            //visible 改变 fade动画
            <Animate transitionName="fade" component="">
                {HeaderDom}
            </Animate>
        )
    }
}

