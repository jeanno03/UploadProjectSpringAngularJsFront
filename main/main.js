var app=angular.module("myApp",["ui.router","services","ngStorage"]);
// .run(function($rootScope,UserService){
//     $rootScope.currentUser = {};
//     $rootScope.currentUser = UserService.getMyUser();
// });
app.config(function($stateProvider,$urlRouterProvider){

$stateProvider.state('home',{
    url:'/home',
    templateUrl:'home/home.html',
    controller:'HomeController',
    controllerAs:'home'
});
$stateProvider.state('myspace',{
    url:'/myspace',
    templateUrl:'myspace/myspace.html',
    controller:'MySpaceController',
    controllerAs:'myspace'
});
$stateProvider.state('search',{
    url:'/search',
    templateUrl:'search/search.html',
    controller:'SearchController',
    controllerAs:'search'
});
$stateProvider.state('test1',{
    url:'/test1',
    templateUrl:'test1/test1.html',
    controller:'Test1Controller',
    controllerAs:'test1'
});
$stateProvider.state('test2',{
    url:'/test2',
    templateUrl:'test2/test2.html',
    controller:'Test2Controller',
    controllerAs:'test2'
});
$stateProvider.state('connection',{
    url:'/connection',
    templateUrl:'connection/connection.html',
    controller:'ConnectionController',
    controllerAs:'connection'
});
});


