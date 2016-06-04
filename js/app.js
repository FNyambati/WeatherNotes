angular.module('weatherApp', ['ui.router']) ///Initializes angular and ui router, my app will be 'weatherApp' for this project

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/'); //SE

  $stateProvider


    .state('home', {
      url: '/',
      templateUrl: "/views/home.html",
      controller: 'weatherCtrl'
    });
});
