import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import React, { createContext, useReducer } from 'react'
export const vectorLayerContext = createContext(null)

const initialState = {
  initialVectoreLayer: new VectorLayer({
    source: new VectorSource({
      features: []
    })
})
}

const reducer = (state, action) => {
    const featuresArr = state.initialVectoreLayer.getSource().getFeatures()
    switch(action.type) {
        case 'ADD_POINTER': 
        return { ...state, initialVectoreLayer: new VectorLayer({
          source: new VectorSource({
            features: [...featuresArr, action.payload]
          })
        }) }

        case "REMOVE_POINTER": {

          // finds the pointer feature and remove it
          // =============================================
          const newFeatureArr = featuresArr
          const pointerFeature = newFeatureArr.findIndex((feature) => {
            feature.getKeys().includes('name') === undefined
          })
          newFeatureArr.splice(pointerFeature, 1)
          // =============================================
          return { ...state, initialVectoreLayer: new VectorLayer({
            source: new VectorSource({
              features: newFeatureArr
            })
          })}
        }
          case "ADD_NEW_LOCATION":
            return { ...state, initialVectoreLayer: new VectorLayer({
              source: new VectorSource({
                features: [...featuresArr, action.payload]
              })
            })}
          case "EDIT_FEATURE_NAME": {
            const { featureId, newName } = action.payload
            const editedFeatureIndex = featuresArr.findIndex((feature) =>{
              return feature.get('id') === featureId
            })
            const newFeatureArr = featuresArr
            newFeatureArr[editedFeatureIndex].set('name', newName)
            console.log(newFeatureArr[editedFeatureIndex].get('name'))
            return { ...state, initialVectoreLayer: new VectorLayer({
              source: new VectorSource({
                features: newFeatureArr
              })
            })}
          }
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