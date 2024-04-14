import { useState, useEffect } from 'react';
import axios from 'axios';
import { VscLoading } from "react-icons/vsc";
import 'leaflet/dist/leaflet.css'
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet'
import L, {Icon} from 'leaflet'
import iconLocation from './assets/images/iconLocation.svg'

function App() {

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [errorText, setErrorText] = useState('');
  const [response, setResponse] = useState(undefined);

  const apiKey = import.meta.env.VITE_IPGEOLOCATION_API_KEY;

  const customIcon = new Icon({
    iconUrl: iconLocation,
    iconSize: [30,38]
  })

  const userUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`

  const getUserData = async() => {
    try {
      const response = await axios.get( userUrl);
      console.log("API response:", response.data);
      setResponse(response.data)
    }catch(err){
      if(err.response){
        setErrorText("Bad request")
      }
    }
  }

  useEffect(()=> {
    getUserData();
  },[]);
  const handleRequest = (e)=> {
  e.preventDefault(); 
  axios.get( userUrl)
}

const UtcVal = () => {
  const sign = Math.sign(response.time_zone.offset);

  if(sign === 0){
    return 'UTC0'+response.time_zone.offset+':00';
  }else if(sign === -1){
    return 'UTC-0'+response.time_zone.offset+':00';
  }else {
    return 'UTC+0'+response.time_zone.offset+':00';
  }
}
if(response === undefined){
  return(
    <div className="loader-container">
      <VscLoading style={{color: 'black', fontSize: '10rem'}}/>
    </div>
  )}else {
    return (
     <div className='app-container'>
       <div className='hero-image-container'>
         <div className='search-container'>
           <p>IP Address Tracker</p>
           <div className="search-field">
             <form>
               <input type='text' className='input' placeholder='Search for any IP address or domain'></input>
               <span type="submit"  className='input'>
                 {
                   loading?
                   <VscLoading className='loading'/>
                   :<svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
                 }
                 </span>
             </form>
           </div>
           <div className='text-result'>
             <div className='first'>
               <span  className='header'>IP ADDRESS</span >
               {/* <span  className='data' >192.212.24.101</span > */}
               <span  className='data' >{response.ip}</span >
             </div>
             <div>
               <span  className='header'>LOCATION</span >
               {/* <span  className='data'>Brooklyn, NY 10001 </span > */}
               <span  className='data'>{response.city}</span >
 
             </div>
             <div>
               <span  className='header'>TIMEZONE</span >
               {/* <span  className='data'>UTC-05:00</span > */}
               <span  className='data'>{UtcVal? <UtcVal />: 'UTC+02:00'}</span >
             </div>
             <div>
               <span  className='header'>ISP</span >
               {/* <span className='data'>SpaceX StarLink</span > */}
               <span className='data'>{response.isp}</span >
             </div>
           </div>
         </div>
       </div>
       <MapContainer
         center={[parseFloat(response.latitude), parseFloat(response.longitude)]}
         zoom={13}>
         <TileLayer
           attribution='&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
           url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <Marker position={[parseFloat(response.latitude), parseFloat(response.longitude)]} icon={customIcon}></Marker>
       </MapContainer>
       
       <div className="attribution">
         Coded by <a href="https://github.com/muhdibee" target="_blank">Muhammad Ibrahim</a>. {/*Add my portfolio URL */}
       </div>
     </div>
   )
  }
}

export default App