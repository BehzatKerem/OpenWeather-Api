// Define the OpenWeatherMap API URL and API key
const url = 'https://api.openweathermap.org/data/2.5/';
const key = 'API KEY';

// Function to handle keypress event on the search bar
const setQuery = (e) => {
  // Check if the "Enter" key (keyCode 13) was pressed
  if (e.keyCode === 13) { 
    // Call the getResult function with the value from the search bar
    getResult(searchBar.value); 
  }
};

// Function to fetch weather data for the given city
const getResult = (cityName) => {
  // Create the query URL with the provided cityName, API key, and additional options
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=en`;

  // Fetch the weather data from the OpenWeatherMap API
  fetch(query)
    .then(weather => {
      // Convert the response to JSON
      return weather.json();
    })
    .then(displayResult); // Call the displayResult function with the weather data
};

// Function to display the weather data on the webpage
const displayResult = (result) => {
  // Find the HTML element with class 'city' and set its text content to the city name and country code
  let city = document.querySelector('.city');
  city.innerText = `${result.name}, ${result.sys.country}`;

  // Find the HTML element with class 'temp' and set its text content to the temperature in Celsius
  let temp = document.querySelector('.temp');
  let celsiusTemp = result.main.temp;
  temp.innerText = `${Math.round(celsiusTemp)}°C`;

  // Find the HTML element with class 'desc' and set its text content to the weather description
  let desc = document.querySelector('.desc');
  desc.innerText = result.weather[0].description;

  // Find the HTML element with class 'minmax' and set its text content to the minimum and maximum temperatures in Celsius
  let minmax = document.querySelector('.minmax');
  minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`;

  // Log the temperature in Celsius to the console
  console.log(celsiusTemp);
};

// Get the search bar element by its ID
const searchBar = document.getElementById('searchBar');
// Add an event listener to the search bar for the keypress event, calling setQuery function
searchBar.addEventListener('keypress', setQuery);
