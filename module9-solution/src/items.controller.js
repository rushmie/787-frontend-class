(function () {
    'use strict';
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items'];

    function ItemsController() {
        var itemsController = this;

        itemsController.items = items;
    }

})();