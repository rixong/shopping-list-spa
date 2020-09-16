import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';


const ListGroup = ({ categoryName, categories, items }) => {
  return (
    <div className="bg-info text-light" >
      <div className="header text-primary h5 ml-4 pt-2">{categoryName}</div>
      <ul className="list-group">
        {items.map(item => <ListItem item={item} key={item.id} />)}
      </ul>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  }
};
export default connect(mapStateToProps)(ListGroup);