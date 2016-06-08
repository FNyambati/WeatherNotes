angular.module('weatherApp').controller('weatherCtrl', function($scope, weatherService) {
  //   ^^^^^^ Passes in my app, declares my controller, and passes in $scope and my weatherService

  $scope.showMe = false;
// declares ui grid options
  $scope.gridOptions = {};
  $scope.gridOptions.columnDefs = [
      {field:'timestamp', displayName:'Date', width: 110, cellFilter: 'date'},
      {field:'tempAvg', displayName:'Temperature',width: 120},
      {field:'precip', displayName: 'Precipitation',width: 115},{field:'spcHumAvg',displayName:'Humidity',width: 110},{field:'windSpdAvg', displayName:'Wind Speed',width: 125}
    ];
    //flattened Array returned from API call easier to manipulate
    $scope.gridOptions.data = 'flatData';

    $scope.test = 'WeatherNotes'; // So I always know my controller is connected


// Function to get weather data, passes in user entered, ZIP code
  $scope.getWeather = function(zip) {

    weatherService.getWeather(zip)

      .then(function(data) {  //more promises

        $scope.weatherData = data; //Array of arrays from api call

        $scope.flatData = data.reduce(function(prev,current){
          for(var i = 0; i < current.length; i++){
            prev.push(current[i]);
          }
          return prev;
        }, []); //turns array of arrays into one big array for the table

        $scope.getFiveDay = data[0]; //Gets data for the last 5 Days

        $scope.getToday = $scope.getFiveDay[$scope.getFiveDay.length -1]; //Gets data for Today(yesterday)
        $scope.showMe = true;
      }, function(error){
        alert(error); // just sends an alert with -1 if things go south as far as usage is concerned
      });
  };

});
