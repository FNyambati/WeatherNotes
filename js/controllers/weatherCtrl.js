angular.module('weatherApp').controller('weatherCtrl', function($scope, weatherService) {
  //   ^^^^^^ Passes in my app, declares my controller, and passes in $scope and my weatherService

  $scope.test = 'WEATHER APP'; // So I always know my controller is connected


  $scope.getWeather = function(zip) {
    weatherService.getWeather(zip)
      .then(function(data) {  //more promises
        console.log(data);
        $scope.weatherData = data; //Gets all data returned from Call
        console.log("Monthly Weather Data is", $scope.weatherData);
        $scope.getFiveDay = data[0]; //Gets data for the last 5 Days
        console.log("Five Day Forcast is", $scope.getFiveDay);
        $scope.getToday = $scope.getFiveDay[$scope.getFiveDay.length -1]; //Gets data for Today(yesterday)
        console.log("Today's Forcast", $scope.getToday);
      }, function(error){
        alert(error); // just sends an alert with -1 if things go south
      });
  };

});
