import React, { createContext, useContext, useReducer } from "react";
export const StateContext = createContext();

//objeto que tienen acceso a los valores del context se le llama Provider usualmente
//Definimos el provider
//reducer: funcion global para modificar los estados
//initialState: el estado inicial
//children: los componentes hijos por los cuales seran envueltos por el Provider
export const StateProvider = ({ reducer, initialState, children }) => (
  //useReducer devolvera el state y dispatch
  //const [state, dispatch] = useReducer(reducer, initialState);
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//Definimos la herramienta para consumir el estado global
//useContext devolvera lo que se paso por value al StateContext
export const useStateValue = () => useContext(StateContext);
