import React from 'react'
import ThemeContext,{themes} from './themeContext'

export default ({children}) => {

    return (
        <ThemeContext.Consumer>
            {theme => {
                const styles = {
                    color : themes[theme].foreground,
                    backgroundColor : themes[theme].background
                }
                return (<button style={styles}>{children}</button>)
            }}
        </ThemeContext.Consumer>
    )
}