// function to fetch the data from api
const temperature = document.querySelector(".temp-value");
const Location = document.querySelector(".location-text");
const weatherCondition = document.querySelector(".temp-condition");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const conditionImg = document.querySelector(".condition-img");
const loader = document.getElementById("loader");
const weatherContainer = document.querySelector(".details-div");
const ErrorDiv = document.querySelector(".error-div");
const errorImg = document.querySelector(".error-img");
const errorText = document.querySelector(".error-div h2");

let city = document.querySelector("#citySearchInput");

const apiKey = "4b0a93d0f932c1d70dd0809be1ab2861";
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=601591c56ee4c68c4a9b7a28fac5aa78&q=`;
async function getData(city) {

  try {
    loader.style.display = "block";
    const response = await fetch(url + city);

    if (response.status == 404) {
      weatherCondition.style.display = "none";
      ErrorDiv.style.display = "flex";
      loader.style.display = "none";
      throw new Error(response.statusText);
    } 
    else if (response.status == 401) {
      errorImg.src = "images/401-error.png";
      errorText.innerText = "Unauthorized API Key!!";
      ErrorDiv.style.display = "flex";
      loader.style.display = "none";
      weatherContainer.style.display = "none";
    } 
    else {
      ErrorDiv.style.display = "none";
      const data = await response.json();
      document.querySelector(".details-div").style.display = "flex";
      temperature.innerHTML = data.main.temp + "°C";
      Location.innerHTML = data.name + "," + data.sys.country;
      weatherCondition.innerHTML = data.weather[0].description;
      windSpeed.innerHTML = data.wind.speed + "km/h";
      humidity.innerHTML = data.main.humidity + "%";

      let condition = data.weather[0].main;

      switch (condition) {
        case "Mist":
          conditionImg.src = "images/mist.png";
          break;
        case "Clear":
          conditionImg.src = "images/clear.png";
          break;
        case "Clouds":
          conditionImg.src = "images/clouds.png";
          break;
        case "Drizzel":
          conditionImg.src = "images/drizzel.png";
          break;
        case "Rain":
          conditionImg.src = "images/rainy.png";
          break;
        case "Snow":
          conditionImg.src = "images/snowy.png";
          break;
        case "Smoke":
          conditionImg.src = "images/smoke.png";
          break;
        default:
          conditionImg.src = "";
          break;
      }
      loader.style.display = "none";
    }
  } 
  catch (error) {
    console.log("Error: ", error);
    ErrorDiv.style.display = "flex";
    loader.style.display = "none";
    weatherContainer.style.display = "none";
  }
}

const searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", () => {
  if (city.value === "") {
    alert("Please enter a city name");
  } else {
    getData(city.value);
  }
});

city.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (city.value === "") {
      alert("Please enter a city name");
    } else {
      getData(city.value);
    }
  }
});
