import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import './App.css';
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table"
import { sortData } from "./util"
import LineGraph from "./LineGraph"


function App() {
  const[countries, setCountries] = useState ([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  
  // STATE = How to write a variable in REACT //
  
  // UseEffect = Runs a piece of code based on a given condition

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  },[]);
  
  useEffect(() => {
    // The code inside here will run once when the component loads and not again
    // async -> send a request, wait for it, then do something with info
    
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({

            name: country.country,
            value: country.countryInfo.iso2
          
          }));
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
      };
      
      getCountriesData();
    }, []);
    
    const onCountryChange = async (event) => {

      const countryCode = event.target.value;
      setCountry(countryCode);

      const url = 
        countryCode === 'worldwide'
          ? 'https://disease.sh/v3/covid-19/all'
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`

      await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)

        // All of the data from the country response
        setCountryInfo(data);

      });
    };
    
    console.log("Country Info >>>>" ,countryInfo)

  return (
      <div className="app">

        {/* HEADER */}
        <div class="app__left">
          <div class="app__header">
            <h1>COVID-19 TRACKER </h1>
            <FormControl className="app__dropdown">
              <Select variant="outlined" onChange={onCountryChange} value={country}>

                {/* Loop through all the countries and show a drop down list of the options */}
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}

              </Select> 
            </FormControl>
          </div>

          {/* INFOBOXES */}
          
          <div class="app__stats">
            
            <InfoBox 
              title="Coronavirus Cases" 
              cases={countryInfo.todayCases} 
              total={countryInfo.cases}/>

            <InfoBox title="Recovered"
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}/>

            <InfoBox title="Deaths"
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths}/>

          </div>

          {/* Map */}

          <Map>

          </Map>
        </div>
        
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />

            <h3>Worldwide new Cases</h3>
            
            <LineGraph />

            {/* Graph */}
          </CardContent>
        </Card>

      </div>
  );
}

export default App;
