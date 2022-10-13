import SocketService from '../services/socket.service';
import {
  NEW_CONVERSATION,
} from "./type";

export const send_message = (messageBody) => (dispatch) => {
  SocketService.sendMessage(messageBody);
  console.log(messageBody)
  dispatch({
    type: NEW_CONVERSATION,
    payload: messageBody
  });
};

