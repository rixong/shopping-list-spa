import React from 'react';
import {connect} from 'react-redux';
import {changeStatus} from '../actions';


const ListItem = ({ item, changeStatus, masterList }) => {

  const onHandleClick = () => {
    // console.log('Clicked', item.name);
    changeStatus(item);
  }

  const name = masterList.find(el => item.item_id === el.id).name
  // console.log(name)

  const nameClassDefault = 'row'
  const nameClassFinal = item.active ?
    `${nameClassDefault} text-dark`
    : `${nameClassDefault} text-danger strike font-weight-normal`

  return (
    <li className="list-group-item bg-light py-1 mb-1 h5" role="button" onClick={onHandleClick}>
      <div className={nameClassFinal}>
        <div className="col">{name}</div>
        <div className="col border-left">{item.quantity}</div>
        </div>
    </li>
  )
}

const mapStateToProps = state => {
  return {
    masterList: state.masterList
  }
};

export default connect(mapStateToProps, {changeStatus} )(ListItem);