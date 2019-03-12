import React from 'react'
import {Divider} from 'antd'
import {Chart,Tooltip, Geom, Coord} from 'bizcharts'
import {DataView} from '@antv/data-set'
import autoHeight from '../autoHeight'
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import classNames from 'classnames'
import styles from './index.less'
@autoHeight()
class Pie extends React.Component{
    state = {
        legendData : [], //右侧legend数据源
        legendBlock : false
    }
    componentDidMount(){
        window.addEventListener('resize',this.resize,{passive: true})
    }
    @Bind()
    @Debounce(300)
    resize(){

        const {hasLegend} = this.props;
        const {legendBlock} = this.state;

        if(!hasLegend || !this.root){
            window.removeEventListener('resize',this.resize);
            return;
        }
        if(this.root.parentNode.clientWidth <= 380){
            if(!legendBlock){
                this.setState({
                    legendBlock: true
                })
            }
        }else if(legendBlock){
            this.setState({
                legendBlock: false
            })
        }
    }
    componentDidUpdate(preProps){
        //render之后,第一次不走(处理切换不同图表)
        const {data} = this.props;
        if(data !== preProps.data){
            this.getLegendData();
        }
    }
    getLegendData = () => {
        if(!this.chart){return null}
        //获取所有图形
        const geom = this.chart.getAllGeoms()[0];
        if(!geom){return null}
        const items = geom.get('dataArray') || [];
        const legendData = items.map(item => {
            const origin = item[0]._origin;
            origin.color = item[0].color;
            origin.checked = true;
            return origin;
        })
        this.setState({
            legendData,
        });

    }
    getG2Instance = chart => {
        this.chart = chart;
        requestAnimationFrame(() => {
            this.getLegendData();
        });
    }
    handleLegendClick = (item,i) => {
        let newItem = {...item};
        newItem.checked = !newItem.checked;
        const {legendData} = this.state;
        legendData[i] = newItem;

        const filterLegendData = legendData.filter(l => l.checked).map(l => l.x);//返回选中的x数组

        if(this.chart){
            //：过滤数据，如果存在对应的图例，则过滤掉的字段置灰
            this.chart.filter('x',val => filterLegendData.indexOf(val) > -1)
        }

        this.setState({
            legendData
        })
    }
    render(){
        const {
            valueFormat,
            forceFit = true,
            hasLegend = false,
            animate = true,
            color,
            subTitle,
            total,
            height,
            percent,
            colors,
            inner = 0.75,
            lineWidth = 1,
            className
        } = this.props;
        const {legendData,legendBlock} = this.state;
        //单独需要重新赋值的prop
        const {
            data : propsData,
            selected : propsSelected = true,
            tooltip : propsTooltip = true,
        } = this.props;

        //赋值为变量
        let data = propsData || [];
        let selected = propsSelected;
        let tooltip = propsTooltip;
        const defaultColors = colors;
        let formatColor;
        const padding = [12,0,12,0];
        const picCls = classNames(styles.pie,className,{
            [styles.hasLegend] : hasLegend,
            [styles.legendBlock] : legendBlock
        })

        const scale = {
            x : {
                type : 'cat',
                range : [0,1]
            },
            y : {
                min : 0
            }
        }

        //是否传入了percent
        if(percent || percent === 0){
            selected = false;
            tooltip = false;
            //判断x 的值显示不同的颜色
            formatColor = value => {
                if(value === '占比'){
                    return color || 'rgba(24, 144, 255, 0.85)';
                }
                return '#F0F2F5';
            }

            data = [
                {x : '占比',y : parseFloat(percent)},
                {x : '反比',y : 100 - parseFloat(percent)},
            ]
        }
        const tooltipFormat = [
            'x*percent',
            (x,percent) => ({
                name : x,
                value : `${(percent * 100).toFixed(2)}%`
            })
        ];
        const dv = new DataView();
        dv.source(data).transform({
            type : 'percent',
            field : 'y',
            dimension : 'x',
            as : 'percent'
        })
        //数据处理 dataset  https://bizcharts.net/products/bizCharts/api/transform
        //field 是统计发生的字段（求和，求百分比），dimension 是统计的维度字段，也就是"每个不同的 dimension 下，field 值占总和的百分比"，groupBy 则是分组字段，每一个分组内部独立求百分比（每一个分组内，最后的 percent 字段相加之和为 1）。

        return (
            <div ref={n => this.root = n} className={picCls}>
                <div className={styles.chart}>
                    <Chart
                        scale={scale}
                        height={height}
                       forceFit={forceFit}
                       animate={animate}
                       padding={padding}
                       data={dv}
                        onGetG2Instance={this.getG2Instance}
                    >
                        {tooltip && (<Tooltip showTitle={false}/>)}
                        <Coord type="theta" innerRadius={inner}/>
                        <Geom
                            style={{lineWidth,stroke : '#fff'}}
                            tooltip={tooltip && tooltipFormat}
                            type="intervalStack"
                            position="percent"
                            color={['x',percent || percent === 0 ? formatColor : defaultColors]}
                            selected={selected}
                        />
                    </Chart>
                    {/*数量副标题*/}
                    {(subTitle || total) && (
                        <div className={styles.total}>
                            {subTitle && (<h4 className="pie-sub-title">{subTitle}</h4>)}
                            {total && (
                                <div className="pie-stat">
                                    {typeof total === 'function' ? total() : total}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {hasLegend && (
                    <ul className={styles.legend}>
                        {legendData.map((item,i) => {
                            return (
                                <li key={item.x} onClick={() => this.handleLegendClick(item,i)}>
                                    <span
                                        className={styles.dot}
                                        style={{
                                            backgroundColor : !item.checked ? '#aaa' : item.color
                                        }}
                                    />
                                    <span className={styles.legendTitle}>{item.x}</span>
                                    <Divider type="vertical"/>
                                    <span className={styles.percent}>
                                          {`${(Number.isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
                                      </span>
                                    <span className={styles.value}>
                                          {valueFormat ? valueFormat(item.y) : item.y}
                                      </span>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        )
    }
}

export default Pie