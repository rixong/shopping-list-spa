import React from 'react';
import {categoryLookup} from '../seed';
import ListItem from './ListItem';


const ListGroup = ({category, items}) => {

  // console.log(items)
  return (

    <div className="bg-info" >
    <div className="header h5 ml-4 pt-2">{categoryLookup[category]}</div>
    <ul className="list-group">
      {items.map(item => <ListItem item={item} key={item.name}/>)}
    </ul>

    </div>

  )
}
export default ListGroup;