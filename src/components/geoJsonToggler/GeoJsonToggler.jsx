import React, { useContext } from 'react'
import './GeoJsonToggler.css'
import region from '../../utils/region.json'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'
import GeoJSON from 'ol/format/GeoJSON'

const GeoJsonToggler = () => {

    const { dispatchVectorLayer } = useContext(vectorLayerContext)
    const geoJsonFeatures = new GeoJSON().readFeatures(region)
    console.log(region)
    const handleGeoJson = () => {
        dispatchVectorLayer({ type: 'TOGGLE_GEOJSON', payload: geoJsonFeatures })
    }

  return (
    <div>
        <button onClick={handleGeoJson} className='toggler'>toggle GeoJson</button>
    </div>
  )
}

export default GeoJsonToggler