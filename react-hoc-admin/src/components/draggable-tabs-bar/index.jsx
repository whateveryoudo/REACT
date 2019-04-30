import React from 'react'
import arrayMove from 'array-move';
import {
    SortableContainer,
    SortableElement
} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <li style={{margin:'0 20px'}}>{value}</li>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul style={{display:'flex'}}>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});
export default class DraggableTabsBar extends React.Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };
    render() {
        const {items} = this.state;
        return (
            <div style={{marginTop:60}}>
                <SortableList axis='x' items={items} onSortEnd={this.onSortEnd}/>
            </div>
        )
    }
}