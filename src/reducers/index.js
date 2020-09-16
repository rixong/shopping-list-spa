/// REDUCERS


export default function shoppingListReducer(
  state = {
    curUser: null,
    curList: {},
    curListItems: [],
    masterList: [],
    categories: [],
    notification: { error: false, message: '' }
  },
  action
) {
  // console.log('From reducer', action)
  let idx;
  switch (action.type) {
    case 'GOT_USER':
      return {
        ...state,
        curUser: action.payload.user,
        curList: action.payload.curList,
        curListItems: action.payload.curListItems,
        masterList: action.payload.items,
        categories: action.payload.categories,
      }

    case 'ADDED_ITEM_TO_CUR_LIST':
      return { ...state, curListItems: state.curListItems.concat(action.payload) }
    case 'REMOVED_ITEMS_FROM_CUR_LIST':
      let tempItem = [...state.curListItems].filter(item => item.item_id !== action.payload)
      return {...state, curListItems: tempItem}

    case 'CHANGED_STATUS':
      idx = state.curListItems.findIndex(item => item.item_id === action.payload.item_id)
      return {
        ...state, curListItems:
          [...state.curListItems.slice(0, idx), action.payload, ...state.curListItems.slice(idx + 1)]
      }

    case 'ADDED_ITEM_TO_MASTERLIST':
      return { ...state, masterList: state.masterList.concat(action.payload) }

    case 'REMOVED_FROM_MASTER_LIST':
      idx = state.masterList.findIndex(item => action.payload === item.id)
      return {
        ...state, masterList:
          state.masterList.slice(0, idx).concat(state.masterList.slice(idx + 1))
      }
    case 'ADDED_NOTIFICATION':
      return { ...state, notification: action.payload }
    case 'CLEARED_NOTIFICATION':
      return { ...state, notification: action.payload }
    default:
      return state
  }
}