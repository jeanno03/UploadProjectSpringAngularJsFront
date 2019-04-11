var httpParamService = angular.module("httpParamService", []);

httpParamService.factory("httpHeaderService", function ($localStorage, jwtHelper) {

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