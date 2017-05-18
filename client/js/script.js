(function(){
    var module = angular.module('app', ["ngRoute"]);
    
    module.controller("appController", function($scope){
        this.title="1";
        $scope.app.title="0"
        $scope.title="Coucou";
    })
    module.controller("hey", function($scope){
        $scope.title="Coucou";
    })
    
    module.config(function($routeProvider){
        $routeProvider
        .when("navbar.html",{
            templateUrl : ""
        })
    })
})();