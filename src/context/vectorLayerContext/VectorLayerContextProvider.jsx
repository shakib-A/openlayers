import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import React, { createContext, useReducer } from 'react'
export const vectorLayerContext = createContext(null)

const initialState = {
  initialVectoreLayer: new VectorLayer({
    source: new VectorSource()
})
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_POINTER': 
        return { ...state, initialVectoreLayer: new VectorLayer({
          source: new VectorSource({
            features: [action.payload]
          })
        }) }
    }
}

const VectorLayerContextProvider = ({children}) => {

    const [vectorLayerStore, dispatchVectorLayer] = useReducer(reducer, initialState)

  return (
    <vectorLayerContext.Provider value={{ vectorLayerStore, dispatchVectorLayer }}>
        {children}
    </vectorLayerContext.Provider>
  )
}

export default VectorLayerContextProvider