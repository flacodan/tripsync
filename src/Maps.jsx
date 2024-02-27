import { useState, useEffect } from 'react';
import axios from 'axios';
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapG1 from 'react-map-gl';
import Map from 'react-map-gl';
import './Maps.css';
import { Marker } from 'react-map-gl';
import { Room } from '@material-ui/icons';

const TOKEN = 'pk.eyJ1IjoidHJpcHN5bmMiLCJhIjoiY2xzdGlsbms1MHJqZDJycW5iMjZ3Y3N5MyJ9.CGlzrmUP4GqZ6yOkKu730Q'

export default function Maps(props){
    const [newPlace, setNewPlace] = useState(null)
    const [drop, setDrop] = useState(false)
    const [dropPosition, setDropPosition] = useState({ left: 0, top: 0 })
    const [formIsShown, setFormIsShown] = useState(false)
    const [pinName, setPinName] = useState('')
    const [dropArr, setDropArr] = useState([])
    const [viewport, setViewport] = useState({
        latitude: 42.8330,
        longitude: -108.7307,
        zoom: 3
      });

      useEffect(() => {
        axios.get("/pin-place", {params: {trip_id: props.trip_id}})
        .then((response) => {
          setDropArr(response.data)
        })
      },[])
// console.log(props.trip_id)
      function handleClick(e) {
        e.preventDefault()
        setFormIsShown(true)
        const {lng, lat} = e.lngLat;
        // console.log(lng, lat)
        
        setNewPlace({
          lat: lat,
          long: lng,
        })

        setDrop(true)
        setDropPosition({
          left: e.originalEvent.pageX + 25,
          top: e.originalEvent.pageY - 25,
        })        
      }

      let allDrops = dropArr.map((drop, index) => {
        return (
          <Marker
            key={index}
            latitude={drop.pin_lat}
            longitude={drop.pin_long}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
          >
            <Room 
              style={{
                fontSize: 20 * viewport.zoom,
                color:"tomato",
                cursor: "pointer",
              }}
            />
            {drop.pin_name}
          </Marker>
        )
      })
      
      function closeForm(e) {
        e.preventDefault()
        setFormIsShown(false)
        setDrop(false)
      }
      
      function save(e) {
        e.preventDefault()
        let maBod = {
          newPlace: newPlace,
          pinName: pinName,
          trip_id: +props.trip_id,
        }
        // console.log(props.trip_id)
        
        axios.post("/coord", maBod)
        .then((response) => {
          setDropArr(response.data)
          setFormIsShown(false)
          setDrop(false)
          
        })
      }
      // console.log(newPlace)

      return (
        <>
         <div className="map-container">
                    <Map
                    
                    initialViewState={viewport}
                    mapboxAccessToken={TOKEN}
                    width="100%"
                    height="100%"
                    translationDuration='200'
                    mapStyle='mapbox://styles/tripsync/clsuplmza000201redsal0ee1'
                    onViewportChange={(viewPort) => setViewport(viewport)}
                    onDblClick={handleClick}
                    
                    >
                      {allDrops}
                      {newPlace && formIsShown ? (
                        <>
                        <Marker
                          
                          latitude={newPlace?.lat}
                          longitude={newPlace?.long}

                          offsetLeft={-3.5 * viewport.zoom}
                          offsetTop={-7 * viewport.zoom}
                          >
                            <Room 
                            style={{
                              fontSize: 20 * viewport.zoom,
                              color:"tomato",
                              cursor: "pointer",
                            }}
                            />

                        </Marker>
                        </>
                      ): null}
                    </Map>

                </div>
                {drop && (
                  <div className="form-container">
                    <form className="drop" style={{ position: "absolute", left: dropPosition.left, top: dropPosition.top}}>
                      <input value={pinName} onChange={(e)=> setPinName(e.target.value)} placeholder="Name Pin Here..."></input>
                      <button onClick={closeForm} className="x-button">X</button>
                      <button onClick={save}>Save</button>
                    </form>
                  </div>
                )}
        </>
      )
}