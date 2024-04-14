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

  const getUserData = async(url) => {
    try {
      const response = await axios.get( url);
      setResponse(response.data)
    }catch(err){
      if(err.response){
        setErrorText("Bad request")
      }
    }
  }

  useEffect(()=> {
    getUserData(userUrl);
  },[]);

  const handleInputChange = (e) =>{
    setInput(e.target.value);
  }

  function isIpOrDomain(text) {
    // Regular expression for validating an IPv4 address
    const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

    // Regular expression for validating a domain name
    const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,})+$/;
    // Check if the input matches the IP address regular expression
    if (ipRegex.test(text)) {
        return 'IP';
    }
    // Check if the text matches the domain name regular expression
    if (domainRegex.test(text)) {
        return 'Domain';
    }
    // If neither regular expression matches, return null
    return null;
}


  const handleSubmit = (e)=> {
  e.preventDefault()
  const requestType = isIpOrDomain(input);
  {console.log(input)}
  if(requestType === 'IP'){
    getUserData(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${input}`)
  }else if(requestType === 'Domain'){
    setErrorText("Please search using an IP address.")
  }
}

const UtcVal = () => {
  const sign = Math.sign(response.time_zone.offset);

  if(sign === 0){
    return 'UTC'+response.time_zone.offset+':00';
  }else if(sign === -1){
    return 'UTC'+response.time_zone.offset+':00';
  }else {
    return 'UTC'+response.time_zone.offset+':00';
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
             <form onSubmit={handleSubmit}>
               <input type='text' required className='input' onChange={(e)=> handleInputChange(e)} placeholder='Search for any IP address or domain'></input>
               <span type="submit"  className='input' onClick={handleSubmit}>
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
               <span  className='data' >{response.ip}</span >
             </div>
             <div>
               <span  className='header'>LOCATION</span >
               <span  className='data'>{response.city}</span >
 
             </div>
             <div>
               <span  className='header'>TIMEZONE</span >
               <span  className='data'>{UtcVal? <UtcVal />: 'UTC+02:00'}</span >
             </div>
             <div>
               <span  className='header'>ISP</span >
               <span className='data'>{response.isp}</span > {console.log("ErrorText: ", errorText)}
             </div>
           </div>
         </div>
       </div>
       <MapContainer
         center={[parseFloat(response.latitude), parseFloat(response.longitude)]}
         zoom={2}>
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