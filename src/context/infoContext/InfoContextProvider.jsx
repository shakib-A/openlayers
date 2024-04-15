import { Style, Stroke, Fill } from 'ol/style'
import React, { createContext, useReducer } from 'react'
export const infoContext = createContext(null)

const initialState = {
    selectedCoord: [],
    isSideExpanded: false
}
const reducer = (state, action) => {
    switch(action.type) {
        case "SET_SELECTED_COORD": 
            return { ...state, selectedCoord: action.payload }
        case "TOGGLE_SIDEBAR_STATE": {
            return { ...state,  isSideExpanded: !state.isSideExpanded }
        }
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