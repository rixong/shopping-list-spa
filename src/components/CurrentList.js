import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ListGroup from './ListGroup'

const CurrentList = ({ curList }) => {
// console.log(curList)
  const sortList = () => {

    // const sorted = {}
    const divs = [];
    // curList.forEach(item => {
    //   if (!sorted[item.category]) {
    //     sorted[item.category] = [item];
    //   } else {
    //     sorted[item.category].push(item);
    //   }
    // })

    for (let group in curList) {
      divs.push(<ListGroup category={group} items={curList[group]} key={group} />);
    }

    // console.log('divs', divs)
    return divs;
  }

  return (
    <Fragment>
      <div className="display-4 text-center text-primary mb-4">My List</div>
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