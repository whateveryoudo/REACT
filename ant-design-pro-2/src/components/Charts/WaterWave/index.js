//水波组件
import React from 'react'
import autoHeight from '../autoHeight'
import styles from './index.less'

@autoHeight()
export default class WaterWave extends React.PureComponent{

    //https://blog.csdn.net/hhlljj0828/article/details/79497734

    componentDidMount(){
        this.renderChart();
    }
    renderChart(type){
        const {percent,color = '#1890FF'} = this.props;
        const data = percent / 100;
        const self = this;
        cancelAnimationFrame(this.timer);
        if(!this.node || (data !== 0 && !data)){
            return;
        }

        const canvas = this.node;
        const ctx = canvas.getContext('2d');
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const radius = canvasWidth / 2;
        const lineWidth = 2;
        const bR = radius - lineWidth;

        ctx.beginPath();
        ctx.lineWidth = lineWidth * 2;

        //起始的x值（-(Math.PI / 2)）

        const circleOffset = - (Math.PI / 2);
        let circleLock = true;//圆圈是否画完
        let arcStack = [];
        //存放一圈的x,y值
        for(let i = circleOffset;i < circleOffset +  2 * Math.PI;i += 1 / (8 * Math.PI)){
            arcStack.push([radius + bR * Math.cos(i),radius + bR * Math.sin(i)]);//计算左边从左上角
        }
        const cStartPoint = arcStack.shift();
        //画直线
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(cStartPoint[0],cStartPoint[1]);

        function render(){

            //注意这里每次绘制清楚画布,否则回重复绘制多次(后面的lineto会重新走之前的绘制,http://www.w3school.com.cn/tiy/t.asp?f=html5_canvas_moveto)
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            if(circleLock && type !== 'update'){
                if(arcStack.length){
                    const temp = arcStack.shift();
                    ctx.lineTo(temp[0],temp[1]);
                    ctx.stroke();
                }else{
                    debugger;
                    circleLock = false;
                    ctx.lineTo(cStartPoint[0],cStartPoint[1]);
                    ctx.stroke();
                    arcStack = null;
                }
            }

            self.timer = requestAnimationFrame(render);
        }

        render();
    }
    render(){
        const {height} = this.props;
        return(
            <div className={styles.waterWave}>
                <canvas
                    width={height * 2}
                    height={height * 2}
                    ref={n => this.node = n}/>
            </div>
        )
    }
}