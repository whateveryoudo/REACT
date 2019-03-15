import React from 'react'
import logoImg from './logo.png';
import './styles.less'
const Logo = ({min = false,title = 'React Web Learning',logo = logoImg}) => {
    return (
        <div styleName="logo">
            <img src={logo} alt=""/>
            <h1 className={min ? 'title-hide' : ''}>{title}</h1>
        </div>
    )
}

export default Logo