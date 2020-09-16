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

    console.log(sorted)

    for (let group in sorted) {
      divs.push(<ListGroup categoryId={parseInt(group,10)} items={sorted[group]} key={group} />);
    }
    // console.log(divs)
    return divs;
  }

  return (
    <Fragment>
      <div className="row text-primary mx-2 align-items-end rounded">
        <div className="col">
          <div className="h4 pt-2">{curList.name} </div>
        </div>
        <div className="col">
          <div className="h6 pb-1">{moment(curList.created_at).format('ddd, MMM Do')}</div>
        </div>
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