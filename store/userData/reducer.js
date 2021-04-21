import { actionType } from './action';

const initialState = {
  userData: {}
}

export default function update(state = initialState, action) {
    console.log("action", action)
  switch (action.type) {
    case actionType.SET_USER:
      return {...state, userData: {}} 
    default:
      return state;
  }
}