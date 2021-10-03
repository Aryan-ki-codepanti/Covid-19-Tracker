import React, { useState, useEffect } from "react";
import "./App.css";
import {
    FormControl,
    MenuItem,
    Select,
    Card,
    CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
function App() {
    //State -> variables in react

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});

    // runs on first mount only => component did mount

    const handleOnChangeDropDown = async event => {
        const countryCode = event.target.value;
        // call API with worldwide https://disease.sh/v3/covid-19/all
        // call API with country code https://disease.sh/v3/covid-19/countries/[country code]

        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        const data = await fetch(url);
        const parsedData = await data.json();
        setCountry(prev => event.target.value);
        setCountryInfo(prev => parsedData);
    };

    useEffect(() => {
        const getWorldwide = async () => {
            const data = await fetch("https://disease.sh/v3/covid-19/all");
            const parsedData = await data.json();
            setCountryInfo(prev => parsedData);
        };
        getWorldwide();
    }, []);

    useEffect(() => {
        // async func
        const getCountries = async () => {
            const data = await fetch(
                "https://disease.sh/v3/covid-19/countries"
            );
            const parsedData = await data.json();
            // setting countries
            const countriesData = parsedData.map(country => ({
                name: country.country,
                value: country.countryInfo.iso2,
            }));
            console.log(countriesData);
            setCountries(prev => countriesData);
        };
        getCountries();
    }, []);

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>Covid-19 Tracker</h1>

                    <FormControl className="app__dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={handleOnChangeDropDown}
                        >
                            {/* Loop through all the countries and show a drop down having them */}
                            <MenuItem  value="worldwide"> Worldwide </MenuItem>
                            {countries.map(country => (
                                <MenuItem
                                    key={country.value}
                                    value={country.value}
                                >
                                    {" "}
                                    {country.name}{" "}
                                </MenuItem>
                            ))}

                            {/* <MenuItem value="worldwide"> Worldwide </MenuItem>
							<MenuItem value="op2"> Option two </MenuItem>
							<MenuItem value="op3"> Option three </MenuItem> */}
                        </Select>
                    </FormControl>
                </div>

                <div className="app__stats">
                    <InfoBox
                        title="Coronavirus Cases"
                        cases={countryInfo.todayCases}
                        total={countryInfo.cases}
                    />
                    <InfoBox
                        title="Recovered"
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}
                    />
                    <InfoBox
                        title="Deaths"
                        cases={countryInfo.todayDeaths}
                        total={countryInfo.deaths}
                    />
                </div>

                <Map />
            </div>

            <Card className="app__right">
                <CardContent>
                    <h3> Live Cases by country </h3>

                    <h3> Worldwide new cases </h3>
                </CardContent>
                {/* Table */}
                {/* Graph  */}
            </Card>
        </div>
    );
}

export default App;
