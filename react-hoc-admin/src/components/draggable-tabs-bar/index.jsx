import React from 'react'
import arrayMove from 'array-move';
import {
    Icon
} from 'antd'
import {
    SortableContainer,
    SortableElement
} from 'react-sortable-hoc';
import classNames from 'classnames';
import './style.css'
const SortableItem = SortableElement(({children,className,style}) => (
    <div
        className={classNames('draggable-tabs-bar-horizontal-item',className)}
        style={style}
    >
        {children}
    </div>
));

const SortableContainerList = SortableContainer((props) => {
    const {dataSource,className,isSorting,itemWrapper,...others} = props;
    return (
        <div className={classNames('draggable-tabs-bar-root',className,{sorting : isSorting})} {...others}>
            {dataSource.map((item,index) => {
                const {key,title,closable,onClose,onClick} = item;

                let itemJsx = [
                    (
                        <div key="item" className="item-inner" onClick={e => onClick && onClick(item,e)}>
                            {title}
                        </div>
                    ),
                    (
                        closable ? (
                            <div key="close" className="item-inner" onClick={e => onClose && onClose(item,e)}>
                                <Icon type="close"/>
                            </div>
                        ) : null
                    )
                ]
                if(itemWrapper){
                    itemJsx = itemWrapper(itemJsx,item,'draggable-tabs-bar-wrapper')
                }else{
                    itemJsx = <div className="draggable-tabs-bar-wrapper">{itemJsx}</div>;
                }
                return (
                    <SortableItem key={key} index={index}>
                        <div className="draggable-tabs-bar-horizontal-item-inner">
                            {itemJsx}
                        </div>
                    </SortableItem>
                )
            })}
        </div>
    )
});
export default class DraggableTabsBar extends React.Component {
    state = {
        itemLength : 0,
        mouseIn : false,
        isSorting : false
    }
    componentDidMount(){
        this.setTabsWidth();
    }
    setTabsWidth = () => {
        const {} = this.state;
    }
    onSortEnd = (info,event) => {
        this.setState({isSorting: false})
        const {onSortEnd} = this.props;
        if(onSortEnd){
            onSortEnd(info,event);
        }


        // this.setState(({items}) => ({
        //     items: arrayMove(items, oldIndex, newIndex),
        // }));
    };
    onSortStart = (info,event) => {
        this.setState({isSorting: true})
        const {onSortStart} = this.props;
        if(onSortStart){
            onSortStart(info,event);
        }
    }
    render() {
        // const {items} = this.state;

        const {dataSource,onClick,onClose,itemWrapper} = this.props;
        const {isSorting} = this.state;

        const props = {
            axis : 'x',
            dataSource,
            isSorting,
            onSortEnd : this.onSortEnd,
            onSortStart: this.onSortStart,
            onClick,
            onClose,
            itemWrapper
        }

        return (
            <div>
                <SortableContainerList {...props}/>
            </div>
        )
    }
}