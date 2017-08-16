$(document).ready(function() {
  var errbox = document.getElementById("error");
  var location = "nope";
  var $errorId = $("#error");
  var conversion = "F";

  function getLocation() {
    if (!navigator.geolocation) {
      errbox.innerHTML = "Geolocation is not supported by this browser.";
      return;
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errbox.innerHTML = "ERROR: User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          errbox.innerHTML = "ERROR: Location information is unavailable.";
          break;
        case error.UNKNOWN_ERROR:
          errbox.innerHTML = "ERROR: An unknown error occurred.";
          break;
      }
    }

    function setLocation(position) {
     location = position.coords.latitude + "," + position.coords.longitude; 
      getWeather(location);
    }
    
    function getWeather(location) {
      
      var urlString = 'https://api.wunderground.com/api/2e2f6d656614d92d/geolookup/conditions/q/' + location + ".json"
      var weatherGet = $.ajax({
        method: 'GET',
        url: urlString, 
        success: function (result) {
          $("#weather-temp").text(result.current_observation.temp_f)
          $("#weather-type").text(result.current_observation.weather)
          $("#local-area").text(result.current_observation.display_location.full)
          $("#weather-icon-toggle").attr('class', result.current_observation.icon)
       }
      });
    
    }  
    navigator.geolocation.getCurrentPosition(setLocation, showError);
  
  }
  getLocation();
  
  $("#temp-swap").click(function () {
    function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
    
    if(conversion == "F") {
       var fTemp = $("#weather-temp").text();
       var fToCel = (fTemp - 32) * 5 / 9;
      fToCel = round(fToCel, 1);
      $("#weather-temp").text(fToCel);
      $("#temp-scale").text("°C");
           conversion = "C";
       } else if(conversion == "C") {
         var cTemp = $("#weather-temp").text();
         var cToFahr = cTemp * 9 / 5 + 32;
         cToFahr = round(cToFahr, 1);
         $("#weather-temp").text(cToFahr);
         $("#temp-scale").text("°F");
      conversion = "F";
    }
  });
});