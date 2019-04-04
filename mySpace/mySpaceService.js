var mySpaceService = angular.module("mySpaceService", []);

mySpaceService.factory("shareMySpaceServices", function(){

    var currentRootMySpaces = {};

    return {

        setCurrentRootMySpace:function(mySpaces){
            currentRootMySpaces=mySpaces;
        },

        getCurrentRootMySpaces: function () {
            return currentRootMySpaces;
        },

        destroyCurrentRootMySpace:function(){
            currentRootMySpaces={};
            return currentRootMySpaces;
        }
    }

});


mySpaceService.factory("shareMyFileService",function(){
    var currentRootMyFiles = {};

    return {

        setCurrentRootMyFile:function(myFiles){
            currentRootMyFiles=myFiles;
        },

        getCurrentRootMyFile:function(){
            return currentRootMyFiles;
        },

        destroyCurrentRootMyFile:function(){
            currentRootMyFiles = {};
            return currentRootMyFiles;
        }
    }
})