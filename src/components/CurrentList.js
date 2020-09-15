import React, { Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import ListGroup from './ListGroup'

const CurrentList = ({ curListItems, masterList, curList }) => {

  const sortList = () => {

    const sorted = {}
    const divs = [];
    curListItems.forEach(listItem => {
      let item = masterList.find(el => listItem.item_id === el.id)

      if (!sorted[item.category_id]) {
        sorted[item.category_id] = [listItem];
      } else {
        sorted[item.category_id].push(listItem);
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
      <div className="bg-info text-center text-dark mb-4">
        <div className="h4 pt-3">{ curList.name } </div>
        <div className="h6 pb-4">{ moment(curList.created_at).format('ddd, MMM Do') }</div>
      </div>
      {sortList()}
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    curListItems: state.curListItems,
    masterList: state.masterList,
    curList: state.curList,
  }
};

export default connect(mapStateToProps)(CurrentList);