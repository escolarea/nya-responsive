export const actionType = {
    SET_USER: "SET_USER:", 
  } 

  export const setUser = (data) => (dispatch) => {
    return dispatch({
      type: actionType.SET_USER,
      data
    })
  }
    