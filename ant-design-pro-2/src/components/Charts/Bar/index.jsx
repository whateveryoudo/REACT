import React from 'react'
import {Chart,Axis,Tooltip,Geom} from 'bizcharts'
import autoHeight from '../autoHeight'
import styles from './index.less'


@autoHeight()
export default class Bar extends React.Component {

    render() {
        const {
            height,
            forceFit = true,
            data,
            color = 'rgba(24, 144, 255, 0.85)',
            padding,
            title
        } = this.props;

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
               <div>
                   {title && (<h4 style={{marginBottom : 20}}>{title}</h4>)}
                   <Chart
                    data={data}
                    forceFit={forceFit}
                    scale={scale}
                    height={title ? height - 41 : height}
                    padding={padding || 'auto'}
                   >
                       {/*x轴   注意这里x轴 适配小屏幕 文字刻度 小屏幕上不显示*/}
                       <Axis
                            name="x"
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