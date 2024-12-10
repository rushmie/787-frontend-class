(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
        return response.data;
      });
    };

    service.getMenuItem = function (menuNumber) {
      if (!menuNumber || menuNumber === "") {
        return null;
      }
      const parse = menuNumber.match(/^([A-Za-z]+)(\d+)$/);
      if (parse) {
        const category = parse[1];
        const dishNumber = parseInt(parse[2]) - 1; // Convert to zero-based index
      }
      else {
        return null;
      }
      return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + dishNumber + '.json')
        .then(function (response) {
          return response.data;
        });
    };

  }



})();
