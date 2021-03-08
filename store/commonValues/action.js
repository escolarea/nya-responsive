export const countActionTypes = {
    ENTRIES_LOADED: 'ENTRIES_LOADED',
  }
  
  export const add = () => (dispatch, data) => {
    return dispatch({ type: countActionTypes.ENTRIES_LOADED })
  }