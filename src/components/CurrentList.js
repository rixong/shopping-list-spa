import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { doGetCurrentListItems } from '../actions';
import ListGroup from './ListGroup'


const CurrentList = ({ lists, curListItems, masterList, categories, doGetCurrentListItems }) => {
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  
  const curList = lists.find(list => list.current)

  useEffect(() => {
    if(curList){
    doGetCurrentListItems(curList.id)
    }
  }, [doGetCurrentListItems, curList])


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
    <div className="col-md overflow-auto bg-light" style={{ height: vh }}>
      {!curList 
      ? 
      <div className="row h2 justify-content-center text-primary mt-4 mb-3 mx-2">
        Make a new list
      </div> 
      : 
      <div className="row text-primary mt-4 mb-3 mx-2 align-items-end rounded">
        <div className="col">
          <div className="h2 pt-2 text-right">
            {curList.name}
            </div>
        </div>
        <div className="col">
          <div className="h4 pb-1">{moment(curList.created_at).format('ddd, MMM Do')}</div>
        </div>
      </div>

  }

      {divideByCategory()}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    curListItems: state.curListItems,
    masterList: state.masterList,
    // curList: state.curList,
    categories: state.categories,
    lists: state.lists
  }
};

export default connect(mapStateToProps, { doGetCurrentListItems })(CurrentList);