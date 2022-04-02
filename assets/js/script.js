
$("#cityBtn").click(function () {
    var citySearchTerm = $("#city-search-term").val()
    console.log(citySearchTerm)
    $("#cityDisplay").text(citySearchTerm)
})

var lat = "30.267151"
var lon = "-97.743057"
var key = "745b025da524f67261b6a7f65eb9dc66"
var lang = "en"
var url = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=745b025da524f67261b6a7f65eb9dc66&lang=en&units=imperial'
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        var milliseconds = new Date(data.current.dt * 1000);
        var currentDate = milliseconds.toLocaleDateString();
        var cityName = data.timezone.split("/")
        var textDisplay = cityName[1] + " (" + currentDate + ")"
        $("#cityDisplay").text(textDisplay)
        $("#temp").text(data.current.temp + "°F")
        $("#wind").text(data.current.wind_speed + " MPH")
        $("#humidity").text(data.current.humidity + "%")
        $("#uvIndex").text(data.current.uvi)

        var milliseconds0 = new Date(data.daily[1].dt * 1000);
        var currentDate0 = milliseconds0.toLocaleDateString();
        var textDisplay0 = currentDate0
        $("#day0").text(textDisplay0)
        $("#temp0").text(data.daily[1].temp.day + "°F")
        $("#wind0").text(data.daily[1].wind_speed + " MPH")
        $("#humidity0").text(data.daily[1].humidity + "%")

        var milliseconds1 = new Date(data.daily[2].dt * 1000);
        var currentDate1 = milliseconds1.toLocaleDateString();
        var textDisplay1 = currentDate1
        $("#day1").text(textDisplay1)
        $("#temp1").text(data.daily[2].temp.day + "°F")
        $("#wind1").text(data.daily[2].wind_speed + " MPH")
        $("#humidity1").text(data.daily[2].humidity + "%")

        var milliseconds2 = new Date(data.daily[3].dt * 1000);
        var currentDate2 = milliseconds2.toLocaleDateString();
        var textDisplay2 = currentDate2
        $("#day2").text(textDisplay2)
        $("#temp2").text(data.daily[3].temp.day + "°F")
        $("#wind2").text(data.daily[3].wind_speed + " MPH")
        $("#humidity2").text(data.daily[3].humidity + "%")

        var milliseconds3 = new Date(data.daily[4].dt * 1000);
        var currentDate3 = milliseconds3.toLocaleDateString();
        var textDisplay3 = currentDate3
        $("#day3").text(textDisplay3)
        $("#temp3").text(data.daily[4].temp.day + "°F")
        $("#wind3").text(data.daily[4].wind_speed + " MPH")
        $("#humidity3").text(data.daily[4].humidity + "%")

        var milliseconds4 = new Date(data.daily[5].dt * 1000);
        var currentDate4 = milliseconds4.toLocaleDateString();
        var textDisplay4 = currentDate4
        $("#day4").text(textDisplay4)
        $("#temp4").text(data.current.temp + "°F")
        $("#wind4").text(data.current.wind_speed + " MPH")
        $("#humidity4").text(data.current.humidity + "%")
        
        // UV Index Color Coding
        if (data.current.uvi < 3) {
            $("#uvIndex").addClass("uv-low")
        }
        else if (data.current.uvi >= 3 && data.current.uvi < 6) {
            $("#uvIndex").addClass("uv-low")
        }
        else if (data.current.uvi >= 6 && data.current.uvi < 8) {
            $("#uvIndex").addClass("uv-low")
        }
        else if (data.current.uvi >= 8 && data.current.uvi < 11) {
            $("#uvIndex").addClass("uv-low")
        }
        else if (data.current.uvi >= 11) {
            $("#uvIndex").addClass("uv-extreme")
        }

        // Emoji for Weather
        if (data.current.weather[0].main === "Clear") {
            console.log("clear sky")
            $("#cityDisplay").text(textDisplay + "☀️")
        }
        else if (data.current.weather[0].main === "Clouds") {
            console.log("clouds")
            $("#cityDisplay").text(textDisplay + "☁️")
        }
        else if (data.current.weather[0].main === "Rain") {
            console.log("rain")
            $("#cityDisplay").text(textDisplay + "🌧️")
        }
        else if (data.current.weather[0].main === "Snow") {
            console.log("snow")
            $("#cityDisplay").text(textDisplay + "❄️")
        }
    });
