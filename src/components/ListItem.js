import React from 'react';

const ListItem = ({ item }) => {

  const nameClassDefault = 'bg-secondary'
  const nameClassFinal = item.active ?
    `${nameClassDefault} text-dark`
    : `${nameClassDefault} text-light strike`

  return (
    <li className="list-group-item">
      <div className={nameClassFinal}>{item.name}</div>
      {item.quantity}
    </li>
  )
}
export default ListItem;