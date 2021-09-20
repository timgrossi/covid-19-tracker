import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import './App.css';


function App() {
  const[countries, setCountries] = useState ([]);
  const [country, setCountry] = useState('worldwide');
  
  
  // STATE = How to write a variable in REACT //
  
  // UseEffect = Runs a piece of code based on a given condition
  
  useEffect(() => {
    // The code inside here will run once when the component loads and not again
    // async -> send a request, wait for it, then do something with info
    
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }));
          
          setCountries(countries);
        });
      };
      
      getCountriesData();
    }, []);
    
    const onCountryChange = (event) => {
      const countryCode = event.target.value;
      
      console.log("YOOOOOOOOOO >>>>>>", countryCode);
      
      setCountry(countryCode);
    }
    
    /// Header////

  return (
    <div className="app">
      <div class="app__header">
        <h1>COVID-19 TRACKER </h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>

            {/* Loop through all the countries and show a drop down list of the options */}
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

             {/*} <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem> */}

            </Select> 
        </FormControl>
      </div>

      <div class="app__stats">
        {/* InfoBoxs */}
        {/* InfoBoxs */}
        {/* InfoBoxs */}

      </div>

      {/* Title and Select Input dropdown field */}


      {/* Tabel */}
      {/* Graph */}

      {/* Map */}

    </div>
  );
}

export default App;
