import React, { useContext } from 'react'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'
import './List.css'

const List = () => {

  const { vectorLayerStore } = useContext(vectorLayerContext)
  console.log(vectorLayerStore.initialVectoreLayer.getSource().getFeatures())
  const featuresArr = vectorLayerStore.initialVectoreLayer.getSource().getFeatures()
  return (
    <>
      {featuresArr 
      ? <div>hello</div>
      : <p>no location set</p>
      }
    </>
  )
}

export default List