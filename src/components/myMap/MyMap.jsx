import React, { useEffect, useContext } from 'react'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'
import { tileLayerContext } from '../../context/tileLayerContext/TileLayerContextProvider'
import './MyMap.css'
import { Map, View } from 'ol'
import {Modify} from 'ol/interaction.js';
import { viewContext } from '../../context/viewContext/ViewContextProvider'


const MyMap = () => {

    const { vectorLayerStore } = useContext(vectorLayerContext)
    const { tileLayerStore } = useContext(tileLayerContext)
    const { viewStore } = useContext(viewContext)


    useEffect(() => {
        const mapElement = document.getElementById('map')
        const initialMap = new Map({
            target: mapElement,
            layers: [
                tileLayerStore,
                vectorLayerStore.initialVectoreLayer
            ],
            view: viewStore.initialView
        })

        // add functionality to the add location pointer when adding a new location
        // ===========================================================================
        const modify = new Modify({
            hitDetection: vectorLayerStore.initialVectoreLayer,
            source: vectorLayerStore.initialVectoreLayer.get('source'),
          });
          modify.on(['modifystart', 'modifyend'], function (evt) {
            mapElement.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
            if(evt.type === 'modifyend') {
                console.log(modify.getOverlay().getSource().getFeatures()[0].getGeometry().getCoordinates())
                const selectedCoordinate = modify.getOverlay().getSource().getFeatures()[0].getGeometry().getCoordinates()
                // console.log(feature)
            }
          });
          const overlaySource = modify.getOverlay().getSource();
          overlaySource.on(['addfeature', 'removefeature'], function (evt) {
            mapElement.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
          });
        // ===========================================================================
 
          initialMap.addInteraction(modify);

        console.log(initialMap.getAllLayers())
        return () => initialMap.setTarget(null)
    }, [vectorLayerStore, tileLayerStore])

  return (
    <>
        <div id='map' className='map'></div>
    </>
  )
}

export default MyMap