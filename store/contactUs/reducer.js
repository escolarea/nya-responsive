import { actionType } from "./action";

const initialState = {
  subject: { value: "archivist", label: "Question for the Archivist" }
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_SUBJECT:
      return { ...state, subject: action.payload };
    default:
      return state;
  }
}
