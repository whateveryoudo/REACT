import React from 'react'
import {Icon,Tooltip} from 'antd'
import config from '@/commons/config-hoc'
import {loadScript} from '@/commons';
import ColorPicker from '@/components/color-picker'
import theme from '@/theme';
import './style.less'

@config({
    event: true,
    connect : state => {

        return {
            primaryColor : state.system.primaryColor,
            local : state.system.i18n.setting
        }
    }
})

export default class ThemeColorPicker extends React.Component {
    constructor(...props){
        super(...props);


        const themeStyleColor = window.localStorage.getItem('theme-style-color');
        if(themeStyleColor){
            const themeStyle = document.createElement('style');
            themeStyle.id = 'less:color:old';
            themeStyle.type = 'text/css'
            themeStyle.innerHTML = themeStyleColor;
            document.body.insertBefore(themeStyle,document.body.firstChild)
        }
        if(this.props.primaryColor){
            this.handleColorChange(this.props.primaryColor);
        }
        this.props.addEventListener(document,'click',() => this.handleToolTipHide(0))
    }
    state = {
        toolTipVisible : false
    }

    handleToolTipShow = () => {
        if(this.timer){clearTimeout(this.timer)}
        this.setState({
            toolTipVisible : true
        })
    }
    handleToolTipHide = (time = 300) => {
        this.timer = setTimeout(() => {
            this.setState({
                toolTipVisible : false
            })
        },time)
    }
    //监听选择颜色改变
    handleColorChange = (color) => {
        const changeColor = () => {
            debugger;
            window.less
                .modifyVars({
                    ...theme,
                    '@primary-color': color
                }).then(() => {
                    //设置完成
                    Icon.setTwoToneColor({primaryColor:color});
                    //更新redux color
                    this.props.action.system.setPrimaryColor(color);

                    const oldStyle = document.getElementById('less:color:old');
                    if(oldStyle){oldStyle.remove()}


                    const lessColor = document.getElementById('less:color');
                    if(!lessColor){return}


                    document.body.insertBefore(lessColor,document.body.firstChild);

                    window.localStorage.setItem('theme-style-content',lessColor.innerHTML);

                })
        }
        const lessUrl = '/less.js';
        if(this.lessLoaded){//less.min.js加载完毕
            changeColor();//修改主题
        }else{
            window.less = {
                logLevel : 2,
                async : true,
                javascriptEnabled:true,
                modifyVars:{
                    ...theme,
                    '@primary-color': color,
                }
            }
            loadScript(lessUrl).then(() => {
                this.lessLoaded = true;
                changeColor();
            })

        }


    }
    render() {
        const {
            primaryColor,
            className,
            local
        } = this.props;
        const {toolTipVisible} = this.state;
        return (
            <div styleName='root' className={`theme-color-picker ${className}`}>
                <Tooltip
                    placement="bottom"
                    title={local.selectPrimaryColor}
                    visible={toolTipVisible}
                >
                    <div
                        styleName='picker'
                        onMouseEnter={this.handleToolTipShow}
                        onMouseLeave={() => this.handleToolTipHide()}
                    >
                        <ColorPicker
                            type="sketch"
                            small
                            color={primaryColor}
                            position="bottom"
                            presetColors={[
                                '#F5222D',
                                '#FA541C',
                                '#FA8C16',
                                '#FAAD14',
                                '#FADB14',
                                '#A0D911',
                                '#52C41A',
                                '#13C2C2',
                                '#1890FF',
                                '#2F54EB',
                                '#722ED1',
                                '#EB2F96',
                            ]}
                            onChangeComplete={this.handleColorChange}
                        />
                    </div>
                </Tooltip>
                <Icon type="caret-down" style={{marginLeft:4}}/>
            </div>
        )
    }
}