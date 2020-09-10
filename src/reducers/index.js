/// REDUCERS

import {list} from '../seed';

export default function shoppingListReducer(
  state = { curList: list },
  action
) {
  console.log('From reducer', action)
  switch (action.type) {
    case 'ADD_TO_LIST':
      let newList = Object.assign({}, state.curList)
      console.log(newList);
      if (newList[action.payload.category]){
        newList[action.payload.category].push(action.payload)
      } else {
        newList[action.payload.category] = [action.payload]
      }
      return {...state, curList: newList}
    default:
      return state
  }
}