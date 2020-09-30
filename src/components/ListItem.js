import React from 'react';
import {connect} from 'react-redux';
import {doChangeItemStatus} from '../actions';


const ListItem = ({ item, doChangeItemStatus, masterList }) => {

  const onHandleClick = () => {
    doChangeItemStatus(item);
  }

  let name = masterList.find(el => item.item_id === el.id).name
  name = name.split(' ').map(ele => ele.slice(0,1).toUpperCase() + ele.slice(1).toLowerCase()).join(' ');
  // console.log(name)

  const nameClassDefault = 'row'
  const nameClassFinal = item.active ?
    `${nameClassDefault} text-dark`
    : `${nameClassDefault} strike`

  return (
    <li className="list-group-item bg-light py-1 my-1 h6 shadow-sm" role="button" onClick={onHandleClick}>
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