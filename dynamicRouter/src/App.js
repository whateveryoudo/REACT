import React,{Component} from 'react'
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            num : 1
        }
    }

    handleAdd = () => {
        this.setState((prevState) => {
            return {
                num : prevState.num + 1
            }
        })
    }
    render(){
        return (
            <div>
                随便写点内容abbb213213,累计的数字<strong>{this.state.num}</strong><br/>
                <button onClick={this.handleAdd}>点我增加数字</button>
                <h1>来段</h1>
            </div>
        )
    }

}

export default App