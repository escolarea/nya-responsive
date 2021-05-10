export const actionType = {
    SET_TOKEN: "SET_TOKEN", 
    REMOVE_TOKEN:"REMOVE_TOKEN",
  } 

  export const setToken = (data) => (dispatch) => {
    return dispatch({
      type: actionType.SET_TOKEN,
      data
    })
  }

  export const removeToken = (data) => (dispatch) => {
    return dispatch({
      type: actionType.REMOVE_TOKEN
    })
  }
    