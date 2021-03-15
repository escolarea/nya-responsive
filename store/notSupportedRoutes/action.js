export const actionType = {
  SHOW_POPUP: "SHOW_POPUP:", 
  HIDE_POPUP: "HIDE_POPUP:"
} 

export const showPopUp = () => (dispatch, data) => {
  return dispatch({ type: actionType.SHOW_POPUP })
}

export const hidePopUp = () => (dispatch, data) => {
  return dispatch({ type: actionType.HIDE_POPUP })
}