import logo from './logo.svg';
import './App.css';
import useFetch from './useFetch';
import React from 'react';
import {useEffect} from "react";
import { useState } from "react";
import { parse } from 'csv-parse/lib';



function serialForm(animalState) {
	
    const [value, setValue] = useState(null);

    function handleSubmit(e) {
    	e.preventDefault();
    	animalState(value);

    }

  	return (
  	  <form onSubmit={handleSubmit}>
  	    Choose a number and recieve an animal
  	    <input className="forms" type="text" id="serial" onChange={(e) => setValue(e.target.value)}/>
  	    <button type="submit" className="forms">Submit</button>
  	  </form>
  	);
}

function getData(data, nr){

  if (isNaN(nr)){
    return "Not a number";
  }
  if (parseInt(nr) <= 0 || parseInt(nr) >= 100){
    return "Number outside the scope of this dataset"
  }
  else{
    return (
    	
    	<div className="animalImage">
    		<p> {data[parseInt(nr)][1].toString() + " - " +  data[parseInt(nr)][2].toString()} </p>
	    	<img src={data[parseInt(nr)][18]} alt={data[parseInt(nr)][1]} width="400" height="300"/>
	    	<p style={{ fontSize: "14px" }}> photo credit: {data[parseInt(nr)][16]}</p>
    	</div>
    );
  }
	
}

function App() {
  const [animalSerial, setAnimalSerial] = useState(0);
  const [theRecords, setRecords] = useState(null);

  var dump = useFetch("https://raw.githubusercontent.com/valborg/statimals-deck-game/main/gagnasafn.csv");
  parse(dump.data, function (err, records){ setRecords(records);});

  return (

    
    <div className="App">
      <header className="App-header">
          <div className="serialForm">
      		{serialForm(setAnimalSerial)}
    	  </div>

      </header>
    <div className="dataVisuals" >
    	  	{ animalSerial !== 0 ? getData(theRecords, animalSerial) : null }
    	  	
    	  </div>
    </div>
  );
}

export default App;
