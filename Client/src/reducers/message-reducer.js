import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/type";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(':message-reducer:')
  console.log('type:', type)
  console.log('payload:', payload)

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}