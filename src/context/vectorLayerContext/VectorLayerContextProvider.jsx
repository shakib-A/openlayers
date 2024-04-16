import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import { Text, Stroke, Fill } from 'ol/style.js'
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
            feature.get('type') === 'pointer'
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
          case "REMOVE_LOCATION": {
            const { featureId } = action.payload
            // find edite feature and remove it
            // ============================================================
            const newFeatureArr = featuresArr
            const editedFeatureIndex = newFeatureArr.findIndex((feature) => {
              feature.getKeys().includes('id') === featureId
            })
            newFeatureArr.splice(editedFeatureIndex, 1)
            // ============================================================
            return { ...state, initialVectoreLayer: new VectorLayer({
              source: new VectorSource({
                features: newFeatureArr
              })
            })}
          }
          case "EDIT_LOCATION": {
            const { featureId, pointerIcon } = action.payload
            const newFeatureArr = featuresArr
            // finde edited feature and replace it with new pointer received from payload
            // ================================================================
            const selectedFeatureIndex = newFeatureArr.findIndex((feature) => {
              return feature.get('id') === featureId
            })
            newFeatureArr[selectedFeatureIndex] = pointerIcon
            // ================================================================
            return { ...state, initialVectoreLayer: new VectorLayer({
              source: new VectorSource({
                features: newFeatureArr
              })
            })}
          }
          case "TOGGLE_GEOJSON": {
            //TODO: it does not toggle. it just adds the geojson. fix it
            //TODO: keep the points features on the list. don't remove them
            
            const style = new Style({
              stroke: new Stroke({
                color: '#319FD3',
                width: 1,
              }),
              fill: new Fill({
                color: 'rgba(255, 255, 255, 0.6)',
              }),
            })
      
            return { ...state, initialVectoreLayer: new VectorLayer({
              source: new VectorSource({
                features:  action.payload,
              }),
              style: style
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