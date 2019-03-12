import React from 'react'

export default class BasicForm extends React.PureComponent {

    state = {
        items: [{a: 1}, {a: 2}, {a: 3}]
    }
    handleClick = () => {
        const { items } = this.state;
        let newItems = [...items];
        newItems.splice(newItems.length - 1, 1);
        this.setState({ items : newItems });
    }
    render() {
        return (<div>
            <ul>
                {this.state.items.map(i => <li key={i.a}>{i.a}</li>)}
            </ul>
            <button onClick={this.handleClick}>delete</button>
        </div>)
    }
}