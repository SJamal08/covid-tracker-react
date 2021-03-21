import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/infoBox/InfoBox';
import Map from './components/map/Map';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});


  useEffect(() => {
    const getCountriesData= async () => {
      await fetch("https://api.covid19api.com/countries")
      .then((Response)=> Response.json())
      .then((data) => {
        const countries = data.map((country)=> (
          {
            name: country.Country,
            value: country.ISO2,
          }
        ))
        setCountries(countries);
      })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    console.log("countryCode>>>>>" , countryCode)

    const url = countryCode ==="worldwide"
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

   await fetch(url)
   .then(Response => Response.json())
   .then(data => {
     setCountryInfo(data);
   });
  }

  console.log("countryInfo>>>>", countryInfo)

 

  return (
    <div className="app">

      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}>
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                  {
                    countries.map(country => (
                      <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))
                  }
              </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths}  total={countryInfo.deaths}/>
        </div>
          <Map />
      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3> Live Cases by Country</h3>

          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
