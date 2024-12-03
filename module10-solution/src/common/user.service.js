(function () {
    "use strict";
    
    angular.module('common')
    .service('UserService', UserService);
    
    UserService.$inject = [];
    function UserService() {
      var service = this;
    
      service.getUser = function () {
        return service.user;
      };
    
    
      service.setUser = function (user) {
        service.user = user;
      };
    
    }
    
    })();