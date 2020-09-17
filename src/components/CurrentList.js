import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import ListGroup from './ListGroup'

const CurrentList = ({ curListItems, masterList, curList, categories }) => {


  const divideByCategory = () => {

    const divided = {};
    let divs = [];

    curListItems.forEach(listItem => {
      let item = masterList.find(el => listItem.item_id === el.id)

      if (!divided[item.category_id]) {
        divided[item.category_id] = [listItem];
      } else {
        divided[item.category_id].push(listItem);
      }
    })

    categories.sort((a, b) => a.sort_order - b.sort_order);
    categories.forEach(cat => {
      if (divided[cat.id]) {
        divs.push(<ListGroup categoryName={cat.name} items={divided[cat.id]} key={cat.id} />)
      }
    })
    return divs;
  }

  return (
    <div>

      <div className="row text-primary mx-2 align-items-end rounded">
        <div className="col">
          <div className="h4 pt-2">{curList.name} </div>
        </div>
        <div className="col">
          <div className="h6 pb-1">{moment(curList.created_at).format('ddd, MMM Do')}</div>
        </div>
      </div>
      {divideByCategory()}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    curListItems: state.curListItems,
    masterList: state.masterList,
    curList: state.curList,
    categories: state.categories
  }
};

export default connect(mapStateToProps)(CurrentList);