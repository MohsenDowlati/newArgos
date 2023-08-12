import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { BsPerson } from 'react-icons/bs'
import { BiCar } from 'react-icons/bi'

mapboxgl.accessToken =
  'pk.eyJ1IjoicGFydGl5YTAyMTAiLCJhIjoiY2xoYzVjODlnMDlhbzNtbnZyNzdvZDV0NSJ9.pENwwnr9suPHN1Liq2izQA'

const TestMap = ({ style }) => {
  const mapContainer = useRef(null)
  const popupRef = useRef(null)
  const [center, setCenter] = useState([-112.07257209863812, 33.46761542772093])
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: center, // set initial center of map
      zoom: 12, // set initial zoom level
    })

    // Add a custom circle layer to the map
    map.on('load', () => {
      map.addSource('my-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      })
      map.addSource('my-source2', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection2',
          features: [],
        },
      })

      map.addLayer({
        id: 'my-layer',
        type: 'circle',
        source: 'my-source',
        paint: {
          'circle-radius': 6,
          'circle-color': [
            'match',
            ['get', 'type'],
            0,
            '#81c8f8',
            1,
            '#818df8',
            2,
            '#ed3232',
            'gray',
          ],
        },
      })
      map.addLayer({
        id: 'my-layer2',
        type: 'circle',
        source: 'my-source2',
        paint: {
          'circle-radius': 6,
          'circle-color': '#81c8f8',
        },
      })
    })

    // Connect to WebSocket API
    const socket = new WebSocket('wss://api.argos.vision/ws/socket-server/')

    // Handle incoming data
    const key = 'ARGv30001'
    const key2 = 'ARGv30002'

    socket.onopen = () => {
      socket.send(key)
    }
    socket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data)
      // const parsedData = JSON.parse(jsonData)
      console.log(jsonData)
      const wide = jsonData.payload.detections.wide
      const narrow = jsonData.payload.detections.narrow
      let together = [...wide, ...narrow]

      if (!center && together.length > 0) {
        // If center is not set and there are GPS coordinates available, set the center of the map
        // setCenter([together[0].gps[1], together[0].gps[0]])
      }

      // Update the source data with the new points
      const source = map.getSource('my-source')

      if (source) {
        source.setData({
          type: 'FeatureCollection',
          features: together.map((point) => ({
            type: 'Feature',
            properties: {
              type: point.type,
              speed: point.speed,
            },
            geometry: {
              type: 'Point',
              coordinates: [point.gps[1], point.gps[0]],
            },
          })),
        })
      }
    }

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    })

    function handlepopup(type) {
      if (type === 1) {
        return 'Bike'
      }
      if (type === 2) {
        return 'Car'
      }
      if (type === 0) {
        return 'Person'
      }
    }

    // Display popup when hovering over a point
    map.on('mouseenter', 'my-layer', (e) => {
      map.getCanvas().style.cursor = 'pointer'

      const coordinates = e.features[0].geometry.coordinates.slice()
      const properties = e.features[0].properties

      const popupContent = `
      <h4 style={{color:'white',}}>${handlepopup(properties.type)}</h4>
       
      `

      popup.setLngLat(coordinates).setHTML(popupContent).addTo(map)
      const popupContainer = popup._content
      if (properties.type === 1) {
        popupContainer.style.backgroundColor = '#818df8'
        popupContainer.style.color = 'white'
      }
      if (properties.type === 2) {
        popupContainer.style.backgroundColor = '#ed3232'
        popupContainer.style.color = 'white'
      }
      if (properties.type === 0) {
        popupContainer.style.backgroundColor = '#81c8f8'
        popupContainer.style.color = 'white'
      }
    })

    // Remove popup when mouse leaves the point
    map.on('mouseleave', 'my-layer', () => {
      map.getCanvas().style.cursor = ''
      popup.remove()
    })

    // Clean up on unmount
    return () => {
      socket.close()
      map.remove()
    }
  }, [style, center])

  return (
    <div
      ref={mapContainer}
      className="bg-ind"
      style={{ width: '100%', height: '100vh' }}
    />
  )
}

export default TestMap
