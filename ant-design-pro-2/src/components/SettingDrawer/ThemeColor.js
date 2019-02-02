import React, { Component } from 'react'
import {Tooltip, Icon} from 'antd'
import { formatMessage } from 'umi/locale';
import styles from './ThemeColor.less'
const Tag = ({color,check,...rest}) => {
    return (<div {...rest} style={{backgroundColor : color}}>
        {check ? <Icon type="check"/> : ''}
    </div>)
}

const ThemeColor = ({colors,value,onChange,title}) => {
    let colorList = colors;
    if(!colors){
        colorList = [
            {
              key: 'dust',
              color: '#F5222D',
            },
            {
              key: 'volcano',
              color: '#FA541C',
            },
            {
              key: 'sunset',
              color: '#FAAD14',
            },
            {
              key: 'cyan',
              color: '#13C2C2',
            },
            {
              key: 'green',
              color: '#52C41A',
            },
            {
              key: 'daybreak',
              color: '#1890FF',
            },
            {
              key: 'geekblue',
              color: '#2F54EB',
            },
            {
              key: 'purple',
              color: '#722ED1',
            },
          ];
    }
    return (
        <div  className={styles.themeColor}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.content}>
              {colorList.map(({key,color}) => {
                  return (<Tooltip key={color} title={formatMessage({id : `app.setting.themecolor.${key}`})}>
                      <Tag 
                      className={styles.colorBlock}
                      check={value === color}
                      color={color}
                      onClick={() => onChange && onChange(color)}
                      />
                  </Tooltip>)
              })}
            </div>
           
        </div>
    )
}
export default ThemeColor;