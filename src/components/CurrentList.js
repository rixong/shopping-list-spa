import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { doGetCurrentListItems } from '../actions';
import ListGroup from './ListGroup'


const CurrentList = ({ curUser, lists, curListItems, masterList, categories, doGetCurrentListItems }) => {
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  const curList = lists.find(list => list.id === curUser.currentList)

  useEffect(() => {
    if (curList) {
      doGetCurrentListItems(curList.id)
    }
  }, [doGetCurrentListItems, curList])


  const divideListByCategory = () => {

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
    <div className="col-md overflow-auto bg-light" style={{ height: vh }}>
      <div className="d-flex flex-wrap justify-content-center align-items-end mt-4">
        <div className="h2 pb-0 text-primary">{curList.name} </div>
        <div className="h5 ml-4 pb-1"> ({ moment(curList.created_at).format('MMM Do')})</div>
      </div>

      { divideListByCategory()}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    curListItems: state.curListItems,
    masterList: state.masterList,
    // curList: state.curList,
    categories: state.categories,
    lists: state.lists,
    curUser: state.curUser
  }
};

export default connect(mapStateToProps, { doGetCurrentListItems })(CurrentList);