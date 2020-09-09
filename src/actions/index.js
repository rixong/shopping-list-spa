// ACTIONS
export const updateList = (listItem) => {
  // console.log('from Action', listItem)
  return {
    type: 'ADD_TO_LIST',
    payload: listItem
  }
}