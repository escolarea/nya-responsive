import { actionType } from './action';


const initialState = {
  userData: {}
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_USER:
      return {...state, userData: action.data} 
    default:
      return state;
  }
}