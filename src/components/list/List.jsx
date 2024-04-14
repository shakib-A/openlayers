import React, { useContext, useState } from 'react'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'
import { infoContext } from '../../context/infoContext/InfoContextProvider'
import './List.css'
import { Feature } from 'ol'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import { Point } from 'ol/geom'
import pointer_icon from '../../assets/map-outlined-pointer-svgrepo-com.svg'
import location_icon from '../../assets/map-pointer-svgrepo-com.svg'

const List = () => {

  const { vectorLayerStore, dispatchVectorLayer } = useContext(vectorLayerContext)
  const { infoStore } = useContext(infoContext)
  const featuresArr = vectorLayerStore.initialVectoreLayer.getSource().getFeatures()
  const [isEditingLocation, setIsEditingLocation] = useState(false)

  const handleEdit = (featureId) => {
    const inputElement = document.getElementById(`input-${featureId}`)
    inputElement.readOnly = false
    inputElement.focus()
   }

  const handleChange = (featureId, e) => {
    const inputElement = e.target
    if(e.key === 'Enter') {
      // set the value of the feature to input value
      const load = {
        featureId: featureId,
        newName: inputElement.value
      }
      dispatchVectorLayer({ type: 'EDIT_FEATURE_NAME', payload: load })
      inputElement.readOnly = true
    }
  }

  const handleDelete = (featureId) => {
    dispatchVectorLayer({ type: 'REMOVE_LOCATION', payload: featureId })
  }

  const handleEditLocation = (feature) => {
    // get the current Geometry
    console.log(feature.getKeys())
    const featureId = feature.get('id')
    const featureGeometry = feature.get('geometry')
    const featureName = feature.get('name')
    // create a pointer feature with 'name' property to keep the featore on the list
    // and 'type' property to enable modification.
    // use the the current Geometry to place the pointer
    const pointerFeature = new Feature({
      geometry: featureGeometry,
      name: featureName,
      id: featureId,
      type: 'pointer'
    })
    const featureStyle = new Style({
      image: new Icon({
        anchor: [0.5, 850],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: pointer_icon,
        width: 60,
        height: 60
      })
    })
    pointerFeature.setStyle(featureStyle)
    // send featureID and PointerIcon to VectoreContext throw payload
    const load = {
      featureId: featureId,
      pointerIcon: pointerFeature
    }

    dispatchVectorLayer({ type: 'EDIT_LOCATION', payload: load })
    setIsEditingLocation(true)
  }

  const applyLocationEdit = (feature) => {
    const feautureId = feature.get('id')
    const featureName = feature.get('name')
    const newLocationFeature = new Feature({
      geometry: new Point(infoStore.selectedCoord),
      name: featureName,
      id: feautureId
    })
    const locationStyle = new Style({
      image: new Icon({
        anchor: [0.5, 850],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: location_icon,
        width: 60,
        height: 60
      })
    })
    newLocationFeature.setStyle(locationStyle)

      dispatchVectorLayer({type: 'REMOVE_POINTER'})
      dispatchVectorLayer({type: 'ADD_NEW_LOCATION', payload: newLocationFeature})
      setIsEditingLocation(false)
  }

  return (
    <>
      {featuresArr
      ? featuresArr.map((feature, index) => {
        // check if the feature is added on the map or not.
        // pointer feature doesn't have 'name' property
        if(feature.getKeys().includes('name')){
          const featureId = feature.get('id')
          return <div className='list-item' key={index}>
            <input readOnly id={`input-${featureId}`} className='list-input' type="text" onKeyDown={(event) => handleChange(featureId, event)}  defaultValue={feature.get('name')} />
            <div className='btn-container'>
              <button onClick={() => handleEdit(featureId)} className='list-btn'>edit</button>
              <button onClick={() => handleDelete(featureId)} className='list-btn'>delete</button>
              {isEditingLocation 
              ? <button onClick={() => applyLocationEdit(feature)} className='list-btn editing-location'>Apply</button>
              : <button onClick={() => handleEditLocation(feature)} className={`list-btn`}>Edit Location</button>
              }
            </div>
          </div>
        }
      })
      : <p>no points selected yet</p>
      }
    </>
  )
}

export default List