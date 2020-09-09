import React from 'react';

const ListItem = ({ item }) => {

  // const nameClassDefault = 'bg-secondary'
  // const nameClassFinal = item.active ?
  //   `${nameClassDefault} text-dark`
  //   : `${nameClassDefault} text-light strike`

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col">{item.name}</div>
        <div className="col border-left">{item.quantity}</div>
        </div>
    </li>
  )
}
export default ListItem;