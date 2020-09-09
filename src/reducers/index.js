/// REDUCERS

import {list} from '../seed';

export default function shoppingListReducer(
  state = { curList: list },
  action
) {
  // console.log('From reducer', action)
  switch (action.type) {
    case 'ADD_TO_LIST':
      return { ...state, curList: state.curList.concat(action.payload) }
    default:
      return state
  }
}