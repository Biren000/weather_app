import React, { useState, useEffect } from "react";
import "./style.css";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("ahmedabad");
  const [tempInfo, setTempInfo] = useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=34f13bd5a89b7a8deceaeaf55b74ec39`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { speed } = data.wind;
      const { main: weatherMood } = data.weather[0];
      const { name } = data;
      const { country, sunset } = data.sys;

      const myNewWeatherData = {
        temp,
        humidity,
        pressure,
        speed,
        weatherMood,
        country,
        sunset,
        name,
      };
      setTempInfo(myNewWeatherData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherCard {...tempInfo} />
    </>
  );
};

export default Temp;
