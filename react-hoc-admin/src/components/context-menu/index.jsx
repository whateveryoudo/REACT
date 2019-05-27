import React from 'react'

export default class ContextMenu extends React.Component {
    state = {
        top : 0,
        left : 0,
        contentResult : ""
    }
    componentDidMount(){
        document.addEventListener('click',this.hideRightContent);
        document.addEventListener('scroll',this.hideRightContent);
    }
    hideRightContent = () => {
        const {onChange} = this.props;
        if (onChange) onChange(false);
    }
    setContentPosition = () => {
        if(!this.container){return}

        const {event} = this.props;
        if (!event) return;

        const winWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const winHeight = document.documentElement.clientHeight || document.body.clientHeight;

        let left = event.clientX;
        let top = event.clientY;
        const contentWidth = this.container.offsetWidth;
        const contentHeight = this.container.offsetHeight;
        //临界值判断
        if(left >= winWidth - contentWidth){
            left = winWidth - contentWidth
        }
        if(top >= winHeight - contentHeight){
            top = winHeight - contentHeight
        }


        this.container.style.left = `${left}px`;
        this.container.style.top = `${top}px`;
    }
    render() {
        const {visible,content} = this.props;
        const {top,left} = this.state;

        if(visible){
            this.setContentPosition();
            //延迟判断临界值（content无法获取宽度）
            setTimeout(this.setContentPosition);
        }
        return (
            <div style={{
                display : visible ? 'block' : 'none',
                position : 'fixed',
                left: 0,
                top: 0,
                zIndex: 99999,
                width: 0,
                height: 0
            }}>
                <div
                    ref={node => this.container = node}
                    style={{
                       left,
                        top,
                        position:'absolute',
                        boxShadow:'0 0 15px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {content}
                </div>
            </div>
        )
    }
}