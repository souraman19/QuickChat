import {createContext, useContext, useReducer} from "react";
export const StateContext = createContext();

export const StateProvider = ({initialState, reducer, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}> 
        {children}
    </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext); // exports a custom hook useStateProvider, which uses the useContext hook to access the state and dispatch functions from the StateContext 
