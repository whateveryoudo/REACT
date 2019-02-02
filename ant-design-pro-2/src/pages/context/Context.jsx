import React from 'react'
import ThemeContext from './themeContext'
import ThemeButton from './ThemedButton'

export default class Theme extends React.Component {
    state = {
        theme : 'dark'
    }
    render() {
        return (
            <ThemeContext.Provider value={this.state.theme}>
                <ThemeButton>
                    <div onClick={() => {
                        this.setState({
                            theme : this.state.theme === 'dark' ? 'light' : 'dark'
                        })
                    }}>Theme Button</div>
                </ThemeButton>
            </ThemeContext.Provider>
        )
    }
}