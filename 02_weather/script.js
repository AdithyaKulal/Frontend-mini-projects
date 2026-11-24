document.addEventListener("DOMContentLoaded", () => {
    
   const cityInput = document.getElementById("city-input");
   const getWeatherBtn = document.getElementById("get-weather-btn");
   const weatherInfo = document.getElementById("weather-info");
   const cityNameDisplay = document.getElementById("city-name");
   const temperatureDisplay = document.getElementById("temperature");
   const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
     const API_KEY = "Paste your api key here";

    //api key from openweather
    
    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim() 
       
        
        if (!city) return; 

        try {
            const weatherData = await fetchWeatherData(city);//fetch data
            displayWeatherData(weatherData) //diplays the fetched data
            
        } catch (error) {
            showError(error);
        }


    })

    //search fetch js  in mdn 
    async function fetchWeatherData(city) {
        //fetch the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        // console.log(response);

        if (!response.ok) {
            throw new Error("City not found !");
        }
        
        const data = response.json();
        return data;

        
    }

    function displayWeatherData(data) {
      console.log(data);
      const { name, main, weather } = data;

      cityNameDisplay.textContent = name;

      temperatureDisplay.textContent = `Temperature : ${main.temp}`;

      descriptionDisplay.textContent = `Description : ${weather[0].description}`;

      //unlock the hidden
      weatherInfo.classList.remove("hidden");
      //lock error
      errorMessage.classList.add("hidden");
    }

    function showError(error) {
        console.log("error:" , error);
        
        weatherInfo.classList.add('hidden'); // hide this class in html
        errorMessage.classList.remove('hidden'); // enables /displays this class in html


    }
})


//whenever making any web request two things i have to remember
//server may through an error 
// it always take some time