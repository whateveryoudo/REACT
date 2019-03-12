import React from 'react'
import {Chart,Shape,Coord,Geom} from 'bizcharts'
import DataSet from '@antv/data-set';
import classNames from 'classnames'
import styles from './index.less'

const imgUrl = 'https://gw.alipayobjects.com/zos/rmsportal/gWyeGLCdFFRavBGIDzWk.png';

export default class TagCloud extends React.Component {
    state = {
        dv : null
    }
    componentDidMount(){
        requestAnimationFrame(() => {
            this.initTagCloud();
            this.renderChart();
        })
    }
    componentDidUpdate(preProps){
        if(JSON.stringify(preProps) !== JSON.stringify(this.props)){
            this.renderChart(this.props);
        }
    }
    componentWillUnmount(){
        this.isUnmount = true;
    }
    initTagCloud = () => {
        function getTextAttrs(cfg){
            return Object.assign({},
                {
                    fillOpacity: cfg.opacity,
                    fontSize: cfg.origin._origin.size,
                    rotate: cfg.origin._origin.rotate,
                    text: cfg.origin._origin.text,
                    textAlign: 'center',
                    fontFamily: cfg.origin._origin.font,
                    fill: cfg.color,
                    textBaseline: 'Alphabetic',
                },
                cfg.style);
        }
        Shape.registerShape('point','cloud',{
            drawShape(cfg,container){
                const attrs = getTextAttrs(cfg);
                return container.addShape('text',{
                    attrs : Object.assign(attrs,{
                        x : cfg.x,
                        y : cfg.y
                    })
                })
            }
        })
    }
    renderChart = (nextProps) => {
        const {height,data} = nextProps || this.props;
        if(data.length < 1 || !this.root){return}
        const h = height * 4;
        const w = this.root.offsetWidth * 4;
        const onload = () => {
            const dv = new DataSet.View().source(data);
            const range = dv.range('value');
            const [min,max] = range;

            dv.transform({
                type : 'tag-cloud',
                fields : ['name','value'],
                imageMask : this.imageMask,
                font : 'Verdana',
                size : [w,h],
                padding : 5,
                timeInterval : 5000,
                rotate(){
                    return 0;
                },
                fontSize(d){
                    return Math.pow((d.value - min) / (max - min), 2) * (70 - 20) + 20; //??
                }
            })

            if(this.isUnmount){return}
            this.setState({
                h,
                w,
                dv
            })
        }
        if(!this.imageMask){
            this.imageMask = new Image();
            this.imageMask.src = imgUrl;
            this.imageMask.crossOrigin = '';
            this.imageMask.onload = onload;
        }else{
            onload();
        }
    }
    render() {
        const {className,height} = this.props;
        const {dv,w,h} = this.state;
        return (
            <div

                className={classNames(styles.tagCloud,className)}
                style={{width:'100%',height}}
                ref={node => {this.root = node}}
            >
                {dv && (
                    <Chart
                        data={dv}
                        height={h}
                        width={w}
                        padding={0}
                        scale={{
                            x : {nice : false},
                            y : {nice : false}
                        }}
                    >
                        <Coord reflect="y" />
                        <Geom type="point" position="x*y" color="text" shape="cloud"/>
                    </Chart>
                )}

            </div>
        )
    }
}