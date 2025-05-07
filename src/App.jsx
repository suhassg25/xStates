import { useState } from 'react'
import './App.css'
import axios from "axios";
import { useEffect } from 'react';
import Options from "./components/Options/Option";

function App() {

  const countryEndPoint= "https://crio-location-selector.onrender.com/countries";
  const stateEndPoint = "https://crio-location-selector.onrender.com/country";
  const cityEndPoint = "https://crio-location-selector.onrender.com/country";

const [countries, setCountries] = useState({data: [], isSelected: false, valueSelected : ""});
const [states, setStates] = useState({data: [], isSelected: true, valueSelected : ""});
const [cities, setCities] = useState({data: [], isSelected: true, valueSelected : ""});

const fetchData = async()=>{
  await axios.get(countryEndPoint).then((response)=>{setCountries({data : response.data, isSelected: false, })}).catch((error)=>{console.log(error)});
}
useEffect(()=>{ fetchData();},[]);
const fetchState= async ()=>{
  if(countries.valueSelected !== ""){
    await axios.get(`${stateEndPoint}=${countries.valueSelected}/states`).then((response)=>{setStates({data : response.data, isSelected: false})}).catch((error)=>{console.log(error)});
  }
}
useEffect(()=>{fetchState();},[countries.valueSelected]);


const fetchCity= async ()=>{
  if(states.valueSelected !== ""){
    await axios.get(`${cityEndPoint}=${countries.valueSelected}/state=${states.valueSelected}/cities`).then((response)=>{setCities({data : response.data, isSelected: false, valueSelected: ""})}).catch((error)=>{console.log(error)});
  }
  
}
useEffect(()=>{fetchCity();},[states.valueSelected]);

const handler = (target, value)=>{
  if(target === "country"){
    setCountries({data: countries.data, isSelected: false, valueSelected: value});
    setStates({data: [], isSelected: false, valueSelected: ""}); 
    setCities({data: [], isSelected: true, valueSelected: ""}); 
  }
  else if(target === "state"){
    setStates({data: states.data, isSelected: false, valueSelected: value});   
    setCities({data: [], isSelected: false, valueSelected: ""}); 
  }else if(target === "city"){
    setCities({data: cities.data, isSelected: false, valueSelected: value});
  }else{
    setCountries({data: [], isSelected: false, valueSelected: ""});
    setStates({data: [], isSelected: false, valueSelected: ""}); 
    setCities({data: [], isSelected: true, valueSelected: ""}); 
  }

}

  return (
    <div>
    <div style={{display: "flex"}}>
    <Options name="country" countries={countries.data} isSelected={countries.isSelected} handler={handler}/>
    <Options name="state" countries={states.data} isSelected={states.isSelected} handler={handler}/>
    <Options name="city" countries={cities.data} isSelected={cities.isSelected} handler={handler}/>
    </div>
    {cities.valueSelected!=="" ? <div> <span style={{fontWeight : 700, display : "flex", textAlign : "center", justifyContent : "center", alignItems: "center", gap : "6px"}}>  You selected  <span style={{fontWeight : 800, fontSize : "25px", marginTop : "-7px"}}> {cities.valueSelected} </span> <span style={{color : 'GrayText'}}>{states.valueSelected} {countries.valueSelected} </span> </span> </div> : ""}
    </div>
    
  )
}

export default App
