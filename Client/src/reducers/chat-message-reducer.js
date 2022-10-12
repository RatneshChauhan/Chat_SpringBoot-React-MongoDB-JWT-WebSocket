import {
    NEW_CONVERSATION,

} from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState =
{
    newConversation: '',
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(':send-message-reducer:')
    console.log('type:', type)
    console.log('payload:', payload)

    switch (type) {
        case NEW_CONVERSATION:
            return {
                ...state,
                newConversation: payload
            };
        default:
            return state;
    }
}