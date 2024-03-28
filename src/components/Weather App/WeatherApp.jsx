import React, { useState } from "react";
import "./WeatherApp.css";
import wind_speed from "../Assets/wind-speed.png";
import hot_temperature from "../Assets/hot-temperature.png";
import humidity from "../Assets/humidity.png";
import cloud_sun from "../Assets/cloud-sun.png";
import rain from "../Assets/rain.png";
import snowflake from "../Assets/snowflake.png";
import sun from "../Assets/sun.png";

function WeatherApp() {
  let apiKey = "fd66bb9a0f5e8b6dd812631f4ee4dde2";

  const [wicon, setWicon] = useState(cloud_sun);
  const [weatherData, setWeatherData] = useState({
    temperature: "24°C",
    humidity: "64%",
    windSpeed: "6 m/s",
    city: "London",
  });

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&&appid=${apiKey}&units=metric`;

    let response = await fetch(baseUrl);
    let data = await response.json();

    setWeatherData({
      temperature: data.main.temp + " °C",
      humidity: data.main.humidity + " %",
      windSpeed: data.wind.speed + " m/s",
      city: data.name,
    });

    if (data.main.temp < 0) {
      setWicon(snowflake);
    } else if (data.main.temp < 10) {
      setWicon(rain);
    } else if (data.main.temp < 20) {
      setWicon(cloud_sun);
    } else if (data.main.temp < 30) {
      setWicon(sun);
    } else {
      setWicon(hot_temperature);
    }
  };

  return (
    
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="City Name" />
        <input type="button" value="Search" onClick={search} />
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>

      <div className="weatherTemp">{weatherData.temperature}</div>

      <div className="weather-location">{weatherData.city}</div>

      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_speed} alt="" />
          <div className="data">
            <div className="wind-speed">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
