import React,{PureComponent} from 'react'
import {Drawer,Icon,Divider,message,List,Select,Switch,Button,Tooltip} from 'antd'
import { formatMessage } from 'umi/locale'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {connect} from 'dva'
import omit from 'omit.js'
import styles from './index.less'
import BlockCheckbox from './BlockCheckbox'
import ThemeColor from './ThemeColor.js'

const Option = Select.Option;
const BlockItem = ({children,title,style}) => {
    return (
        <div style={{...style,marginBottom:24}}>
        <h3  className={styles.title}>{title}</h3>
            {children}
        </div>
    )
}
@connect(({setting}) => ({setting}))
export default class SettingDrawer extends PureComponent{
    state = {
        collapse : false
    }
    toggleDrawer = () => {
        const {collapse} = this.state;
        this.setState({
            collapse : !collapse
        })
    }
    changeSetting = (key,value) => {
        const {setting} = this.props;

        const nextState = {...setting};
        nextState[key] = value;

        this.setState(nextState,() => {
            const {dispatch} = this.props;
            //修改props
            dispatch({
                type : 'setting/changeSetting',
                payload : this.state
            })
        })
    }
    //layoutsetting 渲染数据源
    getLayoutSetting = () => {
        const {
            setting : {contentWidth,fixedHeader,autoHideHeader,layout,fixSiderbar}
        } = this.props;
        return [
            //顶部menu下  布局方式设置
            {
                title : formatMessage({id : 'app.setting.content-width'}),
                action : (
                    <Select
                        size="small"
                        value={contentWidth}
                        onSelect={value => this.changeSetting('contentWidth',value)}
                        style={{width:80}}
                    >
                        {layout === 'sidemenu' ? null : (
                            <Option value="Fixed">
                                {formatMessage({id : 'app.setting.content-width.fixed'})}
                            </Option>
                        )}

                        <Option value="Fluid">
                            {formatMessage({id : 'app.setting.content-width.fluid'})}
                        </Option>
                    </Select>
                )
            },
            //固定header设置(这里1 0  转换为true/false)
            {
                title : formatMessage({id : 'app.setting.fixedheader'}),
                action : (
                    <Switch
                        size="small"
                        onChange={checked => this.changeSetting('fixedHeader',checked)}
                        checked={!!fixedHeader}/>
                )
            },
            //下滑时隐藏header(固定header模式下使用)
            {
                title: formatMessage({id: 'app.setting.hideheader'}),
                disabled : !fixedHeader,
                disabledReason : formatMessage({id : 'app.setting.hideheader.hint'}),
                action: (
                    <Switch
                        size="small"
                        onChange={checked => this.changeSetting('autoHideHeader', checked)}
                        checked={!!autoHideHeader}
                    />
                )
            },
            //siderbar
            {
                title : formatMessage({id : 'app.setting.fixedsidebar'}),
                disabled : layout === 'topmenu',
                disabledReason : formatMessage({id : 'app.setting.fixedsidebar.hint'}),
                action : (
                    <Switch
                        size="small"
                        onChange={checked => this.changeSetting('fixSiderbar',checked)}
                        checked={!!fixSiderbar}/>
                )
            },

        ]
    }
    //渲染方法
    renderLayoutSettingItem = item => {
        const action = React.cloneElement(item.action,{
            disabled : item.disabled
        })

        return (
            <Tooltip
                title={item.disabled ? item.disabledReason : ''}
                placement="left"
            >
                <List.Item actions={[action]}>
                    <span style={{opacity : item.disabled ? '0.5' : ''}}>{item.title}</span>
                </List.Item>
            </Tooltip>
        )
    }
    render(){
        const {collapse} = this.state;
        const {setting} = this.props;
        const {navTheme,primaryColor,layout,colorWeak} = setting;
        const handleElem = (
            <div className={styles.handle}>
                <Icon 
                style={{color:'#fff',fontSize:20}}
                type={collapse ? 'close' : 'setting'}/>
            </div>
        )
      

        const colorStyleList = [
            {key : 'dark',url : 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',title : formatMessage({id : 'app.setting.pagestyle.dark'})},
            {key : 'light',url : 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',title : formatMessage({id : 'app.setting.pagestyle.light'})},
        ]

        const positionList = [
            {
              key: 'sidemenu',
              url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
              title: formatMessage({ id: 'app.setting.sidemenu' }),
            },
            {
              key: 'topmenu',
              url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
              title: formatMessage({ id: 'app.setting.topmenu' }),
            },
          ];
       
        return (
            <Drawer 
            width={300}
            onClose={this.toggleDrawer}
            placement="right"
            handler={handleElem}
            onHandleClick={this.toggleDrawer}
             visible={collapse}>
                <div className={styles.content}>
                    <BlockItem title={formatMessage({id : 'app.setting.pagestyle'})}>
                        <BlockCheckbox
                            value={navTheme}
                            onChange={value => this.changeSetting('navTheme',value)}
                            list={colorStyleList}/>
                    </BlockItem>
                    <ThemeColor 
                        value={primaryColor}
                        onChange={color => this.changeSetting('primaryColor',color)}
                        title={formatMessage({id : 'app.setting.themecolor'})}/>
                    <Divider/>
                    <BlockItem title={formatMessage({id : 'app.setting.navigationmode'})}>
                        <BlockCheckbox
                            value={layout}
                            onChange={value => this.changeSetting('layout',value)}
                            list={positionList}/>
                    </BlockItem>
                    {/*设置列表渲染*/}
                    <List split={false}
                          renderItem={this.renderLayoutSettingItem}
                          dataSource={this.getLayoutSetting()}/>
                    <Divider/>
                    {/*色弱模式开关*/}
                    <BlockItem title={formatMessage({id : 'app.setting.othersettings'})}>
                        <List.Item
                            actions={[
                                <Switch
                                    size="small"
                                    onChange={checked => this.changeSetting('colorWeak',checked)}
                                    checked={!!colorWeak}/>
                            ]}>
                            {formatMessage({id : 'app.setting.weakmode'})}
                        </List.Item>
                    </BlockItem>
                    <Divider />
                    {/*拷贝配置信息*/}
                    <CopyToClipboard
                        onCopy={() => message.success(formatMessage({id : 'app.setting.copyinfo'}))}
                        text={omit(setting,['colorWeak'])}>
                        <Button block icon="copy">
                            {formatMessage({id : 'app.setting.copy'})}
                        </Button>
                    </CopyToClipboard>


                </div>
            </Drawer>
        )
    }
}
