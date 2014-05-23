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

dashboardControllers.controller('ProjectDetailCtrl', ['$scope', '$routeParams', 'Restangular',
   function($scope, $routeParams, Restangular) {
    $scope.environments = [];

    $scope.getEnvironments = function(projectName) {
       Restangular.all("environments").getList({project__name:projectName}).then(function(environments) {
          $scope.environments = environments;
       });
    }

    $scope.getLatestEvent = function(environment) {
       Restangular.all("events").getList({order_by:"-date", limit:1, environment:environment.id}).then(function(events) {
          environment.latest_event = events[0];
       });
    }

    $scope.projectName = $routeParams.projectName;
    $scope.getEnvironments($routeParams.projectName);
    $scope.getLatestEvent($scope.environments[0].name);

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
