import { View } from 'ol'
import React, { createContext, useReducer } from 'react'
export const viewContext = createContext(null)

const initialState = {
    initialView: new View({
        center: [51.72272216, 32.65753944],
        projection: 'EPSG:4326',
        zoom: 10
    })
}

const reducer = (state, action) => {
    switch(action.type) {

    }
}

const ViewContextProvider = ({children}) => {
    
    const [viewStore, dispatchView] = useReducer(reducer, initialState)

  return (
    <viewContext.Provider value={{ viewStore, dispatchView }}>
        {children}
    </viewContext.Provider>
  )
}

export default ViewContextProvider