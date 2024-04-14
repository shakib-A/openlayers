import React, { useContext, useState } from 'react'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'
import { infoContext } from '../../context/infoContext/InfoContextProvider'
import { Feature } from 'ol'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import { Point } from 'ol/geom'
import pointer_icon from '../../assets/map-outlined-pointer-svgrepo-com.svg'
import location_icon from '../../assets/map-pointer-svgrepo-com.svg'


const ListItem = ({ featureId, feature }) => {

    const { dispatchVectorLayer } = useContext(vectorLayerContext)
    const { infoStore } = useContext(infoContext)

    const [isEditingLocation, setIsEditingLocation] = useState(false)



    const handleEdit = (id) => {
        const inputElement = document.getElementById(`input-${id}`)
        inputElement.readOnly = false
        inputElement.focus()
       }

    const handleChange = (id, e) => {
        const inputElement = e.target
        console.log(id)
        if(e.key === 'Enter') {
          // set the value of the feature to input value
          const load = {
            featureId: id,
            newName: inputElement.value
          }
          dispatchVectorLayer({ type: 'EDIT_FEATURE_NAME', payload: load })
          inputElement.readOnly = true
        }
      }

      const handleDelete = (id) => {
        dispatchVectorLayer({ type: 'REMOVE_LOCATION', payload: id })
      }

      const handleEditLocation = (featureArg) => {
        // get the current Geometry
        const id = featureArg.get('id')
        const featureGeometry = featureArg.get('geometry')
        const featureName = featureArg.get('name')
        // create a pointer feature with 'name' property to keep the featore on the list
        // and 'type' property to enable modification.
        // use the the current Geometry to place the pointer
        const pointerFeature = new Feature({
          geometry: featureGeometry,
          name: featureName,
          id: id,
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

      const applyLocationEdit = (featureArg) => {
        const featureName = featureArg.get('name')
        const id = featureArg.get('id')
        const newLocationFeature = new Feature({
          geometry: new Point(infoStore.selectedCoord),
          name: featureName,
          id: id
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
        <div className='list-item'>
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
    </>
  )
}

export default ListItem