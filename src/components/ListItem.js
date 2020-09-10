import React from 'react';
import {connect} from 'react-redux';
import {changeStatus} from '../actions';


const ListItem = ({ item, changeStatus }) => {

  const onHandleClick = () => {
    // console.log('Cloicked', item.name);
    changeStatus(item);
  }

  const nameClassDefault = 'row'
  const nameClassFinal = item.active ?
    `${nameClassDefault} text-dark`
    : `${nameClassDefault} text-light strike`

  return (
    <li className="list-group-item bg-secondary py-2" role="button" onClick={onHandleClick}>
      <div className={nameClassFinal}>
        <div className="col">{item.name}</div>
        <div className="col border-left">{item.quantity}</div>
        </div>
    </li>
  )
}

export default connect(null, {changeStatus} )(ListItem);