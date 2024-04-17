import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import 'leaflet/dist/leaflet.css'
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet'
import L, {Icon} from 'leaflet'
import iconLocation from './assets/images/iconLocation.svg'

function App() {

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState("")
  const [response, setResponse] = useState(undefined);

  // const apiKey = import.meta.env.VITE_IPGEOLOCATION_API_KEY;
  const apiKey = "import.meta.env.VITE_IPGEOLOCATION_API_KEY";

  const userUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`
  
  // Fetch ip data.
  const getUserData = async(url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setSuccessText("Success.");
      setLoading(false);
      setTimeout(()=>{
        setSuccessText("");
      },3000);
      
      setResponse(response.data)
    }catch(err){
      if(err.response){
        setLoading(false);
        setErrorText("Bad request.");
        setTimeout(()=>{
          setErrorText("");
        },3000);    
      }else if(err.request){
        setLoading(false);
        setErrorText("Something went wrong.");
        setTimeout(()=>{
          setErrorText("");
        },3000);    
      }
    }
  }
  
  // FEtch client data on page load.
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
    
    // Check if the text matches the IP address regular expression
    if (ipRegex.test(text)) {
      return 'IP';
    }
    
    // Check if the text matches the domain name regular expression
    if (domainRegex.test(input)) {
      return 'Domain';
    }

    // If neither regular expression matches, return null
    return null;
}

const handleSubmit = async(e)=> {
  e.preventDefault();
  if(isIpOrDomain(input) === 'Domain'){
    setErrorText("Please provide an IP address.");
    return;
  }
  await getUserData(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${input}`);  
}

const customIcon = new Icon({
  iconUrl: iconLocation,
  iconSize: [30,38]
})

const UtcVal = () => {
  const sign = Math.sign(response.time_zone.offset);
  {console.log(response)}
  if(sign === 0){
    return 'UTC'+response.time_zone.offset+':00';
  }else if(sign === -1){
    return 'UTC'+response.time_zone.offset+':00';
  }else {
    return 'UTC'+response.time_zone.offset+':00';
  }
}

// Render to user.
// if(response === undefined){
//   return(
//     <div className="loader-container">
//       <AiOutlineLoading3Quarters className='load-icon'/>
//     </div>
//   )}else {
    return (
     <div className='app-container'>
       <div className='hero-image-container'>
         <div className='search-container'>
           <p className='main-header'>IP Address Tracker</p>
           <div className="search-field">
             <form onSubmit={handleSubmit}>
               <input type='text' required className='input' onChange={handleInputChange} placeholder='Search for any IP address'></input>
               <span type="submit"  className='input' onClick={handleSubmit}>
                 {
                   loading?
                   <AiOutlineLoading3Quarters className='loading load-icon'/>
                   :<svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
                 }
                 </span>
             <p className='error-text'>{errorText? errorText: ""} </p>
             <p className='success-text'>{successText? successText: ""} </p>
             </form>
           </div>
           <div className='text-result'>
             <div className='first'>
               <span  className='header'>IP ADDRESS</span >
               <span  className='data' >{response? response.ip : "192.212.174.101"}</span >
             </div>
             <div>
               <span  className='header'>LOCATION</span >
               <span  className='data'>{response? response.city : 'Brooklyn, NY 10001'}</span >
 
             </div>
             <div>
               <span  className='header'>TIMEZONE</span >
               <span  className='data'>{UtcVal? <UtcVal />: 'UTC+02:00'}</span >
             </div>
             <div>
               <span  className='header'>ISP</span >
               <span className='data'>{response? response.isp : "SpaceX Starlink"}</span >
             </div>
           </div>
         </div>
       </div>
       <MapContainer
         center={[parseFloat(response?response.latitude: "9.05627"), parseFloat(response? response.longitude : "7.49853")]}
         zoom={2}>
         <TileLayer
           attribution='&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
           url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <Marker position={[parseFloat(response?response.latitude: "9.05627"), parseFloat(response? response.longitude : "7.49853")]} icon={customIcon}></Marker>
       </MapContainer>
       
       <div className="attribution">
         Coded by <a href="https://github.com/muhdibee" target="_blank">Muhammad Ibrahim</a>. {/*Add my portfolio URL */}
       </div>
     </div>
   )
  }
// }

export default App