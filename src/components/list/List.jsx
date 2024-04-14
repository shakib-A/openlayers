import React, { useContext, useState } from 'react'
import ListItem from '../listItem/ListItem'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'
import './List.css'


const List = () => {

  const { vectorLayerStore } = useContext(vectorLayerContext)
  const featuresArr = vectorLayerStore.initialVectoreLayer.getSource().getFeatures()

  return (
    <>
      {featuresArr
      ? featuresArr.map((feature, index) => {
        // check if the feature is added on the map or not.
        // pointer feature doesn't have 'name' property
        if(feature.getKeys().includes('name')){
          const featureId = feature.get('id')
          return <ListItem key={index}
            feature={feature} 
            featureId={featureId}
          />}})
      : <p>no points selected yet</p>
      }
    </> 
  )
}

export default List