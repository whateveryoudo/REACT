import React from 'react'
import Icon from '../index'
//iconfont自定义图标
export default class IconFont extends React.Component{
    render(){
         const IconFont = Icon.createFromIconfontCN({
             scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
         });

         return (
             <div className="icons-list">
                 <IconFont type="icon-tuichu" />
                 <IconFont type="icon-facebook" />
                 <IconFont type="icon-twitter" />
             </div>
         )
    }

}