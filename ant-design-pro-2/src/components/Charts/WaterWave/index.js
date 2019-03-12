//水波组件
import React from 'react'
import autoHeight from '../autoHeight'
import styles from './index.less'

@autoHeight()
export default class WaterWave extends React.PureComponent{

    state = {
        radio : 1
    }
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
        const cR = radius - lineWidth;
        const bR = radius - lineWidth;

        ctx.beginPath();
        ctx.lineWidth = lineWidth * 2;

        const axisLength = canvasWidth - lineWidth;
        const unit = axisLength / 8;
        const range = 0.2; // 振幅
        let currRange = range;
        const xOffset = lineWidth;
        let sp = 0; // 周期偏移量
        let currData = 0;
        const waveupsp = 0.005; // 水波上涨速度

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
        function drawSin() {
            ctx.beginPath();
            ctx.save();

            const sinStack = [];
            for (let i = xOffset; i <= xOffset + axisLength; i += 20 / axisLength) {
                const x = sp + (xOffset + i) / unit;
                const y = Math.sin(x) * currRange;
                const dx = i;
                const dy = 2 * cR * (1 - currData) + (radius - cR) - unit * y;

                ctx.lineTo(dx, dy);
                sinStack.push([dx, dy]);
            }

            const startPoint = sinStack.shift();

            ctx.lineTo(xOffset + axisLength, canvasHeight);
            ctx.lineTo(xOffset, canvasHeight);
            ctx.lineTo(startPoint[0], startPoint[1]);

            const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(1, color);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();
        }
        function render(){

            //注意这里每次绘制清楚画布,否则回重复绘制多次(后面的lineto会重新走之前的绘制,http://www.w3school.com.cn/tiy/t.asp?f=html5_canvas_moveto)
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            if(circleLock && type !== 'update'){
                if(arcStack.length){
                    const temp = arcStack.shift();
                    ctx.lineTo(temp[0],temp[1]);
                    ctx.stroke();
                }else{
                    circleLock = false;
                    ctx.lineTo(cStartPoint[0],cStartPoint[1]);
                    ctx.stroke();
                    arcStack = null;
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.beginPath();
                    ctx.lineWidth = lineWidth;
                    ctx.arc(radius, radius, bR, 0, 2 * Math.PI, 1);

                    ctx.beginPath();
                    ctx.save();
                    ctx.arc(radius, radius, radius - 3 * lineWidth, 0, 2 * Math.PI, 1);

                    ctx.restore();
                    ctx.clip();
                    ctx.fillStyle = color;
                }
            }else{//绘制水波(算法不深究)
                if (data >= 0.85) {
                    if (currRange > range / 4) {
                        const t = range * 0.01;
                        currRange -= t;
                    }
                } else if (data <= 0.1) {
                    if (currRange < range * 1.5) {
                        const t = range * 0.01;
                        currRange += t;
                    }
                } else {
                    if (currRange <= range) {
                        const t = range * 0.01;
                        currRange += t;
                    }
                    if (currRange >= range) {
                        const t = range * 0.01;
                        currRange -= t;
                    }
                }
                if (data - currData > 0) {
                    currData += waveupsp;
                }
                if (data - currData < 0) {
                    currData -= waveupsp;
                }

                sp += 0.07;
                drawSin();

            }

            self.timer = requestAnimationFrame(render);
        }

        render();
    }
    render(){
        const {radio} = this.state;
        const {height,percent,title} = this.props;
        return(
            <div
                className={styles.waterWave}
                style={{transform : `scale(${radio})`}}>
                <div style={{width:height,height,overflow:'hidden'}}>
                    <canvas
                        className={styles.waterWaveCanvasWrapper}
                        width={height * 2}
                        height={height * 2}
                        ref={n => this.node = n}/>
                </div>
                <div className={styles.text} style={{width:height}}>
                    {title && (<span>{title}</span>)}
                    <h4>{percent}%</h4>
                </div>
            </div>
        )
    }
}