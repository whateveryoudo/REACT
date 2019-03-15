import React from 'react'
import config from '@/commons/config-hoc'
@config({
    path: '/text'
})
export default class Text extends React.Component {
    test = () => {
        alert('测试语句')
    }
    render() {
        const Btn = () => (<button onClick={this.test}>点我看看</button>);

        return (
            <div>
                <form>
                    <input type="text"/>
                </form>
                <Btn/>
            </div>
        )
    }
}