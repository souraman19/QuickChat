import { reducerCases } from "./Constants";

export const initialState = {
    userInfo: undefined,
    newUser: false,
    contactsPage: false,
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
        default: 
        return state; //Return the current state if no action type matches.
    }
}

export default reducer;
