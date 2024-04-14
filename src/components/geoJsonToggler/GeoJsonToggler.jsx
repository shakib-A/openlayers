import React, { useContext } from 'react'
import './GeoJsonToggler.css'
import region from '../../utils/region.json'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'

const GeoJsonToggler = () => {

    const { dispatchVectorLayer } = useContext(vectorLayerContext)
    console.log(region)
    const handleGeoJson = () => {
        dispatchVectorLayer({ type: 'TOGGLE_GEOJSON', payload: region })
    }

  return (
    <div>
        <button onClick={handleGeoJson} className='toggler'>toggle GeoJson</button>
    </div>
  )
}

export default GeoJsonToggler