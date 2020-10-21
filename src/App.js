import React, { useState } from "react";
import axios from "axios";

const api = {
  base: "http://api.openweathermap.org/data/2.5/weather",
  key: "8e6d33c6f2d633f735f222538c0748f5",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (evt) => {
    if (evt.key === "Enter") {
      try {
        const response = await axios.get(
          `${api.base}?q=${query}&units=metric&APPID=${api.key}`
        );
        setWeather(response.data);
        setQuery("");

        console.log(response);
      } catch (error) {
        console.log("fetchData -> error", error);
      }
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}  ${date} ${month} ${year}`;
  };

  return (
    <div className="app ">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter your city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuilder(new Date())} </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)} °C
                <div className="weather">{weather.weather[0].main} </div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt="img"
                />
              </div>
              <div className="weather-img"></div>
            </div>
          </div>
        ) : (
          <div className="footer">Search for a city to display the weather</div>
        )}
      </main>
    </div>
  );
}

export default App;
