import {actionType} from "./action";

const initialState = {
  scrollPosition: 0
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case actionType.UPDATE_SCROLL_POSITION:
      return {...state, scrollPosition: action.payload}
    default:
      return state;
  }
}