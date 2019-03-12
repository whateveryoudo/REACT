/**
  * Name:index.js
  * Date:2019/1/24
  * @Author:ykx
  * @Desc: 统一导出所有图表组件
*/
import './g2'
import ChartCard from  './ChartCard'
import Field from './Field'
import MiniArea from './MiniArea'
import MiniBar from './MiniBar'
import MiniProgress from './MiniProgress'
import Bar from './Bar'
import Pie from './Pie'
import TimelineChart from './TimelineChart'
import WaterWave from './WaterWave'
import Gauge from './Gauge'
import TagCloud  from './TagCloud'

import numeral from 'numeral'
const yuan = val => `¥ ${numeral(val).format('0,0')}`;
const Charts = {
    yuan,
    ChartCard,
    Field,
    MiniArea,
    MiniBar,
    MiniProgress,
    Bar,
    Pie,
    TimelineChart,
    WaterWave,
    Gauge,
    TagCloud
}

export {
    Charts as default,
    yuan,
    ChartCard,
    Field,
    MiniArea,
    MiniBar,
    MiniProgress,
    Bar,
    Pie,
    TimelineChart,
    WaterWave,
    Gauge,
    TagCloud
}
