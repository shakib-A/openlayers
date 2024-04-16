import React, { useEffect, useContext, useState } from 'react'
import { vectorLayerContext } from '../../context/vectorLayerContext/VectorLayerContextProvider'
import { tileLayerContext } from '../../context/tileLayerContext/TileLayerContextProvider'
import './MyMap.css'
import { Map, View } from 'ol'
import {Modify} from 'ol/interaction.js';
import Collection from 'ol/Collection.js'
import Overlay from 'ol/Overlay.js';
import { viewContext } from '../../context/viewContext/ViewContextProvider'
import { infoContext } from '../../context/infoContext/InfoContextProvider'
import { Style, Fill, Stroke, Text } from 'ol/style'
import Select from 'ol/interaction/Select.js';
import { click} from 'ol/events/condition.js';




const MyMap = () => {

  const overlayContainer = document.querySelector('#popup-container')
  const popUp = document.querySelector('#popup')

    const { vectorLayerStore } = useContext(vectorLayerContext)
    const { tileLayerStore } = useContext(tileLayerContext)
    const { viewStore } = useContext(viewContext)
    const { infoStore, dispatchInfo } = useContext(infoContext)
    const [ selectedFeatures, useSelectedFeatures ] = useState(null)


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

        // adds popup on features to show detail
        // ================================================
        const popupOvelay = new Overlay({
          element: overlayContainer
        })

        initialMap.addOverlay(popupOvelay)
        popupOvelay.setPosition(undefined)

        initialMap.on('click', function(e) {
          popupOvelay.setPosition(undefined)
          const regularFeature = initialMap.forEachFeatureAtPixel(e.pixel, (feature) => {
            if(feature.getKeys().includes('persianname') === false){
              return feature 
            }
          })
          const polyGonFeature = initialMap.forEachFeatureAtPixel(e.pixel, (feature) => {
            if(feature.getKeys().includes('persianname') === true){
              return feature 
            }
          })
          if(regularFeature) {
            popupOvelay.setPosition(e.coordinate)
            popUp.innerHTML = regularFeature.get('name')
          } else if(polyGonFeature) {
   
            // popUp.innerHTML = polyGonFeature.get('persianname')
          } else {
            return
          }
        })
        // ================================================

        // create a ref for selected features (useState)
        // create a style to put on selected features
        const selectFeatureStyle = new Style({
          text: new Text({
            font: '16px Calibri,sans-serif',
            overflow: true,
          }),
          fill: new Fill({
            color: 'yellow'
          }),
          stroke: new Stroke({
            color: 'rgba(150, 150,150, .7)',
            width: 2
          })
        })
        // a function to check if the feature selected has a color or not
        function selectStyle(feature) {
          const color = feature.get('COLOR') || 'yellow'
          const label = feature.get('persianname')
          selectFeatureStyle.getFill().setColor(color)
          selectFeatureStyle.getText().setText(label)
          return selectFeatureStyle
        }
        // create a select interaction and pass the function above to its style
        const selectPolygon = new Select({
          condition: click,
          style: selectStyle
        })
        // add the created select interaction to map  
        initialMap.addInteraction(selectPolygon)


        // extracting the pointerFeature --> adding it to new Collection
        // --> add the collection to modify.features to only modify pointer feature icon
        // ==============================================================================
        const allFeatures = vectorLayerStore.initialVectoreLayer.get('source').getFeatures()
        const pointerFeature = allFeatures.filter((feature) => {
          return feature.get('type') === 'pointer'
        })
        const modifyableFeature = new Collection(pointerFeature) 
        // ======================================================================
        

        // add functionality to the add location pointer when adding a new location
        // ===========================================================================
        const modify = new Modify({
            hitDetection: vectorLayerStore.initialVectoreLayer,
            features: modifyableFeature,
          });
          modify.on(['modifystart', 'modifyend'], function (evt) {
            mapElement.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
            if(evt.type === 'modifyend') {
                console.log(modify.getOverlay().getSource().getFeatures()[0].getGeometry().getCoordinates())
                const selectedCoordinate = modify.getOverlay().getSource().getFeatures()[0].getGeometry().getCoordinates()
                dispatchInfo({type: 'SET_SELECTED_COORD', payload: selectedCoordinate})
            }
          });
          const overlaySource = modify.getOverlay().getSource();
          overlaySource.on(['addfeature', 'removefeature'], function (evt) {
            mapElement.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
          });
        // ===========================================================================
 
          initialMap.addInteraction(modify);

        return () => initialMap.setTarget(null)
    }, [vectorLayerStore, tileLayerStore])

  return (
    <>
        <div id='map' className='map'></div>
        <div id="popup-container">
          <div id="popup"></div>
        </div>
    </>
  )
}

export default MyMap