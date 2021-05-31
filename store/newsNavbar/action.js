export const actionType = {
  UPDATE_SCROLL_POSITION: "UPDATE_SCROLL_POSITION"
}

export const updateNavbarScrollPosition = (payload) => (dispatch, data) => {
  return dispatch({ type: actionType.UPDATE_SCROLL_POSITION, payload });
}