import {createContext, useContext, useReducer} from "react";
export const StateContext = createContext();

export const StateProvider = ({initialState, reducer, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}> 
    {/* // StateProvider component takes in the initialState and reducer as props and uses the useReducer hook to create a state and dispatch function, which are passed to the StateContext.Provider component as a value prop */}
        {children}
    </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext); // exports a custom hook useStateProvider, which uses the useContext hook to access the state and dispatch functions from the StateContext 
