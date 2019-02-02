import React from 'react'
import {Chart,Axis,Geom,Tooltip} from 'bizcharts'
import autoHeight from '../autoHeight'

import styles from '../index.less'


@autoHeight()
export default class MiniArea extends React.PureComponent {

    render() {
        const {
            data = [],forceFit = true,height,yAxis,color = 'rgba(24, 144, 255, 0.2)',
            borderColor = '#1089ff',line, xAxis,scale = {} ,borderWidth = 2,animate = true
        } = this.props;
        const chartHeight = height + 54;
        const padding = [36, 5, 30, 5];
        const scaleProps = {
            x : {
                type : 'cat',
                range : [0,1],
                ...scale.x
            },
            y : {
                min : 0,
                ...scale.y
            }
        }
        const tooltip = [
            'x*y',
            (x,y) => ({
                name : x,
                value : y
            })
        ]
        return (
            <div className={styles.miniChart} style={{height}}>
                <div className={styles.chartContent}>
                    {height > 0 && (
                        <Chart
                            animate={animate}
                            scale={scaleProps}
                            data={data}
                            forceFit={forceFit} //自适应宽度
                            height={chartHeight}
                            padding={padding}
                        >
                            {/*x轴*/}
                            <Axis
                                key="axis-x"
                                name="x"
                                label={null}
                                line={null}
                                tickLine={null}
                                grid={null}
                                {...xAxis}
                            />
                            {/*y轴*/}
                            <Axis
                                key="axis-y"
                                name="y"
                                label={null}
                                line={null}
                                tickLine={null}
                                grid={null}
                                {...yAxis}
                            />
                            {/*提示*/}
                            <Tooltip showTitle={false} crosshairs={false}/>
                            <Geom
                                color={color}
                                position="x*y"
                                type="area"
                                tooltip={tooltip}
                                shape="smooth"
                                style={{
                                    fillOpacity : 1
                                }}
                            />
                            {line ? (
                                <Geom
                                    color={borderColor}
                                    size={borderWidth}
                                    position="x*y"
                                    type="line"
                                    tooltip={false}
                                    shape="smooth"
                                />
                            ) : (
                                <span style={{display:'none'}}/>
                            )}
                        </Chart>
                    )}
                </div>
            </div>

        )
    }
}