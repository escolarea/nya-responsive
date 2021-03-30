export const actionType = {
    SET_USER: "SET_USER:", 
  } 
  
  export const setUser= () => (dispatch) => {data => {
        return dispatch({ type: actionType.SET_USER , data})
      }
     };