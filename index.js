// API key for accessing OpenWeatherMap
const apikey = "e08273170b1d9b73c67e79e943bd9acb";

// Base URL for the OpenWeatherMap API
const apiurl = "https://api.openweathermap.org/data/2.5/weather";

// Selecting the input field where the user enters the city name
const searchbox = document.querySelector(".searchbox input");

// Selecting the button that triggers the weather search
const searchbtn = document.querySelector(".searchbox button");

// Selecting the element where the weather icon will be displayed
const weathericon = document.querySelector(".weather-icon");

// Asynchronous function to fetch weather data for a given city
async function checkweather(city) {
    // Fetch weather data using the API, city name, metric units, and API key
    const response = await fetch(`${apiurl}?q=${city}&units=metric&appid=${apikey}`);
    
    // Check if the response from the server is successful
    if (response.ok) {
        // Parse the JSON data from the response
        const data = await response.json();
        
        // Display the city name on the page
        document.querySelector(".city").innerHTML = data.name;
        
        // Display the temperature in Celsius, rounded to the nearest integer
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        
        // Display the humidity percentage
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        
        // Display the wind speed in Km/h
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";
        
        // Update the weather icon based on the weather condition
        if (data.weather[0].main == "Clouds") {
            weathericon.src = "images/clouds.png";

        } else if (data.weather[0].main == "Clear") {
            weathericon.src = "images/clear.png";

        } else if (data.weather[0].main == "Rain") {
            weathericon.src = "images/rain.png";

        } else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "images/drizzle.png";

        } else if (data.weather[0].main == "Mist") {
            weathericon.src = "images/mist.png";
        }
        
        // Show the weather data section and hide any error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        
    } else {
        // Log the error in the console if the data fetch fails
        console.error("Error fetching data:", response.status);
        
        // Hide the weather data section and show an error message if the request fails
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    }
}

// Add an event listener to the search button to trigger the checkweather function
// This calls checkweather with the value entered in the search box when the button is clicked
searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});

// Example call with a city name
checkweather(city);
