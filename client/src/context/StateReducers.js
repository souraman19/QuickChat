import { reducerCases } from "./Constants";

export const initialState = {
    userInfo: undefined,
    newUser: false,
    contactsPage: false,
    currentChatUser: undefined,
    messages: [],
    socket: undefined,
    messagesSearch: false, 
    userContacts: [],
    onlineUsers: [],
    filteredContacts: [],
};

const reducer = (state, action) => { //Reducer function to manage state changes.
    switch(action.type) {
        case reducerCases.SET_USER_INFO: //Action to set user information in the state.
            return {
                ...state,
                userInfo: action.userInfo,
            };
        case reducerCases.SET_NEW_USER:  //Action to set the newUser state to true.
            return {
                ...state,
                newUser: action.newUser,
            };
        case reducerCases.SET_ALL_CONTACTS_PAGE:
            return {
                ...state,
                contactsPage: !state.contactsPage, 
            }
        case reducerCases.CHANGE_CURRENT_CHAT_USER:
            return{
                ...state,
                currentChatUser: action.user,
            }
        case reducerCases.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            }
        case reducerCases.SET_SOCKET:
            return {
                ...state,
                socket: action.socket,
            }
        case reducerCases.ADD_MESSAGE: //Action to add a new message to the state.
            return {
                ...state, //Return a new state object with the new message added to the messages array.
                messages: [...state.messages, action.newMessage]    
            }
        case reducerCases.SET_MESSAGE_SEARCH:
            return {
                ...state,
                messagesSearch: !state.messagesSearch,
            }
        case reducerCases.SET_USER_CONTACTS:
            return {
                ...state,
                userContacts: action.userContacts,
            }
        case reducerCases.SET_ONLINE_USERS: 
            return {
                ...state,
                onlineUsers: action.onlineUsers,
            }
        case reducerCases.SET_CONTACT_SEARCH: {
            const filteredContacts = state.userContacts.filter((contact) => 
                contact.name.toLowerCase().includes(action.contactSearch.toLowerCase())
            )
            return {
                ...state,
                contactSearch: action.contactSearch,
                filteredContacts,
            }
        }
        default: 
        return state; //Return the current state if no action type matches.
    }
}

export default reducer;
