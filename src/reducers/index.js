/// REDUCERS

import { list } from '../seed';

export default function shoppingListReducer(
  state = { curList: [...list] },
  action
) {
  // console.log('From reducer', action)
  switch (action.type) {
    case 'ADD_TO_LIST':
      return { ...state, curList: state.curList.concat(action.payload) }
    case 'CHANGE_STATUS':
      let idx = state.curList.findIndex(item => item.name === action.payload.name)
      let tempItem = {...action.payload}
      tempItem.active = !tempItem.active
      return {...state, curList: [...state.curList.slice(0,idx),tempItem, ...state.curList.slice(idx+1)]} 
    default:
      return state
  }
}