(function () {
    'use strict';
    
    angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    MenuDataService.$inject = ['$http', 'ApiBasePath']
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getAllCategories = function () {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            });

            return response.then(function (response) {
                console.log(response.data);
                return response.data;
            });
        };

        service.getItemsForCategory = function (categoryShortName) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items/" + categoryShortName + ".json")
            });

            return response.then(function (response) {
                console.log(response.data);
                return response.data;
            });
        };
    }

})();