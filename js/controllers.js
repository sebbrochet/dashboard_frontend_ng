var dashboardControllers = angular.module('dashboardControllers', []);
 
dashboardControllers.controller('ProjectListCtrl', ['$scope', 'Restangular',
   function ($scope, Restangular){
    $scope.projects = [];

    $scope.getAllProjects = function(){
        Restangular.all("projects").getList({limit:50}).then(function(projects){
            $scope.projects = projects;
        });
    }

    $scope.getTotalProjects = function(){
        return $scope.projects.length;
    }

    $scope.getAllProjects();
}]);

dashboardControllers.controller('ProjectDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.projectId = $routeParams.projectId;
}]);
