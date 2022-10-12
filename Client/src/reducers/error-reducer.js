import {
    ERROR,
    CLEAR_ERROR,
    SET_MESSAGE,
} from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState =
{
    error: '',
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(':error-reducer:')
    console.log('type:', type)
    console.log('payload:', payload)

    switch (type) {
        case CLEAR_ERROR:
            return {
                ...state,
                error: undefined
            };
        case 400:
            return {
                ...state,
                error: payload ? payload : "Bad Request"
            };
        case 401:
            return {
                ...state,
                error: payload ? payload : "Unauthorized Access"
            };
        case 404:
            return {
                ...state,
                error: payload ? payload : "Not Found"
            };
        case 500:
            return {
                ...state,
                error: payload ? payload : "Internal Server Error"
            };
        case 502:
            return {
                ...state,
                error: payload ? payload : "Bad Gateway"
            };
        case 503:
            return {
                ...state,
                error: payload ? payload : "Service Unavailable"
            };
        case 504:
            return {
                ...state,
                error: payload ? payload : "Gateway Timeout"
            };
        default:
            return state;
    }
}