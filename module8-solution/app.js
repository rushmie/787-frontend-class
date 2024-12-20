(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
        .directive("foundItems", FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: "foundItems.html",
            scope: {
                items: '<',
                onRemove: '&'
            }
        }

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var narrow = this;

        narrow.searchTerm = '';
        narrow.foundItems = null;

        narrow.getMatchedMenuItems = function () {
            if (!narrow.searchTerm || narrow.searchTerm.trim() === '') {
                console.log("Empty search term!");
                narrow.foundItems = []; // No items found for empty search term
            }
            else {
                var promise = MenuSearchService.getMatchedMenuItems(this.searchTerm);
                promise
                    .then(function (response) {
                        narrow.foundItems = response;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        };

        narrow.remove = function (index) {
            narrow.foundItems.splice(index, 1);
        }
    };

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            });

            return response.then(function (response) {
                var foundItems = [];

                // process result and only keep items that match description
                for (var categoryKey in response.data) {
                    var category = response.data[categoryKey];
                    const menuItems = category.menu_items;

                    menuItems.forEach(item => {
                        if (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                            foundItems.push(item);
                        }
                    });
                }

                // return processed items
                return foundItems;
            });
        };
    }

})();