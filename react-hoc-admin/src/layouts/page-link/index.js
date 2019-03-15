import React from 'react'
import {Link as RLink,Route} from 'react-router-dom'
//防止相同路径点击刷新
export default function Link({children,to,...rest}) {
    const path = typeof to === 'object' ? to.pathname : path;

    return (
        <Route
            path={path}
            exact
            children = {({match}) => {
                return match ? <a>{children}</a> : <RLink to={to} {...rest}>{children}</RLink>
            }}
        />
    )
}