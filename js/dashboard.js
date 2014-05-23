var REST_API = "http://datasource.vidal.net/api/v1"; //"http://django_dashboard.yourdomain.com/api/v1/";

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
      when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      }).
      when('/environments/:environmentId/events&environment=:environmentName', {
        templateUrl: 'partials/event_environment.html',
        controller: 'EnvironmentDetailCtrl'
      }).
      when('/projects/:projectName/events', {
        templateUrl: 'partials/project_event-list.html',
        controller: 'ProjectEventListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
   }

   initializeRoute();

   // configure restangular to work with tastypie, which returns data in an objects list, meta data in a meta object
   RestangularProvider.setBaseUrl(REST_API);
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

$(document).ready(function () {
    $('ul.nav > li').click(function (e) {
         //e.preventDefault();
         $('ul.nav > li').removeClass('active');
         $(this).addClass('active');                
    });            
});

