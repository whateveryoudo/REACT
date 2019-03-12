import React from 'react'
import Link from 'umi/link';
import {Layout} from 'antd'
import {urlToList} from '../_utils/pathTools'
import BaseMenu,{getMenuMatches} from './BaseMenu'
import classNames from 'classnames'
import styles from './index.less'

const {Sider} = Layout;

const getDefaultCollapsedSubMenus = props => {
    const {
        location : {pathname},
        flatMenuKeys
    } = props;
    return urlToList(pathname)
        .map(item => getMenuMatches(flatMenuKeys,item)[0])
        .filter(item => item);
}

export default class SiderMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openKeys : getDefaultCollapsedSubMenus(props)//获得默认展开的 key数组
        }
    }

    static getDerivedStateFromProps(props,state){
        const {pathname} = state;
        if(props.location.pathname !== pathname){
            //更新openkeys

            return {
                pathname : props.location.pathname,
                openKeys : getDefaultCollapsedSubMenus(props)
            }
        }

        return null;
    }
    isMainMenu = key => {
        const {menuData} = this.props;

        return menuData.some(item => {
            if(key){
                return item.key === key || item.path === key;
            }
            return false;
        })
    }

    handleOpenChange = openKeys => {//这里只展示一个 主的列表 遍历最外层的key, 含有多个 则值设置为即将打开的key(数组的最后一项)
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys : moreThanOne ? [openKeys.pop()] : [...openKeys]
        })

    }
    render() {
        const {logo,fixSiderbar,theme,collapsed,onCollapse} = this.props;
        const {openKeys} = this.state;
        const siderClassName = classNames(styles.sider,{
            [styles.fixSiderbar] : fixSiderbar,
            [styles.light] : theme === 'light'
        });
        const defaultProps = collapsed ? {} : {openKeys};//收起传个{}
        return (
            <Sider
                width={256}
                collapsed={collapsed}
                theme={theme}
                onCollapse={onCollapse}
                breakpoint="lg" //< lg: '992px', 返回收起 否则返回展开
                className={siderClassName}>
                {/*添加默认首页*/}
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt=""/>
                        <h1>Ant Design Pro 2</h1>
                    </Link>
                </div>
                <BaseMenu
                    {...this.props}
                    handleOpenChange={this.handleOpenChange}
                    mode="inline"
                    {...defaultProps}/>
            </Sider>
        )
    }
}