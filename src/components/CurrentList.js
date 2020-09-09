import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ListGroup from './ListGroup'

const CurrentList = ({ curList }) => {

  const sortList = () => {
    const sorted = {};
    for(let item of curList){
      if(!sorted[item.category]){
        sorted[item.category] = [];
      }
      sorted[item.category].push(item);
    }
    console.log('sorted', sorted)
    return sorted;
  }

  return (
    <Fragment>
      <div className="display-4 text-center text-primary mb-4">My List</div>
      <ul className="list-group">
        { sortList().forEach(group => <ListGroup group={group}/> )}
      </ul>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    curList: state.curList
  }
};

export default connect(mapStateToProps)(CurrentList);