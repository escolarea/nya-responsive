import { actionType } from "./action";

const initialState = {
  subject: { value: "help", label: "Customer Support"}
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_SUBJECT:
      return { ...state, subject: action.payload };
    default:
      return state;
  }
}
