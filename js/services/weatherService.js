angular.module('weatherApp').service('weatherService', function($http, $q) {
  //   ^^^^^^ Passes in my app, declares my service, and passes in $http

  var apiUrl = 'https://api.weathersource.com/v1', // base URL and version # for the API
    apiKey = '744043ab64a08fafb204',  //API Key shhhhh
    event = 'history_by_postal_code.json', //getting data via ZIP code and returning via JSON
    format = 'period=day',  //format better than using hour, which was the other option
    zipCode = 'postal_code_eq=', //takes in the zip the user passes in
    country = 'country_eq=US', //default is US and I can only use North America, I believe
    fields = 'fields=postal_code,country,timestamp,tempMax,tempAvg,tempMin,percip,windSpdMax,windSpdMin,windSpdAvg,spcHumMax,spcHumAvg,spcHumMin', //options I decided to display for the weather data
    day = "timestamp_eq=",  // gets 'current day'
    between = 'timestamp_between=', //gets 2 dates and displays the rsults
    ///^^^^^^^^ Parts of a Long A** URL for the API GET Request

    rawToday = new Date(),  //Raw New Date Objects for today and 3 weeks ago
    raw3Weeks = new Date();


    rawToday.setDate(rawToday.getDate() - 2); //The current Day wont return any day so I went back 2 days
    raw3Weeks.setDate(raw3Weeks.getDate() - 21); // 21 Days Ago

    var today = rawToday.toISOString();   /// Convert to the API friendly, ISO 8601 fornat
    var threeWeeks = raw3Weeks.toISOString();



  this.getWeather = function(zip) { // declare zip code that user inputs as parameter


    var baseUrl = apiUrl + '/' + apiKey + '/' + event + '?' + format + '&' + zipCode;
    //^^^^^ Taking All the variables I declared above before the inputed zip code

    var eventUrl = '&' + country + '&' + day + today + '&' + fields;
    //^^^^^^^ Taking all the variables after the zip code

    var defer = $q.defer(); //horray for asychronous functions :D
    $http({
        method: 'GET',
        url: baseUrl + zip + eventUrl //putting it all together
      })
      .then(
        function(response) {
          console.log(response.data);
          defer.resolve(response.data); //resolves the data which I retrieve in the controller
        },
        function(response) {
          defer.reject(response.status); //rejects a crappy request
        });
    return defer.promise; // Don't forget to return the promise when the function is called in the controller, or else we won't get any data!

  };

});
