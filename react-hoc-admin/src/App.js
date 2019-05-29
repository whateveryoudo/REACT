import React, { Component } from 'react';
import {connect} from './models';
import AppRouter from './router/AppRouter';

@connect()
class App extends Component {
  state = {
    loading : true
  }
  constructor(...props){
    super(...props);
      // 从Storage中获取出需要同步到redux的数据
      this.props.action.getStateFromStorage();//??
      this.state.loading = true;//??


      const {system,menu} = this.props.action;

      //获取系统菜单
      menu.getMenus({
          params : {userId : ''},//暂时不传入
          onResolve : res => {


          },
          onComplete: () => {
              this.setState({loading: false});
          }
      })

  }
  render() {
    return (
        <AppRouter/>
    );
  }
}

export default App;
