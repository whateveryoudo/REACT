import React from 'react'
import Icon from '../index'
//多色图标
export default class IconFont extends React.Component{
    render(){
         const IconFont = Icon.createFromIconfontCN({
             scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
         });

         return (
             <div className="icons-list">
                <Icon type="smile" theme="twoTone"/>
                <Icon type="smile" theme="filled"/>
                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
             </div>
         )
    }

}