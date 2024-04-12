import React, { createContext, useReducer } from 'react'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'

export const tileLayerContext = createContext(null)

const initialTileLayer = new TileLayer({
    source: new OSM()
})
const reducer = (state, action) => {
    switch(action.type) {

    }
}

const TileLayerContextProvider = ({children}) => {

    const [tileLayerStore, dispatchTileLayer] = useReducer(reducer, initialTileLayer)

  return (
    <tileLayerContext.Provider value={{ tileLayerStore, dispatchTileLayer }}>
        {children}
    </tileLayerContext.Provider>
  )
}

export default TileLayerContextProvider