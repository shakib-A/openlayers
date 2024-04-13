import React, { useContext } from 'react'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'
import './List.css'

const List = () => {

  const { vectorLayerStore, dispatchVectorLayer } = useContext(vectorLayerContext)
  const featuresArr = vectorLayerStore.initialVectoreLayer.getSource().getFeatures()

  const handleEdit = (featureId) => {
    const inputElement = document.getElementById(`input-${featureId}`)
    inputElement.readOnly = false
    inputElement.focus()
    
    // inputElement.readOnly = true
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

  const handleDelete = () => {

  }

  const handleEditLocation = () => {

  }

  return (
    <>
      {featuresArr
      ? featuresArr.map((feature, index) => {
        // check if the feature is added on the map or not.
        // pointer feature doesn't have 'name' key
        if(feature.getKeys().includes('name')){
          const featureId = feature.get('id')
          return <div className='list-item' key={index}>
            <input readOnly id={`input-${featureId}`} className='list-input' type="text" onKeyDown={(event) => handleChange(featureId, event)}  defaultValue={feature.get('name')} />
            <div className='btn-container'>
              <button onClick={() => handleEdit(featureId)} className='list-btn'>edit</button>
              <button onClick={() => handleDelete(featureId)} className='list-btn'>delete</button>
              <button onClick={() => handleEditLocation(featureId)} className='list-btn'>edit location</button>
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