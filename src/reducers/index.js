/// REDUCERS


export default function shoppingListReducer(
  state = { 
    curUser: null,
    curList: {},
    curListItems: [],
    masterList: [], 
    notification: { error: false, message: ''} },
  action
) {
  console.log('From reducer', action)
  let idx;
  switch (action.type) {
    case 'GET_USER':
      return {...state, curList: action.payload.curList, curListItems: action.payload.items}

    case 'ADD_TO_LIST':
      return { ...state, curList: state.curList.concat(action.payload) }
    case 'CHANGE_STATUS':
      idx = state.curList.findIndex(item => item.name === action.payload.name)
      let tempItem = { ...action.payload }
      tempItem.active = !tempItem.active
      return { ...state, curList: [...state.curList.slice(0, idx), tempItem, ...state.curList.slice(idx + 1)] }
    case 'REMOVE_FROM_MASTER_LIST':
      idx = state.masterList.findIndex(item => action.payload.name === item.name)
      return {
        ...state, masterList:
          state.masterList.slice(0, idx).concat(state.masterList.slice(idx + 1))
      }
      case 'ADD_NOTIFICATION':
        return{...state, notification: action.payload}
    default:
      return state
  }
}