export const actionType = {
  SHOW_POPUP: "SHOW_POPUP:", 
  HIDE_POPUP: "HIDE_POPUP:"
} 

export const showPopUp = (data) => (dispatch) => {
  return dispatch({ type: actionType.SHOW_POPUP, data })
}

export const hidePopUp = (data) => (dispatch) => {
  return dispatch({ type: actionType.HIDE_POPUP, data })
}