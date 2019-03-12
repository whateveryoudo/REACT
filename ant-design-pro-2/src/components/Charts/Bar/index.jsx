import React from 'react'
import {Chart,Axis,Tooltip,Geom} from 'bizcharts'
import autoHeight from '../autoHeight'
import styles from './index.less'
import Debounce from 'lodash-decorators/debounce'
import Bind from 'lodash-decorators/bind';
@autoHeight()
export default class Bar extends React.Component {
    state = {autoHideXLabels : false}
    componentDidMount(){
        window.addEventListener('resize',this.resize,{passive : true});//监听浏览器变化 passive : true
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.resize);
    }
    //绑定this指向
    @Bind()
    @Debounce(400)
    resize() {
        if(!this.node){return}
        const canvasWidth = this.node.parentNode.clientWidth;
        const {data = [],autoLabel = true} = this.props;

        if(!autoLabel){return}

        const minWidth = data.length * 30;//图表的最大宽度
        const {autoHideXLabels} = this.state;
        if(canvasWidth <= minWidth){
            if(!autoHideXLabels) {
                this.setState({
                    autoHideXLabels: true
                })
            }
        }else if(autoHideXLabels){
            this.setState({
                autoHideXLabels : false
            })
        }
    }


    render() {
        const {
            height,
            forceFit = true,
            data,
            color = 'rgba(24, 144, 255, 0.85)',
            padding,
            title
        } = this.props;
        const {autoHideXLabels} = this.state;
        const scale = {
            x : {
                type : 'cat'
            },
            y : {
                min : 0
            }
        }
        const tooltip = ['x*y',
            (x,y) => ({
              name : x,
                value : y
            })
        ]
        return (
           <div className={styles.chart}>
               <div ref={node => this.node = node}>
                   {title && (<h4 style={{marginBottom : 20}}>{title}</h4>)}
                   <Chart
                    data={data}
                    forceFit={forceFit}
                    scale={scale}
                    height={title ? height - 41 : height}
                    padding={padding || 'auto'}
                   >
                       <Axis
                            name="x"
                            title={false}
                            label={autoHideXLabels ? false : {}}
                            tickLine={autoHideXLabels ? false : {}}
                       />
                       <Axis  name="y" min={0}/>
                       <Tooltip showTitle={false} crosshairs={false}/>
                       <Geom type="interval" position="x*y" tooltip={tooltip} color={color}/>
                   </Chart>
               </div>
           </div>
        )
    }
}