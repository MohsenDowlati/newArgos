import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicGFydGl5YTAyMTAiLCJhIjoiY2xoYzVjODlnMDlhbzNtbnZyNzdvZDV0NSJ9.pENwwnr9suPHN1Liq2izQA';

const MyMap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-122.4376, 37.7577], // set initial center of map
      zoom: 12, // set initial zoom level
    });

    // Add a custom circle layer to the map
    map.on('load', () => {
      map.addSource('my-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            { 
              id : '1',
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [-122.4376, 37.7577],
              },
            },
          ],
        },
      });

      map.addLayer({
        id: 'my-layer',
        type: 'circle',
        source: 'my-source',

        paint: {
        "circle-radius" : 4,
        'circle-color' : 'blue'
        },
      });
    });

    // Connect to WebSocket API
    const socket = new WebSocket('wss://api.argos.vision/ws/socket-server/');

    // Handle incoming data
    const key = "ARGv30002";
    
    socket.onopen = () => {
      socket.send(key)
    }
    
   
    

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const data2 = JSON.parse(data.live_data)
      console.log(data2.payload.detections.narrow)
      const lng = data2.payload.detections.wide[0].gps[0]
      const lat = data2.payload.detections.wide[0].gps[1]
      // Update the position of the circle layer
      const source = map.getSource('my-source');

      if (source) {
        const feature = source._data.features[0];
        feature.geometry.coordinates = [lat, lng];

        map.setFeatureState({ source: 'my-source', id: feature.id }, { position: feature.geometry.coordinates });
        source.setData(source._data);
      }
    };

    // Clean up on unmount
    return () => {
      socket.close();
      map.remove();
    };
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default MyMap;
