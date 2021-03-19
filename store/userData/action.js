export const actionType = {
    SET_USER: "SET_USER:", 
  } 
  
  export const setUser= () => (dispatch, data) => {
    console.log("data", data)
    return dispatch({ type: actionType.SET_USER })
  }