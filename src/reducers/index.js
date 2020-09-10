/// REDUCERS

import { list } from '../seed';

export default function shoppingListReducer(
  state = { curList: [] },
  action
) {
  // console.log('From reducer', action)
  let newList;
  switch (action.type) {
    case 'ADD_TO_LIST':
      newList = {...state, ...state.curList}
      console.log(newList)
      return { ...state, curList: newList }

    case 'CHANGE_STATUS':

      let idx = state.curList[action.payload.category].findIndex(item => item.name === action.payload.name)
      action.payload.active = !action.payload.active
      // console.log((
      //   {...state, 
      //   curList: {...state.curList,
      //     [action.payload.category]: 
      //       [...state.curList[action.payload.category].slice(0, idx),
      //       action.payload,
      //       ...state.curList[action.payload.category].slice(idx+1)]
      //           }
      //   }) === state
      // )
      return {...state, 
        curList: {...state.curList,
          [action.payload.category]: 
            [...state.curList[action.payload.category].slice(0, idx),
            action.payload,
            ...state.curList[action.payload.category].slice(idx+1)]
                }
        }
      
    default:
      return state
  }
}