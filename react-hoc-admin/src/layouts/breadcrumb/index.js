import React from 'react'
import {Breadcrumb,Icon} from 'antd'
import Link from '../page-link'
import './style.less'
const Item = Breadcrumb.Item;


const BreadcrumbComponent = ({dataSource = []}) => {
    const renderItems = () => {
        const iconStyle = {marginRight : 4};
        if(dataSource && dataSource.length){
            return dataSource.map(item => {
                const {key,icon,text,path} = item;
                if(path){
                    return (
                        <Item key={key}>
                            <Link to={path}>
                                {icon ? <Icon type={icon} style={iconStyle}/> : null}
                                {text}
                            </Link>
                        </Item>
                    )
                }

                return (
                    <Item key={key}>
                        {icon ? <Icon type={icon} style={iconStyle}/> : null}
                        {text}
                    </Item>
                )
            })
        }
        return null;
    }
    return (
        <div styleName="breadcrumb">
            <Breadcrumb>
                {renderItems()}
            </Breadcrumb>
        </div>
    )
}


export default BreadcrumbComponent