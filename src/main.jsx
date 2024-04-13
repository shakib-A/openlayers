import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TileLayerContextProvider from './context/tileLayerContext/TileLayerContextProvider'
import VectorLayerContextProvider from './context/vectorLayerContext/VectorLayerContextProvider'
import ViewContextProvider from './context/viewContext/ViewContextProvider'
import InfoContextProvider from './context/infoContext/InfoContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // </React.StrictMode>,
  <TileLayerContextProvider>
    <VectorLayerContextProvider>
      <ViewContextProvider>
        <InfoContextProvider>
          <App />
        </InfoContextProvider>
      </ViewContextProvider>
    </VectorLayerContextProvider>
  </TileLayerContextProvider>
)
