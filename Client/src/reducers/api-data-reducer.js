import {
    PUBLIC_DATA,
    ADMIN_DATA,
    MOD_DATA,
    USER_DATA,
    ERROR_API,
    CLEAR_MESSAGE,
    CLEAR_DATA,
} from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState =
{
    data: ''
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(':api-data-reducer:')
    console.log('type:', type)
    console.log('payload:', payload)

    switch (type) {
        case CLEAR_DATA:
            return {
                ...state,
                data: undefined
            };
        case PUBLIC_DATA:
            return {
                ...state,
                data: payload
            };
        case ADMIN_DATA:
            return {
                ...state,
                data: payload
            };
        case MOD_DATA:
            return {
                ...state,
                data: payload
            };
        case USER_DATA:
            return {
                ...state,
                data: payload
            };
        case ERROR_API:
            return {
                ...state,
                data: payload
            };

        default:
            return state;
    }
}