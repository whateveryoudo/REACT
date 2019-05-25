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
                const {key,title,closable} = item;

                let itemJsx = [
                    (
                        <div key="item" className="item-inner">
                            {title}
                        </div>
                    ),
                    (
                        closable ? (
                            <div key="close" className="item-inner">
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
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };
    render() {
        // const {items} = this.state;

        const {dataSource} = this.props;

        const props = {
            axis : 'x',
            dataSource,
            onSortEnd : this.onSortEnd
        }

        return (
            <div>
                <SortableContainerList {...props}/>
            </div>
        )
    }
}