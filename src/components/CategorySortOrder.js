import React, {useState} from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ThreeBarsIcon } from '@primer/octicons-react'


const CategorySortOrder = () => {

  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

  const SortableItem = sortableElement(({ value }) =>
  <li className="list-group-item">
    <ThreeBarsIcon size={16} className="mr-3"/>
    {value}
  </li>);
  
  const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="list-group w-50">{children}</ul>;
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex))
  };

  return (
    <div>
      <h4 className="text-warning">Drag to Sort Categories</h4>
      <SortableContainer onSortEnd={onSortEnd}>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </SortableContainer>

    </div>
  )
}
export default CategorySortOrder;