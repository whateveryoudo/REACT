import React from 'react'
import config from '@/commons/config-hoc'
import {
    Icon,
    Tooltip
} from 'antd'

@config({
    event: true,
    connect: state => ({
        local : state.system.i18n.setting
    })
})
export default class HeaderFullScreen extends React.Component {
    state = {
        fullScreen : false,
        toolTipVisible : false
    }
    componentDidMount(){
        //返回当前文档中正在以全屏模式显示的Element节点,如果没有使用全屏模式,则返回null.（用来判断是否是全屏模式）
        let fullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
        //监听全屏变化
        this.props.addEventListener(document,'fullscreenchange',this.handleFullScreenChange);
        this.props.addEventListener(document,'mozfullscreenchange',this.handleFullScreenChange);
        this.props.addEventListener(document,'webkitfullscreenchange',this.handleFullScreenChange);
        this.props.addEventListener(document,'msfullscreenchange',this.handleFullScreenChange);
        this.props.addEventListener(document,'click',() => this.handleToolTipHide(0));
        this.setState({
            fullScreen : !!fullScreen
        })
    }
    handleFullScreenChange = () => {
        const {fullScreen} = this.state;
        this.setState({
            fullScreen: !fullScreen
        })
    }
    handleFullScreenClick = () => {
        const {fullScreen} = this.state;
        if(fullScreen){//全屏模式（退出）
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }else{//开启全屏模式
            const element = document.documentElement;//？？
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullScreen();
            }
        }
    }
    handleToolTipShow = () => {
        if(this.timer){clearTimeout(this.timer)}
        this.setState({
            toolTipVisible: true
        })
    }
    handleToolTipHide = (time = 300) => {
        this.timer = setTimeout(() => {
            this.setState({
                toolTipVisible: false
            })
        },time)
    }
    render() {
        const {className} = this.props;
        const {fullScreen,toolTipVisible} = this.state;
        return (
            <div
                style={{padding: '0 16px'}}
                className={className}
                onClick={this.handleFullScreenClick}
                onMouseEnter={this.handleToolTipShow}
                onMouseLeave={() => {this.handleToolTipHide()}}
            >
                <Tooltip
                    visible={toolTipVisible}
                    placement="bottom"
                    title="全屏显示控制"
                >
                    <div style={{
                        height:'30px',
                        lineHeight:'30px',
                        paddingTop:2,
                        fontSize:18
                    }}>
                        {fullScreen ? (
                            <Icon type="fullscreen-exit"/>
                        ) : (
                            <Icon type="fullscreen"/>
                        )}
                    </div>
                </Tooltip>
            </div>
        )
    }
}