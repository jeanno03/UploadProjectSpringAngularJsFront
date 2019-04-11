var app = angular.module("myApp", ["ui.router", "test1Service", "ngStorage", "mySpaceService","angular-jwt", "httpParamService", "httpService"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
    });
    $stateProvider.state('mySpaceMain', {
        url: '/mySpaceMain',
        templateUrl: 'app/mySpace/mySpaceMain.html',
        // controller: 'MySpaceMainController',
        // controllerAs: 'mySpaceMain'
    });
    $stateProvider.state('search', {
        url: '/search',
        templateUrl: 'app/search/search.html',
        controller: 'SearchController',
        controllerAs: 'search'
    });
    $stateProvider.state('test1', {
        url: '/test1',
        templateUrl: 'app/test1/test1.html',
        controller: 'Test1Controller',
        controllerAs: 'test1'
    });
    $stateProvider.state('test2', {
        url: '/test2',
        templateUrl: 'app/test2/test2.html',
        controller: 'Test2Controller',
        controllerAs: 'test2'
    });
    $stateProvider.state('connection', {
        url: '/connection',
        templateUrl: 'app/connection/connection.html',
        controller: 'ConnectionController',
        controllerAs: 'connection'
    });
});

