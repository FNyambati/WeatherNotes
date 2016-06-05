angular.module('weatherApp').controller('weatherCtrl', function($scope, weatherService) {
  //   ^^^^^^ Passes in my app, declares my controller, and passes in $scope and my weatherService

  $scope.test = 'WEATHER APP'; // So I always know my controller is connected

  
  $scope.getWeather = function(zip) {
    weatherService.getWeather(zip) //calls weatherService, did something different and just passed in my ng-model, never did it but before it worked, so I'm not complaining lol
      .then(function(data) {  //more promises
        console.log('hit', data );
        $scope.weatherData = data; // saves the response from the service to the scope so we can access this in the view
      }, function(error){
        alert(error); // just sends an alert with -1 if things go south
      });
  };

});
