import React from 'react';
import {Map as LeafletMap , TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from './util';

const Map = ({countries , center , zoom , casesType}) => {
    return (
        <div className="map" >
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Loop Through countries and draw circles on map */}
                {showDataOnMap(countries , casesType)}
            </LeafletMap>
        </div>
    )
};

export default Map;
