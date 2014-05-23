var dashboardControllers = angular.module('dashboardControllers', []);
 
dashboardControllers.controller('ProjectListCtrl', ['$scope', 'Restangular',
   function ($scope, Restangular) {
    $scope.projects = [];

    $scope.getAllProjects = function() {
       Restangular.all("projects").getList({limit:50}).then(function(projects) { 
          $scope.projects = projects;
        });
    }

    $scope.getAllProjects();
}]);

dashboardControllers.controller('ProjectDetailCtrl', ['$scope', '$routeParams', 'Restangular', '$q',
   function($scope, $routeParams, Restangular, $q) {
    $scope.environments = [];

    $scope.getEnvironments = function(projectName) {
       return Restangular.all("environments").getList({project__name:projectName}).then(function(environments) {
          $scope.environments = environments;
       });
    }

    $scope.getLatestEvent = function(environment) {
       return Restangular.all("events").getList({order_by:"-date", limit:1, environment:environment.id}).then(function(events) {
          environment.latest_event = events[0];
       });
    }
    
    $scope.getEnvironmentsWithLatestEvent = function(projectName) {
       return $scope.getEnvironments(projectName).then(function () {
          var environmentUpdates = []

          for(var i = 0; i < $scope.environments.length; i++) {
             environmentUpdates.push($scope.getLatestEvent($scope.environments[i]))
          }
       
          return $q.all(environmentUpdates)
       });
    }

    $scope.projectName = $routeParams.projectName;
    $scope.getEnvironmentsWithLatestEvent($routeParams.projectName);
}]);

dashboardControllers.controller('TickerCtrl', ['$scope', 'Restangular',
   function ($scope, Restangular) {
    $scope.events = [];

    $scope.getLatestEvents = function(nb_events) {
       Restangular.all("events").getList({limit:nb_events, order_by:"-date"}).then(function(events) { 
          $scope.events = events;
       });
    }

    $scope.getLatestEvents(10);
}]);

dashboardControllers.controller('AboutCtrl', ['$scope',
   function ($scope) {
      $scope.author = "sebbrochet";
      $scope.version = "v1";
   }
]);

dashboardControllers.controller('EnvironmentDetailCtrl', ['$scope', '$routeParams', 'Restangular',
   function($scope, $routeParams, Restangular) {
    $scope.events = [];

    $scope.getEvents = function(environmentId) {
       return Restangular.all("events").getList({order_by:"-date", environment:environmentId}).then(function(events) {
          $scope.events = events;
          $scope.environment = events[0].environment;
          $scope.project = events[0].environment.project;
       });
    }

    $scope.getEvents($routeParams.environmentId);
}]);
