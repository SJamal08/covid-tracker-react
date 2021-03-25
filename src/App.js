import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/infoBox/InfoBox';
import LineGraph from './components/lineGraph/LineGraph';
import Map from './components/map/Map';
import Table from './components/table/Table';
import { prettyPrintStat, sortData } from './components/table/utils';
import "leaflet/dist/leaflet.css";
import numeral from 'numeral';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter]= useState({ lat:38 , lng:- 97});
  const [mapZoom, setMapZoom]= useState(3);
  const [mapCountries, setMapCountries]= useState([]);


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData= async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
      .then((Response)=> Response.json())
      .then((data) => {
        const countries = data.map((country)=> (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ))
        setTableData(sortData(data))
        setCountries(countries);
        setMapCountries(data);
        console.log(countries);
      })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode ==="worldwide"
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

   await fetch(url)
   .then(Response => Response.json())
   .then(data => {
    setCountry(countryCode);
     setCountryInfo(data);
     console.log(data.countryInfo.lat,data.countryInfo.long)
     setMapCenter({lat:data.countryInfo.lat, lng:data.countryInfo.long})
     console.log("AfterMapCenter>>>>", mapCenter)
     setMapZoom(4)
   });
  }

 

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
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}/>

          <InfoBox onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}/>

          <InfoBox onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}/>
        </div>
          <Map
          casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}/>
      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3> Live Cases by Country</h3>

          <Table countries={tableData}/>

          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />

        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
