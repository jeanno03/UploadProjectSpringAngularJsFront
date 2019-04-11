var test1Service = angular.module("test1Service", []);

test1Service.factory('Logger', function () {
  var Logger = {};

  var active = false; // par défaut le service est désactivé

  // Retourne la date et l'heure courante
  var currentDateTime = function () {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + '/' +
      (currentdate.getMonth() + 1) + '/' +
      currentdate.getFullYear() + ' ' +
      currentdate.getHours() + ':' +
      currentdate.getMinutes() + ':' +
      currentdate.getSeconds();
    return datetime;
  }

  Logger.turnOn = function () {
    active = true;
  };

  Logger.turnOff = function () {
    active = false;
  };

  // Retourne le message reçu précédé de la date et de l'heure,
  // avec le niveau d'alerte voulu
  Logger.log = function (msg, type) {
    var type = type || '';

    if (console && active) { // si la console de JavaScript existe et que le service est actif
      var message = currentDateTime() + ' - ' + msg;

      switch (type) {
        case 'e':
          console.error(message);
          break;
        case 'w':
          console.warn(message);
          break;
        case 'd':
          console.debug(message);
          break;
        default:
          console.log(message);
          break;
      }
    }
  };

  return Logger;
});

test1Service.factory('UserService', function () {

  var currentUserServiceRoot = {};

  return {

    setMyUser: function (myUser) {
      console.log("test inside UserService (myUser.login) : " + myUser.login)
      currentUserServiceRoot = myUser;
    },

    getMyUser: function () {
      return currentUserServiceRoot;
    },

    destroyMyUser: function () {
      currentUserServiceRoot = {};
      return currentUserServiceRoot;
    }
  }



});