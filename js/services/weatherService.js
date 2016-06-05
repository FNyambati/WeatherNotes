angular.module('weatherApp').service('weatherService', function($http, $q) {
  //   ^^^^^^ Passes in my app, declares my service, and passes in $http

  // All the components for the URL are below, I made a comment for each ones use.


  var apiUrl = 'https://api.weathersource.com/v1', // base URL and version # for the API
    apiKey = '744043ab64a08fafb204', //API Key shhhhh
    event = 'history_by_postal_code.json', //getting data via ZIP code and returning via JSON
    format = 'period=day', //format better than using hour, which was the other option
    zipCode = 'postal_code_eq=', //takes in the zip the user passes in
    country = 'country_eq=US', //default is US and I can only use North America, I believe
    fields = 'fields=postal_code,country,timestamp,tempMax,tempAvg,tempMin,percip,windSpdMax,windSpdMin,windSpdAvg,spcHumMax,spcHumAvg,spcHumMin', //options I decided to display for the weather data
    between = 'timestamp_between=', //gets 2 dates and displays the rsults



    // DISCLAIMER!!!!!: The API only returned 5 days when I made the two dates 3 weeks apart, so I had to make FOUR API calls to get the past 21 days, so I just decided to go back a MONTH so I made 6 API Calls to get the past 30 days leading up to yesterday. Only because no data is returned for the current day until its over so I decided to just make it start from the day before you make the API call. The struggle with this API is real.

    //P.S The max requests per minute is 10 for the free subscription of this API. So if it doesnt work again immediately, just know that its not broken, its only the parameters set by my developer account's permissions that doesn't allow more than 2 requests per minute.

    //P.S.S I hate this API LMAO



    //That being said I created a New Date Object for every date interval that I use in each API call, so 12 of them. Ill explain why below
    daysAgo30 = new Date(),
    daysAgo26 = new Date(),
    daysAgo25 = new Date(),
    daysAgo21 = new Date(),
    daysAgo20 = new Date(),
    daysAgo16 = new Date(),
    daysAgo15 = new Date(),
    daysAgo11 = new Date(),
    daysAgo10 = new Date(),
    daysAgo6 = new Date(),
    daysAgo5 = new Date(),
    daysAgo1 = new Date();


  // Here I didn't really want to make new variables for each time I manipulate the Date Object so I just changed the variables themselves using the setDate Method.
  daysAgo30.setDate(daysAgo30.getDate() - 30); //The current Day wont return any day so I went back
  daysAgo26.setDate(daysAgo26.getDate() - 26); // 26 Days Ago
  daysAgo25.setDate(daysAgo6.getDate() - 25); // 25 Days Ago
  daysAgo21.setDate(daysAgo10.getDate() - 21); // 21 Days Ago
  daysAgo20.setDate(daysAgo11.getDate() - 20); // 20 Days Ago
  daysAgo16.setDate(daysAgo16.getDate() - 16); // 16 Days Ago
  daysAgo15.setDate(daysAgo15.getDate() - 15); // 15 Days Ago
  daysAgo11.setDate(daysAgo11.getDate() - 11); // 11 Days Ago
  daysAgo10.setDate(daysAgo10.getDate() - 10); // 10 Days Ago
  daysAgo6.setDate(daysAgo6.getDate() - 6); // 6 Days Ago
  daysAgo5.setDate(daysAgo5.getDate() - 5); //5 Days Ago
  daysAgo1.setDate(daysAgo1.getDate() - 1); //The current Day wont return any day so I started with yesterday






  // Now that I made custom dates for every API Call, I still can't use the full string Date format that comes with new Date() so I have to convert each date to ISO 8601 format because thats all the API takes.
  var monthAgo = daysAgo30.toISOString();
  var twentySixDaysAgo = daysAgo26.toISOString();
  var twentyFiveDaysAgo = daysAgo25.toISOString();
  var twentyOneDaysAgo = daysAgo21.toISOString();
  var twentyDaysAgo = daysAgo20.toISOString();
  var sixteenDaysAgo = daysAgo16.toISOString();
  var fifteenDaysAgo = daysAgo15.toISOString();
  var elevenDaysAgo = daysAgo11.toISOString();
  var tenDaysAgo = daysAgo10.toISOString();
  var sixDaysAgo = daysAgo6.toISOString();
  var fiveDaysAgo = daysAgo5.toISOString();
  var yesterday = daysAgo1.toISOString();


  //Below is the universal base URL that every request recieves using the variables in the beginning of the Service.


  var baseUrl = apiUrl + '/' + apiKey + '/' + event + '?' + format + '&' + zipCode;


  //Below is the second half of the URL. The dates between are custom to each api call going from 30 to 26 days, 25 to 21, etc. Again, using the variables provided at the beginning of the file.


  var thirtyToTwentySix = '&' + country + '&' + between + monthAgo + "," + twentySixDaysAgo + '&' + fields;
  var twentyFiveToTwentyOne = '&' + country + '&' + between + twentyFiveDaysAgo + "," + twentyOneDaysAgo + '&' + fields;
  var twentyToSixteen = '&' + country + '&' + between + twentyDaysAgo + "," + sixDaysAgo + '&' + fields;
  var fifteenToEleven = '&' + country + '&' + between + fifteenDaysAgo + "," + elevenDaysAgo + '&' + fields;
  var tenToSix = '&' + country + '&' + between + tenDaysAgo + "," + sixDaysAgo + '&' + fields;
  var fiveToNow = '&' + country + '&' + between + fiveDaysAgo + "," + yesterday + '&' + fields;



  //Now that I'm done with all the variables I can finally make a function that puts it all together!


  this.getWeather = function(zip) { //  <== pass in zip code that user inputs as parameter

    //Made a custom Promise that takes in all 6 requests without making a messy nested request
    $q.all([
      $http.get(baseUrl + zip + thirtyToTwentySix), //puts together the baseUrl, ZIP code that the user searches, and the date interval variable for every request
      $http.get(baseUrl + zip + twentyFiveToTwentyOne),
      $http.get(baseUrl + zip + twentyToSixteen),
      $http.get(baseUrl + zip + fifteenToEleven),
      $http.get(baseUrl + zip + tenToSix),
      $http.get(baseUrl + zip + fiveToNow) //if you want to be able to search more than once per minute, just comment a few of these lines out. Sorry for the inconvinence
    ]).then(function(response) {
      console.log(response);
    });

    return $q.all();
  };

});
