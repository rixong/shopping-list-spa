import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ListItem from './ListItem'

const CurrentList = ({ curList }) => {


  return (
    <Fragment>
      <div className="display-4 text-center text-primary mb-4">My List</div>
      <ul className="list-group">
        {curList.map((item, idx) => <ListItem item={item} key={idx}/>)}
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