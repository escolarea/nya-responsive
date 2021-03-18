import {actionType} from './action';

const initialState = {
  visible: false
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case actionType.SHOW_SIDEBAR :
      return {...state, visible: true}
    case actionType.HIDE_SIDEBAR :
        return {...state, visible: false}
    default:
      return state;
  }
}