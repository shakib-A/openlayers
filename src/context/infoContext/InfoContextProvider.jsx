import React, { createContext, useReducer } from 'react'
export const infoContext = createContext(null)

const initialState = {
    selectedCoord: [],
}
const reducer = (state, action) => {
    switch(action.type) {
        case "SET_SELECTED_COORD": 
        return { ...state, selectedCoord: action.payload }
    }
}

const InfoContextProvider = ({children}) => {

    const [infoStore, dispatchInfo] = useReducer(reducer, initialState)

  return (
    <infoContext.Provider value={{ infoStore, dispatchInfo }}>
        {children}
    </infoContext.Provider>
  )
}

export default InfoContextProvider