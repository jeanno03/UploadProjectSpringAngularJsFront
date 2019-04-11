var mySpaceService = angular.module("mySpaceService", []);

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

