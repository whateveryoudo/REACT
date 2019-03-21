import React from 'react'
import {Icon,Tooltip} from 'antd'
import config from '@/commons/config-hoc'
import ColorPicker from '@/components/color-picker'
import './index.less'

@config({
    connect : state => {

        return {
            primaryColor : state.system.primaryColor,
            local : state.system.i18n.setting
        }
    }
})

export default class ThemeColorPicker extends React.Component {
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
    handleColorChange = () => {

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