import React from 'react'
import {Chart,Axis,Legend,Tooltip,Geom} from 'bizcharts'
import Slider from 'bizcharts-plugin-slider';

import DataSet from '@antv/data-set';
import autoHeight from '../autoHeight'
import styles from './index.less'

@autoHeight()
export default class TimelineChart extends React.Component {

    render() {
        const {
            height = 400,
            title,
            forceFit = true,
            borderWidth = 2,
            padding = [60, 20, 40, 40],
            titleMap = {//字段映射对象
                y1: 'y1',
                y2: 'y2',
            },
            data = [
                {x : 0,y1 : 0,y2 : 0}
            ],
        } = this.props;

        //处理数据

        //按照x从大到小排列传入数据
        data.sort((a,b) => a.x - b.x);
        //y轴最大值
        let max;
        if(data[0] && data[0].y1 && data[0].y2){
            max = Math.max(
                [...data].sort((a,b) => b.y1 - a.y1)[0].y1,//按照y1值 大-小排列
                [...data].sort((a,b) => b.y2 - a.y2)[0].y2,//按照y2值 大-小排列
            )
        }

        const ds = new DataSet({
            state : {
                start : data[0].x,
                end : data[data.length - 1].x
            }
        });

        const dv = ds.createView();
        dv.source(data)
            .transform({//过滤时间段之外的数据
                type : 'filter',
                callback : obj => {
                    return obj.x >= ds.state.start && obj.x <= ds.state.end
                }
            })
            .transform({//追加/覆盖数据字段映射
                type : 'map',
                callback(row){
                    const newRow = {...row};
                    newRow[titleMap.y1] = row.y1;
                    newRow[titleMap.y2] = row.y2;
                    return newRow;
                }
            })
            .transform({
                type : 'fold',
                fields : [titleMap.y1,titleMap.y2],
                key : 'key',
                value : 'value'
            });
        const timeScale = {
            type : 'time',
            tickInterval : 60 * 60 * 1000,
            mask : 'HH:mm',
            range : [0,1]
        }

        const cols = {
            x : timeScale,
            y : {
                max,
                min : 0
            }
        }
        console.log(dv);

        const SliderGen = () => {
            return (
                <Slider
                    padding={[0, padding[1] + 20, 0, padding[3]]}
                    width="auto"
                    height={26}
                    xAxis="x"
                    yAxis="y1"
                    scales={{ x: timeScale }}
                    data={data}
                    start={ds.state.start}
                    end={ds.state.end}
                    backgroundChart={{type:'line'}}
                    onChange={({startValue,endValue}) => {
                        ds.setState('start',startValue);
                        ds.setState('end',endValue);
                    }}
                />
            )
        }
        return (
            <div className={styles.timelineChart} height={height + 40}>
                <div>
                    {title && (<h4>{title}</h4>)}
                    <Chart
                        data={dv}
                        scale={cols}
                        height={height}
                        forceFit={forceFit}
                        padding={padding}

                    >
                        <Axis name="x"/>
                        <Tooltip/>
                        <Legend name="key" position="top"/>
                        <Geom type="line" position="x*value" size={borderWidth} color="key"/>
                    </Chart>
                    <div styles={{marginRight:-20}}>
                        <SliderGen/>
                    </div>

                </div>
            </div>
        )
    }
}