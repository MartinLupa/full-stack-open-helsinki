import axios from "axios";
import React, { useEffect, useState } from "react";
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const Country = ({ name, capital, area, languages, flag }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({});

  const handleShowInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weatherApiKey}`
      )
      .then((response) => {
        setWeatherInfo(response.data);
        console.log(weatherInfo);
      });
  }, [isInfoVisible]);

  return (
    <div>
      {name}
      <button onClick={handleShowInfo}>show</button>
      {isInfoVisible ? (
        <div>
          <p>{capital}</p>
          <p>{area}</p>

          <h2>Languages</h2>
          <ul>
            {Object.keys(languages).map((key) => (
              <li key={languages[key]}>{languages[key]}</li>
            ))}
          </ul>
          <img src={flag.png} alt="" />
          <h2>Weather in {name}</h2>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
