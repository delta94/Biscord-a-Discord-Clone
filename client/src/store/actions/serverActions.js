import * as actions from "../actions/actionTypes";

export const createServerAction = (serverDetails) => async (
    dispatch,
    getState
) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const response = await fetch("api/servers/", {
            method: "POST",
            headers,
            body: JSON.stringify(serverDetails),
        });

        const data = await response.json();

        dispatch({
            type: actions.SERVER_CREATED,
            payload: serverDetails.name,
        });
    } catch (error) {
        dispatch({ type: actions.SERVER_CREATION_FAILED, payload: error.code });
    }
};

// fetch a specific server
export const fetchServerAction = ({ auth_token, serverId }) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: actions.SERVER_FETCH_STARTED,
        });

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);
        const response = await fetch(
            `http://localhost:5000/api/servers/${serverId}`,
            {
                method: "GET",
                headers,
            }
        );

        const server = await response.json();

        dispatch({
            type: actions.SERVER_FETCH_SUCCESS,
            payload: server,
        });
    } catch (error) {
        dispatch({
            type: actions.FETCH_FAIL,
            payload: error,
        });
    }
};

// fetch all Servers
export const fetchAllServers = (auth_token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.SERVERS_FETCH_STARTED,
        });

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);
        const response = await fetch(`http://localhost:5000/api/servers/`, {
            method: "GET",
            headers,
        });

        const allServers = await response.json();

        dispatch({
            type: actions.SERVERS_FETCH_SUCCESS,
            payload: allServers,
        });
    } catch (error) {
        dispatch({
            type: actions.FETCH_FAIL,
            payload: error,
        });
    }
};

export const joinServerAction = ({ auth_token, userId, serverId }) => async (
    dispatch,
    getState
) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const body = {
            userId: userId,
        };
        await fetch(`http://localhost:5000/api/servers/${serverId}/join`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        dispatch({
            type: actions.JOIN_SERVER_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: actions.JOIN_FAIL,
            payload: error,
        });
    }
};

export const createCategoryAction = ({
    auth_token,
    categoryName,
    serverId,
}) => async (dispatch, getState) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const body = {
            category: {
                name: categoryName,
            },
        };

        await fetch(
            `http://localhost:5000/api/servers/${serverId}/createcategory`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            }
        );

        dispatch({
            type: actions.CREATE_CATEGORY_SUCCESSFUL,
            payload: categoryName,
        });
    } catch (error) {
        dispatch({
            type: actions.CREATE_CATEGORY_FAIL,
            payload: error,
        });
    }
};

export const createChannelAction = ({
    auth_token,
    channelName,
    categoryName,
    serverId,
}) => async (dispatch, getState) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const body = {
            channel: {
                name: channelName,
            },
        };

        await fetch(
            `http://localhost:5000/api/servers/${serverId}/${categoryName}/createcategory`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            }
        );

        dispatch({
            type: actions.CREATE_CHANNEL_SUCCESSFUL,
            payload: categoryName,
        });
    } catch (error) {
        dispatch({
            type: actions.CREATE_CHANNEL_FAIL,
            payload: error,
        });
    }
};
