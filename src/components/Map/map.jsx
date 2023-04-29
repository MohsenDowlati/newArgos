// Imports
import React, { useState, useEffect, useRef } from 'react';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import View from "ol/View";
import Map from "ol/Map";
import makePoint from './point';

// Map Wrapper function
function MapWrapper() {

    // set intial state
    const mapTargetElement = useRef(null);
    const [map, setMap] = useState(null);

    // Set default background map
    const bg = new TileLayer({
        source: new XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
        })
    })

    useEffect(() => {
        // Create the vector information
        var vectorLayer = new VectorLayer({
            name: "points",
            source: new VectorSource(),
        });

        // Create OpenLayers map so we can display it to the user.
        const InitializeMap = new Map({
            // Set the map
            layers: [
                bg,
                vectorLayer
            ],

            // Set the view of the map
            view: new View({
                // The map view projection.
                projection: "EPSG:3857",
                center: fromLonLat([-73.935242, 40.730610]),
                zoom: 14,
            }),
            
            // Disable all controls
            controls: []
        })

        // Call API point overtime
        const intervalId = setInterval(() => {
            // Get layer source
            const layerSource = vectorLayer.getSource(); 

            // Clear layer
            layerSource.clear();

            // API call
            fetch('http://127.0.0.1:8000/api/v1/camera/test')
                .then((res) => res.json())
                .then((data) => {
                    data.forEach(item => {
                        console.log(item)
                        layerSource.addFeature(makePoint(item["coord"], item["name"]))
                    }) 
                })
                .catch((error) => console.log(error));
        }, 1000);
        
        // Set the Initialized map to the map target element.
        InitializeMap.setTarget(mapTargetElement.current || "")

        // Set the current map, so we can continue working with it.
        setMap(InitializeMap)

        // Return useEffect
        return () => { InitializeMap.setTarget(""); }
    }, []);

    // render component
    return (      
        <div
            ref={mapTargetElement}
            className="map"
            style={{
                width: "50%",
                height: "50%",
                position: "relative",
            }}
        ></div>
    ) 

}

// Export component
export default MapWrapper;