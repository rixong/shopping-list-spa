import React from 'react';
import { connect } from 'react-redux';

import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ThreeBarsIcon } from '@primer/octicons-react';

import { doReorderCategories } from '../actions';


const CategorySortOrder = ({ categories, curUser, doReorderCategories }) => {

  const SortableItem = sortableElement(({ value }) =>
    <li className="list-group-item py-1 category-sort-display">
      <ThreeBarsIcon size={16} className="mr-3" />
      {value.name}
    </li>);

  const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="list-group category-list">{children}</ul>;
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // console.log(oldIndex, newIndex)
    const newOrder = arrayMove(categories, oldIndex, newIndex)
    const ids = newOrder.map(el => el.id)
    doReorderCategories(curUser.id, ids)
  };

  return (
    <React.Fragment>
      <div className="header">Move categories</div>
      <div className="row justify-content-center">
        <SortableContainer onSortEnd={onSortEnd}>
          {categories.map((value, index) => (
            <SortableItem key={`item-${value.name}`} index={index} value={value} />
          ))}
        </SortableContainer>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    curUser: state.curUser
  }
};
export default connect(mapStateToProps, { doReorderCategories })(CategorySortOrder);