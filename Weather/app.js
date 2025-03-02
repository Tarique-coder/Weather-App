let input = document.querySelector("#cityInput");
let btn = document.querySelector("#searchBtn");
let city = document.querySelector("#cityName");
let temp = document.querySelector("#temperature");
let descr = document.querySelector("#description");
let hum = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let err = document.querySelector("#errorMessage");
let info = document.querySelector("#weatherInfo");
let h2 = document.querySelector("h2");

const apiKey = "3c7f280ce0090202b6da400071e2eae8";

btn.addEventListener("click", function () {
  console.log("button was clicked");
  let name = input.value.trim().toLowerCase();
  console.log(name);

  if (name == "") {
    err.textContent = "Please enter a city name!.";
    info.style.display = "none";
    return;
  }

  name = input.value.trim().toUpperCase();
  h2.innerText = name;

  err.textContent = "";
  fetchWeather(name);
});

input.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    btn.click();
  }
});

function fetchWeather(city) {
  //is it important here to pass city as a parameter
  info.style.display = "block";
  city.textContent = "Fetching weather..";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("city not found or network error");
      }
      return response.json();
    })
    .then((data) => {
      city.textContent = data.name;
      temp.textContent = `Temperature: ${Math.round(data.main.temp)} C`;
      descr.textContent = `Description: ${data.weather[0].description}`;
      hum.textContent = `Humidity: ${data.main.humidity}%`;
      wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    })
    .catch((error) => {
      weatherInfo.style.display = "none";
      err.textContent = `Error: ${error.message}`;
    });

  input.value = "";
}
