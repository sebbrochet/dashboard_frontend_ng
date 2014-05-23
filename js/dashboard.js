var app = angular.module('dashboardApp', [
   'restangular',
   'ngRoute',
   'dashboardControllers'
]);

app.config(function(RestangularProvider, $routeProvider) {

   var initializeRoute = function () {
      $routeProvider.when('/', {
        templateUrl: 'partials/project-list.html',
        controller: 'ProjectListCtrl'
      }).
      when('/projects/:projectName', {
        templateUrl: 'partials/project-detail.html',
        controller: 'ProjectDetailCtrl'
      }).
      when('/event_ticker', {
        templateUrl: 'partials/event_ticker.html',
        controller: 'TickerCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
   }

   initializeRoute();

   // configure restangular to work with tastypie, which returns data in an objects list, meta data in a meta object
   RestangularProvider.setBaseUrl("http://datasource.vidal.net/api/v1");
   RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
       var newResponse;
       if (operation === "getList") {
           newResponse = response.objects;
           newResponse.metadata = response.meta;
       } else {
           newResponse = response;
       }
       return newResponse;
   });
   RestangularProvider.setRequestSuffix('/?');
}) 

