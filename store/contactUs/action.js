export const actionType = {
  SET_SUBJECT: "SET_SUBJECT"
} 

export const setSubject = (option) => (dispatch, data) => {
  return dispatch({ type: actionType.SET_SUBJECT, payload: option });
}
