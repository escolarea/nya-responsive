export const actionType = {
  SHOW_SIDEBAR: 'SHOW_SIDEBAR',
  HIDE_SIDEBAR: 'HIDE_SIDEBAR'
}

export const showSideBar = () => (dispatch, data) => {
  return dispatch({type: actionType.SHOW_SIDEBAR})
}

export const hideSideBar = () => (dispatch, data) => {
  return dispatch({type: actionType.HIDE_SIDEBAR})
}

