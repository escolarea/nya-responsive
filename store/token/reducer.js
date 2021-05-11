import { actionType } from './actions';

const initialState = {
    userToken: false
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_TOKEN:
      return {...state, userToken: action.data} 
    case actionType.REMOVE_TOKEN:
      return {...state, userToken:false} 
    default:
      return state;
  }
}