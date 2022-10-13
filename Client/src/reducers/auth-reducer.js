import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? {
        isLoggedIn: true,
        user,
        navigation: {
            showModeratorBoard: true,
            showAdminBoard: true,
            showChatRoom: true,
        }
    }
    : {
        isLoggedIn: false,
        user: undefined,
        navigation: {
            showModeratorBoard: false,
            showAdminBoard: false,
            showChatRoom: false,
        }
    };

export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(':auth-reducer:')
    console.log('type:', type)
    console.log('payload:', payload)

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                navigation: undefined
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                navigation: undefined
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
                navigation: {
                    showModeratorBoard: true,
                    showAdminBoard: true,
                    showChatRoom: true,
                }
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                navigation: undefined
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                navigation: undefined
            };
        default:
            return state;
    }
}