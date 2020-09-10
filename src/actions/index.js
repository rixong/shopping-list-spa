// ACTIONS
export const updateList = (listItem) => {
  // console.log('from Action', listItem)
  return {
    type: 'ADD_TO_LIST',
    payload: listItem
  }
}

export const changeStatus = (item) => {
  return {
    type: 'CHANGE_STATUS',
    payload: item
  }
}