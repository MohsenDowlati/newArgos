import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { BsPerson } from 'react-icons/bs';
import { BiCar } from 'react-icons/bi';

mapboxgl.accessToken = 'pk.eyJ1IjoicGFydGl5YTAyMTAiLCJhIjoiY2xoYzVjODlnMDlhbzNtbnZyNzdvZDV0NSJ9.pENwwnr9suPHN1Liq2izQA';

const  TestMap = ({style}) => {
  const mapContainer = useRef(null);
  const popupRef = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [-122.4376, 37.7577], // set initial center of map
      zoom: 12, // set initial zoom level
    });

    // Add a custom circle layer to the map
    map.on('load', () => {
      map.addSource('my-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      map.addLayer({
        id: 'my-layer',
        type: 'circle',
        source: 'my-source',
        paint: {
          'circle-radius': 6,
          'circle-color': [
            'match',
            ['get', 'type'],
            1, '#2f9bfa',
            2, '#ed3232',
            'gray',
          ],
        },
      });
    });

    // Connect to WebSocket API
    const socket = new WebSocket('wss://api.argos.vision/ws/socket-server/');

    // Handle incoming data
    const key = "ARGv30003";
    
    socket.onopen = () => {
      socket.send(key)
    }
    socket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      // const parsedData = JSON.parse(jsonData)
      const parsedData =JSON.parse(jsonData.live_data)
      console.log(parsedData)
      // Update the source data with the new points
      const source = map.getSource('my-source');
      if (source) {
        source.setData({
          type: 'FeatureCollection',
          features: parsedData.payload.detections.wide?.map((point) => ({
            type: 'Feature',
            properties: {
              type: point.type,
              speed : point.speed,
            },
            geometry: {
              type: 'Point',
              coordinates: [point.gps[1], point.gps[0]],
            },
          })),
        });
      }
    };

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    function handlepopup(type){
        if(type === 1){
          return('Person')
        }
        if(type ===2){
          return('Car')
        }

    }

    // Display popup when hovering over a point
    map.on('mouseenter', 'my-layer', (e) => {
      map.getCanvas().style.cursor = 'pointer';

      const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties;

      const popupContent = `
      <h4 style={{color:'white',}}>${handlepopup(properties.type)}</h4>
        <p> Speed : ${properties.speed}</p>
      `;

      popup.setLngLat(coordinates).setHTML(popupContent).addTo(map);
      const popupContainer = popup._content;
      if(properties.type === 1){
        popupContainer.style.backgroundColor = '#2f9bfa';
        popupContainer.style.color = 'white';
      }
      if(properties.type === 2){
        popupContainer.style.backgroundColor = '#ed3232';
        popupContainer.style.color = 'white';
      }

      
    });

    // Remove popup when mouse leaves the point
    map.on('mouseleave', 'my-layer', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    // Clean up on unmount
    return () => {
      socket.close();
      map.remove();
    };
  }, [style]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default TestMap;
