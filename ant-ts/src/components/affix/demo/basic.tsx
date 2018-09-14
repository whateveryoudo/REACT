import * as React from 'react'
import Affix from '../index'

export interface BasicState{
    top?:number;
    bottom?:number;
}
export default class Basic extends React.Component<{},BasicState>{
    state = {
        top:10,
        bottom:10
    }
    render(){
        return (
            <div>
                adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>
                <Affix offsetTop={20}>
                    <button>随便写得按钮</button>
                  </Affix>
                adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>

                adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>
                adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>adas<br/>
            </div>
        )
    }
}