var app = angular.module("myApp", ["ui.router", "testService", "connectionService","ngStorage", "mySpaceService"]);

// DIRECTIVE - FILE MODEL
app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
           
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
     
}]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
    });
    $stateProvider.state('mySpaceMain', {
        url: '/mySpaceMain',
        templateUrl: 'mySpace/mySpaceMain.html',
        // controller: 'MySpaceMainController',
        // controllerAs: 'mySpaceMain'
    });
    $stateProvider.state('search', {
        url: '/search',
        templateUrl: 'search/search.html',
        controller: 'SearchController',
        controllerAs: 'search'
    });
    $stateProvider.state('test1', {
        url: '/test1',
        templateUrl: 'test1/test1.html',
        controller: 'Test1Controller',
        controllerAs: 'test1'
    });
    $stateProvider.state('test2', {
        url: '/test2',
        templateUrl: 'test2/test2.html',
        controller: 'Test2Controller',
        controllerAs: 'test2'
    });
    $stateProvider.state('connection', {
        url: '/connection',
        templateUrl: 'connection/connection.html',
        controller: 'ConnectionController',
        controllerAs: 'connection'
    });
});

