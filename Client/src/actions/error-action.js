import {
    ERROR,
    CLEAR_ERROR
} from "./type";

export const setError = (code, message) => ({
    type: code ? code : 'Unknow Code',
    payload: message ? message : 'Unknow Error',
  });
  
  export const clearError = () => ({
    type: CLEAR_ERROR,
  });