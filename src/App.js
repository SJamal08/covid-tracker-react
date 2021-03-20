import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);

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

  return (
    <div className="App">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value="abc">
                {
                  countries.map(country => (
                    <MenuItem value={country.ISO2}>{country.name}</MenuItem>
                  ))
                }
            </Select>
        </FormControl>
      </div>
      
    </div>
  );
}

export default App;
