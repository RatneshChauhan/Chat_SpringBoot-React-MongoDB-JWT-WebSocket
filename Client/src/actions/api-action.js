import {
    PUBLIC_DATA,
    ADMIN_DATA,
    USER_DATA,
    MOD_DATA,
    CLEAR_DATA
} from "./type";

import UserService from "../services/user.service";

export const getPublicContent = () => (dispatch) => {
    return UserService.getPublicContent().then(
        response => {
            dispatch({
                type: PUBLIC_DATA,
                payload: response.data,
            });
            return Promise.resolve();
        }
    );
};

export const getUserBoard = () => (dispatch) => {
    return UserService.getUserBoard().then(
        response => {
            dispatch({
                type: USER_DATA,
                payload: response.data,
            });
            return Promise.resolve();
        }
    );
}
export const getAdminBoard = () => (dispatch) => {
    return UserService.getAdminBoard().then(
        response => {
            dispatch({
                type: ADMIN_DATA,
                payload: response.data,
            });
            return Promise.resolve();
        }
    );
}

export const getModBoard = () => (dispatch) => {
    return UserService.getModeratorBoard().then(
        response => {
            dispatch({
                type: MOD_DATA,
                payload: response.data,
            });
            return Promise.resolve();
        }
    );
}

export const clearData = () => ({
    type: CLEAR_DATA,
  });