angular.module('weatherApp', ['ui.router', 'ui.grid']) ///Initializes angular and ui router, my app will be 'weatherApp' for this project

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: "/views/home.html",
      controller: 'weatherCtrl'
    })
    .state('forecast', {
      url:'/forecast',
      templateUrl: "views/forecast.html"
      // controller: 'weatherCtrl'
    });
});
