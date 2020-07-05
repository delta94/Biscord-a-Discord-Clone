import * as actions from "../actions/actionTypes";

const initialState = {
    serverCreationError: null,
    loading: false,
    currentChannel: [],
};

export const serverReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.SERVER_CREATED:
            return {
                ...state,
            };
        case actions.SERVER_CREATION_FAILED:
            return { ...state };
        case actions.SERVER_FETCH_STARTED ||
            actions.SERVER_FETCH_STARTED ||
            actions.JOIN_SERVER_STARTED:
            return {
                ...state,
                loading: true,
            };
        case actions.SERVER_FETCH_SUCCESS:
            return {
                ...state,
                server: payload,
                loading: false,
            };
        case actions.SERVERS_FETCH_SUCCESS:
            return {
                ...state,
                allServers: payload,
                loading: false,
            };
        case actions.JOIN_SERVER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case actions.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
            };
        case actions.CREATE_CHANNEL_SUCCESS:
            return {
                ...state,
            };
        case actions.JOIN_CHANNEL_SUCCESS:
            const currentChannel = payload.channel.channel;
            currentChannel.categoryId = payload.categoryId;
            return { ...state, currentChannel: currentChannel };
        case actions.FETCH_FAIL || actions.JOIN_FAIL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

