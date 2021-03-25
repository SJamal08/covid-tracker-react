import React, { useEffect , useState } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { showDataOnMap } from '../table/utils'

import "./map.css"

function MyComponent({center , zoom}) {
    const map = useMap()
    useEffect(() => {
            map.flyTo([center.lat, center.lng], map.getZoom())
            console.log("la mape fly to bf")
    }, [center])
    return null
  }


function Map({ countries, casesType ,center , zoom}) {
   
    return (
        
        <div className="map">
            <MapContainer center={[ 38 , -97]} zoom={zoom}>
                 <MyComponent center={center} zoom={zoom}  />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
