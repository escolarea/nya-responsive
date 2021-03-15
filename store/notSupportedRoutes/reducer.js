import { actionType } from './action';

const initialState = {
  showNotSupportedPopUp: false
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case actionType.SHOW_POPUP:
      return {...state, showNotSupportedPopUp: true} 
    case actionType.HIDE_POPUP:
      return {...state, showNotSupportedPopUp: true}
    default:
      return state;
  }
}