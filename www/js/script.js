var nameApp = angular.module('starter', ['ionic', 'uiGmapgoogle-maps']);

nameApp.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    });
  $urlRouterProvider.otherwise("/");
 
});


nameApp.controller('HomeCtrl', function($scope) {
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
});