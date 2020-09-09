/// REDUCERS

export default function shoppingListReducer(
  state = { curList: [] },
  action
) {
  // console.log('From reducer', action)
  switch (action.type) {
    case 'ADD_TO_LIST':
      return ({ ...state, curList: state.curList.concat(action.payload) })
    default:
      return state
  }
}