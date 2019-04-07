var connectionService = angular.module("connectionService", []);

connectionService.factory("connectionHttpService", function ($http, connectionTokenService) {

    return {

        getConnectJwt: function (credential) {
            return $http.post("http://localhost:8080/MyUser/getConnectJwt", credential);
        },

        getUploadFile: function (mySpaceId, data) {

            var uploadFileUrl = "http://localhost:8080/MyFile/uploadingMyFilesPut?id=";
            var tokenHeaderContentType = connectionTokenService.getTokenHeaderContentType();

            return $http.put(uploadFileUrl + mySpaceId, data, tokenHeaderContentType);
        }

    }
});

connectionService.factory("connectionTokenService", function ($localStorage, jwtHelper) {

    var decodeToken = {};

    return {

        getTokenHeader: function () {
            var customHeader = {
                headers: $localStorage.jwt
            };
            return customHeader;
        },

        getTokenHeaderContentType: function () {
            try {
                var tokenHeaderContentType = {
                    headers: {
                        'Content-Type': undefined,
                        'token': $localStorage.jwt.token
                    }
                };
                return tokenHeaderContentType;
            } catch (err) {
                console.log(err);
            }
        },

        getDecodeToken: function () {
            decodeToken = jwtHelper.decodeToken($localStorage.jwt.token);
            return decodeToken;
        },

        getTokenExpirationDate: function () {
            var tokenExpirationDate = jwtHelper.getTokenExpirationDate($localStorage.jwt.token);
            return tokenExpirationDate;
        },

        getTokenSub: function () {
            var tokenSub = decodeToken.sub;
            return tokenSub;
        },

        getTokenRoles: function () {
            var tokenRoles = decodeToken.roles;
            return tokenRoles;
        },

    }

});