import React from 'react';
import {connect} from 'react-redux';
import {doChangeItemStatus} from '../actions';


const ListItem = ({ item, doChangeItemStatus, masterList }) => {

  const onHandleClick = () => {
    // console.log('Clicked', item.name);
    doChangeItemStatus(item);
  }

  const name = masterList.find(el => item.item_id === el.id).name
  // console.log(name)

  const nameClassDefault = 'row'
  const nameClassFinal = item.active ?
    `${nameClassDefault} text-dark`
    : `${nameClassDefault} text-success strike font-weight-normal`

  return (
    <li className="list-group-item bg-light py-1 mb-1 h5" role="button" onClick={onHandleClick}>
      <div className={nameClassFinal}>
        <div className="col-8">{name}</div>
        <div className="col-4 border-left">{item.quantity}</div>
        </div>
    </li>
  )
}

const mapStateToProps = state => {
  return {
    masterList: state.masterList
  }
};

export default connect(mapStateToProps, {doChangeItemStatus} )(ListItem);