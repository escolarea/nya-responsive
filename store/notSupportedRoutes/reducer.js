import { actionType } from './action';

const initialState = {
  visible: false
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case actionType.SHOW_POPUP:
      return {...state, visible: true , type:action.data} 
    case actionType.HIDE_POPUP:
      return {...state, visible: false,type:action.data}
    default:
      return state;
  }
}