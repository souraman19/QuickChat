export const HOST = "http://localhost:3007";

const AUTH_ROUTES = `${HOST}/api/auth`;
const MESSAGE_ROUTES = `${HOST}/api/messages`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTES}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTES}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTES}/getall-users`;

export const ADD_NEW_MESSAGE = `${MESSAGE_ROUTES}/add-new-message`;
export const GET_MESSAGES = `${MESSAGE_ROUTES}/get-messages`;
export const ADD_IMAGE_MESSAGE = `${MESSAGE_ROUTES}/add-image-message`;
export const ADD_AUDIO_MESSAGE = `${MESSAGE_ROUTES}/add-audio-message`;