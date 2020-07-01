import React, { useState, useEffect } from "react";
import "./weather-page.css";
import defaultImage from "../img/default2.png";
import clear from "../img/clear.jpg";
import clouds from "../img/clouds.jpg";

export const Weather = () => {
  const [weather, setWeather] = useState({
    backgroundImage: `url(${defaultImage})`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  });
  const [cityInput, setCityInput] = useState("");
  const [stateCity, setStateCity] = useState({
    city: "Kyiv",
    temp: 12,
    country: "UA",
    weather: "clear",
  });

  const cityHandler = (event) => {
    const city = event.target.value;
    setCityInput(city);
  };
  useEffect(() => {
    const getWeatherbyCity = async (event) => {
      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=a4e798b3fd61820c24e91bb77dfaddf0`,
        { method: "GET" }
      );
      const responseData = await request.json();
      //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
      //a4e798b3fd61820c24e91bb77dfaddf0
      console.log(responseData);
      if (responseData.cod == 200) {
        setStateCity({
          city: responseData.name,
          temp: responseData.main.temp,
          country: responseData.sys.country,
          weather: responseData.weather[0].main,
        });

        if (responseData.weather[0].main === "Clear") {
          setWeather((prev) => {
            return {
              ...prev,
              backgroundImage: `url(${clear})`,
            };
          });
        } else if (responseData.weather[0].main === "Clouds") {
          setWeather((prev) => {
            return {
              ...prev,
              backgroundImage: `url(${clouds})`,
            };
          });
        }

        console.log(stateCity);
      }
    };
    getWeatherbyCity();
  }, [cityInput]);
  return (
    <div className="weather-body" style={weather}>
      <div className="weather-group">
        <div className="weather-input">
          <label for="browser">Write in city </label>
          <input
            onChange={cityHandler}
            list="browsers"
            name="browser"
            id="browser"
          />
          <datalist id="browsers">
            <option value="Zhurivka" />
            <option value="Odesa" />
            <option value="Poltava" />
            <option value="Kharkiv" />
            <option value="Cherbobyl" />
          </datalist>
        </div>
        <div className="weather-city">{stateCity.city}</div>
        <div className="weather-city">{stateCity.country}</div>
        <div className="weather-temp">{stateCity.temp}</div>
      </div>
    </div>
  );
};
