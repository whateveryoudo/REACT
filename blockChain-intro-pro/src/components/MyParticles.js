/**
 * @fileName : MyParticles.js
 * @author : ykx 
 * @createTime : 2018/5/23
 * @desc :
 */
import React from 'react'
import Particles from 'react-particles-js'
import particlesConfig from '../utils/particlesConfig'
class MyParticles extends React.PureComponent{
    render(){
        return (
            <Particles
                params={
                    particlesConfig
                }
                style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}/>
        )
    }
}
export default MyParticles