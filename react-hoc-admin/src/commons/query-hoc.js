import React,{Component} from 'react'
import queryString from 'qs'
export default ({propName = 'query'} = {}) => WrapperComponent => {
    class WithSubscription extends Component{
        constructor(props){
            super(props)
            const search = queryString.parse(window.location.search,{ignoreQueryPrefix: true})
            this.query = search || {};
        }
        static displayName = `WithQuery(${WrapperComponent.displayName || WrapperComponent.name || 'Component'})`;
        render(){
            console.log(this.props);
            const injectProps = {
                [propName] : this.query
            }
            return <WrapperComponent {...injectProps} {...this.props}/>
        }
    }


    return WithSubscription
}