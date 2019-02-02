import React from 'react'
import {Chart,Axis,Geom,Tooltip} from 'bizcharts'
import autoHeight from '../autoHeight'
import styles from '../index.less'


@autoHeight()

export default class MiniBar extends React.PureComponent {

    render() {

        const {forceFit = true,height,color = '#1890FF',data = []} = this.props;
        const padding = [36, 5, 30, 5];
        const scale = {
            x : {
                type : 'cat'
            },
            y : {
                min : 0
            }
        }
        const tooltip = [
            'x*y',
            (x,y) => ({
                name : x,
                value : y
            })
        ]
        const chartHeight = height + 54;
        return (
            <div className={styles.miniChart}>
                <div className={styles.chartContent}>
                    {height && (
                        <Chart
                            data={data}
                            forceFit={forceFit}
                            height={chartHeight}
                            padding={padding}
                            scale={scale}
                        >
                            <Tooltip showTitle={false} crosshairs={false} />
                            <Geom type="interval" position="x*y" color={color} tooltip={tooltip}/>
                        </Chart>
                    )}
                </div>
            </div>
        )
    }
}