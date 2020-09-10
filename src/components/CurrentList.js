import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ListGroup from './ListGroup'

const CurrentList = ({ curList }) => {

  const sortList = () => {

    const sorted = {}
    const divs = [];
    curList.forEach(item => {
      if (!sorted[item.category]) {
        sorted[item.category] = [item];
      } else {
        sorted[item.category].push(item);
      }
    })

    // console.log(sorted)
    
    for (let group in sorted) {
      divs.push(<ListGroup category={group} items={sorted[group]} key={group} />);
    }
    // console.log(divs)
    return divs;
  }

  return (
    <Fragment>
      <div className="display-4 bg-info text-center text-dark mb-4">My List</div>
      {sortList()}
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    curList: state.curList
  }
};

export default connect(mapStateToProps)(CurrentList);