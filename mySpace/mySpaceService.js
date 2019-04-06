var mySpaceService = angular.module("mySpaceService", []);


mySpaceService.factory("mySpaceHttpService", function ($http) {

    return {

        getAllMySpacesJwt: function (customHeader) {
            return $http.get("http://localhost:8080/MySpace/getAllMySpaceJwt", customHeader);
        },

        selectMySpace: function (item, customHeader) {
            return $http.get("http://localhost:8080/MySpace/getMySpaceByName?name=" + item, customHeader);
        },

        createMySpace:function (mySpace, customHeader){
            return $http.post("http://localhost:8080/MySpace/createMySpace", mySpace, customHeader);
        },

    }
});

mySpaceService.factory("shareMySpaceServices", function () {

    var currentRootMySpaces = {};

    return {

        setCurrentRootMySpace: function (mySpaces) {
            currentRootMySpaces = mySpaces;
        },

        getCurrentRootMySpaces: function () {
            return currentRootMySpaces;
        },

        destroyCurrentRootMySpace: function () {
            currentRootMySpaces = {};
            return currentRootMySpaces;
        }
    }

});


mySpaceService.factory("shareMyFileService", function () {

    var currentRootMySpace = {};

    return {

        setCurrentRootMySpace: function (mySpace) {
            currentRootMySpace = mySpace;
        },

        getCurrentRootMySpace: function () {
            return currentRootMySpace;
        },

        destroyCurrentRootMySpace: function () {
            currentRootMySpace = null;
            return currentRootMySpace;
        }
    }
})
