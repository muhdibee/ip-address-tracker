import { useState } from 'react';
import 'leaflet/dist/leaflet.css'
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";

function App() {
  // var map = L.map('map').setView([51.505, -0.09], 13);
  return (
    <div className='app-container'>
      <div className='hero-image-container'>
        <div className='search-container'>
          <p>IP Address Tracker</p>
          <div className="search-field">
            <form>
              <input type='text' placeholder='Search for any IP address or domain'></input>
              <input type="submit" value=">"  style={{background: '#000000', color: 'white'}}/>
            </form>
          </div>
        </div>
      </div>
      <MapContainer
        center={[9.0563, 7.4985]}
        zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* TODO: Add markers */}
      </MapContainer>
      
      {/* <div className='map'>
        <div className='result-info'>

        </div>

      </div> */}
      

      <div className="attribution">
        Coded by <a href="#">Muhammad Ibrahim</a>. {/*Add my portfolio URL */}
      </div>
    </div>
  )
}

export default App
