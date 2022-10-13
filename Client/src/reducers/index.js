import { combineReducers } from "redux";
import auth from "./auth-reducer";
import message from "./message-reducer";
import data from "./api-data-reducer";
import error from "./error-reducer";
import newConversation from "./chat-message-reducer";

export default combineReducers({
  auth,
  message,
  data,
  error,
  newConversation
});