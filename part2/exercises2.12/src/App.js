import axios from "axios";
import { useEffect, useState } from "react";
import { Country } from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleInputChange = (e) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  //filter with more than 10 countries
  if (filteredCountries.length > 10) {
    return (
      <div>
        find countries
        <input type="text" onChange={handleInputChange} />
        <p>Too many matches, specify another filter.</p>
      </div>
    );

    //filter with one specific country
  } else if (filteredCountries.length === 1) {
    let languages = filteredCountries[0].languages;
    console.log(filteredCountries[0]);

    return (
      <div>
        find countries
        <input type="text" onChange={handleInputChange} />
        <ul>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>{filteredCountries[0].capital}</p>
          <p>{filteredCountries[0].area}</p>

          <h2>Languages</h2>
          <ul>
            {Object.keys(languages).map((key) => (
              <li key={languages[key]}>{languages[key]}</li>
            ))}
          </ul>
          <img src={filteredCountries[0].flags.png} alt="" />
        </ul>
      </div>
    );
    //filter with less than 10 countries
  } else {
    return (
      <div>
        find countries
        <input type="text" onChange={handleInputChange} />
        <ul>
          {filteredCountries?.map((country) => (
            <li key={country.name.common}>
              <Country
                name={country.name.common}
                capital={country.capital}
                area={country.area}
                languages={country.languages}
                flag={country.flags}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
