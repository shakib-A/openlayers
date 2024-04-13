import React, { useState, useContext, useRef } from 'react'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'
import './AddLocationForm.css'

import { Feature } from 'ol'
import { Point } from 'ol/geom'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import pointer_icon from '../../assets/map-outlined-pointer-svgrepo-com.svg'
import location_icon from '../../assets/map-pointer-svgrepo-com.svg'
import { infoContext } from '../../context/infoContext/InfoContextProvider'

const AddLocationForm = () => {

  const [addingNewLocation, setAddingNewLocation] = useState(false)
  const { vectorLayerStore, dispatchVectorLayer } = useContext(vectorLayerContext)
  const { infoStore } = useContext(infoContext)
  const nameInput = useRef()

  const handleNewLocation = () => {
    setAddingNewLocation(prev => !prev)
     // create  pointer icon to point to the location that user wants.
     const pointerIcon = new Feature({
      geometry: new Point([0, 0]),
      
    })
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 850],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: pointer_icon,
        width: 60,
        height: 60
      })
    })
    pointerIcon.setStyle(iconStyle)

    // update vectorLayer and add the pointerIcon to it.
    dispatchVectorLayer({
      type: 'ADD_POINTER',
      payload: pointerIcon
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const nameValue = nameInput.current.value
    const newLocationFeature = new Feature({
      geometry: new Point(infoStore.selectedCoord),
      name: nameValue,
      id: Date.now()
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
    dispatchVectorLayer({type: "REMOVE_POINTER"})
    dispatchVectorLayer({type: "ADD_NEW_LOCATION", payload: newLocationFeature})
    setAddingNewLocation(prev => !prev)
  }

  return (
    <>
      {addingNewLocation
      ? <form className='form'>
          <div className="input-item">
            <label  htmlFor="">name</label>
            <input ref={nameInput} type="text" />
          </div>

          <div className="input-item">
            <label htmlFor="">description</label>
            <input type="text" />
          </div>

          <div className="input-item">
            <label htmlFor="">long</label>
            <input type="text" defaultValue={infoStore.selectedCoord[1]} />
          </div>

          <div className="input-item">
            <label htmlFor="">lat</label>
            <input type="text" defaultValue={infoStore.selectedCoord[0]} />
          </div>
          <button onClick={handleSubmit}>add</button>
      </form> 
    : <button className='add-new-location' onClick={handleNewLocation}>Add New Location</button>
      }
    </>
  )
}

export default AddLocationForm