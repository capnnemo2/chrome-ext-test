"use strict";

// TODO here's an idea:
// the new tab displays:
// WHO are you? probably anonymous
// WHAT is happening? current weather, maybe a local news article?
// WHERE are you? location data
// WHY are you? existential something
// or maybe WHY are aardvarks so weird? random animals facts?
// WHEN is it? date and time

// WHEN
function getDateAndTime() {
  let now = new Date(),
    months = [
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

  let date =
    months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

  let time = [
    now.getHours(),
    ("0" + now.getMinutes()).slice(-2),
    ("0" + now.getSeconds()).slice(-2),
  ].join(":");

  let am_pm = now.getHours() >= 12 ? "PM" : "AM";

  if (document.getElementById("date") !== null) {
    document.getElementById("date").innerHTML = date;
    document.getElementById("time").innerHTML = time + " " + am_pm;
  }

  setInterval(getDateAndTime, 1000);
}

getDateAndTime();

// WHAT
function displayWeather(responseJson) {
  console.log(responseJson);

  const temp = Math.round(((responseJson.main.temp - 273.15) * 9) / 5 + 32);
  const current_conditions = responseJson.weather[0].main;
  const wind = Math.round(responseJson.wind.speed);
  const icon = responseJson.weather[0].icon;

  document.getElementById(
    "weather"
  ).innerHTML = `Temperature: ${temp}. Wind: ${wind} mph. General conditions: ${current_conditions}.`;

  let icon_img = document.createElement("img");
  icon_img.src = `https://openweathermap.org/img/wn/` + icon + `.png`;

  document
    .getElementById("weather")
    .insertBefore(icon_img, document.getElementById("weather").childNodes[0]);
}

async function getWeather() {
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
  const weatherApiKey = `appid=f83705c417eaaaa1cacb48b69b90c169`;

  if (navigator.geolocation) {
    function success(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log(lat, long);

      const queryString = `lat=` + lat + `&lon=` + long;
      const searchWeatherURL =
        weatherUrl + "?" + queryString + "&" + weatherApiKey;

      fetch(searchWeatherURL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res.statusText);
        })
        .then((responseJson) => displayWeather(responseJson))
        .catch((err) => {
          document.getElementById(
            "weather-err"
          ).innerHTML = `The weather gods are indecisive: ${err.message}. Please try again later.`;
        });
    }

    navigator.geolocation.getCurrentPosition(success);
  }
}

getWeather();
